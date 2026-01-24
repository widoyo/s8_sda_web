import { useEffect, useState } from "react";

import { getDipaDetail } from "../../../services/dipa/api";

export const useDipaDetail = (id) => {
  const [dipaDetail, setDipaDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchDipaDetail = async () => {
        try {
          const response = await getDipaDetail(id);

          if (response.data) {
            setDipaDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchDipaDetail();
    }
  }, [id]);

  return dipaDetail;
};
