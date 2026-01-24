import { API } from "..";
import axios from "axios";

export const getPeraturan = async (params) => {
  try {
    const response = await API.get("/api/peraturan", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deletePeraturan = async (id) => {
  try {
    const response = await API.delete(`/api/peraturan/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postPeraturan = async (formData) => {
  try {
    const response = await API.post(`/api/peraturan`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editPeraturan = async (id, formData) => {
  try {
    const response = await API.put(`/api/peraturan/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getPeraturanDetail = async (id) => {
  try {
    const response = await API.get(`/api/peraturan/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
