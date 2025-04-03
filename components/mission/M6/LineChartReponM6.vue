<template>
    <div>
        <div>
            <v-card class="pa-5 text-center " varaint="outlined">
                <span v-for=" (item, i) in team" class="mx-3">
                    <v-icon icon="mdi-circle" :color="getTeamColor(item)" size="35"></v-icon>
                    <span class="text-h6">{{ item }}</span></span>
            </v-card>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="card-stat-shadow">
                        <v-card-title>ประเด็นตอบโต้ (เฉพาะกรณี)</v-card-title>
                        <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>

                        <v-card-title>จำนวนการเข้าถึง</v-card-title>
                        <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="card-stat-shadow">
                        <v-card-title>ประเด็นตอบโต้</v-card-title>
                        <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>

                        <v-card-title>จำนวนการเข้าถึง</v-card-title>
                        <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const { getTeamColorSoft, getTeamColor } = useColors();
const team = ['C', 'D', 'E', 'F', 'G']

const series = ref([
    { name: "C", data: [28, 29, 33, 36, 32, 33] },
    { name: "D", data: [23, 24, 27, 31, 27, 28] },
    { name: "E", data: [15, 20, 24, 21, 20, 23] },
    { name: "F", data: [10, 12, 16, 15, 13, 13] },
    { name: "G", data: [8, 11, 14, 17, 15, 10] }
]);

const chartOptions = ref({
    chart: { type: "line", height: 250 },
    stroke: { width: 3, curve: "smooth" },
    xaxis: {
        categories: [
            "20 ก.ค. 67",
            "21 ก.ค. 67",
            "22 ก.ค. 67",
            "23 ก.ค. 67",
            "24 ก.ค. 67",
            "25 ก.ค. 67",
            "26 ก.ค. 67"
        ]
    },
    colors: ['#722F9C', '#19B04F', '#FEC02C', '#2E75B5', '#BE0711'],
    markers: { size: 5 },
    tooltip: { theme: "dark" },
    legend: { position: "top" }
});
</script>
<style></style>