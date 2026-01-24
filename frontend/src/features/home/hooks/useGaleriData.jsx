import { useEffect, useState } from "react";
import { getGallery } from "../../../services/gallery";

export const useGaleriData = () => {
  const [galeriData, setGaleriData] = useState([]);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const response = await getGallery();

        if (response) {
          setGaleriData(response.data.slice(0, 10)); // Limit to 10 items
        }
      } catch (error) {
        console.error("Error fetching galeri data:", error);
      }
    };

    fetchGaleri();
  }, []);

  return { galeriData };
};
