import { useEffect, useState } from "react";

import { getPeraturan } from "../../../../services/peraturan";

export const usePeraturanData = () => {
  const [peraturanData, setPeraturanData] = useState([]);
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
    const fetchPeraturanData = async () => {
      try {
        const response = await getPeraturan(params);

        if (response && response.data) {
          setPeraturanData(response.data);
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

    fetchPeraturanData();
  }, [params]);

  return { peraturanData, setParams, params, paginationInfo };
};
