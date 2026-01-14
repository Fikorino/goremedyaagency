import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, PortfolioItem } from "@/lib/api";

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (slug) {
      api.getPortfolioItem(slug).then(setItem).catch(() => setItem(null));
    }
  }, [slug]);

  if (!item) {
    return (
      <section className="section-padding">
        <p>Yükleniyor...</p>
      </section>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{item.title} | Göre Medya Ajans Portfolyo</title>
        <meta name="description" content={item.description} />
      </Helmet>
      <section className="section-padding">
        <Link to="/portfolyo" className="text-xs font-semibold text-black/60">
          ← Portfolyoya Dön
        </Link>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-heading font-semibold">{item.title}</h1>
            <p className="mt-4 text-lg text-black/70">{item.description}</p>
            <div className="mt-6 grid gap-4">
              {item.media.map((media) =>
                media.type === "image" ? (
                  <img
                    key={media.url}
                    src={media.url}
                    alt={item.title}
                    className="w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div key={media.url} className="aspect-video w-full overflow-hidden rounded-2xl">
                    <iframe
                      src={media.url}
                      title={item.title}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold">Proje Bilgileri</h2>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>Tarih: {item.date}</li>
              <li>Etiketler: {item.tags.join(", ")}</li>
              {item.results ? <li>Sonuç: {item.results}</li> : null}
            </ul>
            <Link to="/iletisim" className="button-primary mt-6">
              Benzer Proje İstiyorum
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
