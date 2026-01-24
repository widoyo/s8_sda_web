import { API } from "..";
import axios from "axios";

export const getBerita = async (params) => {
  try {
    const response = await API.get("/api/berita", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getBeritaHighlighted = async () => {
  try {
    const response = await API.get("/api/berita/highlighted");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteBerita = async (id) => {
  try {
    const response = await API.delete(`/api/berita/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postBerita = async (formData) => {
  try {
    const response = await API.post(`/api/berita`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editBerita = async (id, formData) => {
  try {
    const response = await API.put(`/api/berita/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getBeritaDetail = async (id) => {
  try {
    const response = await API.get(`/api/berita/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
