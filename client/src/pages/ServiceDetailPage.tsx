import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, Service } from "@/lib/api";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (slug) {
      api.getService(slug).then(setService).catch(() => setService(null));
    }
  }, [slug]);

  if (!service) {
    return (
      <section className="section-padding">
        <p>Hizmet yükleniyor...</p>
      </section>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: {
              "@type": "Organization",
              name: "Göre Medya Ajans"
            }
          })}
        </script>
      </Helmet>
      <section className="section-padding">
        <Link to="/hizmetler" className="text-xs font-semibold text-black/60">
          ← Hizmetlere Dön
        </Link>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-heading font-semibold">{service.name}</h1>
            <p className="mt-4 text-lg text-black/70">{service.description}</p>
            <div className="mt-6 rounded-2xl border border-black/10 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold">Bu hizmette neler var?</h2>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                <li>• Strateji ve içerik planı</li>
                <li>• Kreatif üretim ve yayın takvimi</li>
                <li>• Performans raporlama</li>
                <li>• A/B test ve optimizasyon</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h3 className="text-lg font-semibold">Fiyat Aralığı</h3>
            <p className="mt-3 text-3xl font-semibold text-black">
              ₺{service.minPrice.toLocaleString()} - ₺{service.maxPrice.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-black/70">
              Net fiyat için ücretsiz keşif görüşmesi yapılır.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/fiyat-hesapla" className="button-primary">
                Paketini Oluştur
              </Link>
              <Link to="/iletisim" className="button-outline">
                Uzmanla Görüş
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
