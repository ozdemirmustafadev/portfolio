import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostList } from "@/components/blog/post-list";
import { Section } from "@/components/ui/section";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPosts } from "@/lib/blog";

export async function LatestPosts() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const posts = (await getPosts(locale)).slice(0, 3);

  return (
    <Section
      id="blog"
      title={dict.blog.title}
      action={
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          {dict.blog.all}
          <ArrowRight className="size-3.5" />
        </Link>
      }
    >
      <PostList posts={posts} locale={locale} emptyLabel={dict.blog.empty} />
    </Section>
  );
}
