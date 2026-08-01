"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/content";

const PAGE_SIZE = 5;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs transition-colors active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
        active
          ? "border-foreground/20 bg-muted text-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

export function BlogList({ posts }: { posts: Post[] }) {
  const [tag, setTag] = useQueryState("tag", { defaultValue: "", shallow: true });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        <Chip active={tag === ""} onClick={() => { setTag(""); setPage(1); }}>
          All
        </Chip>
        {allTags.map((t) => (
          <Chip key={t} active={tag === t} onClick={() => { setTag(t); setPage(1); }}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {shown.length > 0 ? (
          shown.map((p) => <PostCard key={p.slug} post={p} />)
        ) : (
          <p className="text-sm text-muted-foreground">No posts found.</p>
        )}
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
            className={cn(
              "rounded-md border border-border px-3 py-1 text-xs text-muted-foreground transition-colors",
              "hover:text-foreground hover:bg-muted",
              "active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
              current <= 1 ? "pointer-events-none opacity-40" : "",
            )}
          >
            Prev
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {current} / {totalPages}
          </span>
          <button
            type="button"
            disabled={current >= totalPages}
            onClick={() => setPage(current + 1)}
            className={cn(
              "rounded-md border border-border px-3 py-1 text-xs text-muted-foreground transition-colors",
              "hover:text-foreground hover:bg-muted",
              "active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
              current >= totalPages ? "pointer-events-none opacity-40" : "",
            )}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
