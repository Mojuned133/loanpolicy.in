import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <Link href="/admin/dashboard" className="text-lg font-extrabold text-brand-green">
          ज्ञान मित्र · Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-neutral-600 hover:text-brand-green">
            View site ↗
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
