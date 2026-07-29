import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const description =
  "Tiga panduan praktis dan satu kalkulator margin Shopee untuk membenahi traffic, harga, laba, dan ulasan. Paket lengkap Rp47.000.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Paket Panduan Shopee | IBNU Project",
  description,
  keywords: [
    "panduan Shopee",
    "kalkulator margin Shopee",
    "cara menaikkan penjualan Shopee",
    "harga jual Shopee",
    "IBNU Project",
  ],
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: "3 Panduan + 1 Kalkulator Shopee — Rp47.000",
    description:
      "Bukan tambah tips. Tambah sistem untuk traffic, harga, laba, dan ulasan.",
    type: "website",
    locale: "id_ID",
    siteName: "IBNU Project",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1536,
        height: 864,
        alt: "IBNU Project — 3 Panduan dan 1 Kalkulator Shopee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3 Panduan + 1 Kalkulator Shopee — Rp47.000",
    description: "Sistem praktis untuk traffic, harga, laba, dan ulasan tokomu.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
