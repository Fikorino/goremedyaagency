import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services = [
  {
    id: "srv-1",
    name: "Sosyal Medya Yönetimi",
    slug: "sosyal-medya-yonetimi",
    description: "İçerik planı, paylaşım takvimi, topluluk yönetimi ve performans raporlaması.",
    minPrice: 12000,
    maxPrice: 24000,
    weight: 1,
    seoTitle: "Sosyal Medya Yönetimi | Göre Medya Ajans",
    seoDescription: "Antalya sosyal medya yönetimi hizmeti: strateji, içerik ve reklam optimizasyonu."
  },
  {
    id: "srv-2",
    name: "Grafik Tasarım",
    slug: "grafik-tasarim",
    description: "Kurumsal kimlik, kreatif kampanya görselleri ve marka tasarım setleri.",
    minPrice: 8000,
    maxPrice: 16000,
    weight: 1,
    seoTitle: "Grafik Tasarım | Göre Medya Ajans",
    seoDescription: "Markanızın görsel dilini güçlendiren kreatif tasarım çözümleri."
  },
  {
    id: "srv-3",
    name: "Prodüksiyon",
    slug: "produksiyon",
    description: "Senaryo, çekim ve post-prodüksiyon süreçleriyle video prodüksiyon hizmeti.",
    minPrice: 20000,
    maxPrice: 45000,
    weight: 1.2,
    seoTitle: "Prodüksiyon Hizmeti | Göre Medya Ajans",
    seoDescription: "Video prodüksiyon, reklam filmi ve kurumsal içerik üretimi."
  },
  {
    id: "srv-4",
    name: "Web Site Tasarımı",
    slug: "web-site-tasarimi",
    description: "Hızlı, mobil uyumlu ve SEO temelli web tasarım çözümleri.",
    minPrice: 18000,
    maxPrice: 42000,
    weight: 1.1,
    seoTitle: "Web Site Tasarımı | Göre Medya Ajans",
    seoDescription: "Kurumsal web sitesi tasarımı ve SEO odaklı kullanıcı deneyimi."
  },
  {
    id: "srv-5",
    name: "Fotoğraf Çekimi",
    slug: "fotograf-cekimi",
    description: "Ürün, mekan ve portre fotoğraf çekimleriyle güven oluşturan görseller.",
    minPrice: 9000,
    maxPrice: 20000,
    weight: 1,
    seoTitle: "Fotoğraf Çekimi | Göre Medya Ajans",
    seoDescription: "Profesyonel ürün ve mekan fotoğraf çekimi hizmetleri."
  },
  {
    id: "srv-6",
    name: "Marka Tanıtımı",
    slug: "marka-tanitimi",
    description: "Konumlandırma, hikaye anlatımı ve marka görünürlüğü stratejileri.",
    minPrice: 14000,
    maxPrice: 28000,
    weight: 1.1,
    seoTitle: "Marka Tanıtımı | Göre Medya Ajans",
    seoDescription: "Marka bilinirliği ve konumlandırma çalışmalarında uzman ekip."
  },
  {
    id: "srv-7",
    name: "Reklam Çalışmaları",
    slug: "reklam-calismalari",
    description: "Meta & Google Ads danışmanlığı, bütçe planlama ve optimizasyon.",
    minPrice: 15000,
    maxPrice: 35000,
    weight: 1.2,
    seoTitle: "Reklam Çalışmaları | Göre Medya Ajans",
    seoDescription: "Meta ve Google Ads reklam yönetimi ile dönüşüm odaklı kampanyalar."
  }
];

const portfolio = [
  {
    id: "pf-1",
    title: "Aurora Otel Lansmanı",
    slug: "aurora-otel",
    description: "Turizm sektöründe lansman kampanyası ve sosyal medya büyümesi.",
    tags: ["Turizm", "Sosyal Medya", "Prodüksiyon"],
    date: "2024-03-12",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb21000?auto=format&fit=crop&w=800&q=80" },
      { type: "image", url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" }
    ],
    results: "3 ayda %68 organik erişim artışı."
  },
  {
    id: "pf-2",
    title: "Nova Clinic Dijital Dönüşüm",
    slug: "nova-clinic",
    description: "Sağlık markası için performans reklamları ve web yenileme.",
    tags: ["Sağlık", "Web", "Reklam"],
    date: "2024-01-18",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80" }
    ],
    results: "Lead dönüşümü %41 artırıldı."
  },
  {
    id: "pf-3",
    title: "Denizli Coffee Rebranding",
    slug: "denizli-coffee",
    description: "Marka kimliği ve mağaza açılış kampanyası.",
    tags: ["Gıda", "Marka Tanıtımı"],
    date: "2023-11-05",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ],
    results: "Açılış haftasında %35 satış artışı."
  }
];

