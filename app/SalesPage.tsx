"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  window.gtag?.("event", eventName, parameters);
};

type IconName =
  | "arrow-right"
  | "bar-chart-2"
  | "book-open"
  | "check-circle"
  | "chevron-down"
  | "clock"
  | "credit-card"
  | "download"
  | "eye"
  | "file-text"
  | "lock"
  | "message-circle"
  | "package"
  | "percent"
  | "send"
  | "shield"
  | "smartphone"
  | "star"
  | "target"
  | "tool"
  | "x"
  | "zap";

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={`icon ${className}`}
      height={size}
      src={assetPath(`/assets/${name}.svg`)}
      width={size}
    />
  );
}

const books = [
  {
    id: "traffic",
    number: "01",
    title: "Toko Ramai Bukan Keberuntungan.",
    eyebrow: "Traffic & konversi",
    pages: "22 halaman",
    value: "Rp249.000",
    cover: assetPath("/assets/cover-toko-ramai-edisi-baru.png"),
    color: "blue",
    promise:
      "Membaca CTR, ATC, dan CVR agar kamu tahu apa yang harus dibenahi—bukan sekadar menambah budget.",
    bullets: [
      "Rapor kesehatan toko dan urutan diagnosis",
      "Checklist listing, traffic gratis, affiliate, LIVE, dan iklan",
      "Prompt AI siap salin + rutinitas optimasi 15 menit",
    ],
  },
  {
    id: "margin",
    number: "02",
    title: "Harga Untung Bukan Tebakan.",
    eyebrow: "Harga & laba",
    pages: "20 halaman",
    value: "Rp149.000",
    cover: assetPath("/assets/cover-harga-untung-edisi-baru.png"),
    color: "teal",
    promise:
      "Mengubah HPP, potongan platform, iklan, dan biaya operasional menjadi harga serta batas ROAS yang masuk akal.",
    bullets: [
      "Lembar kerja riset harga kompetitor",
      "Rumus harga coret, harga jual, dan batas bawah ROAS",
      "Cara membaca laba per pesanan, bukan omzet saja",
    ],
  },
  {
    id: "reviews",
    number: "03",
    title: "Bintang Lima Bukan Kebetulan.",
    eyebrow: "Ulasan & kepercayaan",
    pages: "12 halaman",
    value: "Rp99.000",
    cover: assetPath("/assets/cover-bintang-lima-edisi-baru.png"),
    color: "wine",
    promise:
      "Membangun ulasan berkualitas dan membalas komplain dengan sistem yang bisa dipakai berulang.",
    bullets: [
      "Cara kerja Hadiah Penilaian Shopee",
      "Strategi ulasan terverifikasi tanpa joki atau pesanan fiktif",
      "Template balasan bintang lima dan ulasan bermasalah",
    ],
  },
] as const;

const previews = [
  {
    image: assetPath("/assets/preview-bukti.png"),
    label: "Bukti, bukan janji",
    detail: "Kasus nyata omzet naik saat biaya iklan turun.",
    tag: "Cuplikan asli",
  },
  {
    image: assetPath("/assets/preview-roas.png"),
    label: "Batas ROAS",
    detail: "Lihat titik sehat, tipis, impas, dan rugi.",
    tag: "Cuplikan asli",
  },
  {
    image: assetPath("/assets/preview-prompt.png"),
    label: "Prompt siap pakai",
    detail: "Strukturnya terlihat; isi lengkap khusus untuk pembeli.",
    tag: "Isi dirahasiakan",
  },
  {
    image: assetPath("/assets/preview-template.png"),
    label: "Template balasan",
    detail: "Bukan teori—tinggal sesuaikan dan kirim.",
    tag: "Cuplikan asli",
  },
] as const;

const testimonials = [
  {
    quote:
      "Saya tadinya ragu karena sudah pernah beli produk tutorial, tapi baru kali ini dibantu after sales. Saya hemat biaya iklan lebih dari 2 juta rupiah.",
    name: "Dany P.",
    role: "Partner kerja · Tangerang",
    icon: "bar-chart-2",
  },
  {
    quote:
      "Thank you, Ibnu. God bless you. This is very helpful, bahkan aku sampai kasih ke adminku langsung dan mudah dipahami. ROAS 30 hari naik 15% 👍",
    name: "Najwa T.",
    role: "Partner kerja · Bandung",
    icon: "percent",
  },
  {
    quote:
      "Aku baru buka toko 1 bulan, nggak sengaja lewatin akun Bang Ibnu di TikTok. Pesanan aku dari 1–5 paket sehari jadi 20–30 paket setelah 2 minggu. Thank you bantuannya. 🙏",
    name: "Hesti A.",
    role: "Partner kerja · Jakarta",
    icon: "message-circle",
  },
] as const;

