import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";

const links = [
  { to: "/admin", label: "Panel" },
  { to: "/admin/hizmetler", label: "Hizmetler" },
  { to: "/admin/portfolyo", label: "Portfolyo" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/logolar", label: "Logolar" },
  { to: "/admin/leadler", label: "Leadler" },
  { to: "/admin/ayarlar", label: "Ayarlar" }
];

export default function AdminLayout() {
  const setToken = useAuthStore((state) => state.setToken);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
        <h1 className="text-lg font-heading font-semibold">Göre Medya Ajans Admin</h1>
        <button
          type="button"
          onClick={() => setToken(null)}
          className="rounded-full border border-black px-4 py-2 text-xs font-semibold"
        >
          Çıkış Yap
        </button>
      </div>
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-black/5 bg-white p-4">
          <nav className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors ${
                    isActive ? "bg-accent text-black" : "text-black/70 hover:bg-black/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="rounded-2xl border border-black/5 bg-white p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
