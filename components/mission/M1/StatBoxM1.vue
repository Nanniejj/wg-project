<template>
    <div>
        <div class="font-title2 font-weight-medium"> ชป.ไซเบอร์</div>
        <v-card class="pa-5 card-stat-shadow">
            <v-row>
                <v-col v-for="(item, i) in items " :key='i' cols="6" sm="3" md="2">
                    <v-card class="h-100" :color="getTeamColor(item.team.toUpperCase())" rounded="lg" elevation="4">
                        <div class="pa-4 text-white">
                            <div class="font-title2 font-weight-medium"> Team <span class="font-title2 text-uppercase">
                                    {{ item.team }}</span></div>
                            <div class="text-h4 font-weight-medium"> {{ item.count }}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script setup>
const { getTeamColor, getMissionColor } = useColors();

import { ref } from "vue";
const items = ref([{ team: 'all', count: 29 }, { team: 'c', count: 15 }, { team: 'd', count: 8 }, { team: 'e', count: 2 }, { team: 'f', count: 2 }, { team: 'g', count: 2 }])
const seriesData = [
    {
        name: "Team C",
        data: [30, 40, 35, 50, 49, 60, 70]
    },
    {
        name: "Team D",
        data: [40, 60, 40, 60, 70, 55, 80]
    },
    {
        name: "Team E",
        data: [50, 80, 120, 90, 80, 65, 90]
    },
    {
        name: "Team F",
        data: [80, 100, 60, 110, 95, 120, 125]
    },
    {
        name: "Team G",
        data: [100, 65, 95, 68, 130, 100, 140]
    }
];
</script>
<style>
.card-stat-shadow {
    box-shadow: 3px 3px 6px #00000029;
    border-radius: 23px;
}
</style>