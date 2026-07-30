import Link from "next/link";
import type { Post } from "@/types/post";

export default function Sidebar({ popular }: { popular: Post[] }) {
  return (
    <aside className="mt-10 rounded-xl border border-neutral-200 p-6">
      <h3 className="mb-4 text-lg font-bold text-neutral-900">Popular Posts</h3>
      <ul className="space-y-3">
        {popular.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm text-neutral-700 hover:text-brand-green hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
