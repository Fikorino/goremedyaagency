import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { Service } from "@/lib/types";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (slug) {
      api.getService(slug).then(setService).catch(() => null);
    }
  }, [slug]);

  if (!service) {
    return <div className="container-page py-20">Yükleniyor...</div>;
  }

  return (
    <div className="section">
      <Seo
        title={`${service.seoTitle} | Göre Medya Ajans`}
        description={service.seoDescription}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
        }}
      />
      <div className="container-page">
        <Link to="/" className="text-sm font-semibold">← Ana Sayfaya Dön</Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display text-4xl font-bold">{service.title}</h1>
            <p className="mt-4 text-black/70">{service.description}</p>
            <div className="mt-8 rounded-3xl border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold">Hizmet kapsamında</h3>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                <li>• Strateji & konsept belirleme</li>
                <li>• İçerik ve kreatif üretim</li>
                <li>• Yayınlama ve raporlama</li>
                <li>• Optimizasyon ve iterasyon</li>
              </ul>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Fiyat Aralığı</h3>
            <p className="mt-2 text-sm text-black/70">Projeye göre değişmekle birlikte başlangıç aralığı:</p>
            <div className="mt-6 text-3xl font-bold text-black">
              {service.minPrice.toLocaleString("tr-TR")} ₺ - {service.maxPrice.toLocaleString("tr-TR")} ₺
            </div>
            <Link to="/fiyat-hesapla" className="button-primary mt-6 w-full">Özel Fiyat Hesapla</Link>
            <Link to="/iletisim" className="button-secondary mt-3 w-full">Danışmanla Görüş</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
