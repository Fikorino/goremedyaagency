import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Hakkımızda | Göre Medya Ajans</title>
        <meta name="description" content="Göre Medya Ajans hakkında: Antalya merkezli yaratıcı medya ve reklam ajansı." />
      </Helmet>
      <section className="section-padding">
        <a href="/" className="text-xs font-semibold text-black/60">
          ← Anasayfaya Dön
        </a>
        <h1 className="text-4xl font-heading font-semibold">Hakkımızda</h1>
        <p className="mt-4 text-lg text-black/70">
          Göre Medya Ajans; strateji, içerik ve performansı aynı masada toplayan, Antalya
          merkezli kreatif ajanstır. 7 yıllık sektör deneyimi ve 2 yıldır aktif çalışan ekibimizle
          markalara uçtan uca büyüme planları sunuyoruz.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Stratejik", description: "Veriye dayalı planlama ve sektör analizi." },
            { title: "Kreatif", description: "Markanıza özel görsel ve içerik dili." },
            { title: "Performans", description: "KPI odaklı raporlama ve optimizasyon." }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-black/10 p-6">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
