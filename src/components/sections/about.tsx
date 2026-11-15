import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { skillGroups } from "@/content/skills";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function About() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section id="about" title={dict.about.title}>
      <div className="space-y-5 text-lg leading-relaxed text-pretty text-foreground/85">
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title.en}>
            <dt className="text-sm font-semibold">{group.title[locale]}</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
