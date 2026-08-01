import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/content";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/card flex flex-col gap-2 rounded-xl border border-border bg-card p-4",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        featured ? "md:flex-row md:items-center md:justify-between md:gap-6" : "",
      )}
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{post.title}</h3>
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
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <time className="text-xs tabular-nums text-muted-foreground">
        {formatDate(post.date)}
      </time>
    </Link>
  );
}