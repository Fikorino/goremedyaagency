import { useEffect, useState } from "react";
import { api, BlogPost } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

const emptyBlog: BlogPost = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover: "",
  category: "",
  focusKeyword: "",
  metaTitle: "",
  metaDescription: "",
  createdAt: new Date().toISOString(),
  readingTime: 8
};

export default function AdminBlog() {
  const token = useAuthStore((state) => state.token) || "";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(emptyBlog);

  const load = () => {
    api.admin.getBlog(token).then(setPosts).catch(() => setPosts([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.admin.saveBlog(token, { ...form, id: form.id || crypto.randomUUID() });
    setForm(emptyBlog);
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Blog Yönetimi</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Başlık"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Slug"
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Kategori"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Kapak görsel URL"
            value={form.cover}
            onChange={(event) => setForm((prev) => ({ ...prev, cover: event.target.value }))}
          />
          <textarea
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Özet"
            rows={2}
            value={form.excerpt}
            onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
          />
          <textarea
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="İçerik"
            rows={6}
            value={form.content}
            onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="SEO başlık"
            value={form.metaTitle}
            onChange={(event) => setForm((prev) => ({ ...prev, metaTitle: event.target.value }))}
          />
          <textarea
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="SEO açıklama"
            rows={2}
            value={form.metaDescription}
            onChange={(event) => setForm((prev) => ({ ...prev, metaDescription: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Odak anahtar kelime"
            value={form.focusKeyword}
            onChange={(event) => setForm((prev) => ({ ...prev, focusKeyword: event.target.value }))}
          />
          <button className="button-primary" type="submit">
            Kaydet
          </button>
        </form>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-black/10 p-4">
              <p className="text-sm font-semibold">{post.title}</p>
              <p className="text-xs text-black/60">{post.category}</p>
              <button type="button" className="mt-2 text-xs font-semibold" onClick={() => setForm(post)}>
                Düzenle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
