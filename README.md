# 🚀 Website Portofolio Pribadi

Website portofolio pribadi yang modern, responsif, dan dinamis menggunakan HTML, CSS, dan JavaScript murni (tanpa framework).

## ✨ Fitur Utama

- ✅ **Fully Responsive** - Tampil sempurna di semua device (mobile, tablet, desktop)
- ✅ **Dark/Light Mode** - Toggle tema dengan animasi smooth
- ✅ **Data-Driven** - Konten dinamis dari JavaScript array (mudah di-update)
- ✅ **Modern Design** - UI/UX premium dengan animasi dan hover effects
- ✅ **SEO Optimized** - Semantic HTML dan meta tags lengkap
- ✅ **Form Validation** - Validasi form contact dengan JavaScript
- ✅ **Smooth Animations** - Scroll animations dan typing effect
- ✅ **Performance** - Optimized untuk loading cepat

## 📁 Struktur File

```
porto-website/
├── index.html          # Struktur halaman utama
├── style.css           # Styling dan design system
├── script.js           # Logika dan interaktivitas
├── img/                # Folder gambar
│   ├── profile.jpg
│   ├── about.jpg
│   └── project-*.jpg
└── README.md           # Dokumentasi ini
```

## 🎯 Cara Menjalankan

### Metode 1: Langsung Buka File
1. Buka folder `porto-website`
2. Double-click file `index.html`
3. Website akan terbuka di browser default Anda

### Metode 2: Menggunakan Live Server (Recommended)
1. Install extension **Live Server** di VS Code
2. Buka folder `porto-website` di VS Code
3. Klik kanan pada `index.html` → pilih "Open with Live Server"
4. Website akan terbuka di `http://localhost:5500`

### Metode 3: Menggunakan Python HTTP Server
```bash
# Masuk ke folder project
cd "d:/DATA ALIF/Project/porto-website"

# Jalankan server (Python 3)
python -m http.server 8000

# Buka browser ke http://localhost:8000
```

## 🎨 Cara Mengupdate Konten

Semua konten website bisa diubah dengan mudah tanpa menyentuh HTML!

### 1. Mengubah Data Skills

Buka `script.js`, cari bagian **DATA SKILLS** (baris ~6):

```javascript
const skills = [
    {
        category: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "React"]
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "PHP"]
    }
    // Tambah kategori baru di sini
];
```

**Cara menambah skill:**
- Tambah item baru di dalam array `items`
- Atau tambah kategori baru dengan format yang sama

### 2. Mengubah Data Projects

Buka `script.js`, cari bagian **DATA PROJECTS** (baris ~20):

```javascript
const projects = [
    {
        title: "Nama Project",
        description: "Deskripsi singkat project",
        tech: ["HTML", "CSS", "JavaScript"],
        linkDemo: "https://demo-link.com",
        linkRepo: "https://github.com/username/repo",
        image: "img/project-name.jpg"
    }
    // Tambah project baru di sini
];
```

**Cara menambah project:**
1. Copy salah satu object project
2. Ubah semua properti sesuai project baru Anda
3. Tambahkan gambar project ke folder `img/`
4. Update path `image` sesuai nama file gambar

### 3. Mengubah Data Experience

Buka `script.js`, cari bagian **DATA EXPERIENCE** (baris ~70):

```javascript
const experiences = [
    {
        title: "Posisi/Gelar",
        company: "Nama Perusahaan/Institusi",
        description: "Deskripsi pekerjaan/pendidikan",
        date: "2023 - Sekarang",
        type: "work" // atau "education"
    }
    // Tambah experience baru di sini
];
```

### 4. Mengubah Informasi Pribadi

Buka `index.html` dan cari bagian yang ingin diubah:

- **Nama**: Cari `<h1 class="hero-name">` (baris ~66)
- **Role**: Cari `<h2 class="hero-role">` (baris ~69)
- **Deskripsi**: Cari `<p class="hero-description">` (baris ~72)
- **Email/Phone**: Cari section `contact-details` (baris ~240)
- **Social Media**: Cari `hero-social` dan `footer-social`

