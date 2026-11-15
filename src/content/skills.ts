import type { Localized } from "./types";

export type SkillGroup = {
  title: Localized;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: { tr: "Mobil", en: "Mobile" },
    items: ["Flutter", "Dart", "iOS", "Android", "Bloc", "Riverpod", "Firebase"],
  },
  {
    title: { tr: "Backend ve Web", en: "Backend & Web" },
    items: ["Go", "Next.js", "SQL", "HTML", "CSS"],
  },
  {
    title: { tr: "Diğer", en: "Other" },
    items: ["Java", "C#", "Git", "GitHub"],
  },
];
