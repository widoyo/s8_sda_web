import { useEffect, useState } from "react";

import { getMajalah } from "../../../services/majalah";

export const useMajalahData = () => {
  const [majalahData, setMajalahData] = useState([]);

  useEffect(() => {
    const fetchMajalah = async () => {
      try {
        const response = await getMajalah();

        if (response) {
          setMajalahData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchMajalah();
  }, []);

  return { majalahData };
};
