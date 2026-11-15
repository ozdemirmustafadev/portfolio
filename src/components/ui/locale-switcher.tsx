"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, type Locale } from "@/i18n/config";

type LocaleSwitcherProps = {
  current: Locale;
  label: string;
};

export function LocaleSwitcher({ current, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = current === "tr" ? "en" : "tr";
  const href = pathname.replace(new RegExp(`^/${current}(?=/|$)`), `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={label}
      title={label}
      onClick={() => {
        document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="grid h-8 place-items-center rounded-md px-2 font-mono text-xs text-muted uppercase transition-colors hover:bg-subtle hover:text-foreground"
    >
      {target}
    </Link>
  );
}
