import { useEffect, useState } from "react";
import { api, SiteSettings } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

export default function AdminSettings() {
  const token = useAuthStore((state) => state.token) || "";
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    api.admin.getSettings(token).then(setSettings).catch(() => setSettings(null));
  }, [token]);

  if (!settings) {
    return <p>Yükleniyor...</p>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.admin.saveSettings(token, settings);
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold">Site Ayarları</h2>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="Logo yazısı"
          value={settings.logoText}
          onChange={(event) => setSettings({ ...settings, logoText: event.target.value })}
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="Favicon URL"
          value={settings.faviconUrl || ""}
          onChange={(event) => setSettings({ ...settings, faviconUrl: event.target.value })}
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="E-posta"
          value={settings.contactEmail}
          onChange={(event) => setSettings({ ...settings, contactEmail: event.target.value })}
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="Telefon"
          value={settings.contactPhone}
          onChange={(event) => setSettings({ ...settings, contactPhone: event.target.value })}
        />
        <textarea
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="Adres"
          rows={2}
          value={settings.address}
          onChange={(event) => setSettings({ ...settings, address: event.target.value })}
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="Instagram"
          value={settings.social.instagram}
          onChange={(event) =>
            setSettings({ ...settings, social: { ...settings.social, instagram: event.target.value } })
          }
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="LinkedIn"
          value={settings.social.linkedin}
          onChange={(event) =>
            setSettings({ ...settings, social: { ...settings.social, linkedin: event.target.value } })
          }
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="YouTube"
          value={settings.social.youtube}
          onChange={(event) =>
            setSettings({ ...settings, social: { ...settings.social, youtube: event.target.value } })
          }
        />
        <input
          className="rounded-lg border border-black/10 px-4 py-2 text-sm"
          placeholder="GA Measurement ID"
          value={settings.gaMeasurementId || ""}
          onChange={(event) => setSettings({ ...settings, gaMeasurementId: event.target.value })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.enableAnimations}
            onChange={(event) => setSettings({ ...settings, enableAnimations: event.target.checked })}
          />
          Animasyonları aktif et
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.enableHero3d}
            onChange={(event) => setSettings({ ...settings, enableHero3d: event.target.checked })}
          />
          3D hero aktif
        </label>
        <button className="button-primary" type="submit">
          Kaydet
        </button>
      </form>
    </div>
  );
}
