import BlurFade from "@/components/blur-fade";
import { PostCard } from "@/components/section/post-card";
import { BLUR_FADE_DELAY } from "../config/config-ui";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Blog — Ego Maragustaf",
  description: "My thoughts on software development, life, and more.",
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Blog</h1>
        <p className="text-sm text-muted-foreground mb-8">
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="flex flex-col gap-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </BlurFade>
    </section>
  );
}