import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import { SocialLinks } from "@/components/layout/social-links";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import photo from "@/assets/profile.jpg";

export async function Hero() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section className="pt-14 pb-10 sm:pt-24 sm:pb-16">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-12">
          <Image
            src={photo}
            alt={profile.name}
            priority
            placeholder="blur"
            sizes="(min-width: 640px) 240px, 160px"
            className="size-40 shrink-0 rounded-3xl object-cover ring-1 ring-border sm:size-60"
          />

          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
            <p className="mt-2 text-2xl font-medium text-muted sm:text-3xl">{dict.hero.eyebrow}</p>
            <p className="mt-6 text-lg leading-relaxed text-pretty">{dict.hero.title}</p>
            <p className="mt-3 leading-relaxed text-pretty text-muted">{dict.hero.summary}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4" />
              {profile.location[locale]}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#contact" className={buttonClass("primary")}>
            {dict.hero.contact}
          </a>
          {profile.cv && (
            <a href={profile.cv[locale]} download className={buttonClass("secondary")}>
              <Download className="size-4" />
              {dict.hero.cv}
            </a>
          )}
          <SocialLinks className="sm:ml-1" />
        </div>
      </Container>
    </section>
  );
}
