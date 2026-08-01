import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getAllProjects } from "@/lib/content";
import { BackButton } from "@/components/section/back-button";
import BlurFade from "@/components/blur-fade";
import { BLUR_FADE_DELAY } from "../../config/config-ui";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): { slug: string }[] {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const file = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
  if (!fs.existsSync(file)) return {};
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const image = data.image ? String(data.image) : undefined;
  return {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    openGraph: {
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) notFound();
  const { default: Project } = await import(`@/content/projects/${slug}.mdx`);
  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <BackButton label="Back to projects" />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <article className="prose dark:prose-invert max-w-none">
        <h1>{project.title}</h1>
        <p className="not-prose text-sm text-muted-foreground">{project.description}</p>
        <Project />
        {project.website || project.github ? (
          <div className="not-prose mt-6 flex items-center gap-2">
            {project.website ? (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <Globe className="size-4" />
                Website
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <FaGithub className="size-4" />
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
        </article>
      </BlurFade>
    </>
  );
}
