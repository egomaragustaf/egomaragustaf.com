import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        featured ? "sm:flex-row" : "sm:flex-col",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "sm:w-40 md:w-52 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 20rem"
            className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{project.title}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        {project.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1 pt-2">
            {project.tags.map((tag) => (
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
    </Link>
  );
}