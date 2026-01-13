import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/adminApi";
import { Settings } from "@/lib/types";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/settings`)
      .then((res) => res.json())
      .then(setSettings)
      .catch(() => null);
  }, []);

  if (!settings) {
    return <div>Yükleniyor...</div>;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await adminApi.updateSettings(settings);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Site Ayarları</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Site Adı" value={settings.siteName} onChange={(event) => setSettings({ ...settings, siteName: event.target.value })} />
        <input className="input" placeholder="Logo URL" value={settings.logoUrl} onChange={(event) => setSettings({ ...settings, logoUrl: event.target.value })} />
        <input className="input" placeholder="Favicon URL" value={settings.faviconUrl} onChange={(event) => setSettings({ ...settings, faviconUrl: event.target.value })} />
        <input className="input" placeholder="İletişim E-posta" value={settings.contactEmail} onChange={(event) => setSettings({ ...settings, contactEmail: event.target.value })} />
        <input className="input" placeholder="İletişim Telefon" value={settings.contactPhone} onChange={(event) => setSettings({ ...settings, contactPhone: event.target.value })} />
        <input className="input" placeholder="Adres" value={settings.contactAddress} onChange={(event) => setSettings({ ...settings, contactAddress: event.target.value })} />
        <input className="input" placeholder="Instagram" value={settings.socialLinks.instagram || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: event.target.value } })} />
        <input className="input" placeholder="LinkedIn" value={settings.socialLinks.linkedin || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: event.target.value } })} />
        <input className="input" placeholder="YouTube" value={settings.socialLinks.youtube || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, youtube: event.target.value } })} />
        <input className="input" placeholder="Facebook" value={settings.socialLinks.facebook || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: event.target.value } })} />
        <input className="input" placeholder="GA Measurement ID" value={settings.googleAnalyticsId || ""} onChange={(event) => setSettings({ ...settings, googleAnalyticsId: event.target.value })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={settings.enableAnimations} onChange={(event) => setSettings({ ...settings, enableAnimations: event.target.checked })} />
          Animasyonları Etkinleştir
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={settings.enable3d} onChange={(event) => setSettings({ ...settings, enable3d: event.target.checked })} />
          3D Efektleri Etkinleştir
        </label>
        <button type="submit" className="button-primary w-full">Kaydet</button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
