import axios from "axios";
import Cookies from "js-cookie"; // Import for client-side cookie access
import { BASE_URL } from "../apiCollection";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This ensures cookies are sent with requests
});


api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const fetchLetters = async () => {
  
  try {
    const response = await api.get("/api/view");
    return response.data.letters;
  } catch (error) {
    console.error("Error fetching letters:", error);
    throw error;
  }
};


export const createLetter = async (letterData: { title: string; content: string }) => {
  try {
    const response = await api.post("/api/upload", letterData);
    return response.data;
  } catch (error) {
    console.error("Error creating letter:", error);
    throw error;
  }
};


export const updateLetter = async (id: number, updatedData: { title: string; content: string }) => {
  try {
    const response = await api.put(`/api/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating letter:", error);
    throw error;
  }
};


export const deleteLetter = async (id: number) => {
  try {
    await api.delete(`/api/delete/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting letter:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await api.get("/logout", { withCredentials: true });
    localStorage.removeItem("accessToken");
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/auth/signup";
  } catch (error) {
    console.error("Logout error:", error);
  }
};
