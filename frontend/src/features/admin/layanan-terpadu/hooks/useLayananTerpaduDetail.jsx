import { useEffect, useState } from "react";

import { getLayananTerpaduDetail } from "../../../../services/layanan-terpadu";

export const useLayananTerpaduDetail = (id) => {
  const [layananTerpaduDetail, setLayananTerpaduDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchLayananTerpaduDetail = async () => {
        try {
          const response = await getLayananTerpaduDetail(id);

          if (response.data) {
            setLayananTerpaduDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchLayananTerpaduDetail();
    }
  }, [id]);

  return layananTerpaduDetail;
};
