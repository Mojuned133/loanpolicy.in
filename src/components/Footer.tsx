import Link from "next/link";

export default function Footer({ categories }: { categories: string[] }) {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-xl border border-neutral-200 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/category/${encodeURIComponent(c)}`}
                  className="flex items-center gap-2 text-neutral-700 hover:text-brand-green"
                >
                  <span className="text-neutral-400">›</span> {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="mt-8 text-center text-xs text-neutral-400">ADVERTISEMENT</div> */}

        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-neutral-500">
          <p>© 2022 - {new Date().getFullYear()}, LoanPolicy.in All Rights Reserved</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-brand-green">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-brand-green">
              Disclaimer
            </Link>
            <Link href="/contact-us" className="hover:text-brand-green">
              Contact Us
            </Link>
            <Link href="/about-us" className="hover:text-brand-green">
              About US
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
