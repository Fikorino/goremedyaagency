import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { Lead } from "@/lib/types";

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminApi.getLeads().then(setLeads).catch(() => null);
  }, []);

  const filtered = leads.filter((lead) =>
    `${lead.name} ${lead.company ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Lead Yönetimi</h1>
      <div className="mt-4 flex items-center gap-4">
        <input className="input max-w-xs" placeholder="Ara" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div className="mt-6 space-y-4">
        {filtered.map((lead) => (
          <div key={lead.id} className="card p-6 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="text-xs text-black/60">{lead.company}</p>
              </div>
              <div className="text-xs text-black/60">{new Date(lead.createdAt).toLocaleString("tr-TR")}</div>
            </div>
            <p className="mt-3 text-black/70">{lead.summary}</p>
            <div className="mt-4 flex flex-wrap gap-6 text-xs">
              <span>Min: {lead.minPrice.toLocaleString("tr-TR")} ₺</span>
              <span>Max: {lead.maxPrice.toLocaleString("tr-TR")} ₺</span>
              <span>Öneri: {lead.recommendedPrice.toLocaleString("tr-TR")} ₺</span>
            </div>
            <div className="mt-4 text-xs text-black/60">{lead.email} • {lead.phone}</div>
            {lead.note && <p className="mt-2 text-xs text-black/70">Not: {lead.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeadsPage;
