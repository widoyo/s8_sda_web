import { API } from "..";
import axios from "axios";

export const getYoutube = async (params) => {
  try {
    const response = await API.get("/api/youtube", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteYoutube = async (id) => {
  try {
    const response = await API.delete(`/api/youtube/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postYoutube = async (data) => {
  try {
    const response = await API.post(`/api/youtube`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};
