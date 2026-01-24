import { useEffect, useState } from "react";

import { getSO } from "../../../../services/struktur-organisasi";

export const useSOData = () => {
  const [soData, setSOData] = useState();

  useEffect(() => {
    const fetchSOData = async () => {
      try {
        const response = await getSO();

        if (response.data) {
          setSOData(response.data);
        }
      } catch (error) {
        console.error("Error fetching SO data:", error);
      }
    };
    fetchSOData();
  }, []);

  return soData;
};
