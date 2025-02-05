<template>
    <div>
        <v-row>
            <v-col style="height: 500px !important;overflow-y: scroll;" cols="12" md="8">
                <heatmap />
            </v-col>
            <v-col  cols="12" md="4">
                <div>ภาคกลาง</div>
                <v-card class="my-3 pa-5" v-for="(item, i) in dataMap" :key="i">
                    <div> {{ item.name }}</div>
                    <div class="text-right">
                        <v-chip class="mr-1 my-1 text-left" variant="flat" :color="getTeamColor(item.team)">
                            <span class="text-white">Team {{ item.team }}</span>
                        </v-chip>
                    </div>
                </v-card>
            </v-col>

        </v-row>
        <CardActivityM7/>
    </div>
</template>
<script setup>
const { getTeamColor, getMissionColor } = useColors();
import heatmap from "~/components/map/heatmap.vue";
import CardActivityM7 from "./CardActivityM7.vue";

const dataMap = [{ team: "C", name: "กิจกรรมศาสตร์พระราชา" }
    , { team: "D", name: "โครงการประกวดการนำเสนอกิจกรรมต่อ ยอดหลักศาสตร์พระราชา" }
    , { team: "D", name: "โครงการประกวดการนำเสนอกิจกรรมต่อ ยอดหลักศาสตร์พระราชา" }
    , { team: "D", name: "โครงการประกวดการนำเสนอกิจกรรมต่อ ยอดหลักศาสตร์พระราชา" }
]
</script>
<style></style>