const focusOptions = {
  sepi: {
    label: "Toko sepi / traffic tidak jadi order",
    title: "Mulai dari Toko Ramai.",
    description:
      "Baca rapor kesehatan toko, cek CTR–ATC–CVR, lalu ikuti urutan perbaikan listing sebelum menambah budget.",
    book: "traffic",
  },
  bocor: {
    label: "Omzet ada, tetapi laba tidak terasa",
    title: "Mulai dari Harga Untung.",
    description:
      "Masukkan biaya sebenarnya, temukan batas ROAS, lalu cek apakah harga jualmu masih menyisakan laba.",
    book: "margin",
  },
  ulasan: {
    label: "Produk susah dipercaya / ulasan seret",
    title: "Mulai dari Bintang Lima.",
    description:
      "Bangun ulasan terverifikasi, pilih produk prioritas, dan siapkan respons yang membuat calon pembeli berikutnya tetap percaya.",
    book: "reviews",
  },
} as const;

type FocusKey = keyof typeof focusOptions;

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export function SalesPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [focus, setFocus] = useState<FocusKey>("sepi");
  const [hpp, setHpp] = useState(30000);
  const [sellingPrice, setSellingPrice] = useState(51500);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  const quickScan = useMemo(() => {
    const platformFee = sellingPrice * 0.24;
    const remaining = sellingPrice - platformFee - hpp;
    const margin = sellingPrice > 0 ? (remaining / sellingPrice) * 100 : 0;
    return { platformFee, remaining, margin };
  }, [hpp, sellingPrice]);

  const waMessage = encodeURIComponent(
    `Halo Kak IBNU Project, saya sudah membayar Paket Panduan Shopee Rp47.000 via QRIS.\n\nNama: ${buyerName.trim()}\nEmail (opsional): ${buyerEmail.trim() || "-"}\n\nSaya akan kirim bukti pembayarannya di chat ini. Mohon bantu verifikasi dan kirimkan paket 3 PDF + 1 kalkulatornya secara pribadi. Terima kasih.`,
  );
  const whatsappUrl = `https://wa.me/6283854581787?text=${waMessage}`;
  const questionMessage = encodeURIComponent(
    "Halo Kak IBNU Project, saya ingin tanya tentang Paket Panduan Shopee (3 buku + 1 kalkulator) seharga Rp47.000.",
  );
  const questionWhatsappUrl = `https://wa.me/6283854581787?text=${questionMessage}`;

  useEffect(() => {
    if (!checkoutOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCheckoutOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [checkoutOpen]);

  const openCheckout = () => {
    trackEvent("begin_checkout", {
      currency: "IDR",
      value: 47000,
      items: [{ item_id: "paket-panduan-shopee", item_name: "3 Panduan + 1 Kalkulator" }],
    });
    setPaymentStep(1);
    setCheckoutOpen(true);
  };

  const openQrisStep = () => {
    trackEvent("add_payment_info", {
      currency: "IDR",
      value: 47000,
      payment_type: "QRIS",
    });
    setPaymentStep(2);
  };

  const openPaymentProofStep = () => {
    trackEvent("checkout_step_3", {
      currency: "IDR",
      value: 47000,
      checkout_step: 3,
      step_name: "kirim_bukti",
    });
    setPaymentStep(3);
  };

  const openWhatsappProof = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("generate_lead", {
      currency: "IDR",
      value: 47000,
      method: "whatsapp_payment_proof",
    });
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup) window.location.href = whatsappUrl;
  };

  return (
    <main>
      <div className="top-note">
        <span>54 halaman panduan</span>
        <span>3 buku digital</span>
        <span>1 kalkulator offline</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="IBNU Project, kembali ke atas">
          <span className="brand-mark">I</span>
          <span>
            IBNU <strong>PROJECT</strong>
          </span>
        </a>
        <nav aria-label="Navigasi utama">
          <a href="#isi">Isi paket</a>
          <a href="#cuplikan">Cuplikan</a>
          <a href="#testimoni">Testimoni</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="button button-small" onClick={openCheckout} type="button">
          Beli paket
          <Icon name="arrow-right" size={17} />
        </button>
      </header>

      <section className="hero section" id="top">
        <div className="hero-copy">
          <div className="eyebrow-pill">
            <Icon name="zap" size={16} />
            Paket praktik Shopee 2026
          </div>
          <h1>
            Toko sepi, harga bocor, ulasan seret—
            <em>bereskan dengan sistem.</em>
          </h1>
          <p className="hero-lede">
            Tiga panduan yang menjawab apa yang harus kamu cek, hitung, dan
            lakukan. Ditambah kalkulator margin untuk menentukan harga jual,
            batas aman ROAS, dan apakah angka tokomu benar-benar masih untung.
          </p>

          <div className="hero-offer">
            <div>
              <span className="price-label">Semua isi paket</span>
              <s className="bundle-value">Nilai terpisah Rp596.000</s>
              <strong className="hero-price">Rp47.000</strong>
            </div>
            <div className="offer-divider" />
            <p>
              3 PDF + 1 tool
              <br />
              sekali pembayaran
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="button button-primary button-large"
              data-testid="hero-buy"
              onClick={openCheckout}
              type="button"
            >
              Ambil paket lengkap
              <Icon name="arrow-right" size={20} />
            </button>
            <a className="button button-ghost button-large" href="#cuplikan">
              <Icon name="eye" size={19} />
              Lihat isi dulu
            </a>
          </div>
          <div className="micro-trust">
            <span>
              <Icon name="shield" size={16} /> Bayar via QRIS
            </span>
            <span>
              <Icon name="message-circle" size={16} /> Kirim bukti via WhatsApp
            </span>
            <span>
              <Icon name="download" size={16} /> File setelah verifikasi
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Tiga sampul buku di dalam paket">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <img
            alt="Sampul Toko Ramai Bukan Keberuntungan"
            className="book-cover cover-one"
            src={assetPath("/assets/cover-toko-ramai-edisi-baru.png")}
          />
          <img
            alt="Sampul Harga Untung Bukan Tebakan"
            className="book-cover cover-two"
            src={assetPath("/assets/cover-harga-untung-edisi-baru.png")}
          />
          <img
            alt="Sampul Bintang Lima Bukan Kebetulan"
            className="book-cover cover-three"
            src={assetPath("/assets/cover-bintang-lima-edisi-baru.png")}
          />
          <div className="tool-ticket">
            <Icon name="tool" size={24} />
            <span>
              BONUS TOOL
              <strong>Kalkulator Margin</strong>
            </span>
          </div>
          <div className="value-stamp">
            <span>3 + 1</span>
            paket lengkap
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Ringkasan keunggulan produk">
        <div>
          <Icon name="file-text" size={23} />
          <span>
            <strong>54 halaman</strong>
            padat, bertahap, bisa dicentang
          </span>
        </div>
        <div>
          <Icon name="bar-chart-2" size={23} />
          <span>
            <strong>Angka nyata</strong>
            bukan contoh omzet rekaan
          </span>
        </div>
        <div>
          <Icon name="tool" size={23} />
          <span>
            <strong>Tool offline</strong>
            cek harga, ROAS, dan laba
          </span>
        </div>
        <div>
          <Icon name="check-circle" size={23} />
          <span>
            <strong>Siap praktik</strong>
            prompt, checklist, dan template
          </span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="section-heading">
          <span className="kicker">Tidak harus baca dari halaman pertama</span>
          <h2>Mulai dari masalah yang paling terasa di tokomu.</h2>
          <p>
            Pilih kondisimu. Paket ini memberi jalur baca yang langsung menuju
            keputusan berikutnya.
          </p>
        </div>

        <div className="problem-layout">
          <div className="problem-options" role="list" aria-label="Pilih masalah toko">
            {(Object.keys(focusOptions) as FocusKey[]).map((key, index) => (
              <button
                aria-pressed={focus === key}
                className={`problem-option ${focus === key ? "active" : ""}`}
                key={key}
                onClick={() => setFocus(key)}
                type="button"
              >
                <span>0{index + 1}</span>
                {focusOptions[key].label}
                <Icon name="arrow-right" size={18} />
              </button>
            ))}
          </div>
          <div className="problem-answer" data-testid="problem-answer">
            <span className="answer-label">Jalur tercepatmu</span>
            <h3>{focusOptions[focus].title}</h3>
            <p>{focusOptions[focus].description}</p>
            <a href={`#${focusOptions[focus].book}`}>
              Lihat panduannya <Icon name="arrow-right" size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="case-study section">
        <div className="case-copy">
          <span className="kicker kicker-light">Satu studi kasus di dalam buku</span>
          <h2>Omzet naik. Biaya iklan justru turun.</h2>
          <p>
            Data Mei–Juni 2026 dari satu toko fashion wanita yang dikelola
            penulis. Identitas toko disamarkan; angka dan layar analisisnya
            ditampilkan di dalam panduan.
          </p>
          <div className="case-note">
            <Icon name="shield" size={18} />
            Ini contoh proses dan hasil historis, bukan janji penghasilan.
          </div>
        </div>
        <div className="case-metrics" aria-label="Angka studi kasus">
          <article>
            <span>Omzet toko</span>
            <strong>Rp402,7 jt</strong>
            <Icon name="arrow-right" size={18} />
            <strong className="positive">Rp451,3 jt</strong>
          </article>
          <article>
            <span>Biaya iklan</span>
            <strong>Rp18,4 jt</strong>
            <Icon name="arrow-right" size={18} />
            <strong className="positive">Rp15,5 jt</strong>
          </article>
          <article>
            <span>ROAS toko</span>
            <strong>21,9</strong>
            <Icon name="arrow-right" size={18} />
            <strong className="positive">29,2</strong>
          </article>
        </div>
      </section>

      <section className="section contents-section" id="isi">
        <div className="section-heading heading-row">
          <div>
            <span className="kicker">Isi paket lengkap</span>
            <h2>Tiga hambatan. Tiga panduan. Satu kalkulator.</h2>
          </div>
          <p>
            Masing-masing punya tugas yang berbeda, tetapi semuanya terhubung
            dalam satu alur: tarik pembeli, jaga laba, bangun kepercayaan.
          </p>
        </div>

        <div className="book-list">
          {books.map((book) => (
            <article className={`book-card ${book.color}`} id={book.id} key={book.id}>
              <div className="book-card-number">{book.number}</div>
              <img alt={`Sampul ${book.title}`} loading="lazy" src={book.cover} />
              <div className="book-card-copy">
                <div className="book-meta">
                  <span>{book.eyebrow}</span>
                  <span>{book.pages}</span>
                  <span>Nilai {book.value}</span>
                </div>
                <h3>{book.title}</h3>
                <p>{book.promise}</p>
                <ul>
                  {book.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Icon name="check-circle" size={18} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <article className="calculator-card">
            <div className="calculator-card-copy">
              <div className="book-meta">
                <span>Bonus tool</span>
                <span>Buka langsung di browser</span>
                <span>Nilai Rp99.000</span>
              </div>
              <h3>Kalkulator Margin Shopee.</h3>
              <p>
                Banyak seller tahu omzetnya, tetapi tidak tahu angka jual minimum
                dan titik rugi sebenarnya. Tool ini mengubah semua biaya tokomu
                menjadi keputusan harga yang bisa langsung dipakai.
              </p>
              <ul className="calculator-benefits">
                <li><Icon name="check-circle" size={17} /> Cari harga jual dari HPP dan target margin</li>
                <li><Icon name="check-circle" size={17} /> Temukan batas ROAS sebelum iklan memakan laba</li>
                <li><Icon name="check-circle" size={17} /> Hitung afiliasi, pajak, biaya pesanan, dan operasional</li>
                <li><Icon name="check-circle" size={17} /> Lihat laba bulanan dan kontribusi setiap produk</li>
              </ul>
              <div className="calculator-tags">
                <span>Bebas Akses</span>
                <span>Mudah Pakai</span>
                <span>Tanpa unggah data</span>
              </div>
            </div>
            <div className="calculator-mock" aria-label="Pratinjau kalkulator margin">
              <div className="mock-top">
                <Icon name="percent" size={20} />
                Margin bersih / bulan
              </div>
              <strong>Rp8.482.500</strong>
              <span className="mock-green">Sehat · 8,3%</span>
              <div className="mock-bars">
                <i />
                <i />
                <i />
                <i />
              </div>
              <small>Contoh tampilan. Hasil mengikuti angka yang kamu masukkan.</small>
            </div>
          </article>
        </div>
      </section>

      <section className="section preview-section" id="cuplikan">
        <div className="section-heading heading-row">
          <div>
            <span className="kicker">Buka sedikit sebelum membeli</span>
            <h2>Ini panduan kerja, bukan e-book motivasi.</h2>
          </div>
          <p>
            Tabel, tangkapan layar, prompt, dan template disusun agar kamu bisa
            membaca singkat lalu langsung mengerjakan.
          </p>
        </div>
        <div className="preview-grid">
          {previews.map((preview) => (
            <figure key={preview.label}>
              <div className="preview-image-wrap">
                <img
                  alt={`Cuplikan halaman: ${preview.label}`}
                  loading="lazy"
                  src={preview.image}
                />
                <span>
                  <Icon name="eye" size={15} /> {preview.tag}
                </span>
              </div>
              <figcaption>
                <strong>{preview.label}</strong>
                <span>{preview.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section testimonial-section" id="testimoni">
        <div className="section-heading heading-row">
          <div>
            <span className="kicker">Testimoni teman & partner kerja</span>
            <h2>“Benar-benar kepakai di toko.”</h2>
          </div>
          <p>
            Pengalaman dari orang yang pernah bekerja bersama Ibnu di Jakarta,
            Bandung, dan Tangerang.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="testimonial-card">
              <div className="testimonial-card-top">
                <span className="testimonial-draft-badge">Pengalaman nyata</span>
                <Icon name={testimonial.icon} size={21} />
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="testimonial-person">
                <span aria-hidden="true">{testimonial.name.charAt(0)}</span>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="testimonial-disclaimer testimonial-result-note">
          <Icon name="shield" size={18} />
          <span>
            <strong>Catatan hasil:</strong> setiap toko memiliki produk, biaya,
            pasar, dan kualitas eksekusi yang berbeda. Testimoni adalah pengalaman
            pribadi, bukan jaminan hasil yang sama.
          </span>
        </p>
      </section>

      <section className="section different-section">
        <div className="section-heading">
          <span className="kicker">Dirancang untuk dipakai</span>
          <h2>Nilainya bukan pada “rahasia”. Nilainya pada keputusan.</h2>
        </div>
        <div className="difference-grid">
          <article>
            <Icon name="target" size={28} />
            <span className="difference-old">Bukan sekadar</span>
            <h3>“Optimalkan tokomu.”</h3>
            <p>
              Kamu diberi urutan cek CTR, ATC, CVR, dan traffic—plus tindakan
              saat tiap angka bermasalah.
            </p>
          </article>
          <article>
            <Icon name="percent" size={28} />
            <span className="difference-old">Bukan sekadar</span>
            <h3>“Jangan jual terlalu murah.”</h3>
            <p>
              Kamu menghitung harga, potongan, biaya tetap, afiliasi, iklan,
              dan batas ROAS dari angka nyata.
            </p>
          </article>
          <article>
            <Icon name="star" size={28} />
            <span className="difference-old">Bukan sekadar</span>
            <h3>“Kejar ulasan bintang lima.”</h3>
            <p>
              Kamu mendapat mekanisme, target, prioritas produk, dan template
              respons yang bisa diulang.
            </p>
          </article>
        </div>
      </section>

      <section className="section quick-tool-section">
        <div className="quick-tool-copy">
          <span className="kicker kicker-light">Coba 15 detik</span>
          <h2>Harga jualmu masih punya ruang?</h2>
          <p>
            Harga jual yang terlihat aman bisa tetap rugi setelah potongan,
            iklan, afiliasi, pajak, packing, dan operasional. Teaser ini baru
            menghitung HPP dan contoh potongan platform 24%; kalkulator lengkap
            menyatukan semuanya sebelum kamu memutuskan harga.
          </p>
          <div className="quick-fields">
            <label>
              HPP / modal
              <span className="money-input">
                <span>Rp</span>
                <input
                  aria-label="HPP atau modal produk"
                  inputMode="numeric"
                  min="0"
                  onChange={(event) => setHpp(Number(event.target.value) || 0)}
                  type="number"
                  value={hpp}
                />
              </span>
            </label>
            <label>
              Harga jual
              <span className="money-input">
                <span>Rp</span>
                <input
                  aria-label="Harga jual produk"
                  inputMode="numeric"
                  min="0"
                  onChange={(event) =>
                    setSellingPrice(Number(event.target.value) || 0)
                  }
                  type="number"
                  value={sellingPrice}
                />
              </span>
            </label>
          </div>
        </div>
        <div className="quick-result" aria-live="polite" data-testid="quick-result">
          <span>Sisa sebelum iklan & biaya lain</span>
          <strong className={quickScan.remaining < 0 ? "negative" : ""}>
            {formatRupiah(quickScan.remaining)}
          </strong>
          <div className="quick-result-row">
            <span>Potongan contoh 24%</span>
            <b>-{formatRupiah(quickScan.platformFee)}</b>
          </div>
          <div className="quick-result-row">
            <span>Ruang tersisa</span>
            <b>{quickScan.margin.toFixed(1).replace(".", ",")}%</b>
          </div>
          <p>
            {quickScan.remaining > 0
              ? "Masih positif—tetapi belum termasuk iklan, afiliasi, dan biaya operasional."
              : "Harga ini belum menutup HPP dan contoh potongan platform."}
          </p>
          <button className="text-button" onClick={openCheckout} type="button">
            Saya mau hitung lengkap <Icon name="arrow-right" size={17} />
          </button>
        </div>
      </section>

      <section className="section offer-section" id="beli">
        <div className="offer-card">
          <div className="offer-summary">
            <span className="kicker kicker-light">Satu paket. Satu harga.</span>
            <h2>Berhenti menebak keputusan tokomu.</h2>
            <p>
              Mulai dari panduan yang paling relevan hari ini. Simpan dua
              lainnya untuk masalah berikutnya. Kalkulatornya bisa dipakai
              berulang setiap angka tokomu berubah.
            </p>
            <div className="offer-includes">
              <span>
                <Icon name="book-open" size={18} /> 3 buku digital PDF
              </span>
              <span>
                <Icon name="tool" size={18} /> 1 kalkulator offline
              </span>
              <span>
                <Icon name="percent" size={18} /> Nilai total Rp596.000
              </span>
              <span>
                <Icon name="smartphone" size={18} /> Buka di HP atau laptop
              </span>
              <span>
                <Icon name="message-circle" size={18} /> Bantuan via WhatsApp
              </span>
            </div>
          </div>
          <div className="offer-checkout">
            <div className="checkout-badge">Paket lengkap</div>
            <span>Total pembayaran</span>
            <s className="offer-original-price">Rp596.000</s>
            <strong>Rp47.000</strong>
            <p>Hemat Rp549.000 · tidak ada biaya tersembunyi.</p>
            <button
              className="button button-primary button-large button-block"
              data-testid="offer-buy"
              onClick={openCheckout}
              type="button"
            >
              Bayar aman via QRIS
              <Icon name="arrow-right" size={20} />
            </button>
            <a
              className="whatsapp-question"
              href={questionWhatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              Masih ragu? Tanya dulu via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <span className="kicker">Pertanyaan sebelum membeli</span>
          <h2>Yang perlu kamu tahu.</h2>
        </div>
        <div className="faq-list">
          {[
            {
              question: "Apa yang saya terima setelah membeli?",
              answer:
                "Tiga file PDF—Toko Ramai Bukan Keberuntungan, Harga Untung Bukan Tebakan, dan Bintang Lima Bukan Kebetulan—serta satu file HTML Kalkulator Margin Shopee.",
            },
            {
              question: "Bagaimana cara menerima filenya?",
              answer:
                "Bayar Rp47.000 lewat QRIS, lalu kirim bukti pembayaran ke WhatsApp 0838-5458-1787. Setelah pembayaran diverifikasi admin, keempat file dikirim melalui WhatsApp.",
            },
            {
              question: "Apakah kalkulator perlu di-install?",
              answer:
                "Tidak. Buka file kalkulator langsung lewat browser di HP atau laptop. Tidak perlu akun, tidak perlu koneksi internet, dan data tokomu tidak diunggah ke mana pun.",
            },
            {
              question: "Apakah cocok untuk seller baru?",
              answer:
                "Ya. Penjelasannya bertahap dan ada checklist. Seller yang sudah berjalan juga bisa langsung masuk ke bagian diagnosis angka, struktur harga, atau sistem ulasan.",
            },
            {
              question: "Apakah hasil omzetnya dijamin?",
              answer:
                "Tidak. Angka studi kasus di halaman ini adalah hasil historis satu toko yang dikelola penulis, bukan janji penghasilan. Hasil setiap toko bergantung pada produk, eksekusi, pasar, dan angka biaya masing-masing.",
            },
            {
              question: "Bagaimana kebijakan pembatalan dan refund?",
              answer:
                "Pesanan yang belum dikirim dapat dibatalkan. Setelah file digital diterima dan berfungsi, refund tidak berlaku untuk perubahan pikiran. Kami tetap membantu penggantian atau refund untuk pembayaran ganda, file yang salah, tidak lengkap, rusak, tidak dapat digunakan sebagaimana dijanjikan, atau tidak terkirim. Laporkan kendala paling lambat 2 hari kerja setelah produk diterima.",
            },
            {
              question: "Bisa bayar dari bank apa saja?",
              answer:
                "Gunakan aplikasi bank atau dompet digital yang mendukung QRIS. Contohnya BCA, BRI, Mandiri, BNI, BSI, BTN, CIMB Niaga, Permata, Danamon, OCBC, Bank Mega, GoPay, DANA, ShopeePay, dan LinkAja. Daftar ini bukan daftar lengkap.",
            },
          ].map((item, index) => (
            <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={item.question}>
              <button
                aria-expanded={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                type="button"
              >
                <span>{item.question}</span>
                <Icon name="chevron-down" size={20} />
              </button>
              <div className="faq-answer" hidden={openFaq !== index}>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
          <div className="policy-link-card">
            <div>
              <strong>Kebijakan lengkap untuk produk digital</strong>
              <span>
                Baca syarat pembatalan, kondisi refund, proses pengajuan, dan
                jangka waktu penyelesaian.
              </span>
            </div>
            <a href={assetPath("/kebijakan-pengembalian/")}>
              Kebijakan pembatalan &amp; refund
              <Icon name="arrow-right" size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="section owner-section" aria-label="Tentang pembuat IBNU Project">
        <img
          alt="Ibnu, pembuat IBNU Project"
          className="owner-photo"
          loading="lazy"
          src={assetPath("/assets/ibnu-owner.png")}
        />
        <div className="owner-copy">
          <span className="kicker">Cerita nyata di balik pengalaman</span>
          <h2>Materi Praktis dengan bantuan kapanpun setelah kamu beli</h2>
          <p>
            Saya menyusun materi ini dari pengalaman mengelola toko fashion dan
            membantu partner membaca angka tokonya. Kalau ada bagian yang belum
            jelas, kamu tetap bisa bertanya lewat WhatsApp setelah membeli.
          </p>
          <div className="owner-trust-line">
            <Icon name="message-circle" size={19} />
            Konfirmasi pembayaran dan pengiriman file ditangani secara pribadi.
          </div>
        </div>
      </section>

      <footer>
        <a className="brand brand-light" href="#top">
          <span className="brand-mark">I</span>
          <span>
            IBNU <strong>PROJECT</strong>
          </span>
        </a>
        <p>
          Panduan praktis untuk membuat keputusan Shopee dengan angka, bukan
          tebakan.
        </p>
        <div className="footer-links">
          <a href={assetPath("/kebijakan-pengembalian/")}>Kebijakan refund</a>
          <a href={questionWhatsappUrl} rel="noreferrer" target="_blank">
            WhatsApp 0838-5458-1787
          </a>
        </div>
      </footer>

      <div className="mobile-buy-bar">
        <div>
          <span>Paket lengkap</span>
          <s>Rp596.000</s>
          <strong>Rp47.000</strong>
        </div>
        <button
          className="button button-primary"
          data-testid="mobile-buy"
          onClick={openCheckout}
          type="button"
        >
          Beli sekarang
          <Icon name="arrow-right" size={18} />
        </button>
      </div>

      {checkoutOpen && (
        <div
          aria-label="Pembayaran Paket Panduan Shopee"
          aria-modal="true"
          className="checkout-overlay"
          data-testid="checkout-modal"
          role="dialog"
        >
          <button
            aria-label="Tutup pembayaran"
            className="overlay-dismiss"
            onClick={() => setCheckoutOpen(false)}
            type="button"
          />
          <section className="checkout-modal">
            <header>
              <div>
                <span>Pembayaran aman</span>
                <h2>Selesaikan pembelian</h2>
              </div>
              <button
                aria-label="Tutup"
                className="icon-button"
                data-testid="close-checkout"
                onClick={() => setCheckoutOpen(false)}
                type="button"
              >
                <Icon name="x" size={21} />
              </button>
            </header>

            <div className="checkout-progress" aria-label={`Langkah ${paymentStep} dari 3`}>
              {["Cek paket", "Bayar QRIS", "Kirim bukti"].map((label, index) => (
                <div
                  className={`${paymentStep === index + 1 ? "active" : ""} ${
                    paymentStep > index + 1 ? "done" : ""
                  }`}
                  key={label}
                >
                  <span>{paymentStep > index + 1 ? "✓" : index + 1}</span>
                  {label}
                </div>
              ))}
            </div>

            {paymentStep === 1 && (
              <div className="checkout-step" data-testid="checkout-step-1">
                <div className="order-product">
                  <div className="mini-covers">
                    {books.map((book) => (
                      <img alt="" key={book.id} src={book.cover} />
                    ))}
                  </div>
                  <div>
                    <span>Paket Panduan Shopee</span>
                    <strong>3 buku + 1 kalkulator</strong>
                    <small>54 halaman · file digital</small>
                  </div>
                </div>
                <div className="checkout-value-breakdown" aria-label="Nilai isi paket">
                  <div><span>Toko Ramai</span><s>Rp249.000</s></div>
                  <div><span>Harga Untung</span><s>Rp149.000</s></div>
                  <div><span>Bintang Lima</span><s>Rp99.000</s></div>
                  <div><span>Kalkulator Margin</span><s>Rp99.000</s></div>
                </div>
                <div className="order-line">
                  <span>Total yang dibayar</span>
                  <div>
                    <s>Rp596.000</s>
                    <strong>Rp47.000</strong>
                  </div>
                </div>
                <div className="checkout-saving">Kamu hemat Rp549.000 (92%)</div>
                <ul className="checkout-assurances">
                  <li>
                    <Icon name="check-circle" size={17} /> Tidak ada tambahan biaya
                    dari IBNU Project
                  </li>
                  <li>
                    <Icon name="check-circle" size={17} /> Tidak ada tautan produk
                    publik; file dikirim pribadi setelah pembayaran diverifikasi
                  </li>
                  <li>
                    <Icon name="check-circle" size={17} /> Bantuan tersedia lewat
                    WhatsApp
                  </li>
                </ul>
                <button
                  className="button button-primary button-large button-block"
                  data-testid="continue-to-qris"
                  onClick={openQrisStep}
                  type="button"
                >
                  Lanjut ke QRIS
                  <Icon name="arrow-right" size={19} />
                </button>
              </div>
            )}

            {paymentStep === 2 && (
              <div className="checkout-step qris-step" data-testid="checkout-step-2">
                <div className="amount-banner">
                  <span>Masukkan nominal persis</span>
                  <strong>Rp47.000</strong>
                </div>
                <div className="qris-layout">
                  <div className="qris-frame">
                    <img
                      alt="Kode QRIS IBNU Project"
                      src={assetPath("/assets/qris-ibnu.jpg")}
                    />
                  </div>
                  <div className="qris-instructions">
                    <h3>Pilih cara yang paling mudah</h3>
                    <div>
                      <Icon name="smartphone" size={20} />
                      <span>
                        <strong>Bayar dari HP yang sama</strong>
                        Simpan QRIS, buka aplikasi pembayaran, lalu pilih QR dari
                        galeri.
                      </span>
                    </div>
                    <div>
                      <Icon name="credit-card" size={20} />
                      <span>
                        <strong>Bayar dari perangkat lain</strong>
                        Buka aplikasi bank atau e-wallet, pilih Scan QRIS, lalu
                        arahkan kamera ke kode.
                      </span>
                    </div>
                    <a
                      className="download-qris"
                      download="QRIS-IBNU-Project.jpg"
                      href={assetPath("/assets/qris-ibnu.jpg")}
                    >
                      <Icon name="download" size={17} /> Simpan gambar QRIS
                    </a>
                  </div>
                </div>
                <button
                  className="button button-primary button-large button-block"
                  data-testid="paid-button"
                  onClick={openPaymentProofStep}
                  type="button"
                >
                  Saya sudah bayar
                  <Icon name="arrow-right" size={19} />
                </button>
                <div className="supported-apps">
                  <span>Bisa dari aplikasi QRIS, antara lain</span>
                  <p>
                    BCA · BRI · Mandiri · BNI · BSI · BTN · CIMB Niaga ·
                    Permata · Danamon · OCBC · Bank Mega · GoPay · DANA ·
                    ShopeePay · LinkAja
                  </p>
                  <a
                    href="https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/ritel/kanal-layanan/qris/default.aspx"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Tentang QRIS di Bank Indonesia
                  </a>
                </div>
                <button
                  className="back-button"
                  onClick={() => setPaymentStep(1)}
                  type="button"
                >
                  Kembali cek paket
                </button>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="checkout-step proof-step" data-testid="checkout-step-3">
                <div className="proof-icon">
                  <Icon name="send" size={34} />
                </div>
                <span className="step-kicker">Langkah terakhir</span>
                <h3>Kirim bukti pembayaran lewat WhatsApp.</h3>
                <p>
                  Pesan sudah disiapkan. Setelah chat terbuka, lampirkan
                  screenshot bukti pembayaran agar admin bisa memverifikasi dan
                  mengirimkan paketmu.
                </p>
                <form className="buyer-form" onSubmit={openWhatsappProof}>
                  <div className="buyer-field-row">
                    <label>
                      <span>
                        Nama pembeli <b>Wajib</b>
                      </span>
                      <input
                        autoComplete="name"
                        onChange={(event) => setBuyerName(event.target.value)}
                        placeholder="Nama lengkap"
                        required
                        type="text"
                        value={buyerName}
                      />
                    </label>
                    <label>
                      <span>
                        Alamat email <b>Opsional</b>
                      </span>
                      <input
                        autoComplete="email"
                        onChange={(event) => setBuyerEmail(event.target.value)}
                        placeholder="nama@email.com"
                        type="email"
                        value={buyerEmail}
                      />
                    </label>
                  </div>
                  <small>
                    Data ini hanya dimasukkan ke pesan WhatsApp saat tombol di
                    bawah ditekan.
                  </small>
                  <button
                    className="button button-whatsapp button-large button-block"
                    data-testid="whatsapp-proof"
                    type="submit"
                  >
                    <Icon name="message-circle" size={21} />
                    Kirim data dan bukti ke WhatsApp
                  </button>
                </form>
                <div className="delivery-note">
                  <Icon name="lock" size={17} />
                  Bukti hanya dikirim ke WhatsApp IBNU Project:
                  0838-5458-1787
                </div>
                <button
                  className="back-button"
                  onClick={() => setPaymentStep(2)}
                  type="button"
                >
                  Kembali lihat QRIS
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
