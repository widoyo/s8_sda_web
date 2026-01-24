import { API } from "..";
import axios from "axios";

export const getRpsda = async (params) => {
  try {
    const response = await API.get("/api/rpsda", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteRpsda = async (id) => {
  try {
    const response = await API.delete(`/api/rpsda/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postRpsda = async (formData) => {
  try {
    const response = await API.post(`/api/rpsda`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editRpsda = async (id, formData) => {
  try {
    const response = await API.put(`/api/rpsda/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getRpsdaDetail = async (id) => {
  try {
    const response = await API.get(`/api/rpsda/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
