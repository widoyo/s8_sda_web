import { API } from "..";
import axios from "axios";

export const getLayananTerpadu = async (params) => {
  try {
    const response = await API.get("/api/layanan-terpadu", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteLayananTerpadu = async (id) => {
  try {
    const response = await API.delete(`/api/layanan-terpadu/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postLayananTerpadu = async (formData) => {
  try {
    const response = await API.post(`/api/layanan-terpadu`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editLayananTerpadu = async (id, formData) => {
  try {
    const response = await API.put(`/api/layanan-terpadu/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getLayananTerpaduDetail = async (id) => {
  try {
    const response = await API.get(`/api/layanan-terpadu/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
