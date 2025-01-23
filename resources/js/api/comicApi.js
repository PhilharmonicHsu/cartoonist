import axiosInstance from "@/api/axiosInstance.js";
import axios from "axios";

export const fetchUserComics = async () => {
    return await axiosInstance.get("/user-comics");
}

export const generateComicImage = async (payload) => {
    return await axiosInstance.post('/generate-image', payload)
}

export const updateUserComic = async (comicId, payload) => {
    return axiosInstance.patch(`/user-comic/${comicId}`, payload)
}
