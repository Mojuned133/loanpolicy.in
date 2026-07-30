import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { getPostsByCategory, getCategories, getPopularPosts } from "@/lib/db";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = decodeURIComponent(params.slug);
  const posts = getPostsByCategory(category);
  const categories = getCategories();
  const popular = getPopularPosts(5);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <AdSlot />

        <h1 className="mt-6 text-2xl font-extrabold text-neutral-900">{category}</h1>

        {posts.length === 0 ? (
          <p className="mt-6 text-neutral-500">इस श्रेणी में अभी कोई पोस्ट नहीं है।</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <AdSlot />

        <Sidebar popular={popular} />
      </main>
      <Footer categories={categories} />
    </div>
  );
}
