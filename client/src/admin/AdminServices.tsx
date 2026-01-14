import { useEffect, useState } from "react";
import { api, Service } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

const emptyService: Service = {
  id: "",
  name: "",
  slug: "",
  description: "",
  minPrice: 0,
  maxPrice: 0,
  weight: 1,
  seoTitle: "",
  seoDescription: ""
};

export default function AdminServices() {
  const token = useAuthStore((state) => state.token) || "";
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>(emptyService);

  const load = () => {
    api.admin.getServices(token).then(setServices).catch(() => setServices([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.admin.saveService(token, { ...form, id: form.id || crypto.randomUUID() });
    setForm(emptyService);
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Hizmet Yönetimi</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Hizmet adı"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
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
            rows={3}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="number"
              className="rounded-lg border border-black/10 px-4 py-2 text-sm"
              placeholder="Min fiyat"
              value={form.minPrice}
              onChange={(event) => setForm((prev) => ({ ...prev, minPrice: Number(event.target.value) }))}
            />
            <input
              type="number"
              className="rounded-lg border border-black/10 px-4 py-2 text-sm"
              placeholder="Max fiyat"
              value={form.maxPrice}
              onChange={(event) => setForm((prev) => ({ ...prev, maxPrice: Number(event.target.value) }))}
            />
          </div>
          <input
            type="number"
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Ağırlık"
            value={form.weight}
            onChange={(event) => setForm((prev) => ({ ...prev, weight: Number(event.target.value) }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="SEO başlık"
            value={form.seoTitle}
            onChange={(event) => setForm((prev) => ({ ...prev, seoTitle: event.target.value }))}
          />
          <textarea
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="SEO açıklama"
            rows={2}
            value={form.seoDescription}
            onChange={(event) => setForm((prev) => ({ ...prev, seoDescription: event.target.value }))}
          />
          <button className="button-primary" type="submit">
            Kaydet
          </button>
        </form>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-xl border border-black/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{service.name}</p>
                  <p className="text-xs text-black/60">₺{service.minPrice} - ₺{service.maxPrice}</p>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold"
                  onClick={() => setForm(service)}
                >
                  Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
