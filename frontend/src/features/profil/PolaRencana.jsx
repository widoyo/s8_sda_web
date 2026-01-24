import { useEffect, useState } from "react";

import Card from "../../components/card";
import { Hash } from "../../constants";
import { getPR } from "../../services/pola-rencana/api";
import { truncateText } from "../../utils/truncate-text";
import { useBeritaData } from "../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";

const PolaRencana = () => {
  const navigate = useNavigate();
  const { beritaData } = useBeritaData();

  const [polaRencana, setPolaRencana] = useState(null);

  useEffect(() => {
    const fetchPolaRencana = async () => {
      try {
        const response = await getPR();
        setPolaRencana(response.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching Pola Rencana data:", error);
      }
    };

    fetchPolaRencana();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/bendung%20perjaya.jpg"
        alt="Call center picture"
      />

      <section className="flex flex-col lg:flex-row p-10">
        <div
          className={`flex flex-col ${
            beritaData >= 1 ? "lg:w-3/4" : " w-full "
          } gap-5 px-10 mb-10`}
        >
          <h1 className="text-2xl font-semibold">Pola dan Rencana</h1>
          <div className="border-t w-20 border-indigo " />
          {/* Display the Pola Rencana data */}
          {polaRencana ? (
            <iframe
              src={polaRencana.pdf}
              title="PDF Viewer"
              width="100%"
              height="100%"
              className="h-screen"
              style={{ border: "none" }}
            />
          ) : (
            <p>Loading Pola Rencana data...</p>
          )}
        </div>
        {beritaData >= 1 && (
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
                  onClick={() =>
                    navigate(`/berita?id=${item.id}${Hash.DETAIL}`)
                  }
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
        )}
      </section>
    </div>
  );
};

export default PolaRencana;
