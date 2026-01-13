import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { api } from "@/lib/api";
import { Seo } from "@/components/Seo";
import { BlogPost, Logo, Portfolio, Service } from "@/lib/types";

const processSteps = [
  "Keşif toplantısı ve hedef belirleme",
  "Strateji, içerik ve medya planı",
  "Üretim ve tasarım süreci",
  "Yayınlama, optimizasyon ve reklam yönetimi",
  "Raporlama, öğrenme ve sürekli iyileştirme",
];

const sliderItems = [
  "Marka Kimliği & Konumlandırma",
  "Performans Odaklı Reklam",
  "Yaratıcı İçerik Stüdyosu",
  "Yerel SEO Güçlendirme",
  "Kurumsal Web Deneyimi",
];

const HomePage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => null);
    api.getLogos().then(setLogos).catch(() => null);
    api.getPortfolio().then(setPortfolio).catch(() => null);
    api.getBlog().then(setPosts).catch(() => null);
  }, []);

  const latestPosts = useMemo(() => posts.slice(0, 3), [posts]);
  const featuredPortfolio = useMemo(() => portfolio.slice(0, 3), [portfolio]);

  return (
    <div>
      <Seo
        title="Göre Medya Ajans | Antalya Kreatif Medya & Reklam"
        description="Göre Medya Ajans; sosyal medya, web, prodüksiyon, reklam yönetimi ve marka stratejisiyle Antalya'da işletmelere büyüme odaklı çözümler sunar."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Göre Medya Ajans",
          url: "https://goremedya.com",
          slogan: "Kreatif medya ve reklam ajansı",
        }}
      />

      <section className="relative overflow-hidden bg-white">
        <div className="container-page grid gap-12 pb-12 pt-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1 text-xs font-semibold text-white">
              Antalya merkezli kreatif ajans
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              Dijitalde premium büyüme için strateji, tasarım ve performans tek ekranda.
            </h1>
            <p className="mt-6 text-lg text-black/70">
              Göre Medya Ajans, markanızı görünür kılan içerik üretimi, performans reklamları ve güçlü web deneyimleriyle
              Antalya'da fark yaratan bir medya partneridir.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/fiyat-hesapla" className="button-primary">
                Hemen Fiyat Hesapla
              </Link>
              <Link to="/portfolyo" className="button-secondary">
                Portfolyoyu Gör
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { label: "Yıllık deneyim", value: 7 },
                { label: "Aktif ekip", value: 2 },
                { label: "Tamamlanan proje", value: 120 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl font-bold">
                    <CountUp end={item.value} duration={2.2} />+
                  </div>
                  <p className="text-xs text-black/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 right-0 h-56 w-56 rounded-full opacity-60 blur-3xl gradient-orb"></div>
            <motion.div
              className="card relative overflow-hidden p-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent opacity-40 blur-3xl"></div>
              <h3 className="text-lg font-semibold">Ajans kontrol paneliniz</h3>
              <p className="mt-3 text-sm text-black/70">
                Kampanya takibi, içerik planlama ve performans raporları tek yerde.
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  "Haftalık içerik planı",
                  "Reklam optimizasyonu",
                  "SEO & web performans",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-black text-white">
        <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">3D yaklaşımıyla marka yolculuğu</h2>
            <p className="mt-4 text-white/70">
              Üç boyutlu hissiyat veren slider ile markanızın geleceğini canlandırıyor, strateji ve üretim süreçlerini
              katmanlı olarak kurguluyoruz.
            </p>
          </div>
          <div className="slider-3d">
            <div className="relative flex h-56 items-center justify-center">
              {sliderItems.map((item, index) => (
                <motion.div
                  key={item}
                  className="slider-3d-item absolute w-52 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm"
                  style={{
                    transform: `translateX(${(index - 2) * 80}px) translateZ(${80 - index * 20}px) rotateY(${(index - 2) * 8}deg)`,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity }}
                >
                  <p className="text-white/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold">Hizmetler</h2>
              <p className="mt-3 text-black/70">İhtiyacınıza göre modüler, performansa göre ölçeklenebilir çözümler.</p>
            </div>
            <Link to="/hizmetler" className="button-secondary">Tüm Hizmetler</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.id} to={`/hizmetler/${service.slug}`} className="card p-6">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-black/70">{service.summary}</p>
                <span className="mt-6 inline-flex text-sm font-semibold">Detayları Gör →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-accent">
        <div className="container-page grid gap-10 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="font-display text-3xl font-bold">7 yıllık iş tecrübesi, 2 yıldır aktif çalışan ajans</h2>
            <p className="mt-4 text-black/70">
              Yerel pazarda büyümek isteyen markalar için Antalya odaklı stratejiler ve sürdürülebilir kampanya yönetimi.
            </p>
          </div>
          <div className="rounded-3xl bg-white/70 p-6 text-sm font-semibold">
            Markanızın büyüme hedeflerini birlikte planlayalım. Çok kanallı pazarlama yolculuğuna hazır olun.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold">Süreç Adımları</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="card p-5 text-sm">
                <div className="text-2xl font-bold">0{index + 1}</div>
                <p className="mt-3 text-black/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black text-white">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold">Markalar bizimle büyüyor</h2>
              <p className="mt-3 text-white/70">Yönetilen hesaplar ve birlikte çalıştığımız iş ortakları.</p>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex gap-6 whitespace-nowrap logo-marquee">
              {[...logos, ...logos].map((logo, index) => (
                <div key={`${logo.id}-${index}`} className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-3">
                  <img src={logo.imageUrl} alt={logo.name} className="h-8 w-8 rounded-full" />
                  <span className="text-sm text-white/80">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold">Öne Çıkan Projeler</h2>
              <p className="mt-3 text-black/70">Görsel dil, sonuç ve hikaye birleşimi.</p>
            </div>
            <Link to="/portfolyo" className="button-secondary">Tüm Portfolyo</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredPortfolio.map((item) => (
              <Link key={item.id} to={`/portfolyo/${item.slug}`} className="card overflow-hidden">
                <img src={item.coverUrl} alt={item.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black/5">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold">Blog & İçgörüler</h2>
              <p className="mt-3 text-black/70">Sektör trendleri, pazarlama rehberleri ve ajans notları.</p>
            </div>
            <Link to="/blog" className="button-secondary">Tüm Yazılar</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card overflow-hidden">
                <img src={post.coverUrl} alt={post.title} className="h-40 w-full object-cover" />
                <div className="p-6">
                  <span className="badge">{post.category}</span>
                  <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 rounded-3xl border border-black/10 bg-white p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Hızlı bir keşif görüşmesi planlayalım</h2>
            <p className="mt-3 text-black/70">
              Marka hedeflerinizi dinleyelim, 48 saat içinde öneri ve bütçe aralığı paylaşalım.
            </p>
            <Link to="/iletisim" className="button-primary mt-6">İletişime Geç</Link>
          </div>
          <div className="rounded-3xl bg-black p-6 text-white">
            <h4 className="text-lg font-semibold">İlk adım için kısa form</h4>
            <p className="mt-2 text-sm text-white/70">Formu doldurduğunuzda sizinle en kısa sürede iletişime geçiyoruz.</p>
            <form className="mt-4 space-y-3">
              <input className="input" placeholder="Ad Soyad" />
              <input className="input" placeholder="E-posta" />
              <textarea className="input" rows={3} placeholder="Kısaca ihtiyacınız"></textarea>
              <button type="button" className="button-primary w-full">Formu Gönder</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
