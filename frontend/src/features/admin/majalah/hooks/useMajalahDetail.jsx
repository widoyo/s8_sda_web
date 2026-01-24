import { useEffect, useState } from "react";

import { getMajalahDetail } from "../../../../services/majalah";

export const useMajalahDetail = (id) => {
  const [majalahDetail, setMajalahDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchMajalahDetail = async () => {
        try {
          const response = await getMajalahDetail(id);

          if (response.data) {
            setMajalahDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchMajalahDetail();
    }
  }, [id]);

  return majalahDetail;
};
