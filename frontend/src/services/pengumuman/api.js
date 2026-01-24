import { API } from "..";
import axios from "axios";

export const getPengumuman = async (params) => {
  try {
    const response = await API.get("/api/pengumuman", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deletePengumuman = async (id) => {
  try {
    const response = await API.delete(`/api/pengumuman/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postPengumuman = async (formData) => {
  try {
    const response = await API.post(`/api/pengumuman`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editPengumuman = async (id, formData) => {
  try {
    const response = await API.put(`/api/pengumuman/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getPengumumanDetail = async (id) => {
  try {
    const response = await API.get(`/api/pengumuman/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
