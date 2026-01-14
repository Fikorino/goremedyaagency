import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, Service } from "@/lib/api";

const leadSchema = z.object({
  name: z.string().min(2, "İsim gerekli"),
  company: z.string().min(2, "Firma adı gerekli"),
  phone: z.string().min(10, "Telefon gerekli"),
  email: z.string().email("Geçerli e-posta"),
  note: z.string().optional()
});

type LeadForm = z.infer<typeof leadSchema>;

type WizardState = {
  services: string[];
  sector: string;
  goal: string;
  contentCount: number;
  hasAdBudget: boolean;
};

const sectors = ["Turizm", "Sağlık", "E-ticaret", "Restoran", "Eğitim", "Diğer"];
const goals = ["Bilinirlik", "Satış", "Trafik", "Takipçi"];

export default function PriceEstimatorPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [step, setStep] = useState(1);
  const [wizard, setWizard] = useState<WizardState>({
    services: [],
    sector: sectors[0],
    goal: goals[0],
    contentCount: 12,
    hasAdBudget: true
  });
  const [resultSaved, setResultSaved] = useState(false);

  const form = useForm<LeadForm>({
    resolver: zodResolver(leadSchema)
  });

  useEffect(() => {
    api.getServices().then(setServices).catch(() => setServices([]));
  }, []);

  const selectedServices = services.filter((service) => wizard.services.includes(service.id));

  const calculation = useMemo(() => {
    const baseMin = selectedServices.reduce((sum, service) => sum + service.minPrice * service.weight, 0);
    const baseMax = selectedServices.reduce((sum, service) => sum + service.maxPrice * service.weight, 0);
    const serviceCount = selectedServices.length || 1;
    const comboFactor = Math.min(1.08, Math.max(0.92, 1 - (serviceCount - 1) * 0.02));
    const contentFactor = Math.min(1.45, 1 + (wizard.contentCount / 30) * 0.15);
    const finalMin = Math.round(baseMin * comboFactor * contentFactor);
    const finalMax = Math.round(baseMax * comboFactor * contentFactor);
    const recommended = Math.round((finalMin + finalMax) / 2);
    return { finalMin, finalMax, recommended };
  }, [selectedServices, wizard.contentCount]);

  const onSubmit = form.handleSubmit(async (values) => {
    await api.createLead({
      ...values,
      services: selectedServices.map((service) => service.name),
      sector: wizard.sector,
      goal: wizard.goal,
      contentCount: wizard.contentCount,
      hasAdBudget: wizard.hasAdBudget,
      minPrice: calculation.finalMin,
      maxPrice: calculation.finalMax,
      recommended: calculation.recommended
    });
    setResultSaved(true);
  });

  return (
    <PageTransition>
      <Helmet>
        <title>Fiyat Hesapla | Göre Medya Ajans</title>
        <meta
          name="description"
          content="Göre Medya Ajans hizmetleri için hızlı fiyat hesaplama sihirbazı."
        />
      </Helmet>
      <section className="section-padding">
        <h1 className="text-4xl font-heading font-semibold">Fiyat Hesapla</h1>
        <p className="mt-3 text-black/70">
          Hizmet ihtiyaçlarınızı seçin, size özel fiyat aralığını hemen görün.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-black/50">Adım {step}/5</p>
              <div className="flex gap-2">
                {step > 1 && (
                  <button type="button" onClick={() => setStep((prev) => prev - 1)} className="button-outline">
                    Geri
                  </button>
                )}
                {step < 5 && (
                  <button type="button" onClick={() => setStep((prev) => prev + 1)} className="button-primary">
                    Devam
                  </button>
                )}
              </div>
            </div>

            {step === 1 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Hangi hizmetleri istiyorsunuz?</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center gap-3 rounded-xl border border-black/10 p-3">
                      <input
                        type="checkbox"
                        checked={wizard.services.includes(service.id)}
                        onChange={(event) => {
                          setWizard((prev) => {
                            const next = event.target.checked
                              ? [...prev.services, service.id]
                              : prev.services.filter((id) => id !== service.id);
                            return { ...prev, services: next };
                          });
                        }}
                      />
                      <span className="text-sm font-medium">{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Sektörünüz</h2>
                <select
                  className="mt-4 w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  value={wizard.sector}
                  onChange={(event) => setWizard((prev) => ({ ...prev, sector: event.target.value }))}
                >
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Birincil hedefiniz</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setWizard((prev) => ({ ...prev, goal }))}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                        wizard.goal === goal ? "bg-black text-white" : "border-black/10 text-black/70"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Aylık içerik ihtiyacı</h2>
                <input
                  type="range"
                  min={6}
                  max={60}
                  step={2}
                  value={wizard.contentCount}
                  onChange={(event) =>
                    setWizard((prev) => ({ ...prev, contentCount: Number(event.target.value) }))
                  }
                  className="mt-4 w-full"
                />
                <p className="mt-2 text-sm text-black/70">{wizard.contentCount} içerik / ay</p>
              </div>
            )}

            {step === 5 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Reklam bütçeniz var mı?</h2>
                <div className="mt-4 flex gap-4">
                  {[
                    { label: "Evet", value: true },
                    { label: "Hayır", value: false }
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setWizard((prev) => ({ ...prev, hasAdBudget: option.value }))}
                      className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                        wizard.hasAdBudget === option.value
                          ? "bg-black text-white"
                          : "border-black/10 text-black/70"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold">Tahmini Fiyat Aralığı</h2>
            <p className="mt-4 text-3xl font-semibold">
              ₺{calculation.finalMin.toLocaleString()} - ₺{calculation.finalMax.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-black/70">
              Önerilen paket: ₺{calculation.recommended.toLocaleString()} / ay
            </p>
            <div className="mt-4 rounded-xl border border-black/10 bg-white p-4 text-sm text-black/70">
              <p>Seçilen hizmetler: {selectedServices.map((service) => service.name).join(", ") || "-"}</p>
              <p>Sektör: {wizard.sector}</p>
              <p>Hedef: {wizard.goal}</p>
              <p>İçerik ihtiyacı: {wizard.contentCount} / ay</p>
              <p>Reklam bütçesi: {wizard.hasAdBudget ? "Var" : "Yok"}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Teklifinizi almak için formu doldurun</h3>
              {resultSaved ? (
                <p className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black">
                  Teşekkürler! Ekibimiz en kısa sürede sizinle iletişime geçecek.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                  <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="Ad Soyad" {...form.register("name")} />
                  <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="Firma" {...form.register("company")} />
                  <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="Telefon" {...form.register("phone")} />
                  <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="E-posta" {...form.register("email")} />
                  <textarea className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="Not" rows={3} {...form.register("note")} />
                  <button type="submit" className="button-primary">
                    Teklifi Kaydet
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
