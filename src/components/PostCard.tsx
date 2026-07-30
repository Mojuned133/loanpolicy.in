import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">No image</div>
        )}
        <span className="absolute right-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-neutral-900 group-hover:text-brand-green">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
