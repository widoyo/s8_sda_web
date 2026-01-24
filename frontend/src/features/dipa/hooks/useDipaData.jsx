import { useEffect, useState } from "react";

import { getDipa } from "../../../services/dipa";

export const useDipaData = () => {
  const [dipaData, setDipaData] = useState([]);
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
    const fetchDipa = async () => {
      try {
        const response = await getDipa();

        if (response) {
          setDipaData(response.data);
          setPaginationInfo({
            totalItems: response.meta.totalItems,
            totalPages: response.meta.totalPages,
            currentPage: response.meta.currentPage,
            itemsPerPage: response.meta.itemsPerPage,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchDipa();
  }, [params]);

  return { dipaData, params, setParams, paginationInfo };
};
