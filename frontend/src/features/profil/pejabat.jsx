import React from 'react';

// Import gambar
import fotoKabalai from '../../assets/pejabat/ka_balai.webp'; 
import fotoPejabat2 from '../../assets/pejabat/kabid_kpisda.webp';
import fotoPejabat3 from '../../assets/pejabat/kabid_op2.webp';
import fotoPejabat4 from '../../assets/pejabat/kabid_pjpa.webp';
import fotoPejabat5 from '../../assets/pejabat/kabid_pjsa.webp';

const ProfilePejabat = () => {
  const daftarPejabat = [
    { id: 2, nama: "Rifki Maulana ST., MT.", jabatan: "KaBid Keterpaduan Pembangunan Infrastruktur SDA", foto: fotoPejabat2 },
    { id: 3, nama: "Antonius Suryono S.H., ST., M.MT.", jabatan: "Kabid Operasi dan Pemeliharaan", foto: fotoPejabat3 },
    { id: 4, nama: "Hendra Yuldi ST. MT.", jabatan: "Kabid Pelaksanaan Jaringan Pemanfaatan Air", foto: fotoPejabat4 },
    { id: 5, nama: "Darwismai ST. MPSDA", jabatan: "Kabid Pelaksanaan Jaringan Sumber Air", foto: fotoPejabat5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      {/* Header Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Profil Pejabat
        </h1>
        <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg">
          Balai Besar Wilayah Sungai Sumatera VIII
        </p>
      </div>

      {/* --- BARIS 1: KEPALA BALAI (Satu Baris Sendiri & Di Tengah) --- */}
      <div className="flex justify-center mb-20">
        {/* Kontainer Kepala Balai: Lebar 1/4 pada desktop (lg:w-1/4) */}
        <div className="w-full md:w-1/2 lg:w-1/4 group">
          <div className="relative overflow-hidden rounded-2xl bg-gray-200 shadow-xl aspect-[3/4]">
            <img
              src={fotoKabalai}
              alt="Agus Safari ST., MT"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Kepala Balai
            </p>
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              Agus Safari ST., MT.
            </h3>
          </div>
        </div>
      </div>

      {/* --- BARIS 2: PEJABAT LAINNYA (Grid 4 Kolom) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {daftarPejabat.map((pejabat) => (
          <div key={pejabat.id} className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg aspect-[3/4]">
              <img
                src={pejabat.foto}
                alt={pejabat.nama}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                {pejabat.jabatan}
              </p>
              <h3 className="text-xl font-bold text-gray-800 leading-tight">
                {pejabat.nama}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePejabat;