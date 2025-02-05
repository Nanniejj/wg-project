<template>
    <v-container>
        <v-card class="pa-4 card-stat-shadow">
            <h3 class="text-h6 font-weight-bold mb-4">จำนวน Content (Platform)</h3>
            <ApexChart type="bar" height="400" :options="chartOptions" :series="series" />
        </v-card>
        <div>
            <div class="text-h6 font-weight-bold mb-4"> ตัวอย่างข้อมูล </div>
            <v-row>
                <v-col>
                    <v-img :width="400" aspect-ratio="16/9" cover
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                </v-col>
                <v-col>
                    <v-img :width="400" aspect-ratio="16/9" cover
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                </v-col>
                <v-col>
                    <v-img :width="400" aspect-ratio="16/9" cover
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                </v-col>
            </v-row>
            <v-row>
      <v-col v-for="(team, index) in teams" :key="index" cols="12" sm="6" md="" >
        <v-card class="my-5 pa-4 card-stat-shadow" >
          <v-card-title :style="{ color: getTeamColor(team.name.toUpperCase()), fontWeight: 'bold' }">
            Team {{ team.name }}
          </v-card-title>
          <v-card-subtitle>
            <strong class="base-color">จำนวนเป้าหมาย :</strong> {{ team.target }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <ol class="px-5">
              <li v-for="i in 10" :key="i"></li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
        </div>

    </v-container>
</template>

<script setup>
const { getTeamColor, getMissionColor } = useColors();

const teams = [
  { name: "C", color: "purple", target: 250 },
  { name: "D", color: "green", target: 150 },
  { name: "E", color: "orange", target: 50 },
  { name: "F", color: "blue", target: 30 },
  { name: "G", color: "red", target: 25 },
];
// กำหนดข้อมูลจากกราฟ
const series = [
    { name: "Facebook", data: [560, 560, 418, 398, 618] },
    { name: "X (Twitter)", data: [157, 198, 202, 232, 135] },
    { name: "YouTube", data: [110, 110, 115, 103, 125] },
    { name: "TikTok", data: [70, 96, 99, 139, 96] },
    { name: "Instagram", data: [103, 57, 63, 46, 55] },
];

const chartOptions = {
    chart: {
        type: "bar",
        stacked: true,
        toolbar: { show: false },
    },
    colors: ["#1E56A0", "#000000", "#FF0000", "#17E9E0", "#C92D6F"],
    plotOptions: {
        bar: { horizontal: false, columnWidth: "25%" },
    },
    dataLabels: { enabled: true },
    stroke: { show: false },
    xaxis: {
        categories: ["C", "D", "E", "F", "G"],
        labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
        labels: { style: { fontSize: "14px" } },
    },
    legend: { position: "top" },
    tooltip: { theme: "dark" },
};
</script>
