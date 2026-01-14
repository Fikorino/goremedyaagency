import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, PortfolioItem } from "@/lib/api";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeTag, setActiveTag] = useState("Tümü");

  useEffect(() => {
    api.getPortfolio().then(setItems).catch(() => setItems([]));
  }, []);

  const tags = useMemo(() => {
    const unique = new Set(items.flatMap((item) => item.tags));
    return ["Tümü", ...Array.from(unique)];
  }, [items]);

  const filtered = activeTag === "Tümü" ? items : items.filter((item) => item.tags.includes(activeTag));

  return (
    <PageTransition>
      <Helmet>
        <title>Portfolyo | Göre Medya Ajans</title>
        <meta name="description" content="Göre Medya Ajans portfolyosu: yaratıcı kampanyalar ve dijital projeler." />
      </Helmet>
      <section className="section-padding">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-heading font-semibold">Portfolyo</h1>
            <p className="mt-3 text-black/70">Markalar için ürettiğimiz kampanya ve projeler.</p>
          </div>
          <Link to="/iletisim" className="button-primary">
            Projeni Konuşalım
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                activeTag === tag ? "bg-black text-white" : "border-black/10 text-black/70"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/portfolyo/${item.slug}`}
              className="card-hover overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <img src={item.media[0]?.url} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-black/70">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
