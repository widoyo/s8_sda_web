import { useEffect, useState } from "react";

import { getPrediksiCuaca } from "../../../../services/prediksi-cuaca";

export const usePrediksiCuacaData = () => {
  const [prediksiCuacaData, setPrediksiCuacaData] = useState();

  useEffect(() => {
    const fetchPrediksiCuacaData = async () => {
      try {
        const response = await getPrediksiCuaca();

        if (response.data) {
          setPrediksiCuacaData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Prediksi Cuaca data:", error);
      }
    };
    fetchPrediksiCuacaData();
  }, []);

  return prediksiCuacaData;
};
