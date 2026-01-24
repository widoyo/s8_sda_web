const Profil = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.07.39.jpeg"
        alt="Call center picture"
      />

      {/* Section 1: Tentang Kami */}
      <div className="flex flex-wrap items-center justify-center py-8 px-4 md:px-16">
        <div className="md:w-1/2 w-full px-4">
          <h2 className="text-2xl md:text-3xl font-bold">TENTANG KAMI</h2>
          <div className="border-t w-20 border-indigo my-4" />
          <div className="space-y-3">
            <p className="text-base md:text-lg">
              <span className="font-semibold">
                Balai Besar Wilayah Sungai (BBWS) Sumatera VIII
              </span>{" "}
              adalah salah satu unit pelaksana teknis di bawah Kementerian
              Pekerjaan Umum (PU) Republik Indonesia,
              yang bertanggung jawab atas pengelolaan sumber daya air di wilayah
              Sungai yang berada di wilayah Provinsi Sumatera bagian Selatan.
            </p>
            <p className="text-base md:text-lg">
              Secara spesifik, tugas utama dari BBWS Sumatera VIII adalah
              merencanakan, melaksanakan, dan mengawasi pembangunan serta
              pengelolaan infrastruktur sumber daya air, seperti bendungan,
              irigasi, pengendalian banjir, dan sistem drainase, serta menjaga
              kelestarian lingkungan perairan di wilayah tersebut.
            </p>
            <p className="text-base md:text-lg">
              BBWS Sumatera VIII juga memiliki peran penting dalam koordinasi
              pengelolaan wilayah sungai, mitigasi bencana terkait air (seperti
              banjir dan kekeringan), serta mendukung keberlanjutan pemanfaatan
              air untuk berbagai kebutuhan, termasuk pertanian, industri, dan
              kebutuhan domestik.
            </p>
            <p className="text-base md:text-lg">
              Tujuan utama dari BBWS ini adalah untuk mewujudkan pengelolaan
              sungai yang berkelanjutan dan mendukung kesejahteraan masyarakat
              yang bergantung pada sumber daya air.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full px-4 sm:mt-6">
          <img
            className="w-full h-[300px] md:h-[400px] rounded-md shadow-md object-cover"
            src={
              "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.11.43.jpeg"
            }
            alt="River infrastructure"
          />
        </div>
      </div>

      {/* Section 2: Visi */}
      <div className="flex flex-wrap items-center justify-center bg-indigo text-white py-8 px-4 md:px-16">
        <div className="md:w-1/2 w-full px-4">
          <img
            className="w-full h-[300px] md:h-[400px] rounded-md shadow-md object-cover"
            src={
              "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.09.11.jpeg"
            }
            alt="Community picture"
          />
        </div>
        <div className="md:w-1/2 w-full px-4 sm:mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">VISI</h2>
          <div className="border-t w-20 border-white my-4" />
          <p className="mb-4 text-base md:text-lg">
            Terwujudnya pengelolaan dan pendayagunaan sumber daya air secara
            adil, merata dan berkelanjutan, dan berperan aktif dalam upaya
            mewujudkan Sumatera Selatan sebagai Lumbung Pangan dalam rangka
            mendukung program ketahanan pangan nasional.
          </p>
        </div>
      </div>

      {/* Section 3: Misi */}
      <div className="flex flex-wrap items-center justify-center py-8 px-4 md:px-16">
        <div className="md:w-1/2 w-full px-4">
          <h2 className="text-2xl md:text-3xl font-bold">MISI</h2>
          <div className="border-t w-20 border-indigo my-4" />
          <p className="mb-4 text-base md:text-lg">
            Untuk mewujudkan misi tersebut, BBWS Sumatera VIII menetapkan misi
            sebagai berikut :<br></br>
            1. Konservasi sumber daya air secara konsisten dan berkelanjuan.
            <br></br>
            2. Pengendalian dan penanggulangan daya rusak air.
            <br></br>
            3. Pendayagunaan sumber daya air secara adil dan merata.
            <br></br>
            4. Pemberdayaan dan peningkatan peran masyarakat, swasta dan
            pemerintah.
            <br></br>
            5. Peningkatan ketersediaan dan keterbukaan data serta informasi
            sumber daya air.
            <br></br>
            6. Penyelenggaraan administrasi pemerintahan yang baik.
          </p>
        </div>
        <div className="md:w-1/2 w-full px-4 sm:mt-6">
          <img
            className="w-full h-[300px] md:h-[400px] rounded-md shadow-md object-cover"
            src={
              "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.10.15.jpeg"
            }
            alt="Development picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Profil;
