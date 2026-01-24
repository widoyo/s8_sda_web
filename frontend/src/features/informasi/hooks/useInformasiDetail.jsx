import { useEffect, useState } from "react";

import { getInformasiDetail } from "../../../services/informasi";

export const useInformasiDetail = (id) => {
  const [informasiDetail, setInformasiDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchInformasiDetail = async () => {
        try {
          const response = await getInformasiDetail(id);

          if (response.data) {
            setInformasiDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchInformasiDetail();
    }
  }, [id]);

  return informasiDetail;
};
