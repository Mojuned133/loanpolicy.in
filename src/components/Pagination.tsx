import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);

  const hrefFor = (page: number) => `${basePath}${page > 1 ? `?page=${page}` : ""}`;

  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-sm">
      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${
            page === currentPage
              ? "border-brand-green text-brand-green"
              : "border-neutral-200 text-neutral-600 hover:border-brand-green"
          }`}
        >
          {page}
        </Link>
      ))}
      {totalPages > 5 && (
        <>
          <span className="text-neutral-400">»</span>
          <Link
            href={hrefFor(totalPages)}
            className="flex h-8 items-center justify-center rounded-full border border-neutral-200 px-3 text-neutral-600 hover:border-brand-green"
          >
            Last
          </Link>
        </>
      )}
    </div>
  );
}
