import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { BlogPost } from "@/lib/types";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");

  useEffect(() => {
    api.getBlog().then(setPosts).catch(() => null);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => set.add(post.category));
    return ["Tümü", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "Tümü" || post.category === category;
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, category, search]);

  return (
    <div className="section">
      <Seo
        title="Blog | Göre Medya Ajans"
        description="Dijital pazarlama, sosyal medya, reklam yönetimi ve marka büyüme rehberleri."
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold">Blog</h1>
            <p className="mt-3 text-black/70">Ajansın içerik stratejisi ve pazarlama notları.</p>
          </div>
          <input
            className="input max-w-xs"
            placeholder="Blog içinde ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                category === item ? "bg-black text-white" : "bg-black/5 text-black/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="card overflow-hidden">
              <img src={post.coverUrl} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="badge">{post.category}</span>
                  <span className="text-xs text-black/40">{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-sm text-black/70">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
