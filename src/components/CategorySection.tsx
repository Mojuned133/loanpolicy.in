import Link from "next/link";
import PostCard from "./PostCard";
import type { Post } from "@/types/post";

export default function CategorySection({
  title,
  posts,
}: {
  title: string;
  posts: Post[];
}) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-neutral-900">{title}</h2>
        <Link
          href={`/category/${encodeURIComponent(title)}`}
          className="text-sm font-medium text-brand-green hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
