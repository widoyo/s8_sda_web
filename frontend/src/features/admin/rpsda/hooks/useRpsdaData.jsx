import { useEffect, useState } from "react";

import { getRpsda } from "../../../../services/rpsda";

export const useRpsdaData = () => {
  const [rpsdaData, setRpsdaData] = useState([]);
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
    const fetchRpsdaData = async () => {
      try {
        const response = await getRpsda(params);

        if (response && response.data) {
          setRpsdaData(response.data);
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

    fetchRpsdaData();
  }, [params]);

  return { rpsdaData, setParams, params, paginationInfo };
};
