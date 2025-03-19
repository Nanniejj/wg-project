import axios from "axios";
import Swal from "sweetalert2";
// export const URL_HOST = "http://192.168.1.122:3001";
// Create an Axios instance with base configuration
// baseURL: "http://192.168.1.122:3001/api",
const api = axios.create({
  baseURL: "http://192.168.1.116:3002/api",
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

// Get Task Categories
export async function getTaskCategories() {
  try {
    const response = await api.get("/getTaskCategories");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
// Get Teams
export async function getTeams() {
  try {
    const response = await api.get("/getTeam");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
// Get all tasks
export async function getAllTasks() {
  try {
    const response = await api.get("/getAllTasks");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getTaskById(id: string) {
  try {
    const response = await api.get(`/getTask`, { params: { id } });
    console.log("res : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
}

// Create Task
export async function createTask(taskData : JSON) {
  try {
    const response = await api.post("/createTask", 
      taskData,  // ส่งข้อมูลในรูปแบบ raw (JSON)
      {
        headers: {
          "Content-Type": "application/json", // ระบุว่าเราส่งข้อมูลในรูปแบบ JSON
        }
      });
    // console.log("res : ", response.data);
    Swal.fire({
      title: "บันทึกสำเร็จ",
      // text: "You clicked the button!",
      icon: "success"
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    Swal.fire({
      icon: "error",
      title: "บันทึกไม่สำเร็จ",
      text: "",
    });
    throw error;
    // return  null
  }
}
