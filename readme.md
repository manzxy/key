# 🌌 MANZXY ID — Platform Baca Manhwa Modern

MANZXY ID adalah platform baca **manhwa** modern dengan desain grid futuristik, login Google/GitHub, fitur komentar interaktif (reply, like, spoiler filter), sistem badge/title pengguna, serta panel admin untuk mengelola seri dan pengguna.

---

## 🚀 Fitur Utama

- 🔐 Login menggunakan **Google** atau **GitHub**
- 📚 Tambah, edit, dan hapus **seri manhwa**
- 🧭 Mode **User** dan **Admin** dengan badge visual
- 💬 Sistem komentar:
  - Reply & Like
  - Deteksi **spoiler otomatis**
  - Auto-ban sementara/permanen untuk spam & spoiler terbuka
- 📈 Leveling title pengguna berdasarkan aktivitas komentar
- ✉️ Notifikasi email (via Gmail API)
- 🧾 Edit profil, nama, dan sandi
- 🌙 UI dark modern grid dengan tampilan bersih dan responsif

---

## 🧩 Struktur Proyek

manzxy-id/ ├── backend/ │   ├── server.js │   ├── routes/ │   ├── models/ │   └── controllers/ ├── frontend/ │   ├── components/ │   ├── pages/ │   ├── styles/ │   └── utils/ ├── public/ │   ├── images/ │   └── icons/ ├── .env.example ├── package.json └── README.md

---

## ⚙️ Persiapan Lingkungan

### 1️⃣ Prasyarat

| Komponen | Diperlukan |
|-----------|-------------|
| Node.js | ≥ v18 |
| npm | ≥ v9 |
| MongoDB | Lokal atau Atlas |
| Git | Optional |
| Akun Google & GitHub | Untuk OAuth Login |

---

## 💻 Instalasi di Windows

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/manzxy-id.git
   cd manzxy-id

2. Instal dependensi

npm install


3. Buat file .env Salin dari .env.example dan isi seperti:

MONGO_URI=mongodb://127.0.0.1:27017/manzxyid
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
GMAIL_USER=youremail@gmail.com
GMAIL_PASS=your_gmail_app_password
JWT_SECRET=manzxysecret


4. Jalankan MongoDB lokal

mongod


5. Jalankan proyek

npm run dev


6. Buka di browser:

http://localhost:3000




---

🖥️ Instalasi di VPS (Ubuntu/Debian)

1. Update sistem

sudo apt update && sudo apt upgrade -y


2. Instal Node.js & Git

sudo apt install -y nodejs npm git


3. Instal MongoDB

sudo apt install -y mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb


4. Clone proyek

git clone https://github.com/username/manzxy-id.git
cd manzxy-id


5. Instal dependensi

npm install


6. Setup .env (sama seperti langkah di Windows)


7. Jalankan aplikasi (production mode)

npm run build
npm start


8. Gunakan PM2 agar tetap hidup

npm install -g pm2
pm2 start backend/server.js --name manzxy-id
pm2 save
pm2 startup


9. Akses situs:

http://your-vps-ip:3000




---

☁️ Deploy ke Vercel (Frontend Only)

1. Buka https://vercel.com


2. Import repository dari GitHub


3. Pilih framework: Next.js


4. Tambahkan environment variables dari .env


5. Klik Deploy



Untuk backend, gunakan:

Render

Railway

Fly.io



---

## 🔧 Perintah Penting

Perintah	Deskripsi

npm run dev	Mode pengembangan
npm run build	Build production
npm start	Jalankan versi build
npm run seed	Tambahkan data manhwa awal
pm2 logs manzxy-id	Lihat log di VPS



---

📬 Kontak Developer

Manzxy
🧑‍💻 Telegram: @manzxy
🌐 Website: https://manzxy.id


---

📜 Lisensi

Proyek ini dirilis di bawah lisensi MIT.
Silakan digunakan dan dimodifikasi dengan mencantumkan kredit.


---

🔥 Powered by Node.js + Express + MongoDB + Next.js


---
