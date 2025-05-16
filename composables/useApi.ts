import axios from "axios";
import Swal from "sweetalert2";
 export const URL_HOST = "192.168.1.128:3001";
// composables/useApi.ts
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

export async function getTaskCategories() {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTaskCategories");
  return response.data;
}

export async function getTeams() {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTeam");
  return response.data;
}

export async function getTopics(mission: string) {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTopic", { params: { mission } });
  return response.data;
}

export async function getAllTasks() {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getAllTasks");
  return response.data.data;
}

export async function getTaskById(id: string) {
  const { $apiYelly } = useNuxtApp();
  const response = await $apiYelly.get("/getTask", { params: { id } });
  return response.data;
}

export async function createTask(taskData: JSON) {
  const { $apiYelly } = useNuxtApp();
  try {
    const response = await $apiYelly.post("/createTask", taskData);
    Swal.fire({ title: "บันทึกสำเร็จ", icon: "success" });
    return response.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "บันทึกไม่สำเร็จ" });
    throw error;
  }
}

export async function createTaskMoreDetails(taskData: FormData) {
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
