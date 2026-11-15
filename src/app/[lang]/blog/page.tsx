import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { Container } from "@/components/ui/container";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPosts } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return {
    title: dict.blog.title,
    description: dict.blog.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { tr: "/tr/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const posts = await getPosts(locale);

  return (
    <main>
      <Container className="py-20 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight">{dict.blog.title}</h1>
        <p className="mt-3 max-w-xl text-pretty text-muted">{dict.blog.description}</p>
        <div className="mt-12">
          <PostList posts={posts} locale={locale} emptyLabel={dict.blog.empty} />
        </div>
      </Container>
    </main>
  );
}
