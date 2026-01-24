import { useEffect, useState } from "react";

import { getLayananTerpadu } from "../../../services/layanan-terpadu";

export const useLayananTerpaduData = () => {
  const [layananTerpaduData, setLayananTerpaduData] = useState([]);

  useEffect(() => {
    const fetchLayananTerpadu = async () => {
      try {
        const response = await getLayananTerpadu();

        if (response) {
          setLayananTerpaduData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchLayananTerpadu();
  }, []);

  return { layananTerpaduData };
};
