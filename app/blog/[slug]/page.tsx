import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { BackButton } from "@/components/section/back-button";
import BlurFade from "@/components/blur-fade";
import { BLUR_FADE_DELAY } from "../../config/config-ui";
import { BLUR_DATA_URL } from "@/lib/image";

export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  if (!post) return {};

  const imageUrl = `/blog/${slug}/opengraph-image`;
  const articleUrl = `/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: articleUrl,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();
  const { default: PostBody } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <BackButton label="Back" />
      </BlurFade>
      {post.image ? (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <header className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[16/9]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 42rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="space-y-2">
              <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {post.title}
              </h1>
              <div className="flex flex-col gap-1">
                <time className="text-sm tabular-nums text-muted-foreground">
                  {formatDate(post.date)}
                </time>
                <span className="text-sm text-muted-foreground">
                  {post.readingTime} min read
                </span>
              </div>
            </div>
          </header>
        </BlurFade>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
        </BlurFade>
      )}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <article className="prose dark:prose-invert mt-6 max-w-none">
          <PostBody />
        </article>
      </BlurFade>
    </>
  );
}
