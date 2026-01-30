# Gunakan Nginx yang ringan
FROM nginx:stable-alpine

# Hapus file default Nginx agar bersih
RUN rm -rf /usr/share/nginx/html/*

# Buat folder sesuai path di dalam kontainer
RUN mkdir -p /usr/share/nginx/html/balai/bbwssumatera8

# SALIN folder 'dist' dari laptop Anda ke dalam kontainer
# Docker akan mengambil isi dari folder dist lokal Anda
COPY ./dist/balai/bbwssumatera8 /usr/share/nginx/html/balai/bbwssumatera8

# Salin konfigurasi Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]