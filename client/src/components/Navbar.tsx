import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Anasayfa" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/portfolyo", label: "Portfolyo" },
  { to: "/fiyat-hesapla", label: "Fiyat Hesapla" },
  { to: "/blog", label: "Blog" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <NavLink to="/" className="text-xl font-heading font-bold">
          Göre Medya Ajans
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-black" : "text-black/60 hover:text-black"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/iletisim" className="button-primary text-xs">
          Teklif Al
        </NavLink>
      </div>
    </header>
  );
}
