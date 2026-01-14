import { useEffect, useState } from "react";
import { api, PortfolioItem } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

const emptyPortfolio: PortfolioItem = {
  id: "",
  title: "",
  slug: "",
  description: "",
  tags: [],
  date: new Date().toISOString().split("T")[0],
  media: []
};

export default function AdminPortfolio() {
  const token = useAuthStore((state) => state.token) || "";
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState<PortfolioItem>(emptyPortfolio);
  const [tagInput, setTagInput] = useState("");
  const [mediaInput, setMediaInput] = useState("");

  const load = () => {
    api.admin.getPortfolio(token).then(setItems).catch(() => setItems([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.admin.savePortfolio(token, { ...form, id: form.id || crypto.randomUUID() });
    setForm(emptyPortfolio);
    setTagInput("");
    setMediaInput("");
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Portfolyo Yönetimi</h2>
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
          <textarea
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Açıklama"
            rows={2}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Etiket ekle (Enter)"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
                setTagInput("");
              }
            }}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Medya URL ekle (Enter)"
            value={mediaInput}
            onChange={(event) => setMediaInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setForm((prev) => ({
                  ...prev,
                  media: [...prev.media, { type: "image", url: mediaInput }]
                }));
                setMediaInput("");
              }
            }}
          />
          <button className="button-primary" type="submit">
            Kaydet
          </button>
        </form>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-black/10 p-4">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-black/60">{item.tags.join(", ")}</p>
              <button type="button" className="mt-2 text-xs font-semibold" onClick={() => setForm(item)}>
                Düzenle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
