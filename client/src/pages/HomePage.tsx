import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, BlogPost, PortfolioItem, Service, Logo } from "@/lib/api";

const processSteps = [
  {
    title: "Keşif ve Strateji",
    description: "Hedef kitlenizi analiz eder, rekabet ve fırsatları netleştiririz."
  },
  {
    title: "Kreatif Planlama",
    description: "İçerik takvimi, görsel dil ve kampanya konseptleri oluşturulur."
  },
  {
    title: "Üretim",
    description: "Fotoğraf, video ve tasarım üretimi ile markanız görünür hale gelir."
  },
  {
    title: "Yayın ve Optimizasyon",
    description: "Performans takibi ile sürekli iyileştirme yapılır."
  },
  {
    title: "Raporlama",
    description: "Aylık rapor ve KPI panelleri ile tüm çıktılar şeffaflaşır."
  }
];

const sliderItems = [
  "Strateji",
  "Kreatif",
  "Performans",
  "Prodüksiyon",
  "Marka Büyümesi"
];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => setServices([]));
    api.getPortfolio().then(setPortfolio).catch(() => setPortfolio([]));
    api.getBlog().then(setBlog).catch(() => setBlog([]));
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/logos`)
      .then((res) => res.json())
      .then(setLogos)
      .catch(() => setLogos([]));
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Göre Medya Ajans | Antalya Medya ve Reklam Ajansı</title>
        <meta
          name="description"
          content="Göre Medya Ajans, Antalya merkezli medya ve reklam ajansı. Sosyal medya yönetimi, prodüksiyon, performans reklamları ve web tasarım çözümleri."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Göre Medya Ajans",
            url: "https://goremedyaajans.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Antalya",
              addressCountry: "TR"
            }
          })}
        </script>
      </Helmet>
      <section className="section-padding">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold"
            >
              Antalya merkezli medya & reklam ajansı
            </motion.div>
            <h1 className="mt-6 text-4xl font-heading font-semibold leading-tight md:text-5xl">
              Markanızı büyüten strateji, içerik ve performans ekibi.
            </h1>
            <p className="mt-4 text-lg text-black/70">
              Göre Medya Ajans; sosyal medya yönetimi, prodüksiyon ve performans reklamlarıyla
              işletmenizin satışlarını ve görünürlüğünü artırır.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/fiyat-hesapla" className="button-primary">
                Fiyatını Hemen Öğren
              </Link>
              <Link to="/portfolyo" className="button-outline">
                Portfolyoyu İncele
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { value: "7+ yıl", label: "Sektör tecrübesi" },
                { value: "120+", label: "Proje teslimi" },
                { value: "%92", label: "Müşteri memnuniyeti" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-black/5 p-4">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="text-xs text-black/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-black via-black/90 to-accent">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at top, #feec25 0%, transparent 55%)" }} />
            <div className="relative p-8 text-white">
              <p className="text-sm text-white/70">3D ilhamlı slider</p>
              <div className="mt-6 space-y-4">
                {sliderItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur"
                    style={{ transform: `perspective(600px) rotateY(${index * 2}deg)` }}
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-lg font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-sm text-white/70">
                7 yıllık iş tecrübesi, 2 yıldır aktif çalışan ajans
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-black text-white">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-heading font-semibold">Göre Medya Ajans ile büyüyün</h2>
            <p className="mt-4 text-white/70">
              Ajansınızın tüm pazarlama ihtiyaçları tek ekipte birleşsin. Hızlı üretim,
              analitik raporlama ve dönüşüm odaklı yaklaşım.
            </p>
          </div>
          <div className="lg:col-span-3 grid gap-4 md:grid-cols-2">
            {[
              "Sosyal medya içerik üretimi",
              "Performans reklam yönetimi",
              "Prodüksiyon ve fotoğraf çekimleri",
              "Web tasarım ve SEO danışmanlığı"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-black/60">Hizmetler</p>
            <h2 className="mt-2 text-3xl font-heading font-semibold">Tüm hizmetlerimiz</h2>
          </div>
          <Link to="/hizmetler" className="button-outline">
            Tümünü Gör
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <Link
              key={service.id}
              to={`/hizmetler/${service.slug}`}
              className="card-hover rounded-2xl border border-black/10 p-6"
            >
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="mt-3 text-sm text-black/70">{service.description}</p>
              <span className="mt-4 inline-flex text-xs font-semibold">Detayları Gör →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <h2 className="text-3xl font-heading font-semibold">Çalışma Sürecimiz</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step.title} className="card-hover rounded-2xl border border-black/5 bg-white p-5">
              <p className="text-xs font-semibold text-black/40">0{index + 1}</p>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-black/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-black/60">Markalarımız</p>
            <h2 className="mt-2 text-3xl font-heading font-semibold">Birlikte büyüdüğümüz markalar</h2>
          </div>
          <Link to="/iletisim" className="button-primary">
            Birlikte Çalışalım
          </Link>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="flex animate-[scroll_20s_linear_infinite] gap-10 p-6">
            {[...logos.filter((logo) => logo.active).sort((a, b) => a.order - b.order), ...logos.filter((logo) => logo.active).sort((a, b) => a.order - b.order)].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex min-w-[160px] items-center justify-center">
                <img src={logo.url} alt={logo.name} className="h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-black/60">Portfolyo</p>
            <h2 className="mt-2 text-3xl font-heading font-semibold">Öne çıkan işlerimiz</h2>
          </div>
          <Link to="/portfolyo" className="button-outline">
            Portfolyoya Git
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/portfolyo/${item.slug}`}
              className="card-hover overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <img src={item.media[0]?.url} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-black/70">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-black/60">Blog</p>
            <h2 className="mt-2 text-3xl font-heading font-semibold">Son yazılar</h2>
          </div>
          <Link to="/blog" className="button-outline">
            Bloga Git
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card-hover overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <img src={post.cover} alt={post.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold text-black/50">{post.category}</p>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-black/70">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding bg-black text-white">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-heading font-semibold">Hemen ücretsiz ön görüşme alın</h2>
            <p className="mt-3 text-white/70">
              24 saat içinde dönüş sağlıyoruz. Markanız için ücretsiz analiz ve fiyat aralığı
              paylaşıyoruz.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6">
            <form className="grid gap-4">
              <input
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                placeholder="Ad Soyad"
              />
              <input
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                placeholder="E-posta"
                type="email"
              />
              <textarea
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                placeholder="Kısaca ihtiyacınız"
                rows={3}
              />
              <button className="button-primary" type="button">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
