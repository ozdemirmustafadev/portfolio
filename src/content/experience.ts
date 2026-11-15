import type { Localized } from "./types";

export type Experience = {
  company: string;
  location: string;
  url?: string;
  role: Localized;
  start: string;
  end?: string;
  summary?: Localized;
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "Ufuk Araç Takip Sistemi",
    location: "İzmir",
    role: { tr: "Flutter Developer", en: "Flutter Developer" },
    start: "2025-02",
    stack: ["Flutter", "Dart"],
  },
  {
    company: "Tecrübe Bilişim",
    location: "Bursa",
    role: { tr: "Junior Flutter Developer", en: "Junior Flutter Developer" },
    start: "2024-10",
    end: "2024-12",
    stack: ["Flutter", "Dart"],
  },
  {
    company: "Mayteks Örme San. ve Tic. A.Ş.",
    location: "Manisa",
    role: { tr: "Bilgi İşlem Uzmanı", en: "IT Specialist" },
    start: "2017-09",
    end: "2018-11",
  },
  {
    company: "Gediz Elektrik Perakende Satış A.Ş.",
    location: "Manisa",
    role: { tr: "CRM Uzmanı", en: "CRM Specialist" },
    start: "2016-12",
    end: "2017-09",
  },
  {
    company: "Boran Ticaret",
    location: "Manisa",
    role: {
      tr: "Bilgi İşlem Uzmanı, E-Ticaret Satış ve Pazarlama",
      en: "IT Specialist, E-Commerce Sales and Marketing",
    },
    start: "2015-09",
    end: "2016-11",
  },
  {
    company: "Vatan Bilgisayar",
    location: "Manisa",
    role: { tr: "Teknik Destek", en: "Technical Support" },
    start: "2014-08",
    end: "2015-01",
  },
  {
    company: "Celal Bayar Üniversitesi",
    location: "Manisa",
    role: {
      tr: "Bilgi İşlem Uzmanı (yarı zamanlı)",
      en: "IT Specialist (part-time)",
    },
    start: "2012-11",
    end: "2014-04",
  },
  {
    company: "Indesit Company",
    location: "Manisa",
    role: { tr: "Uzun Dönem Stajyer", en: "Long-Term Intern" },
    start: "2011-09",
    end: "2012-06",
  },
];
