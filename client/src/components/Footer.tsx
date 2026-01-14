import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="section-padding grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-heading font-semibold">Göre Medya Ajans</h3>
          <p className="mt-3 text-sm text-black/70">
            Antalya merkezli medya ve reklam ajansı. Markanızı hızla büyütmek için strateji,
            içerik ve performans pazarlamasını bir arada sunuyoruz.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Hızlı Erişim</h4>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>
              <Link to="/hizmetler">Hizmetler</Link>
            </li>
            <li>
              <Link to="/portfolyo">Portfolyo</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/fiyat-hesapla">Fiyat Hesapla</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">İletişim</h4>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>info@goremedyaajans.com</li>
            <li>+90 242 000 00 00</li>
            <li>Muratpaşa, Antalya</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10 px-6 py-4 text-center text-xs text-black/60">
        © {new Date().getFullYear()} Göre Medya Ajans. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
