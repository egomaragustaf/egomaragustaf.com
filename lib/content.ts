import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  description: string;
  website?: string;
  github?: string;
  image: string;
  date: string;
  tags: string[];
  featured: boolean;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readDir(
  dir: string,
): { slug: string; data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = matter(content);
      return { slug, data, content };
    });
}

function estimateReadingTime(content: string): number {
  const body = content.replace(/^---[\s\S]*?---\s*/, "");
  const words = body.match(/[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu) ?? [];
  return Math.max(1, Math.ceil(words.length / 200));
}

function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllProjects(): Project[] {
  return readDir(PROJECTS_DIR)
    .map(({ slug, data }) => ({
      slug,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      website: data.website ? String(data.website) : undefined,
      github: data.github ? String(data.github) : undefined,
      image: String(data.image ?? ""),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      featured: Boolean(data.featured ?? false),
    }))
    .sort(byDateDesc);
}

export function getAllPosts(): Post[] {
  return readDir(POSTS_DIR)
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      image: data.image ? String(data.image) : undefined,
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      featured: Boolean(data.featured ?? false),
      readingTime: estimateReadingTime(content),
    }))
    .sort(byDateDesc);
}

export function getFeaturedProject(): Project | null {
  return getAllProjects().find((p) => p.featured) ?? null;
}

export function getFeaturedPost(): Post | null {
  return getAllPosts().find((p) => p.featured) ?? null;
}
