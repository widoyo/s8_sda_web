import { useEffect, useState } from "react";

import { getRpsdaDetail } from "../../../services/rpsda/api";

export const useRpsdaDetail = (id) => {
  const [rpsdaDetail, setRpsdaDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchRpsdaDetail = async () => {
        try {
          const response = await getRpsdaDetail(id);

          if (response.data) {
            setRpsdaDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching RPSDA data:", error);
        }
      };

      fetchRpsdaDetail();
    }
  }, [id]);

  return rpsdaDetail;
};
