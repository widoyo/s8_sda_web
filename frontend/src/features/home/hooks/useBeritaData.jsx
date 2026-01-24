import { useEffect, useState } from "react";

import { getBerita } from "../../../services/berita";

export const useBeritaData = () => {
  const [beritaData, setBeritaData] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    sort: "newest",
    search: "",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await getBerita(params);

        if (response) {
          setBeritaData(response.data);
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

    fetchBerita();
  }, [params]);

  return { beritaData, params, setParams, paginationInfo };
};
