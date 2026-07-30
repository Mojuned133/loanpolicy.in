import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "blog.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed a few starter posts on first run so the site isn't empty out of the box.
const count = (db.prepare("SELECT COUNT(*) as c FROM posts").get() as { c: number }).c;
if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, image, category, featured)
    VALUES (@title, @slug, @excerpt, @content, @image, @category, @featured)
  `);
  const seed = [
    {
      title: "FlexiBee Loan App: बिना लंबी बैंक प्रक्रिया के पाएं Instant Personal Loan",
      slug: "flexibee-loan-app-instant-personal-loan",
      excerpt: "जानिए इस ऐप के फायदे, फीचर्स और लोन आवेदन करने का आसान तरीका।",
      content: "FlexiBee Loan App की मदद से आप बिना लंबी बैंक प्रक्रिया के इंस्टेंट पर्सनल लोन पा सकते हैं। इस लेख में हम ऐप के फीचर्स, फायदे और आवेदन प्रोसेस के बारे में विस्तार से जानेंगे।",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
      category: "Personal Loan",
      featured: 1,
    },
    {
      title: "Kotak Bank Home Loan Apply Online: घर बैठे करें आवेदन",
      slug: "kotak-bank-home-loan-apply-online",
      excerpt: "अब घर बैठे करें आवेदन और पाएं अपने सपनों के घर के लिए लाखों रुपये का होम लोन आसान EMI पर!",
      content: "Kotak Mahindra Bank अब होम लोन के लिए ऑनलाइन आवेदन की सुविधा दे रहा है। इस लेख में आवेदन प्रक्रिया, ब्याज दर और जरूरी दस्तावेजों की जानकारी दी गई है।",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      category: "Bank Loan",
      featured: 1,
    },
    {
      title: "Paizo Loan App: सिर्फ पैन कार्ड से लोन",
      slug: "paizo-loan-app-personal-loan",
      excerpt: "अचानक पैसों की जरूरत? मोबाइल से अप्लाई करें और फटाफट पाएं Instant Loan, आसान EMI और तेज अप्रूवल के साथ!",
      content: "Paizo Loan App के जरिए सिर्फ पैन कार्ड की मदद से पर्सनल लोन के लिए आवेदन किया जा सकता है। जानिए पूरी प्रक्रिया और जरूरी शर्तें।",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      category: "New Loan App",
      featured: 0,
    },
    {
      title: "Kotak 811 Account Opening Online Zero Balance",
      slug: "kotak-811-account-opening-zero-balance",
      excerpt: "आपका पहला कदम कोटक 811 के साथ, ऑनलाइन जीरो बैलेंस अकाउंट खोलें बिना बैंक जाए।",
      content: "Kotak 811 अकाउंट को घर बैठे वीडियो KYC के जरिए खोला जा सकता है। यह पूरी तरह जीरो बैलेंस अकाउंट है।",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "Finance",
      featured: 0,
    },
    {
      title: "AU Bank Zero Balance Account Opening",
      slug: "au-bank-zero-balance-account-opening",
      excerpt: "खाते में पैसे रखने की टेंशन खत्म, सबसे ज्यादा ब्याज देने वाले बैंक में खोलें जीरो बैलेंस खाता ऑनलाइन घर बैठे।",
      content: "AU Small Finance Bank अपने ग्राहकों को जीरो बैलेंस सेविंग अकाउंट पर आकर्षक ब्याज दर देता है। जानिए अकाउंट खोलने की पूरी प्रक्रिया।",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
      category: "Finance",
      featured: 0,
    },
    {
      title: "Lendplus Loan App: सिर्फ 5 मिनट में पाएं Instant Personal Loan",
      slug: "lendplus-loan-app-instant-personal-loan",
      excerpt: "अब पैसों की टेंशन खत्म! बिना ज्यादा डॉक्यूमेंट और बिना बैंक विज़िट के सीधे अकाउंट में पैसा।",
      content: "Lendplus App के जरिए न्यूनतम दस्तावेजों के साथ इंस्टेंट पर्सनल लोन मिलता है। जानिए एलिजिबिलिटी और आवेदन प्रक्रिया।",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop",
      category: "Personal Loan",
      featured: 0,
    },
  ];
  const insertMany = db.transaction((rows: typeof seed) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(seed);
}

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

export function getAllPosts(): Post[] {
  return db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all() as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug) as Post | undefined;
}

export function getPostById(id: number): Post | undefined {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as Post | undefined;
}

export function getPostsByCategory(category: string): Post[] {
  return db
    .prepare("SELECT * FROM posts WHERE category = ? ORDER BY createdAt DESC")
    .all(category) as Post[];
}

export function getCategories(): string[] {
  const rows = db
    .prepare("SELECT DISTINCT category FROM posts ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function getPopularPosts(limit = 5): Post[] {
  // "Popular" = most recent, since there's no view-count tracking yet.
  return db.prepare("SELECT * FROM posts ORDER BY createdAt DESC LIMIT ?").all(limit) as Post[];
}

export function createPost(data: Omit<Post, "id" | "createdAt">): Post {
  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, image, category, featured)
    VALUES (@title, @slug, @excerpt, @content, @image, @category, @featured)
  `);
  const info = stmt.run(data);
  return getPostById(Number(info.lastInsertRowid))!;
}

export function updatePost(id: number, data: Omit<Post, "id" | "createdAt">): Post | undefined {
  db.prepare(`
    UPDATE posts SET title=@title, slug=@slug, excerpt=@excerpt, content=@content,
      image=@image, category=@category, featured=@featured
    WHERE id=@id
  `).run({ ...data, id });
  return getPostById(id);
}

export function deletePost(id: number): void {
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}

export default db;
