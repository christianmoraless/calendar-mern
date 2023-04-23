import axios from "axios";
// import { getEnvVariables } from "../helpers";

// const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: process.env.VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});
