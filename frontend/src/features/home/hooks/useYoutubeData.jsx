import { useEffect, useState } from "react";

import { getYoutube } from "../../../services/youtube";

export const useYoutubeData = () => {
  const [youtubeData, setYoutubeData] = useState([]);

  useEffect(() => {
    const fetchYoutube = async () => {
      try {
        const response = await getYoutube();

        if (response) {
          setYoutubeData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchYoutube();
  }, []);

  return { youtubeData };
};
