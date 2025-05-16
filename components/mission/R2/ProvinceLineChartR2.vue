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

<script setup >
//const { $emitter } = useNuxtApp()
import { ref, onMounted } from "vue";
import ApexChart from "vue3-apexcharts";
import axios from "axios";

// Dropdown
const selectedProvince = ref(null);
const provinceList = ref([]);

// Chart setup
const chartOptions = ref({
  chart: { type: "line", height: 350 },
  stroke: { curve: "smooth", width: 3 },
  xaxis: { categories: [] },
  legend: { position: "right" },
  responsive: [
    {
      breakpoint: 800,
      options: { legend: { position: "bottom" } },
    },
  ],
});

const chartSeries = ref([]);
const reachSeries = ref([]); // คุณอาจใช้ข้อมูลอื่นมาต่อได้ในภายหลัง
const date = ref([]);
const data = ref([]);

onMounted(async () => {
     await this.$emitter.on("callApiListSubdomain", async (val) => {
     console.log('val',val);
     
      // this.filterSubdomains()
    });
  //  $emitter.on("date-updated", (dateRange) => {
  //   console.log("Date Range Received:", dateRange);
  //   date.value=dateRange
  
  // });
 try {
    data.value = await getProvinceLineChart();

    const sorted = [...data.value].sort((a, b) => b.total_post - a.total_post);
    const top10 = sorted.slice(0, 10);

    chartOptions.value.xaxis.categories = top10[0]?.x || [];

    chartSeries.value = top10.map((item) => ({
      name: item.province_name_th,
      data: item.y,
    }));

    provinceList.value = sorted.map((item) => item.province_name_th);
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
});
</script>


<style scoped>
.v-btn {
  min-width: 120px;
}
</style>
