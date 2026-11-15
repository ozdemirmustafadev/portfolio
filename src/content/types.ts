import type { Locale } from "@/i18n/config";

export type Localized<T = string> = Record<Locale, T>;
