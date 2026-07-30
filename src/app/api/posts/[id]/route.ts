import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/db";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import slugify from "slugify";

function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = getPostById(Number(params.id));
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  const existing = getPostById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const { title, excerpt, content, image, category, featured, slug } = body;

  const finalSlug = slug?.trim()
    ? slugify(slug, { lower: true, strict: true })
    : slugify(title || existing.title, { lower: true, strict: true });

  const updated = updatePost(id, {
    title: title ?? existing.title,
    slug: finalSlug,
    excerpt: excerpt ?? existing.excerpt,
    content: content ?? existing.content,
    image: image ?? existing.image,
    category: category ?? existing.category,
    featured: featured ? 1 : 0,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  deletePost(Number(params.id));
  return NextResponse.json({ success: true });
}
