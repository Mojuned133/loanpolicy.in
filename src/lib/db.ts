import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, { ...init, cache: "no-store" }),
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

let initPromise: Promise<void> | null = null;

async function ensureInit() {
  if (initPromise) return initPromise;

  initPromise = db.execute(`
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
  `).then(() => {});

  return initPromise;
}

async function query<T>(sql: string, args: any[] = []) {
  await ensureInit();

  const result = await db.execute({
    sql,
    args,
  });

  return result.rows as unknown as T[];
}

export async function getAllPosts(): Promise<Post[]> {
  return query<Post>(
    `SELECT * FROM posts ORDER BY datetime(createdAt) DESC`
  );
}

export async function getPostBySlug(slug: string) {
  const posts = await query<Post>(
    `SELECT * FROM posts WHERE slug=? LIMIT 1`,
    [slug]
  );

  return posts[0];
}

export async function getPostById(id: number) {
  const posts = await query<Post>(
    `SELECT * FROM posts WHERE id=? LIMIT 1`,
    [id]
  );

  return posts[0];
}

export async function getPostsByCategory(category: string) {
  return query<Post>(
    `SELECT * FROM posts
     WHERE category=?
     ORDER BY datetime(createdAt) DESC`,
    [category]
  );
}

export async function getCategories() {
  await ensureInit();

  const result = await db.execute(`
    SELECT DISTINCT category
    FROM posts
    ORDER BY category
  `);

  return result.rows.map((r) => String(r.category));
}

export async function getPopularPosts(limit = 5) {
  return query<Post>(
    `SELECT *
     FROM posts
     ORDER BY featured DESC,
              datetime(createdAt) DESC
     LIMIT ?`,
    [limit]
  );
}

export async function createPost(
  data: Omit<Post, "id" | "createdAt">
) {
  await ensureInit();

  await db.execute({
    sql: `
      INSERT INTO posts
      (title,slug,excerpt,content,image,category,featured)
      VALUES(?,?,?,?,?,?,?)
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

  return getPostBySlug(data.slug);
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

export async function deletePost(id: number) {
  await ensureInit();

  await db.execute({
    sql: `DELETE FROM posts WHERE id=?`,
    args: [id],
  });

  return true;
}

export default db;