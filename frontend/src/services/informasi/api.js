import { API } from "..";
import axios from "axios";

export const getInformasi = async (params) => {
  try {
    const response = await API.get("/api/informasi", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteInformasi = async (id) => {
  try {
    const response = await API.delete(`/api/informasi/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete informasi API call:", error);
  }
};

export const postInformasi = async (formData) => {
  try {
    const response = await API.post(`/api/informasi`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editInformasi = async (id, formData) => {
  try {
    const response = await API.put(`/api/informasi/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getInformasiDetail = async (id) => {
  try {
    const response = await API.get(`/api/informasi/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
