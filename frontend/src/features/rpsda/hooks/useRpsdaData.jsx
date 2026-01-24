import { useEffect, useState } from "react";

import { getRpsda } from "../../../services/rpsda";

export const useRpsdaData = () => {
  const [rpsdaData, setRpsdaData] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    sort: "",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchRpsda = async () => {
      try {
        const response = await getRpsda();

        if (response) {
          setRpsdaData(response.data);
          setPaginationInfo({
            totalItems: response.meta.totalItems,
            totalPages: response.meta.totalPages,
            currentPage: response.meta.currentPage,
            itemsPerPage: response.meta.itemsPerPage,
          });
        }
      } catch (error) {
        console.error("Error fetching RPSDA data:", error);
      }
    };

    fetchRpsda();
  }, [params]);

  return { rpsdaData, params, setParams, paginationInfo };
};
