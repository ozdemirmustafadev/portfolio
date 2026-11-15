import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

const sections = ["about", "projects", "experience", "blog", "contact"] as const;

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="text-sm font-medium tracking-tight">
          Mustafa Özdemir
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label={dict.nav.label} className="hidden sm:block">
            <ul className="flex items-center gap-5 text-sm text-muted">
              {sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`/${locale}#${section}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {dict.nav[section]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <LocaleSwitcher current={locale} label={dict.controls.switchLocale} />
            <ThemeToggle label={dict.controls.toggleTheme} />
          </div>
        </div>
      </Container>
    </header>
  );
}
