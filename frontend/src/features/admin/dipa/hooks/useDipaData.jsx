import { useEffect, useState } from "react";

import { getDipa } from "../../../../services/dipa";

export const useDipaData = () => {
  const [dipaData, setDipaData] = useState([]);
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
    const fetchDipaData = async () => {
      try {
        const response = await getDipa(params);

        if (response && response.data) {
          setDipaData(response.data);
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

    fetchDipaData();
  }, [params]);

  return { dipaData, setParams, params, paginationInfo };
};
