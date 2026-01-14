import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <PageTransition>
      <Helmet>
        <title>İletişim | Göre Medya Ajans</title>
        <meta name="description" content="Göre Medya Ajans iletişim bilgileri ve teklif formu." />
      </Helmet>
      <section className="section-padding">
        <a href="/" className="text-xs font-semibold text-black/60">
          ← Anasayfaya Dön
        </a>
        <h1 className="text-4xl font-heading font-semibold">İletişim</h1>
        <p className="mt-3 text-black/70">Projenizi konuşalım, 24 saat içinde geri dönüş yapalım.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-black/10 p-6">
            <h2 className="text-lg font-semibold">İletişim Bilgileri</h2>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>Telefon: +90 242 000 00 00</li>
              <li>E-posta: info@goremedyaajans.com</li>
              <li>Adres: Muratpaşa, Antalya</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-black/70">
              <p>Çalışma Saatleri: Hafta içi 09:00 - 18:00</p>
            </div>
          </div>
          <form className="rounded-2xl border border-black/10 p-6" onSubmit={form.handleSubmit(() => null)}>
            <h2 className="text-lg font-semibold">Teklif Formu</h2>
            <div className="mt-4 grid gap-4">
              <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="Ad Soyad" {...form.register("name")} />
              <input className="rounded-lg border border-black/10 px-4 py-3 text-sm" placeholder="E-posta" {...form.register("email")} />
              <textarea
                className="rounded-lg border border-black/10 px-4 py-3 text-sm"
                placeholder="Kısaca ihtiyacınız"
                rows={4}
                {...form.register("message")}
              />
              <button className="button-primary" type="submit">
                Gönder
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
