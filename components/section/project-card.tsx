import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

function ExternalButtons({
  website,
  github,
}: {
  website?: string;
  github?: string;
}) {
  if (!website && !github) return null;
  return (
    <div className="flex items-center gap-1">
      {website ? (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <Globe className="size-3.5" />
        </a>
      ) : null}
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <FaGithub className="size-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function CardMedia({
  project,
  imageClass,
}: {
  project: Project;
  imageClass: string;
}) {
  return (
    <div className={imageClass}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 20rem"
          className="object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.02] motion-reduce:transition-none"
        />
      ) : null}
    </div>
  );
}

function CardBody({ project }: { project: Project }) {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-tight">{project.title}</h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {project.description}
      </p>
      {project.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
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
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const imageClass = cn(
    "relative overflow-hidden bg-muted",
    featured ? "sm:w-40 md:w-52 aspect-[4/3]" : "aspect-[4/3]",
  );

  if (featured) {
    return (
      <div
        className={cn(
          "group/card relative flex overflow-hidden rounded-xl border border-border bg-card sm:flex-row",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 hover:shadow-lg",
          "active:scale-[0.98]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        )}
      >
        <CardMedia project={project} imageClass={imageClass} />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">{project.title}</h3>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          {project.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
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
          <div className="mt-auto pt-2">
            <ExternalButtons website={project.website} github={project.github} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-1 flex-col active:scale-[0.98] motion-reduce:active:scale-100"
      >
        <CardMedia project={project} imageClass={imageClass} />
        <CardBody project={project} />
      </Link>
      <div className="px-4 pb-4">
        <ExternalButtons website={project.website} github={project.github} />
      </div>
    </div>
  );
}
