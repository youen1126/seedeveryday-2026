import axios from "axios";
import { getTokenFromCookie } from "@/utils/auth";

const API_BASE = import.meta.env.VITE_API_BASE;
export const API_PATH = import.meta.env.VITE_API_PATH;

//前台
export const api = axios.create({
  baseURL: API_BASE,
});

//後台
export const adminApi = axios.create({
  baseURL: API_BASE,
});

adminApi.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
