import axios from "axios";
import Swal from "sweetalert2";
 export const URL_HOST = "192.168.1.128:3001";
// composables/useApi.ts
import { useNuxtApp } from "#app";


export async function getPageActive() {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getPageActive");
  return response.data;
}

export async function getProvinceLineChart() {
  const { $apiHVT } = useNuxtApp();
  const response = await $apiHVT.get("/getProvinceLineChart");
  return response.data;
}
