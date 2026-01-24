import Card from "../../components/card";
import { Hash } from "../../constants";
import { truncateText } from "../../utils/truncate-text";
import { useBeritaData } from "../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";

const Sejarah = () => {
  const navigate = useNavigate();
  const { beritaData } = useBeritaData();
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[400px] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.09.11.jpeg"
        alt="Call center picture"
      />

      <section className="flex flex-col lg:flex-row p-10">
        <div className="flex flex-col lg:w-3/4 w-full gap-5 px-10 mb-10">
          <h1 className="text-2xl font-semibold">Sejarah</h1>
          <div className="border-t w-20 border-indigo " />

          <p className="text-base">
            Balai Besar Wilayah Sungai Sumatera VIII (BBWS Sumatera) VIII
            bermula dari Proyek Pembukaan Persawahan Pasang Surut (P4S) Sumatera
            Selatan pada tahun 1976 s.d 1983. Kemudian pada tahun 1984 s.d 1993
            berubah menjadi Badan Pelaksana Proyek Pengairan Pasang Surut (P3S)
            Sumatera Selatan. Pada tahun 1994 s.d 2001 berganti menjadi Proyek
            Pengembangan Daerah Rawa (P2DR) Sumatera Selatan.
            <br></br>
            <br></br>
            Tahun 2002 s.d 2004 berganti menjadi Proyek Irigasi dan Rawa Andalan
            Sumatera Selatan. Penamaan “Andalan” di Sumatera Selatan, tidak
            lepas dari potensi Sumsel, yang secara rill sebagai lumbung pangan
            dan energi nasional.
            <br></br>
            <br></br>
            Namun beriring dengan berjalannya waktu, tahun 2005 berganti nama
            menjadi Satuan Kerja Sementara Irigasi dan Rawa Andalan (SKS IRA)
            Sumatera Selatan. Kemudian tahun 2006 berubah menjadi Satuan Kerja
            Irigasi dan Rawa Sumatera Selatan (Satker IRA SS). Baru kemudian
            tahun 2007 s.d 2008 berubah menjadi Balai Wilayah Sungai Sumatera
            (BWSS) VIII.
            <br></br>
            <br></br>
            Pada awalnya Balai Besar Wilayah Sungai Sumatera (BBWSS) diusulkan
            untuk menjadi Balai Besar tipe B bukan tipe A. Namun karena cakupan
            wilayah kerja yang luas, maka akhirnya BBWS Sumatera VIII menjadi
            Balai Besar bertipe A.
          </p>
        </div>
        <div className="flex flex-col space-y-5 border border-indigo rounded-sm mx-auto lg:w-1/3 w-full h-fit">
          <h1 className="text-2xl border-b border-b-indigo p-2 bg-indigo text-white">
            Berita Terkini
          </h1>
          <div className="flex flex-col ">
            {beritaData.map((item, index) => (
              <Card
                key={index}
                shadow={true}
                rounded={true}
                className="transition-transform transform hover:scale-95 hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/berita?id=${item.id}${Hash.DETAIL}`)}
              >
                <div className="flex p-2">
                  <img
                    src={item.img}
                    alt={"photo"}
                    className="h-36 w-36 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h1 className="text-md text-indigo">
                      {truncateText(item.title, 100)}
                    </h1>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sejarah;
