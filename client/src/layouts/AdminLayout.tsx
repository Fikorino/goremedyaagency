import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const links = [
  { label: "Özet", path: "/admin" },
  { label: "Hizmetler", path: "/admin/hizmetler" },
  { label: "Logolar", path: "/admin/logolar" },
  { label: "Portfolyo", path: "/admin/portfolyo" },
  { label: "Blog", path: "/admin/blog" },
  { label: "Leads", path: "/admin/leads" },
  { label: "Ayarlar", path: "/admin/ayarlar" },
];

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="min-h-screen bg-black/5">
      <header className="border-b border-black/10 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <NavLink to="/" className="font-display text-lg font-bold">
            Göre Medya Ajans • Admin
          </NavLink>
          <button onClick={logout} className="button-secondary text-xs">
            Çıkış Yap
          </button>
        </div>
      </header>
      <div className="container-page grid gap-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-black text-white" : "bg-white text-black/70"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </aside>
        <section className="space-y-6">{children}</section>
      </div>
    </div>
  );
};
