import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("exports the complete sales page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /Paket Panduan Shopee \| IBNU Project/);
  assert.match(html, /Toko Ramai Bukan Keberuntungan/);
  assert.match(html, /Harga Untung Bukan Tebakan/);
  assert.match(html, /Bintang Lima Bukan Kebetulan/);
  assert.match(html, /Rp47\.000/);
  assert.match(html, /6283854581787/);
  assert.match(html, /Dany P\./);
  assert.match(html, /Najwa T\./);
  assert.match(html, /Hesti A\./);
  assert.match(html, /ibnu-owner\.png/);
  assert.match(html, /Rp596\.000/);
  assert.match(html, /Isi dirahasiakan/);
  assert.match(html, /Bagaimana kebijakan pembatalan dan refund/);
  assert.match(html, /\/kebijakan-pengembalian\//);
});

test("exports the refund and cancellation policy", async () => {
  const html = await readFile(
    new URL("../out/kebijakan-pengembalian/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /Kebijakan Pembatalan &amp; Pengembalian Dana/);
  assert.match(html, /paling lambat 2 hari kerja/);
  assert.match(html, /Pembayaran terpotong lebih dari satu kali/);
  assert.match(html, /bantuan@ibnuproject\.my\.id/);
  assert.match(html, /Undang-Undang Nomor 8 Tahun 1999/);
  assert.match(html, /Peraturan Pemerintah Nomor 80 Tahun 2019/);
});

test("checkout collects buyer identity before WhatsApp confirmation", async () => {
  const source = await readFile(
    new URL("../app/SalesPage.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /Nama pembeli/);
  assert.match(source, /Alamat email/);
  assert.match(source, /placeholder="Nama lengkap"[\s\S]*required/);
  assert.match(source, /Email \(opsional\)/);
  assert.match(source, /checkout_step_3/);
});

test("does not publish the paid products", async () => {
  const forbiddenPublicProducts = [
    "../out/pdf",
    "../out/kalkulator",
    "../out/toko-ramai-edisi-baru.pdf",
    "../out/harga-untung-edisi-baru.pdf",
    "../out/bintang-lima-edisi-baru.pdf",
    "../out/kalkulator-margin-shopee.html",
  ];

  for (const relativePath of forbiddenPublicProducts) {
    await assert.rejects(stat(new URL(relativePath, import.meta.url)));
  }
});

test("includes the purchase assets", async () => {
  const requiredAssets = [
    "../out/og.png",
    "../out/assets/qris-ibnu.jpg",
    "../out/assets/cover-toko-ramai-edisi-baru.png",
    "../out/assets/cover-harga-untung-edisi-baru.png",
    "../out/assets/cover-bintang-lima-edisi-baru.png",
    "../out/assets/ibnu-owner.png",
  ];

  for (const relativePath of requiredAssets) {
    const file = await stat(new URL(relativePath, import.meta.url));
    assert.ok(file.isFile(), `${relativePath} must be a file`);
    assert.ok(file.size > 0, `${relativePath} must not be empty`);
  }
});

test("all rendered asset references resolve inside the export", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const assetReferences = [
    ...new Set(html.match(/\/assets\/[^\"']+/g) ?? []),
  ];

  assert.ok(assetReferences.length > 10, "expected the page to reference its assets");

  for (const assetReference of assetReferences) {
    const relativeAsset = assetReference.slice(assetReference.indexOf("/assets/"));
    const file = await stat(
      new URL(`../out${relativeAsset}`, import.meta.url),
    );
    assert.ok(file.isFile(), `${relativeAsset} must resolve to a file`);
  }
});
