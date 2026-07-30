import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const homeUrl = `${basePath}/`;

export const metadata: Metadata = {
  title: "Kebijakan Pembatalan & Pengembalian Dana | IBNU Project",
  description:
    "Kebijakan pembatalan pesanan, penggantian produk digital, dan pengembalian dana IBNU Project.",
};

export default function RefundPolicyPage() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <a className="brand" href={homeUrl} aria-label="IBNU Project, kembali ke halaman utama">
          <span className="brand-mark">I</span>
          <span>
            IBNU <strong>PROJECT</strong>
          </span>
        </a>
        <a className="policy-home-link" href={homeUrl}>
          Kembali ke halaman produk
        </a>
      </header>

      <article className="policy-document">
        <div className="policy-hero">
          <span className="kicker">Ketentuan transaksi produk digital</span>
          <h1>Kebijakan Pembatalan &amp; Pengembalian Dana</h1>
          <p>
            Kami ingin setiap pembeli menerima paket yang benar, lengkap, dan
            dapat digunakan. Kebijakan ini menjelaskan kapan pesanan dapat
            dibatalkan, kapan penggantian atau refund dapat diberikan, dan cara
            mengajukan keluhan.
          </p>
          <div className="policy-effective">
            Berlaku sejak 30 Juli 2026 · Terakhir diperbarui 30 Juli 2026
          </div>
        </div>

        <nav className="policy-summary" aria-label="Ringkasan kebijakan">
          <strong>Ringkasan cepat</strong>
          <ul>
            <li>Belum dikirim: pesanan dapat dibatalkan dan dana dikembalikan.</li>
            <li>
              Sudah diterima dan berfungsi: tidak ada refund karena berubah
              pikiran atau hasil usaha yang tidak sesuai harapan.
            </li>
            <li>
              Salah, tidak lengkap, rusak, tidak berfungsi, terlambat, tidak
              terkirim, atau pembayaran ganda: kami bantu penggantian atau refund.
            </li>
            <li>
              Laporkan masalah paling lambat 2 hari kerja setelah produk diterima.
            </li>
          </ul>
        </nav>

        <section>
          <h2>1. Ruang lingkup</h2>
          <p>
            Kebijakan ini berlaku untuk pembelian Paket Panduan Shopee IBNU
            Project yang terdiri dari tiga buku digital PDF dan satu Kalkulator
            Margin Shopee. Produk dikirim secara pribadi setelah pembayaran
            diverifikasi.
          </p>
        </section>

        <section>
          <h2>2. Pembatalan sebelum produk dikirim</h2>
          <p>
            Pembeli dapat meminta pembatalan penuh selama file, tautan akses,
            atau materi digital belum dikirim. Hubungi kami secepatnya dengan
            menyertakan nama pembeli dan bukti pembayaran. Jika pengiriman sudah
            dilakukan, permintaan diproses berdasarkan ketentuan produk digital
            pada bagian berikutnya.
          </p>
        </section>

        <section>
          <h2>3. Kondisi yang memenuhi penggantian atau refund</h2>
          <p>
            Kami akan memeriksa dan menawarkan pengiriman ulang, penggantian,
            bantuan teknis, atau pengembalian dana apabila salah satu kondisi
            berikut terbukti terjadi:
          </p>
          <ul>
            <li>Pembayaran terpotong lebih dari satu kali untuk pesanan yang sama.</li>
            <li>
              Pembayaran berhasil tetapi paket tidak dikirim dalam waktu yang
              dijanjikan dan kami tidak dapat menyelesaikan pengirimannya.
            </li>
            <li>File atau produk yang dikirim berbeda dari paket yang dibeli.</li>
            <li>File tidak lengkap, rusak, atau tidak dapat dibuka.</li>
            <li>
              Kalkulator tidak dapat beroperasi sebagaimana dijelaskan setelah
              pembeli mengikuti petunjuk dan proses bantuan teknis yang wajar.
            </li>
            <li>
              Terdapat cacat tersembunyi atau ketidaksesuaian material lain
              antara produk yang diterima dan penawaran di situs.
            </li>
          </ul>
          <p>
            Jika masalah dapat diselesaikan dengan file pengganti, pengiriman
            ulang, atau bantuan teknis dalam waktu wajar, langkah tersebut akan
            ditawarkan terlebih dahulu. Refund diberikan jika solusi tidak
            tersedia, tidak berhasil, atau diwajibkan oleh ketentuan hukum yang
            berlaku.
          </p>
        </section>

        <section>
          <h2>4. Kondisi yang tidak memenuhi refund</h2>
          <p>
            Setelah produk digital yang benar, lengkap, dan berfungsi telah
            diterima, refund umumnya tidak diberikan untuk:
          </p>
          <ul>
            <li>Perubahan pikiran atau pembelian yang tidak lagi diinginkan.</li>
            <li>
              Anggapan bahwa materi terlalu dasar atau tidak cocok, apabila isi
              yang diterima sesuai dengan deskripsi dan cuplikan di situs.
            </li>
            <li>
              Tidak tercapainya omzet, ROAS, laba, jumlah pesanan, atau hasil
              bisnis tertentu. Materi ini adalah panduan, bukan jaminan hasil.
            </li>
            <li>
              Pembeli tidak membaca, tidak menerapkan, atau tidak menyelesaikan
              materi yang telah diterima.
            </li>
            <li>
              Kendala akibat perangkat atau aplikasi pembeli yang tidak didukung,
              selama file terbukti berfungsi pada perangkat atau browser umum
              yang sesuai petunjuk.
            </li>
            <li>
              Kesalahan alamat email atau nomor WhatsApp yang dapat diselesaikan
              dengan memperbarui data dan mengirim ulang produk.
            </li>
            <li>
              Pelanggaran lisensi pribadi, termasuk membagikan, menjual ulang,
              menggandakan untuk distribusi, atau mengunggah produk secara publik.
            </li>
          </ul>
          <p>
            Bagian ini tidak membatasi hak konsumen yang wajib dipenuhi menurut
            peraturan perundang-undangan Indonesia.
          </p>
        </section>

        <section>
          <h2>5. Batas waktu pengajuan</h2>
          <p>
            Untuk kesalahan pengiriman, ketidaksesuaian, cacat tersembunyi,
            kerusakan file, atau produk yang tidak dapat digunakan, pembeli
            diminta mengajukan keluhan paling lambat 2 hari kerja sejak produk
            diterima. Pembayaran ganda atau produk yang belum pernah terkirim
            dapat dilaporkan segera setelah diketahui dengan menyertakan bukti
            transaksi.
          </p>
        </section>

        <section>
          <h2>6. Cara mengajukan pembatalan atau refund</h2>
          <p>Kirim permohonan melalui salah satu kanal berikut:</p>
          <div className="policy-contact-grid">
            <a
              href="https://wa.me/6283854581787?text=Halo%20IBNU%20Project%2C%20saya%20ingin%20mengajukan%20pembatalan%20atau%20refund."
              rel="noreferrer"
              target="_blank"
            >
              <span>WhatsApp</span>
              <strong>0838-5458-1787</strong>
            </a>
            <a href="mailto:bantuan@ibnuproject.my.id">
              <span>Email bantuan</span>
              <strong>bantuan@ibnuproject.my.id</strong>
            </a>
          </div>
          <p>Sertakan informasi berikut agar pemeriksaan lebih cepat:</p>
          <ul>
            <li>Nama pembeli dan kontak yang digunakan saat membeli.</li>
            <li>Tanggal, nominal, dan bukti pembayaran.</li>
            <li>Penjelasan masalah yang dialami.</li>
            <li>Screenshot atau rekaman layar jika berkaitan dengan file atau kalkulator.</li>
          </ul>
        </section>

        <section>
          <h2>7. Pemeriksaan dan waktu penyelesaian</h2>
          <ol>
            <li>Kami mengonfirmasi penerimaan pengaduan paling lambat 2 hari kerja.</li>
            <li>
              Setelah bukti lengkap diterima, pemeriksaan diselesaikan paling
              lambat 5 hari kerja.
            </li>
            <li>
              Refund yang disetujui kami instruksikan paling lambat 7 hari kerja
              setelah keputusan. Waktu dana masuk dapat berbeda sesuai bank,
              dompet digital, atau penyedia pembayaran.
            </li>
          </ol>
          <p>
            Refund dilakukan ke metode pembayaran asal jika tersedia. Jika tidak,
            kami dapat meminta rekening bank atau akun pembayaran atas nama
            pembeli yang telah diverifikasi. Kami tidak pernah meminta PIN, OTP,
            kata sandi, atau kode keamanan kartu.
          </p>
        </section>

        <section>
          <h2>8. Nilai refund</h2>
          <p>
            Untuk refund penuh, jumlah yang dikembalikan adalah jumlah yang
            benar-benar dibayarkan kepada IBNU Project untuk pesanan tersebut.
            Untuk pembayaran ganda, jumlah transaksi duplikat dikembalikan penuh.
            Jika hanya sebagian paket bermasalah dan pembeli menerima solusi
            sebagian, nilai penyelesaian dapat disepakati secara proporsional tanpa
            mengurangi hak konsumen yang diwajibkan oleh hukum.
          </p>
        </section>

        <section>
          <h2>9. Penyalahgunaan dan itikad baik</h2>
          <p>
            Permohonan dapat ditolak jika bukti dipalsukan, transaksi tidak dapat
            diverifikasi, atau terdapat indikasi penyalahgunaan seperti meminta
            refund setelah menyebarkan produk. Penolakan selalu disertai alasan.
            Kedua pihak diharapkan menyelesaikan masalah dengan itikad baik.
          </p>
        </section>

        <section>
          <h2>10. Dasar hukum dan penyelesaian sengketa</h2>
          <p>
            Kebijakan ini disusun dengan mengacu pada peraturan Indonesia,
            termasuk:
          </p>
          <ul className="legal-links">
            <li>
              <a
                href="https://peraturan.bpk.go.id/Details/45288/uu-no-8-tahun-1999"
                rel="noreferrer"
                target="_blank"
              >
                Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen
              </a>
            </li>
            <li>
              <a
                href="https://jdih.kemendag.go.id/peraturan/peraturan-pemerintah-nomor-80-tahun-2019-tentang-perdagangan-melalui-sistem-elektronik"
                rel="noreferrer"
                target="_blank"
              >
                Peraturan Pemerintah Nomor 80 Tahun 2019 tentang Perdagangan
                Melalui Sistem Elektronik
              </a>
            </li>
          </ul>
          <p>
            Jika keluhan tidak dapat diselesaikan langsung, para pihak dapat
            menggunakan mekanisme penyelesaian sengketa konsumen sesuai hukum
            Indonesia. Tidak ada bagian kebijakan ini yang menghapus hak atau
            kewajiban yang tidak dapat dikesampingkan berdasarkan hukum.
          </p>
        </section>

        <div className="policy-closing">
          <strong>Masih ada pertanyaan sebelum membeli?</strong>
          <p>
            Hubungi kami terlebih dahulu. Kami akan menjelaskan isi produk,
            perangkat yang dibutuhkan, dan proses pengiriman sebelum pembayaran.
          </p>
          <a href={homeUrl}>Kembali ke Paket Panduan Shopee</a>
        </div>
      </article>
    </main>
  );
}

