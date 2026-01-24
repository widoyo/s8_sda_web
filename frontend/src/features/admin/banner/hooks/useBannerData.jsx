import { useEffect, useState } from "react";

import { getBanner } from "../../../../services/banner";

export const useBannerData = () => {
  const [bannerData, setBannerData] = useState([]);
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
    const fetchBannerData = async () => {
      try {
        const response = await getBanner(params);

        if (response && response.data) {
          setBannerData(response.data);
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

    fetchBannerData();
  }, [params]);

  return { bannerData, setParams, params, paginationInfo };
};
