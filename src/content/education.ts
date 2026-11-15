import type { Localized } from "./types";

export type Education = {
  school: string;
  degree: Localized;
  start: number;
  end?: number;
};

export type Course = {
  title: Localized;
  date: string;
  summary: Localized;
};

export const education: Education[] = [
  {
    school: "Mehmet Akif Ersoy Üniversitesi",
    degree: {
      tr: "Lisans, Yönetim Bilişim Sistemleri",
      en: "BSc, Management Information Systems",
    },
    start: 2021,
    end: 2023,
  },
  {
    school: "Anadolu Üniversitesi",
    degree: { tr: "Lisans, İşletme", en: "BSc, Business Administration" },
    start: 2015,
  },
  {
    school: "Manisa Celal Bayar Üniversitesi",
    degree: {
      tr: "Ön Lisans, Bilgisayar Programcılığı",
      en: "Associate Degree, Computer Programming",
    },
    start: 2012,
    end: 2014,
  },
];

export const courses: Course[] = [
  {
    title: { tr: "Mobil Uygulama Geliştirici (Flutter)", en: "Mobile App Developer (Flutter)" },
    date: "2024-03",
    summary: {
      tr: "300 saat teknik eğitim, 50 saat profesyonel gelişim eğitimi ve uygulamalı mezuniyet projesi.",
      en: "300 hours of technical training, 50 hours of professional development and a hands-on graduation project.",
    },
  },
  {
    title: { tr: "Versiyon Kontrolü: Git ve GitHub", en: "Version Control: Git and GitHub" },
    date: "2023-11",
    summary: {
      tr: "Versiyon kontrolünün temelleri ve GitHub ile proje yönetimi.",
      en: "Version control fundamentals and project management with GitHub.",
    },
  },
  {
    title: { tr: "Herkes İçin Kodlama", en: "Coding for Everyone" },
    date: "2023-09",
    summary: {
      tr: "İstanbul Kodluyor kapsamında Java, HTML, CSS, C# ve SQL temelleri.",
      en: "Java, HTML, CSS, C# and SQL fundamentals as part of the İstanbul Kodluyor program.",
    },
  },
];
