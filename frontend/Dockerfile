# STAGE 1: Build (Di dalam Docker)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Svelte/React akan menghasilkan folder build/dist di sini
RUN npm run build

# STAGE 2: Serve (Menggunakan Nginx)
FROM nginx:stable-alpine

# Hapus file default Nginx agar bersih
RUN rm -rf /usr/share/nginx/html/*

# Buat folder sesuai path (subfolder)
RUN mkdir -p /usr/share/nginx/html/balai/bbwssumatera8

# PERBAIKAN: Ambil dari stage 'builder', bukan dari folder lokal
# Perhatikan '--from=builder'. Ini mengambil file dari Stage 1 di atas.
# Sesuaikan '/app/dist' dengan folder output build Anda (bisa 'dist' atau 'build')
COPY --from=builder /app/dist /usr/share/nginx/html/balai/bbwssumatera8

# Salin konfigurasi Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]