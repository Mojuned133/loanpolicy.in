import Link from "next/link";
import { getAllPosts } from "@/lib/db";
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function DashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">All Posts ({posts.length})</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          + New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-neutral-100">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-neutral-900">
                  {post.title}
                </td>
                <td className="px-4 py-3 text-neutral-600">{post.category}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-neutral-500 hover:text-brand-green"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-neutral-500 hover:text-brand-green"
                    >
                      Edit
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  No posts yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