const logos = [
  {
    id: "logo-1",
    name: "Aurora Otel",
    url: "https://dummyimage.com/180x60/000/fff&text=Aurora",
    active: true,
    order: 1
  },
  {
    id: "logo-2",
    name: "Nova Clinic",
    url: "https://dummyimage.com/180x60/000/fff&text=Nova",
    active: true,
    order: 2
  },
  {
    id: "logo-3",
    name: "Luna Coffee",
    url: "https://dummyimage.com/180x60/000/fff&text=Luna",
    active: true,
    order: 3
  },
  {
    id: "logo-4",
    name: "Mira Eğitim",
    url: "https://dummyimage.com/180x60/000/fff&text=Mira",
    active: true,
    order: 4
  }
];

const settings = {
  id: "settings-1",
  logoText: "Göre Medya Ajans",
  faviconUrl: "/favicon.svg",
  contactEmail: "info@goremedyaajans.com",
  contactPhone: "+90 242 000 00 00",
  address: "Muratpaşa, Antalya",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  gaMeasurementId: "",
  enableAnimations: true,
  enableHero3d: true
};

const extendContent = (base, topic, serviceSlug) => {
  return `${base}

## ${topic} için kapsamlı aksiyon listesi
Pazarlama planı oluştururken ilk adım hedefleri zaman, bütçe ve KPI ile netleştirmektir. Antalya gibi rekabeti yüksek bir pazarda markanın farkını ortaya koymak için kullanıcı yolculuğu haritası çıkarılmalıdır. Bu harita; farkındalık, değerlendirme ve karar aşamalarını ayrı ayrı ele alır. Her aşama için içerik formatı, yayın sıklığı ve ölçüm yöntemi belirlenir. Örneğin değerlendirme aşamasında vaka çalışmaları ve müşteri yorumları öne çıkarken, karar aşamasında teklif ve randevu çağrıları daha etkilidir. Strateji, içerik planı ve reklam bütçesi aynı tabloda yönetildiğinde yatırımın geri dönüşü artar.

### İçerik üretiminde derinlik oluşturma
İçerikler sadece paylaşılmak için üretilmemeli; satış ve güven üretmelidir. Bu nedenle her içerikte tek bir mesaj, tek bir hedef ve tek bir CTA olmalıdır. Blog yazıları, Reels, e-bülten ve web sayfaları birbiriyle konuşan bir sistem kurmalıdır. Okuyucu blogdan hizmet sayfasına yönlendirildiğinde marka otoritesi güçlenir. Örneğin detaylı bir hizmet anlatımı için /hizmetler/${serviceSlug} sayfasına yönlendirmek hem SEO hem de dönüşüm açısından avantaj sağlar. İçeriklerin sonunda mikro eylem çağrıları kullanmak, kullanıcıyı yormadan dönüşüm sağlar.

### Ölçümleme ve optimizasyon
Başarılı kampanyalar yalnızca yayınla bitmez; analizle gelişir. Haftalık raporlarda erişim, etkileşim, tıklama ve dönüşüm metrikleri birlikte değerlendirilmelidir. Raporlar, sadece rakam değil, bir sonraki aksiyonu da içermelidir. “Bu hafta şu içerik öne çıktı, benzer formatı artırıyoruz” gibi net öneriler ekip içinde hız kazandırır. Performans reklamlarıyla organik içerikler karşılaştırıldığında, bütçe dağılımı daha doğru yönetilir. Böylece bütçe kaybı değil, büyüme döngüsü yaratılır.

## Ekip organizasyonu ve süreç yönetimi
Pazarlama ekipleri için rol dağılımı önemlidir: stratejist, içerik üreticisi, tasarımcı ve performans uzmanı net görevlerle çalışmalıdır. Haftalık toplantılar içerik planının güncellenmesini sağlar. Ayrıca onay süreçlerinin net olması, yayınların gecikmesini engeller. Markalar, ajans ile çalışırken net bir brief ve revizyon takvimi belirlediğinde süreç daha hızlı ilerler.

## Sık yapılan hatalar ve çözüm önerileri
Planlı içerik üretimi yapılmadığında ekipler aynı konuyu tekrar eder ve takipçiler içerikten sıkılır. Bunun yerine içerik türlerini çeşitlendirmek, markanın her yönünü anlatır. Bir diğer hata da hedef kitleyi yalnızca demografik verilerle sınırlamaktır. Kullanıcıların davranışsal verileri ve ilgi alanları dikkate alınmadığında içerikler amaçsız kalır. Çözüm için her ay sonunda hedef kitle içgörülerini güncelleyip içerik başlıklarını yeniden düzenlemek gerekir. Ayrıca reklam ve organik içerik ekiplerinin ayrı çalışması, verimsiz kampanyalara yol açar. Tek bir strateji dokümanı kullanmak bu hatayı azaltır.

### Örnek uygulama senaryosu
Antalya’da hizmet veren bir işletme için ilk ay farkındalık odaklı içerikler planlanır, ikinci ay ise dönüşüm çağrıları artırılır. Bu süreçte her hafta 2 adet kısa video, 1 adet vaka çalışması ve 1 adet sosyal kanıt paylaşımı yapılır. Kampanya sonunda form doldurma sayısı artarsa, aynı formatlar ölçeklendirilir. Eğer dönüşüm düşükse, CTA’lar ve hedefleme yeniden değerlendirilir. Bu tarz iteratif yaklaşım, kaynakların doğru kullanıldığını gösterir.

### Uzun vadeli büyüme perspektifi
Kısa vadeli kampanyalar markayı hızla öne çıkarabilir; ancak sürdürülebilir büyüme için düzenli içerik, doğru hedefleme ve marka kimliği şarttır. 6 aylık ve 12 aylık planlar oluşturmak, sezonsal hareketleri yönetmeyi kolaylaştırır. Bu perspektif, markanın sadece dönemsel değil, kalıcı bir büyüme grafiği çizmesini sağlar.`;
};

