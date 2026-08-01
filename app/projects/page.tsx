import BlurFade from "@/components/blur-fade";
import { ProjectCard } from "@/components/section/project-card";
import { BLUR_FADE_DELAY } from "../config/config-ui";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Projects — Ego Maragustaf",
  description: "Things I've built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section id="projects">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Projects</h1>
        <p className="text-sm text-muted-foreground mb-8">
          A selection of things I&apos;ve built.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </BlurFade>
    </section>
  );
}