<template>
    <div>
        <div class="font-title2 font-weight-medium mt-8"> จำนวนการเข้าถึง <span class="">(มิติข้อมูลข่าวสาร)</span></div>
        <v-card class="pa-5 card-stat-shadow">
            <v-row>
                <v-col v-for="(item, i) in items" :key="i" cols="6" sm="3" md="2">
                    <v-card class="h-100" rounded="lg" elevation="0">
                        <div class="pa-4">
                            <div class="font-title2 font-weight-medium"
                                :style="'color:' + getTeamColor(item.team.toUpperCase())">
                                Team <span class="font-title2 text-uppercase">{{ item.team }}</span>
                            </div>
                            <div class="text-h4 font-weight-medium"> {{ formatNumber(item.total) }}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

        <LineChart />
       
    </div>
</template>

<script setup>
import LineChart from "./components/chart/LineChart.vue";

const { getTeamColor } = useColors();
import { ref } from "vue";

const itemsReport = ref([
    { team: "all", count: 81 },
    { team: "c", count: 35 },
    { team: "d", count: 0 },
    { team: "e", count: 25 },
    { team: "f", count: 16 },
    { team: "g", count: 5 },
]);

const socialBot = ref([
    { platform: "facebook", count: 1030, change: 50 },
    { platform: "x", count: 650, change: 50 },
    { platform: "youtube", count: 200, change: -5 },
    { platform: "tiktok", count: 30, change: 0 },
    { platform: "instagram", count: 50, change: 0 },
]);

const contentTitle = ref([
    { name: "หมอเกศศิษย์ร่วมสถาบัน", count: 130, change: 200, sum: 330 },
    { name: "บุ้ง ทะลุวัง ด้วยมวลชนคนรุ่นใหม่", count: 450, change: 500, sum: 950 },
    { name: "พรบ.งบเพิ่มเติม", count: 200, change: 350, sum: 550 },
    { name: "คดี 112 กวินหนีไปแล้ว แต่โตโต้ไม่รู้ขอเลื่อนนัด", count: 300, change: 400, sum: 700 },
    { name: "ทรายถูกกลั่นแกล้ง แค่คนแต่งชุดไทยก็โดน", count: 300, change: 600, sum: 900 },
]);

const calculatePercentage = (count, sum) => (sum > 0 ? ((count / sum) * 100).toFixed(2) : 0);

const seriesData = [
    { name: "C", data: [30, 40, 35, 50, 49, 60, 70] },
    { name: "D", data: [40, 60, 40, 60, 70, 55, 80] },
    { name: "E", data: [50, 80, 120, 90, 80, 65, 90] },
    { name: "F", data: [80, 100, 60, 110, 95, 120, 125] },
    { name: "G", data: [100, 65, 95, 68, 130, 100, 140] },
];

// คำนวณยอดรวมทั้งหมด
const totalAll = seriesData.reduce(
    (total, team) => total + team.data.reduce((sum, value) => sum + value, 0),
    0
);

// แปลง seriesData เป็น items และเพิ่ม Team All
const items = ref([
    { team: "all", total: totalAll }, // เพิ่ม Team All เป็นอันแรก
    ...seriesData.map((team) => ({
        team: team.name,
        total: team.data.reduce((acc, value) => acc + value, 0), // คำนวณยอดรวมของแต่ละทีม
    })),
]);
</script>

<style>
.pro-m1 .v-progress-linear__determinate {
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
    box-shadow: 3px 3px 6px #00000029;
}

.v-progress-linear.pro-m1 {
    background-color: #6fba21;
}

.card-stat-shadow {
    box-shadow: 3px 3px 6px #00000029;
    border-radius: 23px;
}
</style>
