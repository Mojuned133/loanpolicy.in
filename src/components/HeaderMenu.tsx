"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Finance", href: "/category/Finance" },
  { label: "Bank Loan", href: "/category/Bank%20Loan" },
  { label: "Personal Loan", href: "/category/Personal%20Loan" },
  { label: "Credit Card", href: "/category/Credit%20Card" },
  { label: "New Loan App", href: "/category/New%20Loan%20App" },
];

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white shadow-sm">
      {/* Top Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Logo */}
        <Link href="/" className="mx-auto md:mx-0">
          <Image
            src="/logo.jpeg"
            alt="Loan Policy"
            width={260}
            height={80}
            priority
            className="h-auto w-44 sm:w-56 md:w-64"
          />
        </Link>

        {/* Empty div to balance layout */}
        <div className="w-10 md:hidden"></div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden border-t border-neutral-200 md:block">
        <div className="mx-auto flex max-w-7xl justify-center gap-10 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-neutral-700 hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-neutral-100 px-5 py-4 text-base font-medium hover:bg-neutral-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}