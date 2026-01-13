import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/adminApi";
import { Service } from "@/lib/types";

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  description: "",
  minPrice: 0,
  maxPrice: 0,
  weight: 1,
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
};

const AdminServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState(emptyForm);

  const loadServices = () => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(() => null);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      minPrice: Number(form.minPrice),
      maxPrice: Number(form.maxPrice),
      weight: Number(form.weight),
    };
    if (form.id) {
      await adminApi.updateService(form.id, payload);
    } else {
      await adminApi.saveService(payload);
    }
    setForm(emptyForm);
    loadServices();
  };

  const handleEdit = (service: Service) => {
    setForm(service);
  };

  const handleDelete = async (id: string) => {
    await adminApi.deleteService(id);
    loadServices();
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Hizmet Yönetimi</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Hizmet Listesi</h2>
          <div className="mt-4 space-y-4">
            {services.map((service) => (
              <div key={service.id} className="rounded-2xl border border-black/10 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{service.title}</p>
                    <p className="text-xs text-black/60">{service.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="button-secondary text-xs">Düzenle</button>
                    <button onClick={() => handleDelete(service.id)} className="button-secondary text-xs">Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Hizmet Formu</h2>
          <input className="input" placeholder="Başlık" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input className="input" placeholder="Slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          <textarea className="input" placeholder="Özet" rows={2} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
          <textarea className="input" placeholder="Detay" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <div className="grid grid-cols-3 gap-2">
            <input className="input" placeholder="Min" type="number" value={form.minPrice} onChange={(event) => setForm({ ...form, minPrice: Number(event.target.value) })} />
            <input className="input" placeholder="Max" type="number" value={form.maxPrice} onChange={(event) => setForm({ ...form, maxPrice: Number(event.target.value) })} />
            <input className="input" placeholder="Weight" type="number" value={form.weight} onChange={(event) => setForm({ ...form, weight: Number(event.target.value) })} />
          </div>
          <input className="input" placeholder="SEO Başlık" value={form.seoTitle} onChange={(event) => setForm({ ...form, seoTitle: event.target.value })} />
          <textarea className="input" placeholder="SEO Açıklama" rows={2} value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} />
          <input className="input" placeholder="Odak Anahtar Kelime" value={form.focusKeyword} onChange={(event) => setForm({ ...form, focusKeyword: event.target.value })} />
          <button type="submit" className="button-primary w-full">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AdminServicesPage;
