import { useEffect, useState } from "react";

import { getPetaGeospasial } from "../../../services/peta-geospasial";

export const usePetaGeospasialData = () => {
  const [petaGeospasialData, setPetaGeospasialData] = useState([]);
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
    const fetchPetaGeospasialData = async () => {
      try {
        const response = await getPetaGeospasial(params);

        if (response && response.data) {
          setPetaGeospasialData(response.data);
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

    fetchPetaGeospasialData();
  }, [params]);

  return { petaGeospasialData, setParams, params, paginationInfo };
};
