import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <main>
      <Container className="py-32">
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{dict.notFound.title}</h1>
        <p className="mt-3 text-muted">{dict.notFound.description}</p>
        <Link href={`/${locale}`} className={buttonClass("secondary", "mt-8")}>
          {dict.notFound.home}
        </Link>
      </Container>
    </main>
  );
}
