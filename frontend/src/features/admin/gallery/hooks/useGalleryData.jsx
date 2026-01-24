import { useCallback, useEffect, useState } from "react";

import { getGallery } from "../../../../services/gallery";

export const useGalleryData = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    sort: "newest",
    search: "",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchGalleryData = useCallback(async () => {
    try {
      const response = await getGallery(params);

      if (response && response.data) {
        setGalleryData(response.data);
        setPaginationInfo({
          currentPage: response.meta.currentPage,
          itemsPerPage: response.meta.itemsPerPage,
          totalPages: response.meta.totalPages,
          totalItems: response.meta.totalItems,
        });
      }
    } catch (error) {
      console.error("Error fetching infografis data:", error);
    }
  }, [params]);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  return { galleryData, setParams, params, paginationInfo };
};
