import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { courses, education } from "@/content/education";
import { experience } from "@/content/experience";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { formatMonth } from "@/lib/format";

export async function Experience() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const period = (start: string, end?: string) =>
    `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : dict.experience.present}`;

  return (
    <Section id="experience" title={dict.experience.title}>
      <ol className="relative space-y-8 border-l border-border pl-6">
        {experience.map((item) => (
          <li key={`${item.company}-${item.start}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[29px] size-2.5 rounded-full ring-4 ring-background ${item.end ? "bg-border" : "bg-accent"}`}
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-semibold">{item.role[locale]}</h3>
              <p className="shrink-0 text-sm text-muted">{period(item.start, item.end)}</p>
            </div>
            <p className="mt-0.5 text-muted">
              {item.company} · {item.location}
            </p>
            {item.summary && (
              <p className="mt-2 leading-relaxed text-pretty">{item.summary[locale]}</p>
            )}
            {item.stack && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">{dict.experience.education}</h3>
          <ul className="mt-5 space-y-5">
            {education.map((item) => (
              <li key={item.school}>
                <p className="font-medium">{item.degree[locale]}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {item.school} · {item.end ? `${item.start} – ${item.end}` : item.start}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{dict.experience.courses}</h3>
          <ul className="mt-5 space-y-5">
            {courses.map((course) => (
              <li key={course.date}>
                <p className="font-medium">{course.title[locale]}</p>
                <p className="mt-0.5 text-sm text-muted">{formatMonth(course.date, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
