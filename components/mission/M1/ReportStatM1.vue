<template>
    <div>
        <div class="font-title2 font-weight-medium mt-8"> จำนวนครั้ง Report</div>
        <v-card class="pa-5 card-stat-shadow">
            <v-row>
                <v-col v-for="(item, i) in items " :key='i' cols="6" sm="3" md="2">

                    <div class="pa-4 ">
                        <div class="font-title2 font-weight-medium"
                            :style="`color:${getTeamColor(item.team.toUpperCase())};`"> Team <span
                                class="font-title2 text-uppercase">
                                {{ item.team }}</span></div>
                        <div class="text-h3 font-weight-medium"> {{ item.count }}</div>
                    </div>

                </v-col>
                <!-- <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col> -->

            </v-row></v-card>
    </div>
</template>
<script setup>
const { getTeamColor, getMissionColor } = useColors();

import { ref } from "vue";
const items = ref([{ team: 'all', count: 29 }, { team: 'c', count: 15 }, { team: 'd', count: 8 }, { team: 'e', count: 2 }, { team: 'f', count: 2 }, { team: 'g', count: 2 }])
</script>
<style></style>