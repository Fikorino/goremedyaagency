import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { Service } from "@/lib/types";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => null);
  }, []);

  return (
    <div className="section">
      <Seo
        title="Hizmetler | Göre Medya Ajans"
        description="Sosyal medya yönetimi, prodüksiyon, web tasarım, reklam yönetimi ve daha fazlası için ölçülebilir hizmetler."
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold">Hizmetler</h1>
            <p className="mt-3 text-black/70">Markanızın büyümesi için uçtan uca çözümler.</p>
          </div>
          <Link to="/fiyat-hesapla" className="button-primary">Fiyat Hesapla</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} to={`/hizmetler/${service.slug}`} className="card p-6">
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm text-black/70">{service.summary}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-black/60">
                <span>Minimum {service.minPrice.toLocaleString("tr-TR")} ₺</span>
                <span className="font-semibold">Detaylar →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
