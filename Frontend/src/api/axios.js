import axios from "axios";

export const api = axios.create({
    baseURL: "https://luxerio-backend.onrender.com/api/",
    withCredentials: true,
});