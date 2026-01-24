import { useEffect, useState } from "react";

import { getGalleryDetail } from "../../../../services/gallery/api";

export const useGalleryDetail = (id) => {
  const [galleryDetail, setGalleryDetail] = useState();

  useEffect(() => {
    if (id) {
      const fetchGalleryDetail = async () => {
        try {
          const response = await getGalleryDetail(id);

          if (response.data) {
            setGalleryDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchGalleryDetail();
    }
  }, [id]);

  return galleryDetail;
};
