import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { GitHubStats } from "@/components/sections/github-stats";
import { Hero } from "@/components/sections/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Projects } from "@/components/sections/projects";
import { profile } from "@/content/profile";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteUrl } from "@/lib/site";

export default async function HomePage() {
  const dict = await getDictionary();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: dict.hero.eyebrow,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    sameAs: Object.values(profile.links).filter(Boolean),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Projects />
      <GitHubStats />
      <Experience />
      <LatestPosts />
      <Contact />
    </main>
  );
}
