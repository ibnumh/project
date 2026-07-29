# IBNU Project — GitHub Pages

Landing page penjualan paket 3 panduan Shopee dan 1 kalkulator margin.

Harga: Rp47.000  
Pembayaran: QRIS  
Konfirmasi: WhatsApp 0838-5458-1787

## Publikasikan ke GitHub Pages

1. Buat repository baru di GitHub.
2. Ekstrak ZIP ini, lalu unggah semua isi foldernya ke root repository.
3. Pastikan branch utama bernama `main`.
4. Buka **Settings → Pages** di repository.
5. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
6. Buka tab **Actions**. Workflow **Deploy IBNU Project to GitHub Pages** akan membangun dan menerbitkan situs secara otomatis.

Setiap push berikutnya ke `main` akan menerbitkan perubahan terbaru.

## Jalankan secara lokal

Persyaratan: Node.js 22 dan pnpm 10.

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Verifikasi sebelum unggah

```bash
pnpm install
pnpm test
pnpm lint
```

## Catatan penting

- Tidak ada PDF berbayar atau file kalkulator di repository dan hasil GitHub Pages.
- Satu-satunya file yang dapat disimpan dari halaman pembayaran adalah gambar QRIS.
- Setelah membayar, pembeli mengisi nama, email opsional, lalu mengirim bukti melalui WhatsApp.
- Admin memverifikasi pembayaran sebelum mengirim 3 PDF dan 1 kalkulator secara pribadi.
- Bagian testimoni masih berupa placeholder dan ditandai jelas di halaman.
- Ganti testimoni placeholder dengan pengalaman pembeli terverifikasi sebelum peluncuran publik.
- File QRIS berada di `public/assets/qris-ibnu.jpg`.
- Nomor WhatsApp berada di `app/SalesPage.tsx`.
- Paket ini tidak berisi metadata hosting ChatGPT, riwayat Git, `node_modules`, atau cache build.
