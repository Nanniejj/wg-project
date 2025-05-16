import axios from "axios";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { defineNuxtPlugin } from "#app";
import { useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const router = useRouter();

  // 💡 ตั้ง baseURL แต่ละเครื่องที่นี่
  const apiHVTBase = "http://192.168.1.124:3001/api";
  const apiYellyBase = "http://192.168.1.114:3002/api";

  // 🎯 API หลัก (ใช้งานทั่วไป)
  const apiClient: AxiosInstance = axios.create({
    baseURL: config.public.API_BASE_URL, // เช่น "http://localhost:3000/api"
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 🧠 API สำหรับเครื่อง HVT
  const apiHVT: AxiosInstance = axios.create({
    baseURL: apiHVTBase,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 🍬 API สำหรับเครื่อง Yelly
  const apiYelly: AxiosInstance = axios.create({
    baseURL: apiYellyBase,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // แนบ token ให้ทั้ง 3 instance
  const attachAuthInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const res = await axios.post(`${config.public.API_BASE_URL}/api/auth/refresh`, {
                refreshToken,
              });
              const newAuthToken = res.data.authToken;
              localStorage.setItem("authToken", newAuthToken);
              error.config.headers.Authorization = `Bearer ${newAuthToken}`;
              return axios.request(error.config);
            } catch {
              localStorage.removeItem("authToken");
              localStorage.removeItem("refreshToken");
              router.push("/login");
            }
          } else {
            router.push("/login");
          }
        }
        return Promise.reject(error);
      }
    );
  };

  // แนบ Interceptor
  [apiClient, apiHVT, apiYelly].forEach(attachAuthInterceptor);

  // ✅ Provide ทั้งหมด
  nuxtApp.provide("apiClient", apiClient);
  nuxtApp.provide("apiHVT", apiHVT);
  nuxtApp.provide("apiYelly", apiYelly);
});
