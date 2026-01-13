import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { Service } from "@/lib/types";

const schema = z.object({
  services: z.array(z.string()).min(1, "En az bir hizmet seçin."),
  sector: z.string().min(2, "Sektör seçin."),
  goal: z.string().min(2, "Hedef seçin."),
  contentCount: z.number().min(1),
  hasAdBudget: z.string().min(2),
  name: z.string().min(2, "İsim gerekli."),
  company: z.string().optional(),
  phone: z.string().min(7, "Telefon gerekli."),
  email: z.string().email("Geçerli e-posta gerekli."),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const sectors = ["Turizm", "Sağlık", "Eğitim", "Perakende", "E-ticaret", "Teknoloji", "Diğer"]; 
const goals = ["Bilinirlik", "Satış", "Trafik", "Takipçi Artışı"]; 

const PriceWizardPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<{ min: number; max: number; recommended: number; summary: string } | null>(null);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => null);
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], contentCount: 12, hasAdBudget: "Evet" },
  });

  const selectedServices = watch("services");
  const contentCount = watch("contentCount");

  const pricing = useMemo(() => {
    const selected = services.filter((service) => selectedServices?.includes(service.id));
    const baseMin = selected.reduce((sum, item) => sum + item.minPrice, 0);
    const baseMax = selected.reduce((sum, item) => sum + item.maxPrice, 0);
    const comboFactor = selected.length > 0 ? Math.min(1.08, Math.max(0.92, 1 - selected.length * 0.02)) : 1;
    const contentFactor = Math.min(1.45, 1 + (contentCount / 30) * 0.15);
    const finalMin = Math.round(baseMin * comboFactor * contentFactor);
    const finalMax = Math.round(baseMax * comboFactor * contentFactor);
    const recommended = Math.round((finalMin + finalMax) / 2);
    return { finalMin, finalMax, recommended, selected };
  }, [services, selectedServices, contentCount]);

  const onSubmit = async (data: FormData) => {
    const summary = `Seçilen hizmetler: ${pricing.selected.map((item) => item.title).join(", ")}, sektör: ${data.sector}, hedef: ${data.goal}, içerik/adet: ${data.contentCount}, reklam bütçesi: ${data.hasAdBudget}.`;
    await api.submitLead({
      name: data.name,
      company: data.company,
      phone: data.phone,
      email: data.email,
      note: data.note,
      summary,
      minPrice: pricing.finalMin,
      maxPrice: pricing.finalMax,
      recommendedPrice: pricing.recommended,
    });
    setResult({ min: pricing.finalMin, max: pricing.finalMax, recommended: pricing.recommended, summary });
  };

  return (
    <div className="section">
      <Seo
        title="Fiyat Hesapla | Göre Medya Ajans"
        description="Hizmet ihtiyaçlarınızı seçin, bütçe aralığı ve önerilen teklifinizi anında görün."
      />
      <div className="container-page">
        <h1 className="font-display text-4xl font-bold">Fiyat Hesaplama Sihirbazı</h1>
        <p className="mt-3 text-black/70">5 adımda ihtiyaçlarınızı belirleyin, fiyat aralığını anında görüntüleyin.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">1. Hizmetleri seçin</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 text-sm">
                      <input
                        type="checkbox"
                        value={service.id}
                        {...register("services")}
                        className="h-4 w-4"
                      />
                      {service.title}
                    </label>
                  ))}
                </div>
                {errors.services && <p className="mt-2 text-xs text-red-600">{errors.services.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">2. Sektör</h3>
                <select className="input mt-3" {...register("sector")}>
                  <option value="">Seçiniz</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
                {errors.sector && <p className="mt-2 text-xs text-red-600">{errors.sector.message}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">3. Hedef</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {goals.map((goal) => (
                    <label key={goal} className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 text-sm">
                      <input type="radio" value={goal} {...register("goal")} className="h-4 w-4" />
                      {goal}
                    </label>
                  ))}
                </div>
                {errors.goal && <p className="mt-2 text-xs text-red-600">{errors.goal.message}</p>}
              </div>
            )}

            {step === 4 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">4. Aylık içerik adedi</h3>
                <input
                  type="range"
                  min={4}
                  max={60}
                  value={contentCount}
                  onChange={(event) => setValue("contentCount", Number(event.target.value))}
                  className="mt-4 w-full"
                />
                <p className="mt-2 text-sm">Seçilen içerik adedi: <strong>{contentCount}</strong></p>
              </div>
            )}

            {step === 5 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">5. Reklam bütçesi bilgisi</h3>
                <div className="mt-4 flex gap-4">
                  {[
                    { label: "Evet", value: "Evet" },
                    { label: "Hayır", value: "Hayır" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 text-sm">
                      <input type="radio" value={option.value} {...register("hasAdBudget")} className="h-4 w-4" />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold">6. İletişim bilgileri</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">Ad Soyad</label>
                    <input className="input" {...register("name")} />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label">Firma Adı</label>
                    <input className="input" {...register("company")} />
                  </div>
                  <div>
                    <label className="label">Telefon</label>
                    <input className="input" {...register("phone")} />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="label">E-posta</label>
                    <input className="input" {...register("email")} />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Not</label>
                    <textarea className="input" rows={3} {...register("note")} />
                  </div>
                </div>
                <button type="submit" className="button-primary mt-6 w-full">Teklifimi Gönder</button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                className="button-secondary"
                disabled={step === 1}
              >
                Geri
              </button>
              {step < 6 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.min(6, prev + 1))}
                  className="button-primary"
                >
                  Devam Et
                </button>
              )}
            </div>
          </form>

          <div className="card h-fit p-6">
            <h3 className="text-lg font-semibold">Anlık teklif özeti</h3>
            <p className="mt-2 text-sm text-black/70">Seçimlerinize göre oluşan fiyat aralığı.</p>
            <div className="mt-6 space-y-2 text-sm">
              <div>Minimum: <strong>{pricing.finalMin.toLocaleString("tr-TR")} ₺</strong></div>
              <div>Maksimum: <strong>{pricing.finalMax.toLocaleString("tr-TR")} ₺</strong></div>
              <div>Önerilen: <strong>{pricing.recommended.toLocaleString("tr-TR")} ₺</strong></div>
            </div>
            <div className="mt-6 rounded-2xl bg-black/5 p-4 text-xs text-black/70">
              Kombinasyon faktörü ve içerik yoğunluğuna göre otomatik hesaplanır.
            </div>
            {result && (
              <div className="mt-6 rounded-2xl border border-black/10 bg-accent/50 p-4 text-xs">
                <p className="font-semibold">Talebiniz alındı!</p>
                <p className="mt-2 text-black/70">{result.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceWizardPage;
