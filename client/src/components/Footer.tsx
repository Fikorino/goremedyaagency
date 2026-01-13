import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "@/lib/api";

export const Footer = () => {
  const [settings, setSettings] = useState({
    contactEmail: "info@goremedya.com",
    contactPhone: "+90 544 000 0000",
    contactAddress: "Antalya, Türkiye",
  });

  useEffect(() => {
    api.getSettings()
      .then((data) => setSettings(data))
      .catch(() => null);
  }, []);

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold">Göre Medya Ajans</h3>
          <p className="mt-4 text-sm text-black/60">
            Antalya merkezli kreatif medya ve reklam ajansı. Markanızı büyütmek için strateji,
            tasarım ve performansı aynı masada buluşturuyoruz.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Menü</h4>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            <li><NavLink to="/hizmetler">Hizmetler</NavLink></li>
            <li><NavLink to="/portfolyo">Portfolyo</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/fiyat-hesapla">Fiyat Hesapla</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">İletişim</h4>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            <li>{settings.contactAddress}</li>
            <li>{settings.contactPhone}</li>
            <li>{settings.contactEmail}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10 py-6 text-center text-xs text-black/50">
        © {new Date().getFullYear()} Göre Medya Ajans. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};
