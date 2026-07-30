import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import {
  getAllPosts,
  getCategories,
  getPopularPosts,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getCategories();
  const popular = await getPopularPosts(5);

  const byCategory = categories.map((category) => ({
    category,
    posts: posts.filter((p) => p.category === category),
  }));
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <AdSlot />

        {posts.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
            कोई पोस्ट नहीं मिली। एडमिन पैनल से पहली पोस्ट जोड़ें।
          </div>
        )}

        {byCategory.map(({ category, posts: catPosts }) => (
          <CategorySection
            key={category}
            title={category}
            posts={catPosts}
          />
        ))}

        <AdSlot />

        <Pagination
          currentPage={1}
          totalPages={3}
          basePath="/"
        />

        <Sidebar popular={popular} />
      </main>

      <Footer categories={categories} />
    </div>
  );
}