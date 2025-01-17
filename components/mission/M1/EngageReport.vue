<template >
   <div>
            <div class="font-title2 font-weight-medium mt-8 mb-2">ผลการเพิ่มยอด Like</div>
            <div class="text-right my-3">
                <span><v-icon icon="mdi-circle" color="#3A6FAC"></v-icon> ยอดเดิม </span>
                <span><v-icon icon="mdi-circle" color="#6FBA21"></v-icon> เพิ่มขึ้น </span>
                <span><v-icon icon="mdi-circle" color="#96CCD5"></v-icon> ยอดปัจจุบัน </span>
            </div>
            <v-row v-for="(content, k) in contentTitle" :key="k">
                <v-col cols="12" sm="6">
                    <div class="font-subtitle">
                        <span class="font-subtitle mr-3">ประเด็นที่ {{ k + 1 }} </span> {{ content.name }}
                    </div>
                </v-col>
                <v-col class="d-flex align-center" cols="12" sm="6">
                    <v-progress-linear class="pro-m1 me-2"
                        :model-value="calculatePercentage(content.count, content.sum)" height="35" color="#3A6FAC"
                        rounded>
                        <template v-slot:default="{ value }">
                            <v-layout class="px-5 font-weight-bold text-white d-inline">
                                <div class="float-left">{{ formatNumber(content.count)}}</div>
                                <div class="float-right">{{ formatNumber(content.change) }}</div>
                            </v-layout>
                        </template>
                    </v-progress-linear>
                    <span class="cyan--text text-center font-weight-bold" style="
                width: 100px;
                padding: 5px 10px;
                background: #96ccd5 0% 0% no-repeat padding-box;
                box-shadow: 3px 3px 6px #00000029;
                border-radius: 26px;
              ">
                        {{ formatNumber(content.sum) }}
                    </span>
                </v-col>
            </v-row>
        </div>
</template>
<script setup>
const { getTeamColor } = useColors();
import { ref } from "vue";

const contentTitle = ref([
    { name: "หมอเกศศิษย์ร่วมสถาบัน", count: 130, change: 200, sum: 330 },
    { name: "บุ้ง ทะลุวัง ด้วยมวลชนคนรุ่นใหม่", count: 450, change: 500, sum: 950 },
    { name: "พรบ.งบเพิ่มเติม", count: 200, change: 350, sum: 550 },
    { name: "คดี 112 กวินหนีไปแล้ว แต่โตโต้ไม่รู้ขอเลื่อนนัด", count: 300, change: 400, sum: 700 },
    { name: "ทรายถูกกลั่นแกล้ง แค่คนแต่งชุดไทยก็โดน", count: 300, change: 600, sum: 900 },
]);

const calculatePercentage = (count, sum) => (sum > 0 ? ((count / sum) * 100).toFixed(2) : 0);

</script>
<style >
    
</style>