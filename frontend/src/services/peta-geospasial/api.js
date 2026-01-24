import { API } from "..";
import axios from "axios";

export const getPetaGeospasial = async (params) => {
  try {
    const response = await API.get("/api/geolocations", {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deletePetaGeospasial = async (id) => {
  try {
    const response = await API.delete(`/api/geolocations/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error in delete berita API call:", error);
  }
};

export const postPetaGeospasial = async (formData) => {
  try {
    const response = await API.post(`/api/geolocations`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

export const editPetaGeospasial = async (id, formData) => {
  try {
    const response = await API.put(`/api/geolocations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the form:", error);
    throw error;
  }
};

export const getPetaGeospasialDetail = async (id) => {
  try {
    const response = await API.get(`/api/geolocations/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }
  }
};
