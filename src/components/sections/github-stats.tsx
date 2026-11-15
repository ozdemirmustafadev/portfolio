import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { formatDate, formatNumber, interpolate } from "@/lib/format";
import { getGitHubStats, type ContributionDay, type ContributionLevel } from "@/lib/github";

const levelClasses: Record<ContributionLevel, string> = {
  0: "bg-foreground/[0.08]",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

type CalendarProps = {
  weeks: ContributionDay[][];
  locale: Locale;
  labels: Dictionary["github"];
};

function ContributionCalendar({ weeks, locale, labels }: CalendarProps) {
  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]">
          {weeks.map((week, index) => (
            <div
              key={week[0]?.date ?? index}
              className={cn("flex flex-col gap-[3px]", index === 0 && "justify-end")}
            >
              {week.map((day) => (
                <span
                  key={day.date}
                  title={interpolate(labels.contributionsOn, {
                    count: day.count,
                    date: formatDate(day.date, locale),
                  })}
                  className={cn("size-2.5 rounded-[2px]", levelClasses[day.level])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted">
        {labels.less}
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span key={level} className={cn("size-2.5 rounded-[2px]", levelClasses[level])} />
        ))}
        {labels.more}
      </div>
    </div>
  );
}

export async function GitHubStats() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const stats = await getGitHubStats(profile.githubUsername);

  if (!stats) return null;

  const labels = dict.github;
  const tiles = [
    { label: labels.repos, value: stats.publicRepos },
    { label: labels.stars, value: stats.stars },
    { label: labels.followers, value: stats.followers },
    ...(stats.contributions
      ? [{ label: labels.contributions, value: stats.contributions.total }]
      : []),
  ];

  return (
    <Section
      id="github"
      title={labels.title}
      action={
        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 text-sm font-medium text-accent hover:underline"
        >
          {labels.profile}
          <ArrowUpRight className="size-3.5" />
        </a>
      }
    >
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-2xl bg-subtle p-5">
            <dt className="text-sm text-muted">{tile.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
              {formatNumber(tile.value, locale)}
            </dd>
          </div>
        ))}
      </dl>

      {stats.contributions && (
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">{labels.activity}</h3>
          <ContributionCalendar weeks={stats.contributions.weeks} locale={locale} labels={labels} />
        </div>
      )}
    </Section>
  );
}
