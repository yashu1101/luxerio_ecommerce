import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1101/api/",
    withCredentials: true,
});