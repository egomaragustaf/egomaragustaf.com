import BlurFade from "@/components/blur-fade";
import { BLUR_FADE_DELAY } from "../config/config-ui";
import { DATA } from "../data/resume";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Blog() {
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="tracking-tight mb-2">About</h2>
        <p className="text-muted-foreground mb-8">
          An insightful glimpse into who I am – because every detail adds depth
          to the canvas of life.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <article className="prose dark:text-white">
          <p>Ego Maragustaf</p>
          <p>
            Hello, you can call me <b>Ego</b>. I am a Software Engineer from
            Indonesia 🇮🇩 who genuinely enjoys the craft of building things on
            the web.
          </p>
          <p>
            I work mostly with JavaScript and TypeScript to building things for
            web and application. I like learning new things, whether that's
            picking up a new concept, solving problems on LeetCode, or just
            starting a side project to see where it goes.
          </p>
          <p>
            Writing is also part of how I learn. I build projects and write
            articles to document my journey, something I can look back on, and
            maybe something useful for others too. Outside of coding, I read
            books.
          </p>

          <p>My current tech stack: </p>
          <div className="flex flex-wrap gap-3">
            {DATA.skills.map((skill) => (
              <div
                key={skill.name}
                className="border bg-background border-border ring-2 ring-border/20 rounded-xl w-fit p-2 flex items-center gap-2">
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    {skill.icon && (
                      <skill.icon className="size-6 rounded overflow-hidden object-contain" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                    <p className="not-prose">{skill.name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </article>
      </BlurFade>
    </section>
  );
}
