<template>
    <div class="pb-5">
        <v-card class="pt-2 pa-10  card-stat-shadow h-100 position-relative">
            <div class="font-title2 font-weight-medium mt-5 mb-1">ผลการ Report เพจเป้าหมาย </div>
            <div class="text-right mb-4">
                <span><v-icon icon="mdi-circle" color="#96CCD5"></v-icon> เพจเป้าหมายทั้งหมด </span>
                <span><v-icon icon="mdi-circle" color="#655e5f"></v-icon> เพจปิด </span>
                <span><v-icon icon="mdi-circle" color="#6FBA21"></v-icon> เพจที่ยังไม่ถูกปิด </span>
            </div>
            <v-row v-for="(content, k) in contentTitle" :key="k" class="mx-auto">
                <v-col cols="12" sm="3">
                    <div class="cyan--text text-center " style="
                width: 100%;
                padding: 8px 10px;
                height: 45px;
                background: #96ccd5 0% 0% no-repeat padding-box;
                box-shadow: 3px 3px 6px #00000029;
                border-radius: 26px;
              ">
                        <span class="font-light mr-2"> เป้าหมายทั้งหมด : </span> <span
                            class="font-weight-bold font-title2"> {{ formatNumber(content.sum) }}</span>
                    </div>
                    <!-- <div class="font-subtitle">
                     <v-icon  class="mr-1 mt-1" variant="flat" icon="mdi-circle"
                      :color="getTeamColor(content.name)">
                      
                    </v-icon>
                      <span class="font-subtitle mr-1">Team {{ content.name }}</span>
                </div> -->
                </v-col>
                <v-col class="d-flex align-center" cols="12" sm="">
                    <v-progress-linear class="pro-m1 me-2"
                        :model-value="calculatePercentage(content.change, content.sum)" height="45" color="#655e5f"
                        rounded>
                        <template v-slot:default="{ value }">
                            <v-layout class="px-5 font-weight-bold text-white d-inline">
                                <div class="float-left"> <span class="font-title2"> {{
                                    calculatePercentage(content.change, content.sum) }}% </span>
                                    <span class="text-caption"> ({{ formatNumber(content.change) }}) </span>
                                </div>
                                <div class="float-right"> <span class="font-title2"> {{
                                    calculatePercentage(content.sum - content.change, content.sum) }}% </span>
                                    <span class="text-caption"> ({{ formatNumber(content.sum - content.change) }}) </span>
                                </div>
                                <!-- <div class="float-right"> {{ formatNumber(content.change) }} </div> -->
                            </v-layout>
                        </template>
                    </v-progress-linear>

                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script setup>
const { getTeamColor } = useColors();
import { ref } from "vue";

const contentTitle = ref([
    { name: "all", change: 32, sum: 81 },
    // { name: "D",  change: 13, sum: 40 },
    // { name: "E", change: 25, sum: 57 },
    // { name: "F",  change: 20, sum: 69 },
    // { name: "G",  change: 1, sum: 10 },
]);

const calculatePercentage = (count, sum) => (sum > 0 ? ((count / sum) * 100).toFixed(1) : 0);

</script>
<style></style>