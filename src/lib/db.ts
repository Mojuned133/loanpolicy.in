import { createClient } from "@libsql/client";

export const db = createClient({
  url:
    process.env.TURSO_DATABASE_URL ||
    "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  featured: number;
  createdAt: string;
};

let initialized = false;

async function ensureInit() {
  if (initialized) return;

  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT,
      category TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  initialized = true;
}

export async function getAllPosts(): Promise<Post[]> {
  await ensureInit();
  const result = await db.execute(
    "SELECT * FROM posts ORDER BY createdAt DESC"
  );
  return result.rows as unknown as Post[];
}

export async function getPostBySlug(
  slug: string
): Promise<Post | undefined> {
  await ensureInit();
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });

  return result.rows[0] as unknown as Post | undefined;
}

export async function getPostById(
  id: number
): Promise<Post | undefined> {
  await ensureInit();

  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE id = ?",
    args: [id],
  });

  return result.rows[0] as unknown as Post | undefined;
}

export async function getPostsByCategory(
  category: string
): Promise<Post[]> {
  await ensureInit();

  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE category=? ORDER BY createdAt DESC",
    args: [category],
  });

  return result.rows as unknown as Post[];
}

export async function getCategories(): Promise<string[]> {
  await ensureInit();

  const result = await db.execute(
    "SELECT DISTINCT category FROM posts ORDER BY category"
  );

  return result.rows.map((r) => String(r.category));
}

export async function getPopularPosts(
  limit = 5
): Promise<Post[]> {
  await ensureInit();

  const result = await db.execute({
    sql: "SELECT * FROM posts ORDER BY createdAt DESC LIMIT ?",
    args: [limit],
  });

  return result.rows as unknown as Post[];
}

export async function createPost(
  data: Omit<Post, "id" | "createdAt">
): Promise<Post> {
  await ensureInit();

  await db.execute({
    sql: `
      INSERT INTO posts
      (title, slug, excerpt, content, image, category, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.image,
      data.category,
      data.featured,
    ],
  });

  return (await getPostBySlug(data.slug))!;
}

export async function updatePost(
  id: number,
  data: Omit<Post, "id" | "createdAt">
): Promise<Post | undefined> {
  await ensureInit();

  await db.execute({
    sql: `
      UPDATE posts
      SET
        title=?,
        slug=?,
        excerpt=?,
        content=?,
        image=?,
        category=?,
        featured=?
      WHERE id=?
    `,
    args: [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.image,
      data.category,
      data.featured,
      id,
    ],
  });

  return getPostById(id);
}

export async function deletePost(id: number): Promise<void> {
  await ensureInit();

  await db.execute({
    sql: "DELETE FROM posts WHERE id=?",
    args: [id],
  });
}

export default db;