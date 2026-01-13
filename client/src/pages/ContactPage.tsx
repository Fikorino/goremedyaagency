import { useEffect, useState } from "react";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";

const ContactPage = () => {
  const [contact, setContact] = useState({
    contactEmail: "info@goremedya.com",
    contactPhone: "+90 544 000 0000",
    contactAddress: "Antalya, Türkiye",
  });

  useEffect(() => {
    api.getSettings().then((data) => setContact(data)).catch(() => null);
  }, []);

  return (
    <div className="section">
      <Seo
        title="İletişim | Göre Medya Ajans"
        description="Göre Medya Ajans ile iletişime geçin, Antalya'daki markanız için büyüme stratejisi planlayalım."
      />
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display text-4xl font-bold">İletişim</h1>
            <p className="mt-4 text-black/70">
              Yeni projeniz için bizi arayın veya formu doldurun. 24 saat içinde geri dönüş yapıyoruz.
            </p>
            <form className="mt-8 space-y-4">
              <div>
                <label className="label">Ad Soyad</label>
                <input className="input" />
              </div>
              <div>
                <label className="label">E-posta</label>
                <input className="input" />
              </div>
              <div>
                <label className="label">Telefon</label>
                <input className="input" />
              </div>
              <div>
                <label className="label">Mesaj</label>
                <textarea className="input" rows={4} />
              </div>
              <button type="button" className="button-primary">Mesajı Gönder</button>
            </form>
          </div>
          <aside className="card p-6">
            <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>
            <div className="mt-4 space-y-3 text-sm text-black/70">
              <p>{contact.contactAddress}</p>
              <p>{contact.contactPhone}</p>
              <p>{contact.contactEmail}</p>
            </div>
            <div className="mt-6 rounded-2xl bg-black/5 p-4 text-sm text-black/70">
              Antalya merkezli ofisimizde yüz yüze görüşme planlamak için randevu oluşturabilirsiniz.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
