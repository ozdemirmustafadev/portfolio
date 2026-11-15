import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/format";

type PostListProps = {
  posts: PostSummary[];
  locale: Locale;
  emptyLabel: string;
};

export function PostList({ posts, locale, emptyLabel }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <ul className="divide-y divide-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="group grid gap-1 py-5 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-6"
          >
            <div>
              <h3 className="text-lg font-semibold decoration-border underline-offset-4 group-hover:underline">
                {post.title}
              </h3>
              <p className="mt-1 text-pretty text-muted">{post.description}</p>
            </div>
            <time dateTime={post.date} className="shrink-0 text-sm text-muted sm:pt-0.5">
              {formatDate(post.date, locale)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
