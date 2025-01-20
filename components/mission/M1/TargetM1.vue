<template >
    <div>
        <div class="font-title2 font-weight-medium mt-8">จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ</div>
        <v-card class="pa-5 card-stat-shadow">
            <v-row>
                <v-col v-for="(item, i) in itemsReport" :key="i" cols="6" sm="3" md="2">
                    <v-card class="h-100" :color="getTeamColor(item.team.toUpperCase())" rounded="lg" elevation="4">
                        <div class="pa-4 text-white">
                            <div class="font-title2 font-weight-medium">
                                Team <span class="font-title2 text-uppercase">{{ item.team }}</span>
                            </div>
                            <div class="text-h4 font-weight-medium"> {{ formatNumber(item.count) }}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script setup>
import LineChartM1 from "./LineChartM1.vue";

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



</script>
<style >
    
</style>