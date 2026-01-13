import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { Portfolio } from "@/lib/types";

const PortfolioDetailPage = () => {
  const { slug } = useParams();
  const [item, setItem] = useState<Portfolio | null>(null);

  useEffect(() => {
    if (slug) {
      api.getPortfolioItem(slug).then(setItem).catch(() => null);
    }
  }, [slug]);

  if (!item) {
    return <div className="container-page py-20">Yükleniyor...</div>;
  }

  return (
    <div className="section">
      <Seo
        title={`${item.title} | Göre Medya Ajans`}
        description={item.summary}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: item.title,
          description: item.summary,
        }}
      />
      <div className="container-page">
        <Link to="/" className="text-sm font-semibold">← Ana Sayfaya Dön</Link>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <img src={item.coverUrl} alt={item.title} className="h-72 w-full rounded-3xl object-cover" />
            <h1 className="mt-8 font-display text-4xl font-bold">{item.title}</h1>
            <p className="mt-4 text-black/70">{item.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {item.media.map((media) =>
                media.type === "image" ? (
                  <img key={media.url} src={media.url} alt={item.title} className="h-48 w-full rounded-2xl object-cover" />
                ) : (
                  <div key={media.url} className="flex h-48 items-center justify-center rounded-2xl bg-black/10 text-sm">
                    <a href={media.url} className="button-secondary" target="_blank" rel="noreferrer">
                      Videoyu İzle
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
          <aside className="card p-6">
            <h3 className="text-lg font-semibold">Proje Özeti</h3>
            <div className="mt-4 space-y-3 text-sm text-black/70">
              <div>
                <strong>Tarih:</strong> {item.date}
              </div>
              <div>
                <strong>Etiketler:</strong> {item.tags.join(", ")}
              </div>
              {item.results && (
                <div>
                  <strong>Sonuçlar:</strong> {item.results}
                </div>
              )}
            </div>
            <Link to="/iletisim" className="button-primary mt-6 w-full">Benzer Proje Başlat</Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
