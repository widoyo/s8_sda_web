import { useEffect, useState } from "react";

import { getBeritaHighlighted } from "../../../services/berita";

export const useBeritaDataHighlighted = () => {
  const [beritaDataHighlighted, setBeritaDataHighlighted] = useState([]);

  useEffect(() => {
    const fetchBeritaHighlighted = async () => {
      try {
        const response = await getBeritaHighlighted();

        if (response) {
          setBeritaDataHighlighted(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchBeritaHighlighted();
  }, []);

  return { beritaDataHighlighted };
};
