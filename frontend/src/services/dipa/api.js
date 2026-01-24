import { API } from "..";
import axios from "axios";

export const getDipa = async (params) => {
  try {
    const response = await API.get("/api/dipa", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteDipa = async (id) => {
  try {
    const response = await API.delete(`/api/dipa/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postDipa = async (formData) => {
  try {
    const response = await API.post(`/api/dipa`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editDipa = async (id, formData) => {
  try {
    const response = await API.put(`/api/dipa/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getDipaDetail = async (id) => {
  try {
    const response = await API.get(`/api/dipa/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
