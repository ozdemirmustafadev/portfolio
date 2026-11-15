import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = locales.flatMap((locale) => [
    { url: `${siteUrl}/${locale}`, priority: 1 },
    { url: `${siteUrl}/${locale}/blog`, priority: 0.7 },
  ]);

  const posts = await Promise.all(
    locales.map(async (locale) =>
      (await getPosts(locale)).map((post) => ({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
        priority: 0.6,
      })),
    ),
  );

  return [...pages, ...posts.flat()];
}
