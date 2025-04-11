import axios from "axios";
import Swal from "sweetalert2";
 export const URL_HOST = "192.168.1.120:3001";
// Create an Axios instance with base configuration
// baseURL: "http://192.168.1.122:3001/api",

// เครื่องน้องเยลลี่
const api = axios.create({
  baseURL: "http://192.168.1.100:3002/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTliNjlhODM1ODUwNzY2YWQwZjA2NSIsInVzZXJuYW1lIjoiYXRhcHkiLCJyb2xlIjoiVVNFUiIsInRlYW0iOiJDIiwiZW1haWwiOiJhdGFweTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNzQwMDQzNzExLCJleHAiOjE3NzE1Nzk3MTF9.V6dnx8mfP6bzESlGXwfvZkcyUZ4UxXECn1wgE6HLWrY`
  },
});

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTliNjlhODM1ODUwNzY2YWQwZjA2NSIsInVzZXJuYW1lIjoiYXRhcHkiLCJyb2xlIjoiVVNFUiIsInRlYW0iOiJDIiwiZW1haWwiOiJhdGFweTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNzQwMDQzNzExLCJleHAiOjE3NzE1Nzk3MTF9.V6dnx8mfP6bzESlGXwfvZkcyUZ4UxXECn1wgE6HLWrY
// เครื่องพี่แนน
const apiHVT = axios.create({
  baseURL: "http://192.168.1.120:3001/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTliNjUxODM1ODUwNzY2YWQwZjA2MiIsInVzZXJuYW1lIjoiYWRtaW5hdGFweSIsInJvbGUiOiJTVVBFUkFETUlOIiwiZW1haWwiOiJhdGFweTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNzQzNzUzNDA3LCJleHAiOjE3NzUyODk0MDd9.w2yvtgnqca1Bs68eUqCuuwoq3zrVVpaz3y2YlPh0rqU`
  },
});

// ---------------- hvt ----------------
// Fetch Users
export async function fetchUserHvt() {
  try {
    const response = await apiHVT.get("/getHvt");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create User
export async function createUserHvt(userData: FormData) {
  try {
    const response = await apiHVT.post("/createHvt", userData, {
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
    const response = await apiHVT.put("/updateHvt", userData, {
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
    const response = await apiHVT.delete("/deleteHvt", { data: userData });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


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

// ---------------- task admins ----------------

// Get all tasks admin
export async function getAllTasks() {
  try {
    const response = await api.get("/getAllTasks");
    // console.log('====================================');
    // console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    // console.error("Error fetching users:", error);
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
export async function createTask(taskData: JSON) {
  try {
    const response = await api.post(
      "/createTask",
      taskData, // ส่งข้อมูลในรูปแบบ raw (JSON)
      {
        headers: {
          "Content-Type": "application/json", // ระบุว่าเราส่งข้อมูลในรูปแบบ JSON
        },
      }
    );
    // console.log("res : ", response.data);
    Swal.fire({
      title: "บันทึกสำเร็จ",
      // text: "You clicked the button!",
      icon: "success",
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

// Create Task 5-6-8
export async function createTaskMoreDetails(taskData: FormData) {
  try {
    const response = await api.post(
      "/createTask",
      taskData, // ส่งข้อมูลในรูปแบบ FormData
      {
        headers: {
          "Content-Type": "multipart/form-data", // ระบุว่าเราส่งข้อมูลในรูปแบบ FormData
        },
      }
    );

    Swal.fire({
      title: "บันทึกสำเร็จ",
      icon: "success",
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
  }
}

// ---------------- task users ----------------

// Get all tasks user
export async function getAllTasksUser() {
  try {
    const response = await api.get("/getMyTaskUser");
    // console.log('====================================');
    // console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
}

// Update Task user
export async function updateTaskUser(taskUserId: String, response_hvt: JSON) {
  try {
    const response = await api.put(
      `/updateTaskUser/${taskUserId}`,
      response_hvt, // ส่งข้อมูลในรูปแบบ raw (JSON)
      {
        headers: {
          "Content-Type": "application/json", // ระบุว่าเราส่งข้อมูลในรูปแบบ JSON
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);

    throw error;
    // return  null
  }
}


export async function createNote(noteData: { title: string; text: string }) {
  try {
    const response = await apiHVT.post("/ceateNotes", noteData);
    Swal.fire({
      title: "สร้าง Note สำเร็จ",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    Swal.fire({
      icon: "error",
      title: "สร้าง Note ไม่สำเร็จ",
    });
    throw error;
  }
}

export async function updateNote(id: string, noteData: { title: string; text: string }) {
  try {
    const response = await apiHVT.put(`/noteUpdate/${id}`, noteData);
    Swal.fire({
      title: "อัปเดต Note สำเร็จ",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    Swal.fire({
      icon: "error",
      title: "อัปเดต Note ไม่สำเร็จ",
    });
    throw error;
  }
}

export async function deleteNote(id: string) {
  try {
    const response = await apiHVT.delete(`/deleteNotes/${id}`);
    Swal.fire({
      title: "ลบ Note สำเร็จ",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    Swal.fire({
      icon: "error",
      title: "ลบ Note ไม่สำเร็จ",
    });
    throw error;
  }
}

export async function fetchDashboard() {
  try {
    const response = await apiHVT.get("/getdashboard");
    // console.log('====================================');
    // console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getStatKeyword(start: string, end: string) {
  try {
    const response = await apiHVT.get("/getStatKeyword", {
      params: {
        // search: searchIds,
        start,
        end,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching getStatKeyword:", error);
    throw error;
  }
}

export async function getPosts(hvtId: string,sentiment:number, start: string, end: string, limit: number = 10,page:number) {
  try {
    const response = await apiHVT.get("/getPosts", {
      params: {
        hvtId,
        sentiment,
        start,
        end,
        limit,
        page
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching getPosts:", error);
    throw error;
  }
}