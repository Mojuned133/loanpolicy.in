import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import { getPostBySlug, getCategories, getPopularPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const categories = await getCategories();
  const popular = await getPopularPosts(5);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <AdSlot />

        <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
          {post.category}
        </span>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-neutral-900">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          {new Date(post.createdAt).toLocaleDateString("hi-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.image && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <article
          className="prose prose-neutral mt-8 max-w-none text-neutral-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSlot />

        <Sidebar popular={popular} />
      </main>
      <Footer categories={categories} />
    </div>
  );
}