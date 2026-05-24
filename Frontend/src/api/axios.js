import axios from "axios";

export const api = axios.create({
    baseURL: "https://luxerio-backend.onrender.com/api/",
    // baseURL: "http://localhost:1101/api/",
    withCredentials: true,
});