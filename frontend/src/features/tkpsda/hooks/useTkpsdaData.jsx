import { useEffect, useState } from "react";

import { getTkpsda } from "../../../services/mock-data";

export const useTkpsda = () => {
  const [tkpsda, setTkpsda] = useState([]);

  useEffect(() => {
    const fetchTkpsda = async () => {
      try {
        const response = getTkpsda();

        if (response) {
          setTkpsda(response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchTkpsda();
  }, []);

  return { tkpsda };
};
