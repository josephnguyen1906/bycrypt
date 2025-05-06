import axios from "axios";
import { getToken } from "./client-store";
import swal from "sweetalert";

// Lấy baseURL từ environment
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL as string;

const CONTENT_API_URL = process.env.NEXT_PUBLIC_CONTENT_API_URL as string;

// API instance for login and register
const authInstance = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 10000,
});

authInstance.interceptors.request.use(
  (config) => {
    const gettoken = getToken();
    if (gettoken) {
      config.headers["Authorization"] = `Bearer ${gettoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error.response);

    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

// API instance for content
const contentInstance = axios.create({
  baseURL: CONTENT_API_URL,
  timeout: 10000,
});

contentInstance.interceptors.request.use(
  (config) => {
    const gettoken = getToken();
    if (gettoken) {
      config.headers["Authorization"] = `Bearer ${gettoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

contentInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error.response);

    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("tokenku99");
    }

    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export { authInstance, contentInstance };
