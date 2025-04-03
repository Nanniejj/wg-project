<template>
  <!-- <v-container> -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4 card-stat-shadow">
            <v-col cols="12" md="auto" class="font-title-2 py-0 font-weight-bold">
                จำนวนโพสต์
            </v-col>
            <ApexChart
                type="line"
                height="350"
                :options="chartOptions"
                :series="postSeries"
            ></ApexChart>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4 card-stat-shadow">
            <v-col cols="12" md="auto" class="font-title-2 py-0 font-weight-bold">
                จำนวนผู้ติดตาม
            </v-col>
            <ApexChart
                type="line"
                height="350"
                :options="chartOptions"
                :series="followerSeries"
            ></ApexChart>
        </v-card>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

// Chart Data
const chartOptions = ref({
  chart: { type: "line", height: 350 },
  stroke: { curve: "smooth", width: 3 },
  xaxis: {
    categories: [
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
    ],
  },
  legend: { position: "bottom" },
  colors: ["#96CCD5", "#462929", "#F1884D"],
  responsive: [
    {
      breakpoint: 800,
      options: { legend: { position: "bottom" } },
    },
  ],
});

// Data for "จำนวนโพสต์" (ทำให้เส้นทับกันมากขึ้น)
const postSeries = ref([
  { name: "ราชสีห์...เล่าเรื่อง", data: [100, 220, 180] },
  { name: "นาวิกาธิปัตย์สาร", data: [120, 200, 160] },
  { name: "ต.ตุลยากร", data: [110, 210, 170] },
  
]);

// Data for "จำนวนผู้ติดตาม" (ทำให้เส้นทับกัน)
const   followerSeries = ref([
    { name: "ราชสีห์...เล่าเรื่อง", data: [100, 220, 180] },
    { name: "นาวิกาธิปัตย์สาร", data: [120, 200, 160] },
    { name: "ต.ตุลยากร", data: [110, 210, 170] },
]);
</script>

<style scoped>
.v-btn {
  min-width: 120px;
}
</style>
