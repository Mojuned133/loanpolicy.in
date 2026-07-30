"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post? This can't be undone.")) return;
    setLoading(true);
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-neutral-500 hover:text-red-600 disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