const blogPosts = [
  {
    id: "blog-1",
    title: "2026’da Sosyal Medya Yönetimi: Antalya’da İşletmeler İçin Yol Haritası",
    slug: "2026da-sosyal-medya-yonetimi",
    excerpt: "2026 trendleri, Antalya işletmeleri için içerik ve reklam yol haritası.",
    category: "Sosyal Medya",
    focusKeyword: "Antalya sosyal medya yönetimi",
    metaTitle: "2026’da Sosyal Medya Yönetimi | Göre Medya Ajans",
    metaDescription: "Antalya işletmeleri için 2026 sosyal medya yönetimi stratejileri ve yol haritası.",
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-05",
    content: extendContent(`## 2026 trendlerini okumak neden kritik?
Antalya gibi rekabeti yüksek bir şehirde sosyal medya artık yalnızca paylaşım yapmak değil, markayı veriyle büyütmektir. 2026’da algoritmalar daha fazla etkileşim, daha fazla özgünlük ve daha fazla topluluk odaklı içerik bekliyor. İşletmelerin pazarlama bütçeleri verimlilik odaklı olduğundan, her paylaşımın ticari hedefle ilişkili olması gerekiyor. Bu yüzden **Sosyal Medya Yönetimi** hizmeti artık pazarlama departmanının ayrılmaz parçası haline geliyor.

### Antalya işletmeleri için yeni beklentiler
Turizm, sağlık ve hizmet sektöründe faaliyet gösteren markalar için içerik takvimleri sezon odaklı hazırlanmalı. Kış döneminde sadakat ve tekrar ziyaret hedefi, yaz döneminde ise hızlı rezervasyon ve satış hedefi öncelik kazanıyor. Antalya’da marka olmak, yalnızca var olmak değil, her mecrada net bir marka sesi kullanmayı gerektiriyor.

## Strateji: Hedef kitleyi yeniden tanımla
Hedef kitle artık yalnızca yaş ve lokasyonla sınırlı değil. İlgi alanları, satın alma niyeti ve kısa video tüketim alışkanlıkları planın içine dahil edilmeli. Sosyal medya yönetiminde segment bazlı içerik kümeleri oluşturmak, her paylaşımın belirli bir hedefi taşımasını sağlar. Örneğin **/hizmetler/sosyal-medya-yonetimi** sayfasındaki yaklaşımımızda, içerik kümeleri marka bilinirliği, etkileşim ve dönüşüm olarak ayrılır.

### İçerik planı oluşturmanın 3 ana direği
1) Hikaye anlatımı: Markanın geçmişi, ekibi ve müşteri deneyimleri anlatılır.
2) Fayda odaklı içerik: Ürün veya hizmetin sorun çözen yönü öne çıkarılır.
3) Dönüşüm odaklı içerik: Reklam kampanyası veya rezervasyon çağrısı içerir.

## 2026 formatları: Kısa video, canlı yayın ve mikro içerik
2026’da kısa video formatı hâlâ lider ancak içerik üreticilerinden daha fazla özgünlük bekleniyor. Antalya işletmeleri için sahne arkası, ekip çalışması ve müşteri deneyimleri içerikleri büyük avantaj sağlıyor. Canlı yayınlar, özellikle turizm ve sağlık sektöründe güven oluşturuyor. Mikro içerikler ise sık paylaşımlar için zaman kazandırıyor.

### Reels ve TikTok stratejisi
Kısa videolarda 3 saniye kuralı daha da kritik. İlk 3 saniyede merak uyandıran başlık ve güçlü bir görsel kullanmalısınız. Sonunda net bir CTA eklemek satışa giden yolu kısaltır. CTA örnekleri: “Rezervasyon için DM”, “Bugün avantajlı fiyatları kaçırma”.

## Performans reklamlarının yeni rolü
Meta ve Google Ads kampanyaları artık yalnızca reklam değil, içerik test laboratuvarı. A/B testleriyle hangi görselin daha iyi performans verdiğini ölçmek, organik içerik stratejisine de yön verir. **Reklam Çalışmaları** hizmetimiz bu testleri aylık planlara entegre eder.

### Bütçe planlaması
2026’da bütçe planlaması üç parçaya ayrılır: içerik üretim bütçesi, yayın bütçesi ve optimizasyon bütçesi. Böylece kampanya içinde beklenmedik performans düşüşleri daha hızlı toparlanır.

## KPI ve raporlama
Her ay sonunda erişim, etkileşim, tıklama ve dönüşüm verileri raporlanmalı. Raporlar sadece rakam değil, neden-sonuç ilişkisini açıklayan içgörüler içermelidir. Yöneticilerin hızlı karar alması için özet sayfalar hazırlamak önemlidir.

### Antalya işletmeleri için aksiyon planı
- Sezon bazlı içerik takvimi oluşturun.
- Hedef kitle segmentlerini yeniden tanımlayın.
- Kısa videolar için aylık prodüksiyon planı hazırlayın.
- Performans reklamlarında mikro testler yapın.
- Aylık raporlarla stratejiyi güncelleyin.

## Sonuç
2026’da sosyal medya yönetimi, Antalya işletmeleri için yalnızca görünürlük değil, doğrudan gelir artışı anlamına geliyor. Strateji + kreatif + performans üçlüsünü aynı anda yönetmek, işletmeleri rakiplerinin önüne geçirir.`, "Sosyal medya yönetimi", "sosyal-medya-yonetimi")
  },
  {
    id: "blog-2",
    title: "Reels ile Satış Artırma: Kanca, CTA ve İçerik Planı",
    slug: "reels-ile-satis-artirma",
    excerpt: "Reels formatında satış artırmak için içerik kanca ve CTA teknikleri.",
    category: "İçerik",
    focusKeyword: "reels satış artırma",
    metaTitle: "Reels ile Satış Artırma | Göre Medya Ajans",
    metaDescription: "Reels içerikleri ile satış artırma stratejisi, kanca ve CTA önerileri.",
    cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-12",
    content: extendContent(`## Reels satış için neden güçlü?
Kısa video içerikler, mobil kullanıcıların karar verme süresini kısaltır. Reels, Instagram’ın algoritmik desteğiyle yeni kitlelere ulaşmak için en hızlı formatlardan biri haline geldi. Bu nedenle satış artırmak isteyen markalar, Reels’i yalnızca trendi takip etmek için değil, belirli bir satış hedefini desteklemek için kullanmalı.

### Kanca: İlk 2 saniyenin gücü
Kanca, izleyicinin videoyu izlemeye devam etmesini sağlar. Kanca bir soru, hızlı bir sonuç veya şaşırtıcı bir veri olabilir. Örneğin: “Bu 3 reklam kancasını kullandık ve satışlarımız %40 arttı.” İzleyici ilk saniyede neden izlemeye devam etmesi gerektiğini anlamalıdır.

## CTA: Sözlü değil görsel de olmalı
CTA (Call to Action) sadece sözlü değil, görsel olarak da desteklenmeli. Ekranın altında “DM gönder”, “Siteye git” gibi ifadeler kullanmak dönüşüm oranını artırır. **/hizmetler/reklam-calismalari** sayfasında kullandığımız kampanya kurgusu, CTA’ları funnel içinde konumlandırır.

### Satış için 3 Reels formatı
1) Öncesi/Sonrası: Ürünün veya hizmetin etkisini hızlıca gösterir.
2) Mini eğitim: 30 saniyelik hızlı ipuçları güven oluşturur.
3) Müşteri görüşü: Sosyal kanıt, karar süresini kısaltır.

## İçerik planı nasıl yapılır?
Reels planı haftalık olarak hazırlanmalı ve her hafta 2-3 satış odaklı içerik içermelidir. İçerik takviminde bir gün kanca içeriği, bir gün fayda içeriği, bir gün kampanya içeriği kullanılabilir. Bu plan, performans reklamlarıyla birlikte çalıştığında satışa doğrudan katkı sağlar.

### Kullanılabilir içerik örnekleri
- “Bu ürün 5 dakikada nasıl kullanılır?”
- “Hızlı sonuç almak için 3 ipucu”
- “Müşterilerimizin en çok sorduğu soru”

## Prodüksiyon kalitesi
Reels içerikleri için yüksek prodüksiyon şart değil ancak net görüntü, temiz ses ve istikrarlı kurgu gereklidir. Mobil izleme alışkanlığı düşünüldüğünde, altyazı kullanımı izlenme süresini artırır. **Prodüksiyon** hizmetiyle hızlı çekim planları oluşturmak satışa hazır içerik üretimini hızlandırır.

### Reklam ile destekleme
Reels içerikleri reklamla desteklenirse etkileşim hızla artar. Öne çıkarılmış Reels kampanyaları, satış hedefli reklam setlerine dönüştürülmelidir.

## Satışa dönüşüm ölçümü
Sadece görüntülenme sayısı değil, tıklama ve satın alma verileri ölçülmelidir. Bu nedenle UTM kodları ve dönüşüm pikseli kurulumu önemlidir. Aylık raporlamada Reels’in satış etkisi detaylı şekilde izlenir.

## Sonuç
Reels içerikleri, doğru kanca, net CTA ve planlı bir içerik takvimiyle satışları artırmanın en hızlı yollarından biridir.`, "Reels içerik stratejisi", "reklam-calismalari")
  },
  {
    id: "blog-3",
    title: "Marka Kimliği Nedir? Kurumsal Görünüm Nasıl Güçlenir?",
    slug: "marka-kimligi-nedir",
    excerpt: "Marka kimliği, kurumsal görünüm ve güven oluşturma stratejileri.",
    category: "Markalaşma",
    focusKeyword: "marka kimliği",
    metaTitle: "Marka Kimliği Nedir? | Göre Medya Ajans",
    metaDescription: "Kurumsal görünüm nasıl güçlenir? Marka kimliği oluşturma adımları.",
    cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-18",
    content: extendContent(`## Marka kimliği: görünenden fazlası
Marka kimliği, bir markanın müşterilerinin zihninde bıraktığı duygu ve algının tasarlanmış halidir. Logo, renk paleti, tipografi ve dil bir bütün olarak çalışır. Kurumsal görünüm, müşterinin marka ile ilk temasında güven oluşturur.

### Kurumsal görünümü güçlendiren adımlar
1) Net bir marka vaadi belirleyin.
2) Görsel dilinizi tutarlı kullanın.
3) Tüm dijital kanallarda aynı üslubu koruyun.

## Renk ve tipografi
Renkler, markanın kişiliğini taşır. Göre Medya Ajans olarak minimal ve premium hissi desteklemek için siyah-beyaz ve vurgu rengi kullanırız. Tipografi, okunabilirlik ve prestij algısı oluşturur. Bu nedenle modern fontlar tercih edilir.

### Logo sistemleri
Logo yalnızca tek bir formdan oluşmamalı; dikey, yatay ve ikon versiyonları hazırlanmalıdır. Bu sayede sosyal medya, web ve basılı materyallerde tutarlılık sağlanır.

## Marka tonu ve iletişim dili
Marka dili, hedef kitlenin kendini yakın hissettiği bir ses tonudur. Resmi, samimi veya premium ton belirlenmeli ve tüm içeriklerde aynı ton kullanılmalıdır. Bu, marka güvenini doğrudan artırır.

### İçerik ve marka kimliği ilişkisi
İçerik planları marka kimliğini desteklemelidir. Örneğin lüks bir otel markası, minimal ve yüksek kaliteli görseller kullanmalı. **/hizmetler/grafik-tasarim** sayfasında açıklanan tasarım süreçleri bu tutarlılığı sağlar.

## Kurumsal görünüm için strateji
Kurumsal görünüm yalnızca logo değiştirmek değildir. Web sitesi tasarımı, sosyal medya şablonları, e-posta imzası gibi tüm temas noktaları yenilenmelidir. Bu yüzden marka tanıtımı hizmeti, aynı zamanda görsel güncellemeyi de içerir.

### Marka algısını güçlendirme yolları
- Müşteri yorumlarını görsel formatta paylaşmak
- Tutarlı sosyal medya şablonları kullanmak
- Profesyonel fotoğraf çekimleriyle kalite algısını artırmak

## Sonuç
Güçlü bir marka kimliği, hedef kitlenin güvenini kazanır ve satışa giden yolu kısaltır. Kurumsal görünümü güçlendirmek için tasarım, içerik ve iletişim dili birlikte ele alınmalıdır.`, "Marka kimliği", "marka-tanitimi")
  },
  {
    id: "blog-4",
    title: "Google Ads mi Meta Ads mi? Hangi İşletmeye Hangisi?",
    slug: "google-ads-mi-meta-ads-mi",
    excerpt: "Google Ads ve Meta Ads farkları, işletme türlerine göre öneriler.",
    category: "Reklam",
    focusKeyword: "google ads mi meta ads mi",
    metaTitle: "Google Ads mi Meta Ads mi? | Göre Medya Ajans",
    metaDescription: "Google Ads ve Meta Ads arasındaki farklar, hangi işletmeye hangisi uygun?",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-25",
    content: extendContent(`## Reklam platformu seçimi neden kritik?
Her işletmenin müşteri kazanma yolculuğu farklıdır. Google Ads, niyet bazlı aramalarda güçlüdür; Meta Ads ise hedef kitleyi ilgi alanlarına göre yakalar. Bu nedenle sektör, ürün fiyatı ve satın alma süresi seçimde belirleyicidir.

### Google Ads ne zaman güçlü?
Hizmet veya ürününüz arama ihtiyacına dayalıysa Google Ads yüksek dönüşüm sağlar. Örneğin “Antalya diş kliniği” aramasında görünmek, doğrudan randevu getirebilir. Bu, sağlık ve hizmet sektörlerinde oldukça etkilidir.

### Meta Ads ne zaman öne çıkar?
Meta Ads, marka bilinirliği ve geniş kitle erişiminde güçlüdür. Özellikle lifestyle, turizm ve e-ticaret markaları için görsel ağırlıklı kampanyalar, hızlı etkileşim sağlar.

## İki platformu birlikte kullanmak
Birçok işletme için en iyi seçenek hibrit stratejidir. Meta Ads ile marka bilinirliği oluşturulur, Google Ads ile dönüşüm sağlanır. **/hizmetler/reklam-calismalari** sayfasında, bu iki platformun bütçe dağılımını nasıl planladığımız detaylı şekilde anlatılır.

### Bütçe planlama örneği
Toplam bütçenin %60’ı Google Ads’e, %40’ı Meta Ads’e ayrılabilir. Ancak marka yeni ise Meta Ads oranı yükseltilebilir.

## KPI ve hedefler
Google Ads için tıklama başı maliyet (CPC) ve dönüşüm oranı, Meta Ads için erişim ve dönüşüm maliyeti takip edilmelidir. Hedef netleştikçe platform seçimi daha kolay olur.

## Sonuç
Doğru platform, hedef kitle ve ürünün karar süresine göre belirlenir. Google Ads dönüşüm odaklı, Meta Ads ise bilinirlik ve etkileşim odaklı çalışır. En iyi sonuç, iki platformun stratejik kombinasyonudur.`, "Reklam platformu seçimi", "reklam-calismalari")
  },
  {
    id: "blog-5",
    title: "Kurumsal Web Sitesi SEO Temelleri: Hız, Yapı, İçerik",
    slug: "kurumsal-web-sitesi-seo-temelleri",
    excerpt: "Kurumsal web sitelerinde SEO’nun temel unsurları ve uygulama adımları.",
    category: "SEO",
    focusKeyword: "kurumsal web sitesi seo",
    metaTitle: "Kurumsal Web Sitesi SEO Temelleri | Göre Medya Ajans",
    metaDescription: "Hız, teknik yapı ve içerik optimizasyonuyla SEO temelleri.",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-02-01",
    content: extendContent(`## SEO neden web sitesinin kalbidir?
Kurumsal web sitesi, markanın dijital vitrini olduğu kadar satış kanalıdır. SEO, bu vitrinin görünür olmasını sağlar. Hızlı açılan, doğru yapılandırılmış ve kaliteli içerik sunan siteler arama motorlarında öne çıkar.

### Hız optimizasyonu
Sayfa yüklenme süresi 3 saniyeyi geçtiğinde kullanıcıların büyük bölümü sayfayı terk eder. Bu nedenle görsel optimizasyonu, lazy loading ve önbellekleme stratejileri uygulanmalıdır.

## Teknik yapı
SEO dostu URL’ler, doğru başlık hiyerarşisi (H1-H2-H3) ve mobil uyumluluk kritik unsurlardır. Ayrıca schema.org yapılandırmaları, arama motorlarının içeriği daha iyi anlamasını sağlar.

### İçerik optimizasyonu
İçerik yalnızca anahtar kelimeden ibaret değildir. Kullanıcıya değer sağlayan, sorulara net cevap veren içerikler Google sıralamasında avantaj sağlar. Örneğin **/hizmetler/web-site-tasarimi** sayfasında, içerik yapısının SEO’ya etkisi anlatılır.

## Blog ve içerik stratejisi
Kurumsal web sitesinde düzenli blog yazısı yayınlamak, SEO için sürdürülebilir bir yöntemdir. İçerikler sektörün sorunlarına çözüm sunmalı ve kullanıcıyı bir sonraki adıma yönlendirmelidir.

### Ölçümleme
SEO performansı Google Search Console ve Analytics ile takip edilmelidir. En çok trafik alan sayfalar güncellenmeli, düşük performanslı sayfalar iyileştirilmelidir.

## Sonuç
SEO, hız, yapı ve içerik üçlüsüyle güçlenir. Bu üç alanı birlikte optimize etmek, kurumsal web sitesini rekabette öne çıkarır.`, "SEO temelleri", "web-site-tasarimi")
  },
  {
    id: "blog-6",
    title: "Ajansla Çalışırken Brief Nasıl Hazırlanır?",
    slug: "ajansla-calisirken-brief",
    excerpt: "Ajansla çalışırken etkili brief hazırlama ve süreç yönetimi.",
    category: "Strateji",
    focusKeyword: "ajans brief hazırlama",
    metaTitle: "Ajansla Çalışırken Brief Nasıl Hazırlanır? | Göre Medya Ajans",
    metaDescription: "Brief hazırlarken dikkat edilmesi gerekenler ve örnek yapı.",
    cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-02-08",
    content: extendContent(`## Brief neden önemlidir?
Brief, ajans ile marka arasında ortak hedefi netleştiren belgedir. Doğru brief hazırlanmadan başlayan projeler, zaman ve bütçe kaybına yol açar.

### Brief içinde olması gerekenler
- Marka geçmişi ve hedefleri
- Hedef kitle profili
- Rakipler ve örnek işler
- Beklenen çıktılar ve süre

## Hedef netliği
Brief’te hedef açık ve ölçülebilir olmalıdır. Örneğin “sosyal medya büyüsün” yerine “3 ayda %20 takipçi artışı” hedefi daha sağlıklıdır.

### Ajansın soruları
Ajans, brief sırasında ekstra sorular sorabilir. Bu süreç proje kalitesini artırır. **/hizmetler/marka-tanitimi** gibi hizmetlerde detaylı brief, sonuçları doğrudan etkiler.

## Süreç yönetimi
Brief sonrası toplantı ve onay süreçleri netleştirilmelidir. Böylece revizyonlar kontrollü ilerler.

## Sonuç
İyi hazırlanmış brief, ajans ile markanın aynı hedefte buluşmasını sağlar ve proje sürecini hızlandırır.`, "Brief hazırlama", "marka-tanitimi")
  },
  {
    id: "blog-7",
    title: "Fotoğraf Çekimi ile Güven Artırma: Ürün, Mekân, Portre",
    slug: "fotograf-cekimi-ile-guven",
    excerpt: "Profesyonel fotoğraf çekimi ile güven algısı oluşturma.",
    category: "Prodüksiyon",
    focusKeyword: "fotoğraf çekimi güven",
    metaTitle: "Fotoğraf Çekimi ile Güven Artırma | Göre Medya Ajans",
    metaDescription: "Ürün, mekan ve portre fotoğraf çekimleriyle güven artırma stratejileri.",
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-02-15",
    content: extendContent(`## Güven algısı neden görselden başlar?
Müşteriler markayla ilk teması çoğunlukla görseller üzerinden kurar. Ürün, mekan ve portre fotoğrafları güvenin temelidir. Profesyonel fotoğraf çekimi, markanın kalitesini ve şeffaflığını ortaya koyar.

### Ürün fotoğrafı
Ürünün detaylarını net gösteren fotoğraflar, satın alma kararını hızlandırır. Doğru ışık ve açı ile çekilmiş fotoğraflar markanın profesyonel olduğu algısını yaratır.

### Mekan fotoğrafı
Restoran, otel ya da klinik gibi işletmeler için mekan fotoğrafı müşterinin beklentisini yönetir. Mekan gerçekçi ama etkileyici görünmelidir.

### Portre çekimleri
Ekip fotoğrafları güveni artırır. Özellikle sağlık ve hizmet sektöründe, müşteriler hizmet veren kişiyi görmek ister. **/hizmetler/fotograf-cekimi** hizmetimiz bu ihtiyaçlara odaklanır.

## Fotoğraf çekiminde strateji
- Marka tonu ile uyumlu renk paleti seçin.
- Doğal ışık ve gerçek mekan kullanın.
- Görselleri sosyal medya ve web için farklı formatlarda hazırlayın.

## Sonuç
Profesyonel fotoğraf çekimi, müşteride güven oluşturur ve markanın değer algısını yükseltir.`, "Fotoğraf çekimi", "fotograf-cekimi")
  },
  {
    id: "blog-8",
    title: "Prodüksiyon Süreci: Senaryo–Çekim–Kurgu–Yayın",
    slug: "produksiyon-sureci",
    excerpt: "Video prodüksiyon sürecinin tüm adımları ve dikkat edilmesi gerekenler.",
    category: "Prodüksiyon",
    focusKeyword: "prodüksiyon süreci",
    metaTitle: "Prodüksiyon Süreci | Göre Medya Ajans",
    metaDescription: "Senaryo, çekim, kurgu ve yayın süreçlerinde dikkat edilmesi gerekenler.",
    cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-02-22",
    content: extendContent(`## Prodüksiyon sürecine genel bakış
Prodüksiyon, fikrin videoya dönüşme yolculuğudur. Senaryo, çekim, kurgu ve yayın adımlarından oluşur. Her adım bir öncekinin başarısına bağlıdır.

### Senaryo hazırlığı
Senaryo, videonun omurgasıdır. Mesajı net bir şekilde taşımalı ve izleyiciyi aksiyona yönlendirmelidir.

### Çekim planı
Çekim günü, zaman yönetimi kritik hale gelir. Lokasyon, ekipman ve ışık planlaması yapılmalıdır. **/hizmetler/produksiyon** sayfasında süreç detayları yer alır.

### Kurgu ve post-prodüksiyon
Kurguda ritim, müzik ve renk düzenleme büyük fark yaratır. Kısa videolar için dinamik kurgu tercih edilir.

### Yayın stratejisi
Video yayınlandığında dağıtım planı hazırlanmalıdır. YouTube, Instagram ve web sitesi gibi farklı kanallarda optimize edilmelidir.

## Sonuç
Prodüksiyon süreci planlı ilerlerse, marka mesajı güçlü bir şekilde aktarılır ve yatırım geri dönüşü artar.`, "Prodüksiyon yönetimi", "produksiyon")
  },
  {
    id: "blog-9",
    title: "Yerel SEO: Google Business Profile ile Haritalarda Yükselme",
    slug: "yerel-seo-google-business-profile",
    excerpt: "Google Business Profile optimizasyonu ile haritalarda görünürlüğü artırma.",
    category: "SEO",
    focusKeyword: "yerel seo",
    metaTitle: "Yerel SEO: Google Business Profile | Göre Medya Ajans",
    metaDescription: "Haritalarda üst sıralar için Google Business Profile optimizasyonu.",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-03-01",
    content: extendContent(`## Yerel SEO neden önemli?
Yerel işletmeler için Google haritalarda üst sıralarda görünmek, müşteri trafiğini artırır. Google Business Profile optimizasyonu bu sürecin temelidir.

### Profil optimizasyonu
Profilde doğru kategori seçimi, açıklama ve hizmet ekleme adımları kritik rol oynar. İşletme fotoğrafları güncel olmalı ve müşteri yorumlarına hızlı dönüş yapılmalıdır.

### Yorum yönetimi
Olumlu yorumlar hem güven artırır hem de sıralamayı iyileştirir. Müşterileri yorum bırakmaya teşvik etmek için kısa mesajlar ve takip e-postaları kullanılabilir.

### İçerik güncellemeleri
Google Business Profile üzerinden haftalık güncellemeler paylaşmak, hesabın aktif görünmesini sağlar. Bu içerikler etkinlik, kampanya veya yeni ürün duyurusu olabilir.

## Yerel SEO ve web sitesi ilişkisi
Google Business Profile, web sitesiyle uyumlu çalışmalıdır. Web sitesindeki NAP (name-address-phone) bilgileri tutarlı olmalıdır.

## Sonuç
Yerel SEO çalışması, işletmelerin haritalarda görünürlüğünü artırır ve fiziksel ziyaretleri yükseltir.`, "Yerel SEO stratejisi", "web-site-tasarimi")
  },
  {
    id: "blog-10",
    title: "Aylık İçerik Planı Nasıl Yapılır? Örnek Takvim ve Şablonlar",
    slug: "aylik-icerik-plani",
    excerpt: "Aylık içerik planı hazırlama, örnek takvim ve şablon önerileri.",
    category: "İçerik",
    focusKeyword: "aylık içerik planı",
    metaTitle: "Aylık İçerik Planı Nasıl Yapılır? | Göre Medya Ajans",
    metaDescription: "Aylık içerik planı için örnek takvim, şablon ve ipuçları.",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-03-10",
    content: extendContent(`## Aylık içerik planı neden şart?
Düzenli içerik paylaşımı marka güveni oluşturur ve algoritmik görünürlüğü artırır. Aylık plan, ekiplerin net çalışmasını sağlar.

### İçerik takvimi oluşturma
Öncelikle hedefler belirlenmeli, ardından içerik türleri seçilmelidir. Örnek olarak haftada 2 eğitim, 1 kampanya, 1 sosyal kanıt içeriği planlanabilir.

### Şablon ve format seçimi
Her içerik türü için şablonlar oluşturmak üretim süresini kısaltır. **/hizmetler/grafik-tasarim** hizmetimiz bu şablonları markaya özel tasarlar.

### Takvim örneği
- Pazartesi: Eğitim
- Çarşamba: Müşteri hikayesi
- Cuma: Kampanya
- Pazar: Ekibin sahne arkası

## Performans takibi
Planın etkisi haftalık ölçülmeli ve başarı getiren içerikler tekrar edilmelidir.

## Sonuç
Aylık içerik planı, markanın düzenli ve stratejik iletişim kurmasını sağlar.`, "İçerik planlama", "grafik-tasarim")
  }
];

function readingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.max(5, Math.round(words / 200));
}

const normalizedBlog = blogPosts.map((post) => ({
  ...post,
  readingTime: readingTime(post.content)
}));

const data = {
  services,
  portfolio,
  blog: normalizedBlog,
  leads: [],
  logos,
  settings
};

const outputPath = path.resolve(__dirname, "../data/db.json");
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log("Seed data generated.");
