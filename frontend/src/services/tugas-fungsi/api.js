import { API } from "..";
import axios from "axios";

export const getTugasFungsi = async () => {
  try {
    const response = await API.get("/api/tugas-fungsi");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const editTugasFungsi = async (formData) => {
  try {
    const response = await API.put(`/api/tugas-fungsi`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};
