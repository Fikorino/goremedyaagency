import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/adminApi";
import { BlogPost } from "@/lib/types";

const emptyForm: BlogPost = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  coverUrl: "",
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  createdAt: new Date().toISOString(),
};

const AdminBlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(emptyForm);

  const load = () => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/blog`)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => null);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form };
    if (form.id) {
      await adminApi.updateBlog(form.id, payload);
    } else {
      await adminApi.saveBlog(payload);
    }
    setForm(emptyForm);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Blog Yönetimi</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Yazılar</h2>
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-black/10 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-xs text-black/60">{post.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setForm(post)} className="button-secondary text-xs">Düzenle</button>
                    <button onClick={() => adminApi.deleteBlog(post.id).then(load)} className="button-secondary text-xs">Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Blog Formu</h2>
          <input className="input" placeholder="Başlık" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input className="input" placeholder="Slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          <input className="input" placeholder="Kategori" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <input className="input" placeholder="Kapak URL" value={form.coverUrl} onChange={(event) => setForm({ ...form, coverUrl: event.target.value })} />
          <textarea className="input" placeholder="Özet" rows={2} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} />
          <textarea className="input" placeholder="İçerik (Markdown)" rows={6} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
          <input className="input" placeholder="SEO Başlık" value={form.seoTitle} onChange={(event) => setForm({ ...form, seoTitle: event.target.value })} />
          <textarea className="input" placeholder="SEO Açıklama" rows={2} value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} />
          <input className="input" placeholder="Odak Anahtar Kelime" value={form.focusKeyword} onChange={(event) => setForm({ ...form, focusKeyword: event.target.value })} />
          <button type="submit" className="button-primary w-full">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogPage;
