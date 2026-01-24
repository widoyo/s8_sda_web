import { useEffect, useState } from "react";

import { getPengumumanDetail } from "../../../../services/pengumuman";

export const usePengumumanDetail = (id) => {
  const [pengumumanDetail, setPengumumanDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchPengumumanDetail = async () => {
        try {
          const response = await getPengumumanDetail(id);

          if (response.data) {
            setPengumumanDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchPengumumanDetail();
    }
  }, [id]);

  return pengumumanDetail;
};
