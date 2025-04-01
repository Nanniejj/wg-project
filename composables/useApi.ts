import axios from "axios";
export const URL_HOST = "http://192.168.1.127:3001";
// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "http://192.168.1.127:3001/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTliNjlhODM1ODUwNzY2YWQwZjA2NSIsInVzZXJuYW1lIjoiYXRhcHkiLCJyb2xlIjoiVVNFUiIsInRlYW0iOiJDIiwiZW1haWwiOiJhdGFweTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNzQwMDQzNzExLCJleHAiOjE3NzE1Nzk3MTF9.V6dnx8mfP6bzESlGXwfvZkcyUZ4UxXECn1wgE6HLWrY`, // Secure this in runtimeConfig
  },
});

// Fetch Users
export async function fetchUserHvt() {
  try {
    const response = await api.get("/getHvt");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create User
export async function createUserHvt(userData: FormData) {
  try {
    const response = await api.post("/createHvt", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUserHvt(userData: FormData) {
  try {
    const response = await api.put("/updateHvt", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function deleteUserHvt(userData) {
  try {
    const response = await api.delete("/deleteHvt", { data: userData });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
