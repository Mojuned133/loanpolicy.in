import { notFound } from "next/navigation";
import PostForm from "@/app/admin/PostForm";
import { getPostById } from "@/lib/db";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const post = getPostById(Number(params.id));
  if (!post) return notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
