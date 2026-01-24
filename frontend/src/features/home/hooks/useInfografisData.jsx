import { getInfoGrafis } from "../../../services/infografis";
import { useEffect, useState } from "react";

export const useInfografisData = () => {
  const [infografisData, setInfografisData] = useState([]);

  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const response = await getInfoGrafis();

        if (response) {
          setInfografisData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchInfografis();
  }, []);

  return { infografisData };
};
