import { ArrowUpRight, Lock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { projects, type Project, type ProjectLinkType } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";

type ProjectProps = {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
};

const linkOrder: ProjectLinkType[] = ["appStore", "playStore", "website", "github"];

function ProjectLinks({ project, labels }: Omit<ProjectProps, "locale">) {
  const links = linkOrder.flatMap((type) => {
    const href = project.links?.[type];
    return href ? [{ type, href }] : [];
  });

  if (links.length === 0 && !project.confidential) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
      {project.confidential && (
        <Tag>
          <Lock className="size-3" />
          {labels.confidential}
        </Tag>
      )}
      {links.map(({ type, href }) => (
        <a
          key={type}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 text-accent hover:underline"
        >
          {labels.links[type]}
          <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

function FeaturedProject({ project, locale, labels }: ProjectProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border p-6 transition hover:border-foreground/20 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span className="text-sm text-muted">{project.year}</span>
      </div>
      {project.role && <p className="mt-1 text-sm text-muted">{project.role[locale]}</p>}
      <p className="mt-3 leading-relaxed text-pretty text-muted">{project.summary[locale]}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      <div className="mt-auto pt-5 empty:hidden">
        <ProjectLinks project={project} labels={labels} />
      </div>
    </article>
  );
}

function CompactProject({ project, locale, labels }: ProjectProps) {
  return (
    <li className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div>
        <h4 className="font-semibold">{project.name}</h4>
        <p className="mt-1 text-pretty text-muted">{project.summary[locale]}</p>
        <div className="mt-3 empty:hidden">
          <ProjectLinks project={project} labels={labels} />
        </div>
      </div>
      <span className="text-sm text-muted">{project.year}</span>
    </li>
  );
}

export async function Projects() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section id="projects" title={dict.projects.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <FeaturedProject
            key={project.slug}
            project={project}
            locale={locale}
            labels={dict.projects}
          />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="mt-12 text-lg font-semibold">{dict.projects.more}</h3>
          <ul className="mt-2 divide-y divide-border">
            {others.map((project) => (
              <CompactProject
                key={project.slug}
                project={project}
                locale={locale}
                labels={dict.projects}
              />
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
