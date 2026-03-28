import BlurFade from "@/components/blur-fade";
import { BLUR_FADE_DELAY } from "../config/config-ui";

export default function Blog() {
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">About</h1>
        <p className="text-sm text-muted-foreground mb-8">
          An insightful glimpse into who I am – because every detail adds depth
          to the canvas of life.
        </p>
      </BlurFade>
    </section>
  );
}
