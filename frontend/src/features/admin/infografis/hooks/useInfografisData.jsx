import { useCallback, useEffect, useState } from "react";

import { getInfoGrafis } from "../../../../services/infografis";

export const useInfografisData = () => {
  const [infografisData, setInfografisData] = useState([]);
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

  const fetchInfografisData = useCallback(async () => {
    try {
      const response = await getInfoGrafis(params);

      if (response && response.data) {
        setInfografisData(response.data);
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
    fetchInfografisData();
  }, [fetchInfografisData]);

  return { infografisData, setParams, params, paginationInfo };
};
