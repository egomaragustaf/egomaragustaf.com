import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getAllPosts } from "@/lib/content";

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
  if (!getAllPosts().some((p) => p.slug === slug)) notFound();
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <article className="prose dark:prose-invert max-w-none">
      <Post />
    </article>
  );
}
