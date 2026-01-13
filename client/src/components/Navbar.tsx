import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const navLinks = [
  { label: "Ana Sayfa", path: "/" },
  { label: "Hizmetler", path: "/hizmetler" },
  { label: "Portfolyo", path: "/portfolyo" },
  { label: "Fiyat Hesapla", path: "/fiyat-hesapla" },
  { label: "Blog", path: "/blog" },
  { label: "Hakkımızda", path: "/hakkimizda" },
  { label: "İletişim", path: "/iletisim" },
];

export const Navbar = () => {
  const [logo, setLogo] = useState<string>("/logo.svg");

  useEffect(() => {
    api.getSettings().then((settings) => setLogo(settings.logoUrl)).catch(() => null);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Göre Medya Ajans" className="h-10 w-10 rounded-full" />
          <span className="font-display text-lg font-bold">Göre Medya Ajans</span>
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-black" : "text-black/60 hover:text-black"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/iletisim" className="button-primary text-xs md:text-sm">
          Teklif Al
        </NavLink>
      </div>
    </header>
  );
};
