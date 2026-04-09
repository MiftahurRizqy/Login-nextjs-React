# Secure Login Challenge 🚀

Proyek aplikasi web yang mengimplementasikan sistem autentikasi modern dan solid, ditujukan sebagai demonstrasi keahlian pemrograman *Full-stack*. Dilengkapi dengan antarmuka yang sangat estetik bergaya desain *Glassmorphism* serta proteksi keamanan berlapis di sisi backend.

🌟 **Live Demo & Preview:** Anda dapat langsung mencoba aplikasi ini secara daring (online) melalui Vercel di tautan berikut:
**[https://login-nextjs-react.vercel.app/login](https://login-nextjs-react.vercel.app/login)**

---

## 🛠️ Tech Stack (Tumpukan Teknologi)

Aplikasi ini tidak dibangun dengan tumpukan standar biasa, melainkan memaksimalkan arsitektur modern skala perusahaan *(Enterprise-ready Architecture)*:

*   **Core Framework:** `Next.js 16` (App Router) + `React 19`
*   **Styling (UI/UX):** `Tailwind CSS v4` untuk implementasi kelas desain responsif, *Dark Mode*, tipe animasi transparan (*blur backdrop*), hingga interaksi statis dan dinamis.
*   **Akses Database:** `Prisma ORM` terhubung langsung secara mulus *(native)* ke basis relasi data.
*   **Database Engine:** `MySQL` (Di-hosting melalui integrasi *localhost* XAMPP).
*   **Security & Auth:** `bcryptjs` (Hashing password 1-arah), `jsonwebtoken` ter-enkripsi melalui Cookie `HttpOnly` untuk keamanan manajemen sesi dari manipulasi XSS.
*   **Testing:** `Jest` dan `@testing-library` dikonfigurasi untuk menjalankan *Unit Testing* terisolasi.

---

## 🏛️ Penjelasan Arsitektur (Architecture Flow)

Arsitektur aplikasi terpusat di dalam lingkungan **Next.js Serverless**, memecah dinding batasan antara Frontend dan Backend ke dalam satu tempat yang saling terkoneksi aman:

1.  **Frontend & Validasi Lapis Pertama (The Edge UI):**
    Pengguna berinteraksi dengan halaman `/login` yang dibangun murni di atas *Client Components* React. Sebelum data dikirim, sistem ini melakukan validasi reguler ekstrim untuk mencegah input kosong (*missing text*) atau formulir email asal-asalan. Komponen UI (*Spinner Loaders*, peringatan kegagalan, *Dark Mode Toggle*) dirantai lurus terhadap eksekusi transisi _state_ instan.

2.  **Sistem Bouncer (In-Memory IP Rate Limiter):**
    Begitu permintaan masuk, *Node.js API Route* kita (`/api/auth/login`) tidak akan meneruskan permintaan sembarangan. Algoritma `Map` Cache In-Memory akan melacak *IP Address*. Bila koneksi tersebut melanggar aturan maksimum percobaan **(maks. 5 kali/menit)**, sistem pem-blokir mencegah akses lanjutan *(status 429 Too Many Requests)*. Sistem ini mematikan pergerakan *hacker* pencoba kombinasi *Brute-force* sekaligus meringankan beban komputasi server *Database*.

3.  **ORM dan Manajemen Akun Berbasis Prisma (Bcrypt Hash Engine):**
    Beban pencarian email diproses efisien menembus database MySQL lewat **Prisma ORM**. Saat email ditemukan pun, kata sandinya dilindungi oleh komputasi enkripsi lanjutan menggunakan algoritma pencocokan `bcrypt.compare`.

4.  **Akses Terproteksi (JWT & Edge Middleware):**
    Bila di-izinkan masuk ke rute istimewa `/dashboard`, `jsonwebtoken` memproduksi kunci token spesifik yang dipatok ke _Cookie HttpOnly_. Setiap kali rute di dalam area tersebut dipanggil kembali, ada komponen **Middleware Next.js & Server Side Verification** yang diam-diam berfungsi bak portal pelindung *(Portal Guard)* untuk mendeteksi keaslian dan masa berlaku JWT tesebut lalu menetapkan penolakan atau perijinan. Membuktikan bahwa alur rute Dashboard 100% rahasia dari pihak luar.

---

## 🚀 Cara Menjalankan Project (How to Run)

Karena konfigurasi dirangkai supaya ringan dan seketika bisa terhubung, langkah untuk menjalankannya mudah bagi Tim Asesor. 
Pastikan modul **MySQL** pada _Control Panel XAMPP_ Anda sedang berada dalam keadaan berjalan *(Running/Start)*.

### 1. Instalasi Modul
Jika aplikasi baru saja dipindah (tanpa folder _node_modules_), jalankan instalasi Node Package terlebih dahulu via terminal OS bawaan Anda:
```bash
npm install
```

### 2. Sinkronisasikan Model Basis Data
Jalankan pendorong Prisma (menyelaraskan tabel database):
```bash
npx prisma db push
```
*(Apabila ada database baru, _seed script_ akan mempopulasikan akun Admin tunggal via eksekusi `node seed.mjs`)*.

### 3. Eksekusi Lingkungan Development
Jalankan simulasi server pengembang (*Development Server*): 
```bash
npm run dev
```
Setelah aktif asikroonously, Anda cukup Membuka browser kesayangan Anda dan mengunjungi tautan virtual lokal **http://localhost:3000**.

### 4. Menjalankan Unit Tester Otomatis (Bonus)
Jika Anda ingin melacak kelayakan validasi melalui sistem pelacakan Jest, ketik kode terminal ini:
```bash
npm run test
```

---

## 🔑 Akun Demo (Seeded Credentials Test Area)
Untuk memudahkan Anda melompat menuju bagian pelacakan antarmuka login (*Simulasi UI*), berikut adalah pintu akses pintas khusus Admin:
- **Email / Username :** `admin@example.com`
- **Sandi Sandi (Pass) :** `password123`

---
*Dibangun dengan penuh semangat dan arsitektur rapi siap tayang (production-ready). Terima Kasih!*
