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

  const result = await db.execute("SELECT COUNT(*) as count FROM posts");

  const count = Number(result.rows[0]?.count ?? 0);

  if (count === 0) {
    const seed = [
      {
        title: "FlexiBee Loan App: बिना लंबी बैंक प्रक्रिया के पाएं Instant Personal Loan",
        slug: "flexibee-loan-app-instant-personal-loan",
        excerpt: "जानिए इस ऐप के फायदे, फीचर्स और लोन आवेदन करने का आसान तरीका।",
        content:
          "FlexiBee Loan App की मदद से आप बिना लंबी बैंक प्रक्रिया के इंस्टेंट पर्सनल लोन पा सकते हैं। इस लेख में हम ऐप के फीचर्स, फायदे और आवेदन प्रोसेस के बारे में विस्तार से जानेंगे।",
        image:
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
        category: "Personal Loan",
        featured: 1,
      },
      {
        title: "Kotak Bank Home Loan Apply Online: घर बैठे करें आवेदन",
        slug: "kotak-bank-home-loan-apply-online",
        excerpt:
          "अब घर बैठे करें आवेदन और पाएं अपने सपनों के घर के लिए लाखों रुपये का होम लोन आसान EMI पर!",
        content:
          "Kotak Mahindra Bank अब होम लोन के लिए ऑनलाइन आवेदन की सुविधा दे रहा है। इस लेख में आवेदन प्रक्रिया, ब्याज दर और जरूरी दस्तावेजों की जानकारी दी गई है।",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
        category: "Bank Loan",
        featured: 1,
      },
      {
        title: "Paizo Loan App: सिर्फ पैन कार्ड से लोन",
        slug: "paizo-loan-app-personal-loan",
        excerpt:
          "अचानक पैसों की जरूरत? मोबाइल से अप्लाई करें और फटाफट पाएं Instant Loan, आसान EMI और तेज अप्रूवल के साथ!",
        content:
          "Paizo Loan App के जरिए सिर्फ पैन कार्ड की मदद से पर्सनल लोन के लिए आवेदन किया जा सकता है। जानिए पूरी प्रक्रिया और जरूरी शर्तें।",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        category: "New Loan App",
        featured: 0,
      },
      {
        title: "Kotak 811 Account Opening Online Zero Balance",
        slug: "kotak-811-account-opening-zero-balance",
        excerpt:
          "आपका पहला कदम कोटक 811 के साथ, ऑनलाइन जीरो बैलेंस अकाउंट खोलें बिना बैंक जाए।",
        content:
          "Kotak 811 अकाउंट को घर बैठे वीडियो KYC के जरिए खोला जा सकता है। यह पूरी तरह जीरो बैलेंस अकाउंट है।",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        category: "Finance",
        featured: 0,
      },
      {
        title: "AU Bank Zero Balance Account Opening",
        slug: "au-bank-zero-balance-account-opening",
        excerpt:
          "खाते में पैसे रखने की टेंशन खत्म, सबसे ज्यादा ब्याज देने वाले बैंक में खोलें जीरो बैलेंस खाता ऑनलाइन घर बैठे।",
        content:
          "AU Small Finance Bank अपने ग्राहकों को जीरो बैलेंस सेविंग अकाउंट पर आकर्षक ब्याज दर देता है। जानिए अकाउंट खोलने की पूरी प्रक्रिया।",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
        category: "Finance",
        featured: 0,
      },
      {
        title: "Lendplus Loan App: सिर्फ 5 मिनट में पाएं Instant Personal Loan",
        slug: "lendplus-loan-app-instant-personal-loan",
        excerpt:
          "अब पैसों की टेंशन खत्म! बिना ज्यादा डॉक्यूमेंट और बिना बैंक विज़िट के सीधे अकाउंट में पैसा।",
        content:
          "Lendplus App के जरिए न्यूनतम दस्तावेजों के साथ इंस्टेंट पर्सनल लोन मिलता है। जानिए एलिजिबिलिटी और आवेदन प्रक्रिया।",
        image:
          "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop",
        category: "Personal Loan",
        featured: 0,
      },
    ];

    for (const post of seed) {
      await db.execute({
        sql: `
          INSERT INTO posts
          (title, slug, excerpt, content, image, category, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.image,
          post.category,
          post.featured,
        ],
      });
    }
  }

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