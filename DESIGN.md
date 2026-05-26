# Design System Specification - Portfolio 2.0

Dokumen ini berisi spesifikasi visual, warna, tipografi, dan panduan layouting untuk perombakan besar website portofolio Muhammad Khalifa. Fokus utama: **Gen Z Tech Aesthetic, Mobile-First, & Balanced Visuals**.

---

## 1. Color Palette (Warna Seimbang)

Sesuai referensi prompt, kita menggunakan kombinasi warna gelap premium dengan aksen neon yang dikontrol ketat agar tidak membuat mata lelah (*lowkey vibrant*).

| Elemen / Komponen | Kode Hex | Implementasi Tailwind Class | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Main Background** | `#020617` | `bg-slate-950` | Warna dasar body (Sangat gelap/hampir hitam) |
| **Card Background** | `#0f172a` | `bg-slate-900` | Latar belakang komponen kartu/bento grid |
| **Primary Accent** | `#14A7A0` | `text-teal-500` / `bg-teal-500` | Warna utama untuk heading, tombol primer, & glow utama |
| **Secondary Accent**| `#F76B8A` | `text-rose-400` / `bg-rose-400` | Warna pembeda untuk highlight, text gen-z lingo, & detail |
| **Text Primary** | `#F8FAFC` | `text-slate-50` | Warna teks judul utama (Sangat kontras) |
| **Text Muted** | `#94A3B8` | `text-slate-400` | Warna teks deskripsi/paragraf body |

---

## 2. Typography

Gunakan kombinasi dua font dari Google Fonts untuk menciptakan kontras antara struktur formal dan ekspresi modern.

* **Heading Font:** `Space Grotesk` (Sans-Serif, Tech-Vibe, Geometric)
    * Digunakan untuk: Hero Title, Section Title, Nama Project.
    * Karakter: Bold, tegas, agak melebar.
* **Body Font:** `Urbanist` (Sans-Serif, Clean, Humanist)
    * Digunakan untuk: Deskripsi, paragraf, lingo, teks modal.
    * Karakter: Sangat mudah dibaca meskipun dalam ukuran kecil di layar handphone.

---

## 3. Layout & UI Component Specifications

### A. Hero Section (Vibe Check)
* **Mobile View:** Foto profil ditaruh paling atas, center, **tanpa border**. Menggunakan masking halus di bagian bawah foto agar menyatu transparan dengan background `#020617`. Di bawah foto langsung menyusul Judul Besar + Copywriting Gen Z.
* **Desktop View:** Grid 2 kolom (`md:grid-cols-2`), foto di sebelah kanan, teks di kiri.

### B. About Page (Centered Focus)
* Posisi Foto Profil wajib berada di **tengah (center)** baik di mobile maupun desktop.
* Background foto transparan.
* Teks narasi ditaruh di bawah foto dengan penataan paragraf yang tidak terlalu lebar (`max-w-2xl mx-auto`) agar nyaman dibaca secara vertikal.

### C. Skills & Tools (Bento-Grid Split)
Dibagi menjadi 2 kategori besar dengan visualisasi card yang responsif:
1.  **Programming Tools Grid:** 3 kolom di desktop, 1 kolom di mobile. Berisi icon besar (Laravel, JS, Tailwind) dengan deskripsi singkat kegunaannya.
2.  **Workspace Tools Grid:** Menggunakan sub-card yang lebih kecil (`p-4` atau `p-5`) untuk VS Code, Figma, Postman dengan warna border tipis teal/rose yang transparan (`border-slate-800`).

### D. Project Showcase & Popup Mechanism
* **Top 3 Cards:** Menggunakan efek border glow tipis. Setiap kartu memiliki aspek rasio gambar `aspect-video` untuk screenshot web/apps.
* **CTA Button (Lihat Semua):** Memiliki class `hover:shadow-[0_0_15px_rgba(20,167,160,0.5)]` untuk memberikan efek binar (*glow event*).
* **Popup Container:**
    * Menggunakan wrapper `fixed inset-0 z-50 backdrop-blur-md bg-black/70`.
    * Modal box di tengah menggunakan `max-w-4xl w-11/12 max-h-[85vh] overflow-y-auto`. Ini menjamin di mobile, daftar semua project tetap bisa di-scroll di dalam popup tanpa merusak halaman utama.

### E. Learning Journey (Timeline & Blog Promo)
* Gunakan garis vertikal putus-putus (`border-dashed border-l-2 border-slate-700`) di tengah atau samping kiri layar untuk timeline.
* **Blog Banner:** Berikan highlight box khusus dengan gradasi `bg-gradient-to-r from-teal-950/40 to-rose-950/40` yang langsung mengarah ke `lippbyte-blog.vercel.app/`.

---

## 4. Micro-Interactions (Panduan Animasi Tipis)

* **Transition Duration:** Gunakan `duration-300 ease-in-out` pada semua elemen interaktif (tombol, link, kartu).
* **Spotlight Card (CSS Base):**
    ```css
    /* Disisipkan di custom.css untuk menghidupkan efek hover kursor */
    .spotlight-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(20, 167, 160, 0.15), transparent 40%);
        z-index: 0;
        pointer-events: none;
    }