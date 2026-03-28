import BlurFade from "@/components/blur-fade";
import { BLUR_FADE_DELAY } from "../config/config-ui";

export default function Blog() {
  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Blog </h1>
        <p className="text-sm text-muted-foreground mb-8">
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>
    </section>
  );
}
