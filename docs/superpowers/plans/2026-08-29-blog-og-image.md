# Blog OG Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete Open Graph and Twitter metadata with a consistent dynamic image for every blog article.

**Architecture:** Use `generateMetadata` for per-article SEO metadata and a colocated `opengraph-image.tsx` route to render a 1200x630 image from post data. The existing cover image remains the article header image; the generated social image uses a reliable text-first layout.

**Tech Stack:** Next.js 16 App Router, `next/og`, TypeScript, existing filesystem content loader.

## Global Constraints

- Use the canonical site URL `https://egomaragustaf.com`.
- Generate images at `1200x630`.
- Include a readable fallback when a post has no cover image.
- Do not add a new image-generation dependency.

### Task 1: Add Per-Post Metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/blog/[slug]/page.tsx`

- [ ] Set `metadataBase` globally and add default Open Graph/Twitter metadata.
- [ ] Add `generateMetadata` to the blog route using the selected post's title, description, date, canonical URL, and generated image URL.
- [ ] Preserve `notFound()` behavior for unknown slugs.

### Task 2: Create the Dynamic Social Image

**Files:**
- Create: `app/blog/[slug]/opengraph-image.tsx`

- [ ] Load the post by slug.
- [ ] Render a high-contrast 1200x630 `ImageResponse` with title, author, date, and reading time.
- [ ] Export image `alt`, `size`, and `contentType` metadata.
- [ ] Keep title wrapping within safe margins.

### Task 3: Verify Metadata and Rendering

**Files:**
- No additional files.

- [ ] Run `bun run lint`.
- [ ] Run `bun run build`.
- [ ] Confirm `/blog/frontend-self-code-review/opengraph-image` is generated.
