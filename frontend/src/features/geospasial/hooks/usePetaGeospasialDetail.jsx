import { useEffect, useState } from "react";

import { getPetaGeospasialDetail } from "../../../services/peta-geospasial";

export const usePetaGeospasialDetail = (id) => {
  const [petaGeospasialDetail, setPetaGeospasialDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchPetaGeospasialDetail = async () => {
        try {
          const response = await getPetaGeospasialDetail(id);

          if (response.data) {
            setPetaGeospasialDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchPetaGeospasialDetail();
    }
  }, [id]);

  return petaGeospasialDetail;
};
