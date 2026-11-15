import { profile } from "./profile";
import type { Localized } from "./types";

export type ProjectLinkType = "appStore" | "playStore" | "github" | "website";

export type Project = {
  slug: string;
  name: string;
  summary: Localized;
  role?: Localized;
  stack: string[];
  year: number;
  featured?: boolean;
  confidential?: boolean;
  links?: Partial<Record<ProjectLinkType, string>>;
};

export const projects: Project[] = [
  {
    slug: "tobeto-app",
    name: "Tobeto App",
    summary: {
      tr: "Tobeto eğitim platformu için mobil uygulama. Firebase ile giriş, Firestore üzerinde veri, video dersler ve takvim.",
      en: "Mobile app for the Tobeto learning platform, with Firebase sign-in, Firestore data, video lessons and a calendar.",
    },
    stack: ["Flutter", "Bloc", "Firebase Auth", "Cloud Firestore", "Firebase Storage"],
    year: 2024,
    featured: true,
    links: { github: `${profile.links.github}/TobetoApp_v2` },
  },
  {
    slug: "weekly-weather",
    name: "Weekly Weather",
    summary: {
      tr: "Bulunduğun konuma göre haftalık hava durumu tahminini animasyonlarla gösteren uygulama.",
      en: "Shows a weekly forecast for your current location, with animated weather states.",
    },
    stack: ["Flutter", "Bloc", "Dio", "Geolocator"],
    year: 2024,
    featured: true,
    links: { github: `${profile.links.github}/WeeklyWeatherApp` },
  },
  {
    slug: "meals-app",
    name: "Meals App",
    summary: {
      tr: "Kategori ve filtrelerle yemek tariflerine göz atılan, state yönetimi Riverpod ile yapılan uygulama.",
      en: "Recipe browser with categories and filters, using Riverpod for state management.",
    },
    stack: ["Flutter", "Riverpod"],
    year: 2023,
    links: { github: `${profile.links.github}/mealsapp` },
  },
  {
    slug: "portfolio",
    name: "ozdemirmustafa.com",
    summary: {
      tr: "Şu an baktığın site. İki dilli, blog ve GitHub istatistikleri içeriyor.",
      en: "The site you are looking at. Bilingual, with a blog and GitHub stats.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    year: 2026,
    links: { website: "https://ozdemirmustafa.com" },
  },
];
