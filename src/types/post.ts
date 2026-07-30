export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  featured: number;
  createdAt: string;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  featured: number;
};
