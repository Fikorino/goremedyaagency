import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

export default function AdminDashboard() {
  const token = useAuthStore((state) => state.token) || "";
  const [stats, setStats] = useState({ services: 0, portfolio: 0, blog: 0, leads: 0 });

  useEffect(() => {
    Promise.all([
      api.admin.getServices(token),
      api.admin.getPortfolio(token),
      api.admin.getBlog(token),
      api.admin.getLeads(token)
    ])
      .then(([services, portfolio, blog, leads]) =>
        setStats({ services: services.length, portfolio: portfolio.length, blog: blog.length, leads: leads.length })
      )
      .catch(() => setStats({ services: 0, portfolio: 0, blog: 0, leads: 0 }));
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Dashboard</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Hizmetler", value: stats.services },
          { label: "Portfolyo", value: stats.portfolio },
          { label: "Blog", value: stats.blog },
          { label: "Lead", value: stats.leads }
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-black/10 p-4">
            <p className="text-xs text-black/60">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
