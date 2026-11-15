import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ContactForm } from "./contact-form";

type ContactChannel = {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export async function Contact() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const channels: ContactChannel[] = [
    {
      label: dict.contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
    },
    {
      label: dict.contact.personalEmail,
      value: profile.personalEmail,
      href: `mailto:${profile.personalEmail}`,
      Icon: Mail,
    },
    {
      label: "LinkedIn",
      value: profile.links.linkedin.replace("https://www.", ""),
      href: profile.links.linkedin,
      Icon: LinkedInIcon,
    },
    {
      label: "GitHub",
      value: profile.links.github.replace("https://", ""),
      href: profile.links.github,
      Icon: GitHubIcon,
    },
  ];

  return (
    <Section id="contact" title={dict.contact.title}>
      <p className="max-w-xl text-lg leading-relaxed text-pretty text-foreground/85">
        {dict.contact.intro}
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {channels.map(({ label, value, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition hover:border-foreground/20 hover:bg-subtle/60"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-subtle">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">{label}</span>
                <span className="block truncate font-medium">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold">{dict.contact.formTitle}</h3>
        <div className="mt-5">
          <ContactForm
            labels={dict.contact.form}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            language={locale}
          />
        </div>
      </div>
    </Section>
  );
}
