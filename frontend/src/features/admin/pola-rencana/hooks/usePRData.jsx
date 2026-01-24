import { useEffect, useState } from "react";

import { getPR } from "../../../../services/pola-rencana";

export const usePRData = () => {
  const [prData, setPRData] = useState();

  useEffect(() => {
    const fetchPRData = async () => {
      try {
        const response = await getPR();

        if (response.data) {
          setPRData(response.data);
        }
      } catch (error) {
        console.error("Error fetching PR data:", error);
      }
    };
    fetchPRData();
  }, []);

  return prData;
};
