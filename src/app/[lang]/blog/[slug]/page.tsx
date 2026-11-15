import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPost, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const posts = await getPosts(await getLocale());
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const post = await getPost(locale, slug);
  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.metadata.date,
      url: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const [{ slug }, locale, dict] = await Promise.all([params, getLocale(), getDictionary()]);
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const { Content, metadata } = post;

  return (
    <main>
      <Container className="max-w-2xl py-16 sm:py-20">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {dict.blog.back}
        </Link>

        <article className="mt-10">
          <header>
            <time dateTime={metadata.date} className="text-sm text-muted">
              {formatDate(metadata.date, locale)}
            </time>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {metadata.title}
            </h1>
            <p className="mt-4 text-pretty text-muted">{metadata.description}</p>
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {metadata.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </header>

          <div className="prose mt-10 max-w-none">
            <Content />
          </div>
        </article>
      </Container>
    </main>
  );
}
