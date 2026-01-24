import { useEffect, useState } from "react";

import { getBerita } from "../../../../services/berita";
import { getMajalah } from "../../../../services/majalah";

export const useMajalahData = () => {
  const [majalahData, setMajalahData] = useState([]);
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
    const fetchMajalahData = async () => {
      try {
        const response = await getMajalah(params);

        if (response && response.data) {
          setMajalahData(response.data);
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

    fetchMajalahData();
  }, [params]);

  return { majalahData, setParams, params, paginationInfo };
};
