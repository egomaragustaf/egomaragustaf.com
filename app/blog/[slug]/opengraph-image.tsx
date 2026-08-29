import { readFile } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/content";

export const runtime = "nodejs";
export const alt = "Blog post preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getCoverImage(
  imagePath?: string,
): Promise<string | ArrayBuffer | undefined> {
  if (!imagePath) return undefined;
  if (imagePath.startsWith("http")) return imagePath;

  const relativeImagePath = imagePath.replace(/^\//, "");
  const extension = path.extname(relativeImagePath).slice(1).toLowerCase();
  const supportedTypes = new Set(["gif", "jpeg", "jpg", "png"]);
  const ogImagePath = supportedTypes.has(extension)
    ? relativeImagePath
    : relativeImagePath.replace(/\.[^.]+$/, "-og.png");
  const filePath = path.join(process.cwd(), "public", ogImagePath);
  if (!fs.existsSync(filePath)) return undefined;

  const image = await readFile(filePath);
  return Uint8Array.from(image).buffer;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const coverImage = await getCoverImage(post.image);

  return new ImageResponse(
    <div
      style={{
        background: "#030712",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "80px",
        position: "relative",
        width: "100%",
      }}>
      {coverImage ? (
        <img
          alt=""
          height="630"
          // @ts-expect-error Satori accepts ArrayBuffer for local image sources.
          src={coverImage}
          style={{
            height: "100%",
            left: 0,
            objectFit: "cover",
            opacity: 0.8,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
          width="1200"
        />
      ) : null}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(3,7,18,0.45), rgba(3,7,18,0.68))",
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
      <div
        style={{
          color: "#a5b4fc",
          display: "flex",
          fontSize: 28,
          fontWeight: 600,
          position: "relative",
        }}>
        Ego Maragustaf
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 1000,
          position: "relative",
        }}>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}>
          {post.title}
        </div>
      </div>
      <div
        style={{
          color: "#94a3b8",
          display: "flex",
          fontSize: 22,
          position: "relative",
        }}>
        egomaragustaf.com
      </div>
    </div>,
    size,
  );
}
