import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, Service } from "@/lib/api";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => setServices([]));
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Hizmetler | Göre Medya Ajans</title>
        <meta
          name="description"
          content="Göre Medya Ajans hizmetleri: sosyal medya yönetimi, tasarım, prodüksiyon, web tasarım ve reklam danışmanlığı."
        />
      </Helmet>
      <section className="section-padding">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-semibold">Hizmetler</h1>
            <p className="mt-3 text-black/70">
              Markanıza özel planlanan 360° dijital pazarlama çözümleri.
            </p>
          </div>
          <Link className="button-primary" to="/fiyat-hesapla">
            Fiyat Hesapla
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/hizmetler/${service.slug}`}
              className="card-hover rounded-2xl border border-black/10 p-6"
            >
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="mt-3 text-sm text-black/70">{service.description}</p>
              <div className="mt-4 text-xs font-semibold">Detayları Gör →</div>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
