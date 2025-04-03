<template>
  <v-container>
    <v-row align="" justify="space-between">
      <v-col cols="12" md="auto">
        <v-btn variant="outlined" color="#3CB0CC">จำนวนโพสต์</v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <div class="text-h6 font-weight-medium">Top 10 จังหวัด</div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-select
          v-model="selectedProvince"
          :items="provinceList"
          label="เลือกจังหวัด"
          variant="outlined"
          density="compact"
        ></v-select>
        <v-btn color="#96CCD5" class="ml-2">ค้นหา</v-btn>
      </v-col>
    </v-row>

    <v-card class="pa-4 card-stat-shadow">
      <ApexChart
        type="line"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
      ></ApexChart>
    </v-card>

    <br />
    <br />
    <v-row>
      <v-col cols="12" md="auto">
        <v-btn variant="outlined" color="#3CB0CC">จำนวนการเข้าถึง</v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <div class="text-h6 font-weight-bold">Top 10 จังหวัด</div>
      </v-col>
    </v-row>

    <v-card class="pa-4 card-stat-shadow">
      <ApexChart
        type="line"
        height="350"
        :options="chartOptions"
        :series="reachSeries"
      ></ApexChart>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

// Dropdown for province selection
const selectedProvince = ref(null);
const provinceList = [
  "กรุงเทพมหานครฯ",
  "นนทบุรี",
  "ปทุมธานี",
  "สมุทรปราการ",
  "น่าน",
  "เชียงใหม่",
  "เชียงราย",
  "ชัยนาท",
  "ภูเก็ต",
  "สงขลา",
];

// Chart Data
const chartOptions = ref({
  chart: { type: "line", height: 350 },
  stroke: { curve: "smooth", width: 3 },
  xaxis: {
    categories: [
      "20 ก.ค. 67",
      "21 ก.ค. 67",
      "22 ก.ค. 67",
      "23 ก.ค. 67",
      "24 ก.ค. 67",
      "25 ก.ค. 67",
      "26 ก.ค. 67",
    ],
  },
  legend: { position: "right" },
  responsive: [
    {
      breakpoint: 800,
      options: { legend: { position: "bottom" } },
    },
  ],
});

// Data for "จำนวนโพสต์" (ทำให้เส้นทับกันมากขึ้น)
const chartSeries = ref([
  { name: "กรุงเทพมหานครฯ", data: [100, 220, 180, 200, 170, 230, 190] },
  { name: "นนทบุรี", data: [120, 200, 160, 190, 150, 210, 180] },
  { name: "ปทุมธานี", data: [110, 210, 170, 220, 140, 200, 160] },
  { name: "สมุทรปราการ", data: [90, 190, 140, 180, 120, 190, 150] },
  { name: "น่าน", data: [80, 180, 130, 170, 110, 180, 140] },
  { name: "เชียงใหม่", data: [85, 185, 135, 175, 115, 185, 145] },
  { name: "เชียงราย", data: [95, 195, 145, 185, 125, 195, 155] },
  { name: "ชัยนาท", data: [105, 205, 155, 195, 135, 205, 165] },
  { name: "ภูเก็ต", data: [115, 215, 165, 205, 145, 215, 175] },
  { name: "สงขลา", data: [125, 225, 175, 215, 155, 225, 185] },
]);

// Data for "จำนวนการเข้าถึง" (ทำให้เส้นทับกัน)
const reachSeries = ref([
{ name: "กรุงเทพมหานครฯ", data: [100, 220, 180, 200, 170, 230, 190] },
  { name: "นนทบุรี", data: [120, 200, 160, 190, 150, 210, 180] },
  { name: "ปทุมธานี", data: [110, 210, 170, 220, 140, 200, 160] },
  { name: "สมุทรปราการ", data: [90, 190, 140, 180, 120, 190, 150] },
  { name: "น่าน", data: [80, 180, 130, 170, 110, 180, 140] },
  { name: "เชียงใหม่", data: [85, 185, 135, 175, 115, 185, 145] },
  { name: "เชียงราย", data: [95, 195, 145, 185, 125, 195, 155] },
  { name: "ชัยนาท", data: [105, 205, 155, 195, 135, 205, 165] },
  { name: "ภูเก็ต", data: [115, 215, 165, 205, 145, 215, 175] },
  { name: "สงขลา", data: [125, 225, 175, 215, 155, 225, 185] },
]);
</script>

<style scoped>
.v-btn {
  min-width: 120px;
}
</style>
