
// // plugins/axios.ts
// import axios from "axios";
// import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"; // Import types
// import { defineNuxtPlugin } from "#app";
// import { useRouter } from "#app"; // Use router to programmatically redirect

// export default defineNuxtPlugin((nuxtApp) => {
//     const config = useRuntimeConfig();
//     const router = useRouter(); // Get the router instance

//     // Create an axios instance with the config
//     const apiClient: AxiosInstance = axios.create({
//         baseURL: config.public.API_BASE_URL, // Base URL from environment variables
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

//     // Interceptor for attaching the token in every request
//     apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//         const authToken = localStorage.getItem("authToken");
//         if (authToken) {
//             config.headers = config.headers || {}; // Ensure headers exist
//             config.headers.Authorization = `Bearer ${authToken}`; // Attach Authorization header
//         }
//         return config;
//     });

//     // Interceptor for handling token expiration and refreshing tokens
//     apiClient.interceptors.response.use(
//         (response: AxiosResponse) => response, // Pass the response through if successful
//         async (error: any) => {
//             if (error.response?.status === 403) { // Unauthorized error
//                 console.log(error.response?.status,error.response)
//                 const refreshToken = localStorage.getItem("refreshToken");
//                 if (refreshToken) {
//                     try {
//                         // Try to refresh the token
//                         const response = await axios.post(`${config.public.API_BASE_URL}/api/auth/refresh`, {
//                             refreshToken
//                         });
//                         const newAuthToken = response.data.authToken;
//                         localStorage.setItem("authToken", newAuthToken); // Update authToken

//                         // Retry the original request with the new token
//                         error.config.headers.Authorization = `Bearer ${newAuthToken}`;
//                         return axios.request(error.config);
//                     } catch (refreshError) {
//                         // If refreshing the token fails, handle the error
//                         console.error("Refresh token failed", refreshError);

//                         // If refresh also fails (e.g., 401 or 403), redirect to login
//                         localStorage.removeItem("authToken");
//                         localStorage.removeItem("refreshToken");
//                         router.push("/login"); // Redirect to login page
//                     }
//                 } else {
//                     // If no refresh token, redirect to login directly
//                     router.push("/login");
//                 }
//             }
//             return Promise.reject(error); // Reject the promise for other errors
//         }
//     );

//     // Provide apiClient for use in the app
//     nuxtApp.provide("apiClient", apiClient);
// });


// plugins/axios.ts
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { defineNuxtPlugin } from "#app";
import { useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const router = useRouter();

    // สร้าง instance ของ axios พร้อมกับการตั้งค่า baseURL
    const apiClient: AxiosInstance = axios.create({
        baseURL: config.public.API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // ลบ request interceptor ที่เคยใช้ในการแนบ authToken
    // apiClient.interceptors.request.use((config) => {
    //     const authToken = localStorage.getItem("authToken");
    //     if (authToken) {
    //         config.headers = config.headers || {};
    //         config.headers.Authorization = `Bearer ${authToken}`;
    //     }
    //     return config;
    // });

    // Interceptor สำหรับจัดการการตอบสนอง
    apiClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: any) => {
            if (error.response?.status === 403) {
                console.log(error.response?.status, error.response);
                // จัดการกรณีที่ได้รับสถานะ 403
                // คุณสามารถเพิ่มการจัดการเพิ่มเติมที่นี่
            }
            return Promise.reject(error);
        }
    );

    // ให้บริการ apiClient สำหรับการใช้งานในแอปพลิเคชัน
    nuxtApp.provide("apiClient", apiClient);
});
