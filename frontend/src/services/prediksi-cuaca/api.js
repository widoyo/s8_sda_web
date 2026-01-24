import { API } from "..";
import axios from "axios";

export const getPrediksiCuaca = async () => {
  try {
    const response = await API.get("/api/prediksi-cuaca");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const editPrediksiCuaca = async (formData) => {
  try {
    const response = await API.put(`/api/prediksi-cuaca`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};
