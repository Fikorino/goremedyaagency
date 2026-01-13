import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";

type Summary = {
  services: number;
  portfolio: number;
  blog: number;
  leads: number;
};

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    adminApi.getDashboard().then(setSummary).catch(() => null);
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Panel Özeti</h1>
      <p className="mt-2 text-sm text-black/70">Genel performans göstergeleri.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        {["Hizmetler", "Portfolyo", "Blog", "Leads"].map((label, index) => {
          const values = summary || { services: 0, portfolio: 0, blog: 0, leads: 0 };
          const count = [values.services, values.portfolio, values.blog, values.leads][index];
          return (
            <div key={label} className="card p-6">
              <p className="text-sm text-black/60">{label}</p>
              <p className="mt-2 text-3xl font-bold">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
