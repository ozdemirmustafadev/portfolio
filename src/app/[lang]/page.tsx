import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage() {
  const dict = await getDictionary();

  return (
    <main>
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">{dict.hero.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {dict.hero.title}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-pretty text-muted">{dict.hero.summary}</p>
      </Container>
    </main>
  );
}
