import { useEffect, useState } from "react";

import Card from "../../components/card";
import { Hash } from "../../constants";
import { getTugasFungsi } from "../../services/tugas-fungsi/api";
import { truncateText } from "../../utils/truncate-text";
import { useBeritaData } from "../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";

const TugasFungsi = () => {
  const navigate = useNavigate();
  const { beritaData } = useBeritaData();

  const [tugasFungsi, setTugasFungsi] = useState(null);

  useEffect(() => {
    const fetchTugasFungsi = async () => {
      try {
        const response = await getTugasFungsi();
        setTugasFungsi(response.data.content); // Store the data in state
      } catch (error) {
        console.error("Error fetching Pola Rencana data:", error);
      }
    };

    fetchTugasFungsi();
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.11.43.jpeg"
        alt="Call center picture"
      />

      <section className="flex flex-col lg:flex-row p-10">
        <div className="flex flex-col lg:w-3/4 w-full gap-5 px-10 mb-10">
          <h1 className="text-2xl font-semibold">Tugas dan Fungsi</h1>
          <div className="border-t w-20 border-indigo " />
          {tugasFungsi ? (
            <div
              className="w-full object-cover"
              dangerouslySetInnerHTML={{ __html: tugasFungsi }} // Render HTML content
            />
          ) : (
            <p>Loading Tugas dan Fungsi...</p>
          )}
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

export default TugasFungsi;
