import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, BlogPost } from "@/lib/api";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");

  useEffect(() => {
    api.getBlog().then(setPosts).catch(() => setPosts([]));
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category));
    return ["Tümü", ...Array.from(unique)];
  }, [posts]);

  const filtered = posts.filter((post) => {
    const matchesCategory = category === "Tümü" || post.category === category;
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <PageTransition>
      <Helmet>
        <title>Blog | Göre Medya Ajans</title>
        <meta name="description" content="Göre Medya Ajans blog: sosyal medya, reklam ve dijital pazarlama rehberleri." />
      </Helmet>
      <section className="section-padding">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-heading font-semibold">Blog</h1>
            <p className="mt-3 text-black/70">Sektör, strateji ve büyüme rehberleri.</p>
          </div>
          <input
            className="w-full rounded-full border border-black/10 px-4 py-3 text-sm md:w-72"
            placeholder="Blogda ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                category === item ? "bg-black text-white" : "border-black/10 text-black/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card-hover overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <img src={post.cover} alt={post.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold text-black/50">{post.category}</p>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-black/70">{post.excerpt}</p>
                <p className="mt-4 text-xs text-black/50">{post.readingTime} dk okuma</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
