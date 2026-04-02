# 🚀 Website Portofolio Pribadi Lippbyte

Website portofolio pribadi yang modern, responsif, berdesain premium dengan fitur animasi, *Dark/Light Mode*, serta sistem pengiriman pesan langsung ke email tanpa perlu backend. Dibangun menggunakan HTML, CSS, dan JavaScript Vanilla.

## ✨ Fitur Utama

- ✅ **Fully Responsive** - UI/UX dioptimalkan untuk Mobile, Tablet, dan Desktop. Menampilkan *Glassmorphism* yang memukau.
- ✅ **Dark/Light Mode** - Toggle tema dengan animasi yang *smooth*. Preferensi disimpan otomatis di `localStorage` menggunakan Vanilla JS.
- ✅ **Real Contact Form** - Pengiriman pesan form langsung masuk ke email (`muhammad.khalifa3289@gmail.com`) menggunakan API gratis dari **FormSubmit.co** (via AJAX Fetch API tanpa reload halaman).
- ✅ **Dynamic Typing Effect** - Animasi *typewriting* pada header yang otomatis mendeskripsikan ringkasan keahlian.
- ✅ **SVG & Custom Brand Icons** - Menggunakan *inline SVG* dan *local image* berkualitas tinggi (Notion, Antigravity, Laravel, dll) secara konsisten yang bereaksi otomatis di kedua skema warna.
- ✅ **Smooth Animations** - Menerapkan *IntersectionObserver* untuk animasi *fade-in* saat pengguna men-scroll ke bagian baru, serta transisi *hover* yang hidup!
- ✅ **SEO & Semantic HTML** - Kode HTML direstrukturisasi secara semantik agar mudah dirayapi oleh mesin pencari.

## 📁 Struktur File

```text
porto-website/
├── index.html          # Struktur halaman utama dan konten
├── style.css           # Styling modern, token warna, adaptasi Light Mode, dan animasi
├── script.js           # Skrip Light/Dark mode, animasi ngetik, observer, dan AJAX Form
├── img/                # Aset gambar portofolio, profil, dan SVG (Notion, Antigravity)
└── README.md           # Dokumentasi ini
```

## 🎯 Cara Menjalankan

### Menggunakan VS Code Live Server (Rekomendasi)
1. Buka folder `porto-website` di aplikasi VS Code
2. Pastikan ekstensi **Live Server** sudah terpasang.
3. Klik kanan pada file `index.html` → pilih **"Open with Live Server"**.
4. Website akan terbuka di `http://127.0.0.1:5500`.

### Membuka Secara Langsung (Offline)
Cukup buka / *double-click* file `index.html` pada File Explorer Anda dan tampilan akan langsung termuat di Browser modern favorit Anda (Chrome, Firefox, Edge, Safari).

## 🎨 Kustomisasi Warna & Tema

Warna inti (*branding*) diatur pada bagian paling awal dari `style.css` menggunakan **CSS Root Variables**. Anda hanya perlu mengganti angka-angka *hue* di bawah ini yang akan otomatis diadaptasikan menjadi efek *gradient* dan bayangan pada seluruh halaman.

```css
:root {
  /* HSL Colors: Tema Gelap - Ungu / Biru (Modern Gradient) */
  --hue-color: 250; /* Ganti dengan hue idaman Anda (0-360) / 250 untuk Ungu */
  --hue-color-alt: 210; /* Warna gradasi kedua (Aksen Biru) */
  ...
}
```

Penyelarasan Light Mode telah ditulis secara rapi di dalam *block* `.light-theme`. Jika ingin mengubah warna cerahnya, Anda bisa mengubah variabel pada *block* tersebut.

## ✉️ Integrasi Form Email otomatis (FormSubmit)

Website ini tidak membutuhkan File PHP atau Backend Server untuk mengelola form kontak!

**Cara kerja saat ini:**
1. Form merujuk ke endpoint action API dari `https://formsubmit.co/muhammad.khalifa3289@gmail.com`
2. Modul JS membajaknya menggunakan `event.preventDefault()` lalu mengirim ulang dengan format JSON (melalui *Fetch API*).
3. Pengguna tidak dialihkan laman jika form selesai terkirim (muncul notifikasi Pop-up pesan terkirim berwarna hijau)!
4. Form dilindungi perlindungan Spam (*Honey Pot*).

> **PENTING:** Saat pertama kali diujicoba mengirim pesan (di *production/live*), Google akan menjeda email dan FormSubmit akan mengirimkan pesan Aktivasi ke `muhammad.khalifa3289@gmail.com`. Silakan klik Tombol *Activate* di inbox email agar sisa pesan ke depannya bisa masuk secara langsung (Tindakan ini cuma perlu dilakukan **sekali saja**).

## 🧰 Kustomisasi Keahlian (Skills) & Logo

Logo spesifik *framework* di bagian "Skills" tidak menggunakan library luar. Sebagian besar mengaplikasikan SVG yang tertanam langsung yang menyesuaikan tema menggunakan nilai properti `currentColor`.

Untuk *icon* tanpa box-icon resmi seperti **Notion** & **Antigravity**, file image diposisikan dalam tab `<img>` yang dipanggil dari folder logonya menggunakan *class* `.skill-img-icon` agar skalanya identik dan estetik.

## 🔧 Troubleshooting

- **Efek Hover Terasa Canggung di Light Mode?**
  Periksa kode `body.light-theme` didalam CSS, di sana dipisahkan spesifik selektor khusus transisi terang (`body.light-theme .home-social-btn:hover { ... }`).
- **Pesan FormSubmit Error Mengirim?**
  Pastikan koneksi Internet aktif. Eksekusi program membutuhkan pengiriman koneksi ke endpoint formsubmit. Jika tidak *live*/*online*, pastikan menonaktifkan properti AdBlocker secara sementara di browser saat diujicoba. Letak program ini ada di akhir `script.js`.

---
*Made with ❤️ using HTML, CSS, and pure JavaScript.*

