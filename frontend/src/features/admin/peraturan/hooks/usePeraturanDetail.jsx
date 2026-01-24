import { useEffect, useState } from "react";

import { getPeraturanDetail } from "../../../../services/peraturan";

export const usePeraturanDetail = (id) => {
  const [peraturanDetail, setPeraturanDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchPeraturanDetail = async () => {
        try {
          const response = await getPeraturanDetail(id);

          if (response.data) {
            setPeraturanDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchPeraturanDetail();
    }
  }, [id]);

  return peraturanDetail;
};
