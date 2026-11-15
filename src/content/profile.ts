import type { Localized } from "./types";

const githubUsername = "ozdemirmustafadev";
const linkedinHandle = "ozdemirmustafadev";

export const profile = {
  name: "Mustafa Özdemir",
  email: "info@ozdemirmustafa.com",
  personalEmail: "ozdemirmustafadev@gmail.com",
  location: { tr: "Manisa, Türkiye", en: "Manisa, Türkiye" } satisfies Localized,
  githubUsername,
  links: {
    github: `https://github.com/${githubUsername}`,
    linkedin: `https://www.linkedin.com/in/${linkedinHandle}`,
  },
  cv: null as Localized | null,
};
