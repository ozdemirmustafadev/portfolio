import { cacheLife } from "next/cache";

const apiUrl = "https://api.github.com";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type GitHubStats = {
  profileUrl: string;
  publicRepos: number;
  followers: number;
  stars: number;
  contributions: { total: number; weeks: ContributionDay[][] } | null;
};

type UserResponse = {
  html_url: string;
  public_repos: number;
  followers: number;
};

type RepoResponse = {
  fork: boolean;
  stargazers_count: number;
};

type CalendarLevel =
  "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

type ContributionsResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: CalendarLevel;
            }[];
          }[];
        };
      };
    } | null;
  };
};

const levels: Record<CalendarLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const contributionsQuery = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-site",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with ${response.status}: ${url}`);
  }

  return response.json() as Promise<T>;
}

function groupByWeek(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];

  for (const day of [...days].sort((a, b) => a.date.localeCompare(b.date))) {
    const isSunday = new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0;
    if (isSunday || weeks.length === 0) weeks.push([]);
    weeks[weeks.length - 1].push(day);
  }

  return weeks;
}

async function getPublicContributions(username: string): Promise<GitHubStats["contributions"]> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { "User-Agent": "portfolio-site" },
  });
  if (!response.ok) return null;

  const html = await response.text();
  const counts = new Map<string, number>();

  for (const [, id, text] of html.matchAll(
    /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
  )) {
    counts.set(id, Number(/^(\d+)/.exec(text.trim())?.[1] ?? 0));
  }

  const days = [...html.matchAll(/data-date="([\d-]+)" id="([^"]+)" data-level="(\d)"/g)].map(
    ([, date, id, level]) => ({
      date,
      count: counts.get(id) ?? 0,
      level: Number(level) as ContributionLevel,
    }),
  );

  if (days.length === 0) return null;

  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    weeks: groupByWeek(days),
  };
}

async function getContributions(username: string): Promise<GitHubStats["contributions"]> {
  if (!process.env.GITHUB_TOKEN) return getPublicContributions(username);

  const { data } = await request<ContributionsResponse>(`${apiUrl}/graphql`, {
    method: "POST",
    body: JSON.stringify({ query: contributionsQuery, variables: { login: username } }),
  });

  const calendar = data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levels[day.contributionLevel],
      })),
    ),
  };
}

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  "use cache";
  cacheLife("hours");

  try {
    const [user, repos, contributions] = await Promise.all([
      request<UserResponse>(`${apiUrl}/users/${username}`),
      request<RepoResponse[]>(`${apiUrl}/users/${username}/repos?per_page=100&type=owner`),
      getContributions(username).catch(() => null),
    ]);

    const ownRepos = repos.filter((repo) => !repo.fork);

    return {
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      stars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      contributions,
    };
  } catch (error) {
    console.warn(`Could not load GitHub stats for "${username}".`, error);
    return null;
  }
}
