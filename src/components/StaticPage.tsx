import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/db";

export default function StaticPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-extrabold text-neutral-900">{title}</h1>
        <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
          {children}
        </div>
      </main>
      <Footer categories={categories} />
    </div>
  );
}
