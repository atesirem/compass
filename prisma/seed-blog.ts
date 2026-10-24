// Creates the starter blog posts if they are missing (never overwrites edits). Run: npm run db:seed-blog
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const posts = [
  {
    slug: "c24-ile-banka-hesabi-deneyimim",
    locale: "tr",
    kind: "EXPERIENCE" as const,
    status: "DRAFT" as const,
    title: "Almanya'da ilk banka hesabım: C24 deneyimim",
    summary: "Anmeldung'dan sonra C24 ile uygulama üzerinden hesap açtım. Hangi belgeler gerekti, ne kadar sürdü, nelere dikkat ederdim?",
    authorName: "Pusula",
    tags: ["banka", "c24", "ilk-haftalar"],
    guideSlug: "open-bank-account",
    bodyMarkdown: `Almanya'ya geldikten sonra en çok aradığım şey bir IBAN'dı: ev sahibi, işveren ve sigorta için hepsi bir Alman hesabı istiyor. Bu yazıda **C24** ile hesap açma deneyimimi anlatıyorum. Bu bir kişisel deneyimdir; genel kural değildir.

## Neden C24?
- Tamamen dijital: şubeye gitmek ve randevu beklemek yok.
- Uygulama Almanca ve İngilizce; Türkçe arayüz yok.
- Girokonto için aylık hesap ücreti ödemedim.
TODO: C24'ün güncel fiyat ve koşul sayfasından (ücret, kart türü, faiz, cashback) doğrula ve kontrol tarihini yaz.

## Hesabı ne zaman ve hangi belgelerle açtım?
TODO: Hesabı hangi ay/yıl açtığını yaz.
TODO: Elinde hangi belgeler vardı (pasaport, vize, Meldebescheinigung, oturum kartı)? Hangisi "ikamet belgesi" olarak kabul edildi?

## Adım adım
1. Önce **Anmeldung**'u yaptım; resmi adres kaydı olmadan hesap açılamadı.
2. Uygulamayı indirip başvuruyu doldurdum.
3. Pasaportumu ve ikamet belgemi yükleyip online kimlik doğrulamasını tamamladım. Toplam yaklaşık 10-15 dakika sürdü; şubeye gitmedim.
TODO: Kimlik doğrulama yöntemi neydi (görüntülü görüşme, Veriff, başka)?
4. Fiziksel kart hızlı geldi; Apple Pay ilk günden sorunsuz çalıştı.
TODO: Kartın kaç günde geldiğini yaz.

## Başka banka denedim mi?
TODO: N26, Sparkasse veya başka bir banka denediysen sonucu ve nedenini yaz; denemediysen bu bölümü sil.

## Neye dikkat ederdim?
- Gelir gelmez önce Anmeldung'u halletmek, sonra hesap açmak mantıklı.
- Geleneksel bankalarda randevu beklemek vakit kaybettirebilir; dijital banka daha hızlı oldu.
- Bankaların koşulları sık değişir. Başvurmadan önce bankanın kendi sayfasından AB dışı müşteri koşullarına bak.
- Hesap açılmazsa pes etme: tüketiciler için **temel hesap (Basiskonto)** hakkı var; ayrıntılar için rehbere bak.

*Bu yazı genel bilgi ve kişisel deneyimdir; finansal veya hukuki danışmanlık değildir.*`,
  },
];

async function main() {
  for (const p of posts) {
    const exists = await db.post.findUnique({ where: { slug: p.slug } });
    if (exists) continue;
    await db.post.create({ data: p });
    console.log(`created post ${p.slug}`);
  }
}

main().finally(() => db.$disconnect());
