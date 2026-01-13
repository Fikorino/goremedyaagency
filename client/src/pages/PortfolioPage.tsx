import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { Portfolio } from "@/lib/types";

const PortfolioPage = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [filter, setFilter] = useState("Tümü");

  useEffect(() => {
    api.getPortfolio().then(setItems).catch(() => null);
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return ["Tümü", ...Array.from(set)];
  }, [items]);

  const filtered = filter === "Tümü" ? items : items.filter((item) => item.tags.includes(filter));

  return (
    <div className="section">
      <Seo
        title="Portfolyo | Göre Medya Ajans"
        description="Göre Medya Ajans'ın Antalya ve Türkiye genelinde yürüttüğü kreatif projeler, reklam kampanyaları ve dijital dönüşüm işleri."
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold">Portfolyo</h1>
            <p className="mt-3 text-black/70">Her proje, marka hikayesini büyüten ölçülebilir sonuçlara odaklanır.</p>
          </div>
          <Link to="/iletisim" className="button-primary">Yeni Proje Başlat</Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                filter === tag ? "bg-black text-white" : "bg-black/5 text-black/70"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} to={`/portfolyo/${item.slug}`} className="card overflow-hidden">
              <img src={item.coverUrl} alt={item.title} className="h-44 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-black/70">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
