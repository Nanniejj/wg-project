<template>
    <v-container>
        <h3 class="text-h6 font-weight-bold mb-2">ระดับแกนนำ</h3>

        <!-- Level Indicators -->
        <v-row class="mb-4">
            <v-col v-for="(level, index) in levels" :key="index" cols="12" sm="3">
                <v-card class="pa-3 text-center card-stat-shadow h-100 d-flex align-center justify-center flex-column" :style="{ backgroundColor: level.bgColor, color: level.textColor }" min-height="120">
                    <span class="font-subtitle ">{{ level.title }}</span>
                    <h4 class="text-h6 font-weight-bold">{{ level.count }} คน</h4>
                </v-card>
            </v-col>
        </v-row>

        <!-- Stacked Bar Chart -->
        <ApexChart type="bar" height="400" :options="chartOptions" :series="series" />
        <v-row class="px-10 mx-auto">
            <v-col v-for="(level, index) in series" :key="index" cols="12" sm="6">
                <div > <v-icon :color="level.color" icon="mdi-circle"></v-icon> {{  level.name  }}</div>

            </v-col>
            </v-row>
    </v-container>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";

// Level indicators
const levels = [
    { title: "ระดับ 0", count: 10, bgColor: "#4D4D4D", textColor: "#FFFFFF" },
    { title: "ระดับ 1", count: 10, bgColor: "#C4D537", textColor: "#333333e0" },
    { title: "ระดับ 2", count: 10, bgColor: "#FFBE2D", textColor: "#333333e0" },
    { title: "ระดับ 3", count: 150, bgColor: "#F48FB1", textColor: "#333333e0" },
];

// Data for each level
const series = [
    { name: "ระดับ 0 ยังไม่ได้เข้าไปติดต่อ", data: [120, 827, 1050, 120, 320], color: "#4D4D4D" },
    { name: "ระดับ 1 เข้าไปติดต่อกับ รร. และมีการวางแผนทำกิจกรรม", data: [284, 284, 110, 284, 222], color: "#C4D537" },
    { name: "ระดับ 2 ชป.กร. เข้าทำกิจกรรมและเก็งตัว นร.", data: [317, 317, 115, 317, 317], color: "#FFBE2D" },
    { name: "ระดับ 3 นร. ทำกิจกรรมเองจึงถือเป็นแกนนำ", data: [432, 560, 560, 432, 432], color: "#F48FB1" },
];

// Chart options
const chartOptions = {
    chart: {
        type: "bar",
        stacked: true,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 4,
            dataLabels: { position: "center" },
            columnWidth: "50px",
            textAnchor: 'middle',
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                offsetY: -13,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
        },
    },
    xaxis: {
        categories: [ "C", "D", "E", "F", "G"],
        labels: { style: { fontSize: "10px" ,} },
    },
    dataLabels: {
        textAnchor: 'middle',
        enabled: true,
        formatter: (val) => (val > 0 ? formatNumber(val) : ""),
        style: { color: "#fffff" , fontSize: '10px'},

    },
    yaxis: {
        style: { color: "#fffff" , fontSize: '10px'}
    },
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "right",
        markers: { radius: 12 },
        fontSize: '16px',
        markers: {
            size: 9,
            shape: undefined,
            strokeWidth: 1,
            fillColors: undefined,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    tooltip: {
        y: { formatter: (val) => `${formatNumber(val)} คน` },
    },
      responsive: [{
        breakpoint: 700,
        options: {
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 4,
                    dataLabels: { position: "center" },
                    columnWidth: "30px",
                    textAnchor: 'middle',
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetX: 0,
                            offsetY: -13,
                            style: {
                                fontSize: '10px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
        },
    }]
};
</script>

<style scoped>

</style>