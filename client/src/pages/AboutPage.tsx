import { Seo } from "@/components/Seo";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="section">
      <Seo
        title="Hakkımızda | Göre Medya Ajans"
        description="Göre Medya Ajans; Antalya'da markalar için strateji, kreatif üretim ve performans odaklı medya çözümleri sunar."
      />
      <div className="container-page">
        <Link to="/" className="text-sm font-semibold">← Ana Sayfaya Dön</Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display text-4xl font-bold">Hakkımızda</h1>
            <p className="mt-4 text-black/70">
              Göre Medya Ajans, Antalya'da büyümek isteyen markalar için stratejik pazarlama ve kreatif üretim hizmetleri sunar.
              7 yıllık sektör tecrübesini 2 yıldır aktif çalışan ajans kültürüyle birleştirir; sosyal medya yönetimi, prodüksiyon,
              web tasarım ve reklam optimizasyonunu tek bir büyüme yolculuğu içinde konumlandırır.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="card p-6">
                <h3 className="text-lg font-semibold">Vizyonumuz</h3>
                <p className="mt-2 text-sm text-black/70">
                  Antalya merkezli markaları dijitalde görünür kılan, ölçülebilir büyüme ve güçlü hikaye yaratmak.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold">Misyonumuz</h3>
                <p className="mt-2 text-sm text-black/70">
                  Veriye dayalı strateji, yaratıcı üretim ve performans optimizasyonu ile işletmelerin sürdürülebilir büyümesini desteklemek.
                </p>
              </div>
            </div>
          </div>
          <aside className="card p-6">
            <h3 className="text-lg font-semibold">Neden Göre Medya?</h3>
            <ul className="mt-4 space-y-3 text-sm text-black/70">
              <li>• Antalya pazarı için yerel uzmanlık</li>
              <li>• Strateji + üretim + performans aynı ekipte</li>
              <li>• Aylık içerik planı ve raporlamalar</li>
              <li>• Ürün, mekan ve hizmet odaklı prodüksiyon</li>
            </ul>
            <Link to="/iletisim" className="button-primary mt-6 w-full">Bize Ulaşın</Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
