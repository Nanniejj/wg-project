import axios from "axios";
import Swal from "sweetalert2";
 export const URL_HOST = "192.168.1.128:3001";
// composables/use$apiYelly.ts
import { useNuxtApp } from "#app";


export async function fetchUserHvt() {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getHvt");
  return response.data.data;
}

export async function createUserHvt(userData: FormData) {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.post("/createHvt", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateUserHvt(userData: FormData) {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.put("/updateHvt", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteUserHvt(userData: any) {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.delete("/deleteHvt", { data: userData });
  return response.data;
}

// ---------- Type and Categories ---------------------------
// Get Task Categories
export async function getTaskCategories() {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTaskCategories");
  return response.data;
}


export async function getUsers(role: string) { 
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get(`/getUser`, { params: { role } });
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
// Get Widgets
export async function getWidgets() {
      const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getWidget");
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
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getTeam");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get Topics
export async function getTopics(mission: string, type: string) { 
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get(`/getTopic`, { params: { mission, type } });
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get Province
export async function getProvinces() {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getProvince");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get District
export async function getDistrict(province_id: string) { 
    const { $apiYelly } = useNuxtApp();
  console.log("province_id == ", province_id);
  
  try {
    const response = await $apiYelly.get(`/getAmphure`, { params: { province_id } });
    // console.log('====================================');
    console.log("res : ", response.data);

    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get subDistrict
export async function getSubDistrict(amphure_id: string) { 
    const { $apiYelly } = useNuxtApp();
  console.log("amphure_id in get subdistrict == ", amphure_id);
  
  try {
    const response = await $apiYelly.get(`/getTambon`, { params: { amphure_id } });
    // console.log('====================================');
    console.log("res : ", response.data);

    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get getAcademyNames
export async function getAcademyNames(id: string, school: boolean) { 
    const { $apiYelly } = useNuxtApp();
  // console.log("amphure_id in get subdistrict == ", amphure_id);
  try {
    const response = await $apiYelly.get(`/getAcademyNames`, { params: { id, school} });
    // console.log('====================================');
    console.log("res : ", response.data);

    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get getLeaderNames
export async function getLeaderNames(academy_id: string) { 
    const { $apiYelly } = useNuxtApp();
  // console.log("amphure_id in get subdistrict == ", amphure_id);
  try {
    const response = await $apiYelly.get(`/getLeaderFilter/${academy_id}`);
    // console.log('====================================');
    console.log("res : ", response.data);

    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get Levels
export async function getLevels() {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getLevel");
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

//Get POC by Academy ID
export async function getPocByAcademyID(academy_id: string) { 
    const { $apiYelly } = useNuxtApp();
  // console.log("amphure_id in get subdistrict == ", amphure_id);
  try {
    const response = await $apiYelly.get(`/getPOCfromAcademy/${academy_id}`);
    // console.log('====================================');
    console.log("res : ", response.data);

    // console.log('====================================');
    return response.data.stakeholder;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get Levels
export async function getCoordinators() {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getPOC");
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
export async function getAllTasks(limit: string, page: string) {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get(`/getAllTasks`, { params: { limit, page } });
    // console.log('====================================');
    console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getTaskById(id: string) {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTask", { params: { id } });
  return response.data;
}

// Create Mission
export async function createNewMission(mission : FormData) {
    const { $apiYelly } = useNuxtApp();
    try {
        const response = await $apiYelly.post("/createTask", 
            mission,  // ส่งข้อมูลในรูปแบบ FormData
            {
                headers: {
                "Content-Type": "multipart/form-data", // ระบุว่าเราส่งข้อมูลในรูปแบบ FormData
                }
            }
        );
        
        Swal.fire({
            title: "บันทึกสำเร็จ",
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
    }
}

// Create Task
export async function createTask(taskData : JSON) {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.post("/createTask", taskData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    Swal.fire({ title: "บันทึกสำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "บันทึกไม่สำเร็จ" });
    throw error;
  }
}

// Create Task 5-6-8
export async function createTaskMoreDetails(taskData : FormData) {
    const { $apiYelly } = useNuxtApp();
    try {
        const response = await $apiYelly.post("/createTask", 
            taskData,  // ส่งข้อมูลในรูปแบบ FormData
            {
                headers: {
                "Content-Type": "multipart/form-data", // ระบุว่าเราส่งข้อมูลในรูปแบบ FormData
                }
            }
        );
        
        Swal.fire({
            title: "บันทึกสำเร็จ",
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
    }
}

// Get Groups
export async function getGroups() {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.get("/getGroup");
    // console.log('====================================');
    // console.log("res : ", response.data);
    // console.log('====================================');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create Group
export async function createGroup(groupData: FormData) {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.post("/createGroup", groupData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}
// Update Group
export async function updateGroup(id : String ,groupData: FormData) {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.put(`/updateGroup/${id}`, groupData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("res : ", response.data);
    Swal.fire({
      title: "บันทึกสำเร็จ",
      // text: "You clicked the button!",
      icon: "success"
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    Swal.fire({
      icon: "error",
      title: "บันทึกไม่สำเร็จ",
      text: "",
    });
    throw error;
    // return  null
  }
}

// Delete Group
export async function deleteGroup(id: String) {
    const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.delete(`/deleteGroup/${id}`);
    console.log("res : ", response.data);
    Swal.fire({
      title: "ลบข้อมูลกลุ่มสำเร็จ",
      // text: "You clicked the button!",
      icon: "success"
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "ลบข้อมูลกลุ่มไม่สำเร็จ",
      text: "",
    });
    console.error("Error creating user:", error);
    throw error;
  }
}
// ---------------- task users ----------------

// Get all tasks user
export async function getAllTasksUser() {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getMyTaskUser");
  return response.data;
}

export async function getTasksByMission(mission: string) {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getMyTaskUser", { params: { mission } });
  return response.data;
}

export async function updateTaskUser(taskUserId: string, response_hvt: JSON) {
  const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.put(`/updateTaskUser/${taskUserId}`, response_hvt);
    Swal.fire({ title: "บันทึกสำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "บันทึกไม่สำเร็จ" });
    throw error;
  }
}

export async function createNote(noteData: { title: string; text: string }) {
  const { $apiHVT } = useNuxtApp();
  try {
    const response = await $apiHVT.post("/ceateNotes", noteData);
    Swal.fire({ title: "สร้าง Note สำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "สร้าง Note ไม่สำเร็จ" });
    throw error;
  }
}

export async function updateNote(id: string, noteData: { title: string; text: string }) {
  const { $apiHVT } = useNuxtApp();
  try {
    const response = await $apiHVT.put(`/noteUpdate/${id}`, noteData);
    Swal.fire({ title: "อัปเดต Note สำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "อัปเดต Note ไม่สำเร็จ" });
    throw error;
  }
}

export async function deleteNote(id: string) {
  const { $apiHVT } = useNuxtApp();
  try {
    const response = await $apiHVT.delete(`/deleteNotes/${id}`);
    Swal.fire({ title: "ลบ Note สำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "ลบ Note ไม่สำเร็จ" });
    throw error;
  }
}

export async function fetchDashboard() {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getdashboard");
  return response.data;
}

export async function getStatKeyword(start: string, end: string) {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getStatKeyword", { params: { start, end } });
  return response.data.data;
}

export async function getPosts(hvtId: string, sentiment: number, start: string, end: string, limit = 10, page: number) {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getPosts", {
    params: { hvtId, sentiment, start, end, limit, page },
  });
  return response.data.data;
}
