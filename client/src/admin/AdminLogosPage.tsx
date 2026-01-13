import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/adminApi";
import { Logo } from "@/lib/types";

const emptyForm = { id: "", name: "", imageUrl: "", order: 0, active: true };

const AdminLogosPage = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/logos?all=true`)
      .then((res) => res.json())
      .then(setLogos)
      .catch(() => null);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form, order: Number(form.order) };
    if (form.id) {
      await adminApi.updateLogo(form.id, payload);
    } else {
      await adminApi.saveLogo(payload);
    }
    setForm(emptyForm);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Logo Yönetimi</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Logo Listesi</h2>
          <div className="mt-4 space-y-4">
            {logos.map((logo) => (
              <div key={logo.id} className="flex items-center justify-between rounded-2xl border border-black/10 p-4 text-sm">
                <div className="flex items-center gap-3">
                  <img src={logo.imageUrl} alt={logo.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{logo.name}</p>
                    <p className="text-xs text-black/60">Sıra: {logo.order}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setForm(logo)} className="button-secondary text-xs">Düzenle</button>
                  <button onClick={() => adminApi.deleteLogo(logo.id).then(load)} className="button-secondary text-xs">Sil</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Logo Formu</h2>
          <input className="input" placeholder="Marka adı" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="input" placeholder="Görsel URL" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
          <input className="input" placeholder="Sıra" type="number" value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} />
            Aktif
          </label>
          <button type="submit" className="button-primary w-full">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogosPage;
