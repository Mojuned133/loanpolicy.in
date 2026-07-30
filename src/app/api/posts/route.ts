import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/db";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import slugify from "slugify";

function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const {
    title,
    excerpt,
    content,
    image,
    category,
    featured,
    slug,
  } = body;

  if (!title || !excerpt || !content || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const finalSlug =
    slug?.trim()
      ? slugify(slug, {
          lower: true,
          strict: true,
        })
      : slugify(title, {
          lower: true,
          strict: true,
        });

  const post = await createPost({
    title,
    slug: finalSlug,
    excerpt,
    content,
    image: image || null,
    category,
    featured: featured ? 1 : 0,
  });

  return NextResponse.json(post, {
    status: 201,
  });
}