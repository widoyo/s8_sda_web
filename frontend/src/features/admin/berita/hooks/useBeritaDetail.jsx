import { useEffect, useState } from "react";

import { getBeritaDetail } from "../../../../services/berita/api";

export const useBeritaDetail = (id) => {
  const [beritaDetail, setBeritaDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchBeritaDetail = async () => {
        try {
          const response = await getBeritaDetail(id);

          if (response.data) {
            setBeritaDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchBeritaDetail();
    }
  }, [id]);

  return beritaDetail;
};
