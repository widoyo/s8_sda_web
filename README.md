# Website SDA (Sumber Daya Air) BBWS Sumatera VIII

Aplikasi fullstack website Balai, di bawah Dirjen SDA Kementrian PUPR, yang berfungsi untuk menampilkan informasi terkait Sumber Daya Air di wilayah kerja BBWS Sumatera VIII.

## Fitur Utama

- Informasi Berita dan Kegiatan
- Data dan Statistik Sumber Daya Air
- Galeri Foto dan Video
- Kontak dan Lokasi Kantor
- Integrasi Peta Interaktif

## Teknologi yang Digunakan

- Frontend: React.js, RadixUI, Tailwind CSS
- Backend: Node.js, Express.js
- Database: Mysql
- Orkestrasi: Docker, Docker Compose

## Struktur Proyek

```plaintext
s8_sda_web/
├── backend/                # Kode sumber backend
├── frontend/               # Kode sumber frontend
├── docker-compose.yml      
└── README.md               # Dokumentasi proyek
```

## Instalasi dan Penggunaan

- Pastikan Anda memiliki Docker dan Docker Compose terinstal di sistem Anda.
- Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi sesuai kebutuhan Anda.
- Jalankan perintah berikut untuk membangun dan menjalankan aplikasi:

  ```bash
  docker-compose up --build
  ```

- Akses aplikasi melalui browser di `http://localhost:3000`.

## Kontribusi
Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk diskusi lebih lanjut.
