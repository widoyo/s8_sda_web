import { useEffect, useState } from "react";

import { getYoutube } from "../../../../services/youtube";

export const useYoutubeData = () => {
  const [youtubeData, setYoutubeData] = useState([]);
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

  useEffect(() => {
    const fetchYoutubeData = async () => {
      try {
        const response = await getYoutube(params);

        if (response && response.data) {
          setYoutubeData(response.data);
          setPaginationInfo({
            currentPage: response.meta.currentPage,
            itemsPerPage: response.meta.itemsPerPage,
            totalPages: response.meta.totalPages,
            totalItems: response.meta.totalItems,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchYoutubeData();
  }, [params]);

  return { youtubeData, setParams, params, paginationInfo };
};
