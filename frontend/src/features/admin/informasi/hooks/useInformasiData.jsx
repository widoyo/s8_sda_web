import { useEffect, useState } from "react";

import { getInformasi } from "../../../../services/informasi";

export const useInformasiData = () => {
  const [informasiData, setInformasiData] = useState([]);
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
        const response = await getInformasi(params);
        console.log(response);

        if (response && response.data) {
          setInformasiData(response.data);
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

  return { informasiData, setParams, params, paginationInfo };
};
