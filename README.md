# Loan Policy — Personal Finance Blog (Next.js)

A blogging site modeled on the "World of Personal Finance » Loan Policy" reference:
category sections (Finance, Bank Loan, Personal Loan, etc.), a Popular Posts
sidebar, ad placeholder slots, pagination UI, and a footer categories list —
plus an admin panel to add/edit/delete posts.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **better-sqlite3** — a real file-based database (`data/blog.db`), so posts
  you add in the admin panel persist across restarts. No external DB server
  needed.
- Simple password-based admin auth (httpOnly cookie), no third-party auth
  service required.

## Folder structure

```
LoanPolicy-blog/
├── data/                        # SQLite DB is auto-created here on first run
├── src/
│   ├── app/
│   │   ├── page.tsx             # Homepage — category sections, ads, sidebar
│   │   ├── layout.tsx           # Root layout, fonts
│   │   ├── globals.css
│   │   ├── blog/[slug]/page.tsx     # Single post page
│   │   ├── category/[slug]/page.tsx # Category listing page
│   │   ├── admin-login/page.tsx     # Public admin login form
│   │   ├── admin/
│   │   │   ├── layout.tsx       # Admin chrome (header + logout)
│   │   │   ├── page.tsx         # Redirects to /admin/dashboard
│   │   │   ├── PostForm.tsx     # Shared create/edit form
│   │   │   ├── LogoutButton.tsx
│   │   │   ├── dashboard/page.tsx        # List all posts, edit/delete
│   │   │   ├── dashboard/DeletePostButton.tsx
│   │   │   └── posts/
│   │   │       ├── new/page.tsx          # Create post
│   │   │       └── [id]/edit/page.tsx    # Edit post
│   │   └── api/
│   │       ├── posts/route.ts           # GET (list) / POST (create)
│   │       ├── posts/[id]/route.ts      # GET / PUT / DELETE one post
│   │       └── auth/login|logout/route.ts
│   ├── components/              # Header, Footer, PostCard, CategorySection,
│   │                             # Sidebar, Pagination, AdSlot
│   ├── lib/
│   │   ├── db.ts                # SQLite setup, seed data, query helpers
│   │   └── auth.ts              # Password check + session token helpers
│   ├── types/post.ts
│   └── middleware.ts            # Protects everything under /admin
├── package.json
├── tailwind.config.ts
└── .env.example
```

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```
ADMIN_PASSWORD=pick-a-real-password
SESSION_SECRET=a-long-random-string
```

Then run:

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin login: http://localhost:3000/admin-login

The first time it runs, `src/lib/db.ts` creates `data/blog.db` and seeds it
with a handful of sample posts (same categories/titles style as the
reference PDF) so the homepage isn't empty.

## Adding blogs

1. Go to `/admin-login`, log in with `ADMIN_PASSWORD`.
2. Click **+ New Post**, fill in title, category, image URL, excerpt and
   content, and publish.
3. The post immediately appears on the homepage under its category section,
   on its category page, and at `/blog/<slug>`.

## Notes / things you may want to extend

- **Images**: the form takes an image *URL* (e.g. an Unsplash link or a link
  to an image you've hosted elsewhere). File uploads aren't wired up — that
  would need an upload endpoint (e.g. writing to `/public/uploads` or an
  object storage bucket).
- **Rich text**: content is stored and rendered as plain text (line breaks
  preserved). Swap in a rich-text editor (e.g. Tiptap) if you want bold,
  links, embedded images, etc. inside post bodies.
- **Popular Posts** currently just shows the most recent posts — there's no
  view-count tracking yet.
- **Pagination** on the homepage is currently a visual placeholder — wire it
  up to real `?page=` based slicing in `getAllPosts` once you have enough
  posts to need it.
- Ad slots (`<AdSlot />`) are empty placeholders — drop your ad network's
  script/tag in there.
