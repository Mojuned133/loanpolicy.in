import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Finance", href: "/category/Finance" },
  { label: "Bank Loan", href: "/category/Bank%20Loan" },
  { label: "Personal Loan", href: "/category/Personal%20Loan" },
  { label: "Credit Card", href: "/category/Credit%20Card" },
  { label: "New Loan App", href: "/category/New%20Loan%20App" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="mx-auto flex max-w-7xl justify-left px-4 py-5">
        <Link href="/">
          <Image
            src="/logo.jpeg" // public/logo.png
            alt="Loan Policya"
            width={260}
            height={80}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="border-t border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl overflow-x-auto">
    <div className="flex min-w-max items-center justify-center gap-10 px-6 py-5">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="whitespace-nowrap text-sm font-bold text-neutral-700 transition-colors hover:text-green-600"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
</nav>
    </header>
  );
}