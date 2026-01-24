import { API } from "..";
import axios from "axios";

export const getPR = async () => {
  try {
    const response = await API.get("/api/pola-rencana");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const editPR = async (formData) => {
  try {
    const response = await API.put(`/api/pola-rencana`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};
