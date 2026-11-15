import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { MobileNav } from "./mobile-nav";

const sections = ["about", "projects", "experience", "blog", "contact"] as const;

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const items = sections.map((section) => ({
    href: `/${locale}#${section}`,
    label: dict.nav[section],
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="relative flex h-14 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="text-sm font-medium tracking-tight">
          {profile.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label={dict.nav.label} className="hidden sm:block">
            <ul className="flex items-center gap-5 text-sm text-muted">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <LocaleSwitcher current={locale} label={dict.controls.switchLocale} />
            <ThemeToggle label={dict.controls.toggleTheme} />
            <MobileNav
              items={items}
              labels={{ open: dict.nav.open, close: dict.nav.close, nav: dict.nav.label }}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
