import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/content";

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 hover:shadow-lg",
          "active:scale-[0.98]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
           "md:flex-row",
        )}>
        {post.image ? (
           <div className="relative aspect-[4/3] overflow-hidden bg-muted md:w-56">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 20rem"
              className="object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight sm:text-lg">
              {post.title}
            </h3>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          {post.tags.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <time className="mt-1 text-xs tabular-nums text-muted-foreground">
            {formatDate(post.date)}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
         "group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
         "md:flex-row md:items-center md:gap-4 md:p-3",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
      )}>
      {post.image ? (
         <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted md:size-20 md:rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="5rem"
            className="object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      ) : null}
       <div className="flex min-w-0 flex-1 flex-col gap-0.5 p-4 md:p-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-snug text-foreground">
            {post.title}
          </h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
        </div>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <time className="text-xs tabular-nums text-muted-foreground">
            {formatDate(post.date)}
          </time>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-1.5 py-0 text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
