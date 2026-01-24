import { useEffect, useState } from "react";

import { getPengumuman } from "../../../services/pengumuman";

export const usePengumumanData = () => {
  const [pengumumanData, setPengumumanData] = useState([]);
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
    const fetchPengumumanData = async () => {
      try {
        const response = await getPengumuman(params);

        if (response && response.data) {
          setPengumumanData(response.data);
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

    fetchPengumumanData();
  }, [params]);

  return { pengumumanData, setParams, params, paginationInfo };
};
