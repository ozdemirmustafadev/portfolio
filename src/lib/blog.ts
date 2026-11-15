import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cacheLife } from "next/cache";
import type { Locale } from "@/i18n/config";

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type PostSummary = PostMetadata & { slug: string };

type PostModule = {
  default: MDXContent;
  metadata: PostMetadata;
};

const blogDirectory = path.join(process.cwd(), "src", "content", "blog");

function importPost(locale: Locale, slug: string): Promise<PostModule> {
  return import(`@/content/blog/${locale}/${slug}.mdx`);
}

export async function getPosts(locale: Locale): Promise<PostSummary[]> {
  "use cache";
  cacheLife("max");

  const files = await fs.readdir(path.join(blogDirectory, locale)).catch(() => []);
  const slugs = files.filter((file) => file.endsWith(".mdx")).map((file) => file.slice(0, -4));
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await importPost(locale, slug)).metadata })),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(locale: Locale, slug: string) {
  try {
    const post = await importPost(locale, slug);
    return { Content: post.default, metadata: post.metadata };
  } catch {
    return null;
  }
}
