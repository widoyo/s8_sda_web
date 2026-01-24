import { useEffect, useState } from "react";

import Card from "../../components/card";
import { Hash } from "../../constants";
import { getSO } from "../../services/struktur-organisasi/api";
import { truncateText } from "../../utils/truncate-text";
import { useBeritaData } from "../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";
import { getPrediksiCuaca } from "../../services/prediksi-cuaca";

const PrediksiCuaca = () => {
  const navigate = useNavigate();
  const { beritaData } = useBeritaData();

  const [prediksiCuaca, setPrediksiCuaca] = useState(null);

  useEffect(() => {
    const fetchPrediksiCuaca = async () => {
      try {
        const response = await getPrediksiCuaca();
        setPrediksiCuaca(response.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching Pola Rencana data:", error);
      }
    };

    fetchPrediksiCuaca();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex flex-col p-10 w-full gap-5">
        <h1 className="text-2xl font-semibold">Prediksi Cuaca Hari Ini</h1>
        <div className="border-t w-20 border-indigo " />
        {prediksiCuaca ? (
          <img
            className="w-full object-cover"
            src={prediksiCuaca.img}
            alt="Prediksi Cuaca picture"
          />
        ) : (
          <p>Loading Prediksi Cuaca...</p>
        )}
      </section>
    </div>
  );
};

export default PrediksiCuaca;
