import { useEffect, useState } from "react";

import { getTugasFungsi } from "../../../../services/tugas-fungsi";

export const useTugasFungsiData = () => {
  const [tugasFungsiData, setTugasFungsiData] = useState();

  useEffect(() => {
    const fetchTugasFungsiData = async () => {
      try {
        const response = await getTugasFungsi();

        if (response.data) {
          setTugasFungsiData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Tugas Fungsi data:", error);
      }
    };
    fetchTugasFungsiData();
  }, []);

  return tugasFungsiData;
};
