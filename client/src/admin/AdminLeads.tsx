import { useEffect, useState } from "react";
import { api, Lead } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

export default function AdminLeads() {
  const token = useAuthStore((state) => state.token) || "";
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.admin.getLeads(token).then(setLeads).catch(() => setLeads([]));
  }, [token]);

  const filtered = leads.filter((lead) =>
    `${lead.name} ${lead.company}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Leadler</h2>
      <input
        className="mt-4 w-full rounded-lg border border-black/10 px-4 py-2 text-sm"
        placeholder="Ara"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mt-6 space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="rounded-xl border border-black/10 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold">{lead.name}</p>
                <p className="text-xs text-black/60">
                  {lead.company} • {lead.email}
                </p>
              </div>
              <p className="text-sm font-semibold text-black/70">
                ₺{lead.minPrice.toLocaleString()} - ₺{lead.maxPrice.toLocaleString()}
              </p>
            </div>
            <p className="mt-2 text-xs text-black/60">Hedef: {lead.goal} • Sektör: {lead.sector}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
