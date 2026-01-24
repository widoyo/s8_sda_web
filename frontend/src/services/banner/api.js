import { API } from "..";
import axios from "axios";

export const getBanner = async (params) => {
  try {
    const response = await API.get("/api/banner", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await API.delete(`/api/banner/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postBanner = async (formData) => {
  try {
    const response = await API.post(`/api/banner/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};
