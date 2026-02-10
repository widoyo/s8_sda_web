import React, { useState } from 'react';

const TugasFungsi = () => {
  const [activeTab, setActiveTab] = useState('tugas');

  const daftarTugas = [
    "Penyusunan pola dan rencana pengelolaan sumber daya air pada wilayah Sungai.",
    "Penyusunan rencana dan program, studi kelayakan dan perencanaan teknis/desain/pengembangan sumber daya air.",
    "Persiapan, penyusunan rencana dan dokumen pengadaan barang dan jasa.",
    "Pelaksanaan pengadaan barang dan jasa serta penetapan pemenang selaku Unit Layanan Pengadaan (ULP).",
    "Pengendalian dan pengawasan konstruksi pelaksanaan Pembangunan sumber daya air.",
    "Penyusunan rencana dan pelaksanaan pengelolaan Kawasan lindung sumber air pada wilayah Sungai.",
    "Pengelolaan sumber daya air (Konservasi, Pendayagunaan, & Pengendalian Daya Rusak).",
    "Pengelolaan sistem hidrologi.",
    "Pengelolaan sistem informasi sumber daya air.",
    "Pelaksanaan operasi dan pemeliharaan sumber daya air.",
    "Bimbingan teknis pengelolaan SDA kewenangan provinsi/kabupaten/kota.",
    "Penyiapan rekomendasi teknis perizinan SDA.",
    "Fasilitasi kegiatan TKPSDA pada wilayah Sungai.",
    "Pemberdayaan Masyarakat dalam pengelolaan SDA.",
    "Penyusunan laporan akuntansi keuangan dan BMN.",
    "Pelaksanaan pemungutan dan penggunaan BJPSDA.",
    "Urusan tata usaha, rumah tangga balai, dan koordinasi instansi."
  ];

  const daftarFungsi = [
    "Penyusunan pola dan rencana pengelolaan SDA.",
    "Penyusunan program dan rencana kegiatan pengelolaan SDA.",
    "Pemantauan dan evaluasi penerapan pola pengelolaan SDA.",
    "Studi kelayakan dan perencanaan teknis/desain SDA.",
    "Pelaksanaan pengadaan barang dan jasa (ULP).",
    "Penyelenggaraan sistem manajemen mutu dan SMK3.",
    "Konservasi, pendayagunaan, dan pengendalian daya rusak air.",
    "Pengelolaan drainase utama perkotaan.",
    "Pengelolaan sistem hidrologi dan informasi SDA.",
    "Operasi dan pemeliharaan SDA pada wilayah Sungai.",
    "Bimbingan teknis pengelolaan SDA.",
    "Penyusunan rekomendasi teknis izin penggunaan SDA.",
    "Fasilitasi kegiatan TKPSDA.",
    "Pemberdayaan Masyarakat.",
    "Penyusunan laporan akuntansi keuangan dan BMN.",
    "Pemungutan dan penggunaan BJPSDA.",
    "Urusan tata usaha, rumah tangga, dan komunikasi publik.",
    "Penyusunan perjanjian dan laporan kinerja balai.",
    "Pemantauan, pengawasan, dan penyidikan tindak pidana bidang SDA."
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Tugas &amp; Fungsi Organisasi
        </h1>
        <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
      </div>
      {/* Tombol Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('tugas')}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'tugas' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            TUGAS
          </button>
          <button
            onClick={() => setActiveTab('fungsi')}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'fungsi' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            FUNGSI
          </button>
        </div>
      </div>

      {/* Konten Daftar */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
            {activeTab === 'tugas' ? 'Tugas Utama Balai' : 'Fungsi Strategis Balai'}
          </h2>
          
          <ul className="grid grid-cols-1 gap-4">
            {(activeTab === 'tugas' ? daftarTugas : daftarFungsi).map((item, index) => (
              <li 
                key={index}
                className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300 border border-transparent hover:border-blue-100 group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-1">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TugasFungsi;