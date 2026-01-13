import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/adminApi";
import { Portfolio } from "@/lib/types";

const emptyForm: Portfolio = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  description: "",
  tags: [],
  coverUrl: "",
  media: [],
  date: "",
  results: "",
};

const AdminPortfolioPage = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [form, setForm] = useState<Portfolio>(emptyForm);

  const load = () => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/portfolio`)
      .then((res) => res.json())
      .then(setItems)
      .catch(() => null);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form, tags: form.tags.filter(Boolean) };
    if (form.id) {
      await adminApi.updatePortfolio(form.id, payload);
    } else {
      await adminApi.savePortfolio(payload);
    }
    setForm(emptyForm);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Portfolyo Yönetimi</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Projeler</h2>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-black/10 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-black/60">{item.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setForm(item)} className="button-secondary text-xs">Düzenle</button>
                    <button onClick={() => adminApi.deletePortfolio(item.id).then(load)} className="button-secondary text-xs">Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Portfolyo Formu</h2>
          <input className="input" placeholder="Başlık" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input className="input" placeholder="Slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          <textarea className="input" placeholder="Özet" rows={2} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
          <textarea className="input" placeholder="Detay" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <input className="input" placeholder="Etiketler (virgülle)" value={form.tags.join(", ")} onChange={(event) => setForm({ ...form, tags: event.target.value.split(",").map((tag) => tag.trim()) })} />
          <input className="input" placeholder="Kapak URL" value={form.coverUrl} onChange={(event) => setForm({ ...form, coverUrl: event.target.value })} />
          <textarea className="input" placeholder="Medya (image/video URL, satır satır: type|url)" rows={3} value={form.media.map((m) => `${m.type}|${m.url}`).join("\n")} onChange={(event) => setForm({
            ...form,
            media: event.target.value
              .split("\n")
              .filter(Boolean)
              .map((row) => {
                const [type, url] = row.split("|");
                return { type: type === "video" ? "video" : "image", url };
              }),
          })} />
          <input className="input" placeholder="Tarih" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
          <input className="input" placeholder="Sonuçlar" value={form.results || ""} onChange={(event) => setForm({ ...form, results: event.target.value })} />
          <button type="submit" className="button-primary w-full">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPortfolioPage;
