import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getAllPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const file = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
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
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();
  const { default: PostBody } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <>
      {post.image ? (
        <header className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 42rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
              {post.title}
            </h1>
            <time className="text-sm tabular-nums text-white/80">
              {formatDate(post.date)}
            </time>
          </div>
        </header>
      ) : (
        <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
      )}
      <article className="prose dark:prose-invert mt-6 max-w-none">
        <PostBody />
      </article>
    </>
  );
}