### 5. Mengubah Foto Profil

1. Siapkan foto Anda (format JPG/PNG, ukuran recommended: 500x500px)
2. Simpan di folder `img/` dengan nama `profile.jpg`
3. Foto akan otomatis muncul di hero section

## 🎨 Kustomisasi Warna & Tema

Buka `style.css`, cari bagian **CSS VARIABLES** (baris ~1):

```css
:root {
    /* Ubah warna primary */
    --color-primary: hsl(250, 84%, 54%);
    
    /* Ubah warna secondary */
    --color-secondary: hsl(340, 82%, 52%);
    
    /* Ubah warna accent */
    --color-accent: hsl(180, 62%, 55%);
}
```

**Tips:**
- Gunakan HSL color untuk kontrol yang lebih baik
- Ubah nilai `hue` (0-360) untuk warna berbeda
- Ubah `saturation` (0-100%) untuk intensitas warna
- Ubah `lightness` (0-100%) untuk kecerahan

## 🌙 Dark Mode

Dark mode sudah otomatis tersedia! User bisa toggle dengan tombol di navbar.

Preferensi tema akan tersimpan di localStorage, jadi tetap aktif meskipun page di-refresh.

## 📱 Responsive Breakpoints

Website otomatis menyesuaikan layout di berbagai ukuran layar:

- **Desktop**: > 968px (Grid layout, sidebar navigation)
- **Tablet**: 640px - 968px (Adjusted grid, mobile menu)
- **Mobile**: < 640px (Single column, hamburger menu)

## 🔧 Troubleshooting

### Gambar Tidak Muncul
- Pastikan file gambar ada di folder `img/`
- Cek nama file sesuai dengan yang di-reference di `script.js`
- Gunakan format JPG atau PNG
- Jika gambar tidak ada, akan muncul placeholder otomatis

### Dark Mode Tidak Berfungsi
- Buka Console browser (F12)
- Cek apakah ada error JavaScript
- Pastikan `script.js` ter-load dengan benar

### Form Contact Tidak Berfungsi
- Form hanya validasi di frontend (tidak ada backend)
- Pesan akan muncul sebagai alert notification
- Untuk mengirim email sungguhan, perlu integrasi backend

## 🚀 Tips Deployment

### Deploy ke GitHub Pages
1. Upload semua file ke GitHub repository
2. Ke Settings → Pages
3. Pilih branch `main` dan folder `root`
4. Website akan live di `https://username.github.io/repo-name`

### Deploy ke Netlify
1. Drag & drop folder `porto-website` ke Netlify
2. Website langsung live!
3. Atau connect ke GitHub repo untuk auto-deploy

### Deploy ke Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Di folder project: `vercel`
3. Follow instruksi di terminal

## 📝 Checklist Sebelum Deploy

- [ ] Ubah semua data dummy dengan data pribadi Anda
- [ ] Upload foto profil asli
- [ ] Update link social media
- [ ] Ganti link CV dengan file CV Anda
- [ ] Update project dengan project asli Anda
- [ ] Test di berbagai device dan browser
- [ ] Cek semua link berfungsi
- [ ] Optimasi gambar (compress untuk loading cepat)

## 🎓 Belajar Lebih Lanjut

File ini sudah dilengkapi dengan komentar di setiap bagian penting:

- **HTML**: Semantic structure dan accessibility
- **CSS**: Design system, variables, dan responsive design
- **JavaScript**: Data-driven rendering, DOM manipulation, events

Baca komentar di setiap file untuk memahami cara kerjanya!

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
1. Baca komentar di dalam kode
2. Cek console browser untuk error messages
3. Google error message yang muncul
4. Eksperimen dengan mengubah nilai-nilai kecil dulu

## 🎉 Selamat!

Website portofolio Anda sudah siap! Tinggal customize dengan data pribadi dan deploy ke internet.

**Good luck! 🚀**

---

Made with ❤️ using HTML, CSS, and JavaScript
