import { useEffect, useState } from "react";

import { getBerita } from "../../../../services/berita";

export const useBeritaData = () => {
  const [beritaData, setBeritaData] = useState([]);
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
    const fetchUser = async () => {
      try {
        const response = await getBerita(params);
        console.log(response);

        if (response && response.data) {
          setBeritaData(response.data);
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

    fetchUser();
  }, [params]);

  return { beritaData, setParams, params, paginationInfo };
};
