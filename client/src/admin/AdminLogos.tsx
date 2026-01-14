import { useEffect, useState } from "react";
import { api, Logo } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

export default function AdminLogos() {
  const token = useAuthStore((state) => state.token) || "";
  const [logos, setLogos] = useState<Logo[]>([]);
  const [form, setForm] = useState<Logo>({ id: "", name: "", url: "", active: true, order: 1 });

  const load = () => {
    api.admin.getLogos(token).then(setLogos).catch(() => setLogos([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.admin.saveLogo(token, { ...form, id: form.id || crypto.randomUUID() });
    setForm({ id: "", name: "", url: "", active: true, order: 1 });
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Logo Yönetimi</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Marka adı"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Logo URL"
            value={form.url}
            onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-2 text-sm"
            placeholder="Sıra"
            type="number"
            value={form.order}
            onChange={(event) => setForm((prev) => ({ ...prev, order: Number(event.target.value) }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))}
            />
            Yayında
          </label>
          <button className="button-primary" type="submit">
            Kaydet
          </button>
        </form>
        <div className="space-y-3">
          {logos.map((logo) => (
            <div key={logo.id} className="rounded-xl border border-black/10 p-4">
              <p className="text-sm font-semibold">{logo.name}</p>
              <p className="text-xs text-black/60">{logo.url}</p>
              <button type="button" className="mt-2 text-xs font-semibold" onClick={() => setForm(logo)}>
                Düzenle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
