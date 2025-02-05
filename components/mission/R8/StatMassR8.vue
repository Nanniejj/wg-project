<template>
    <v-container>
        <div v-for="(network, index) in networkData" :key="index">
            <div class="my-5">
                <v-card class="pa-6 card-stat-shadow h-100">
                    <v-row>
                        <v-col cols="12" md="auto">
                            <v-card-title class="text-h6">{{ network.title }}</v-card-title>
                            <v-chip class="ma-3 pa-4 text-h5" color="#2A3547" variant="flat">
                                <span class="text-h6"> {{ network.total }}</span>
                            </v-chip>
                        </v-col>
                        <v-col cols="12" md="" align="center" justify="center" class="text-center">
                            <v-row>
                                <v-col v-for="(item, idx) in network.items" :key="idx" cols="12" sm="6" md="">
                                    <v-card class="pa-2 text-center card-stat-shadow">
                                        <v-avatar size="45" :color="getTeamColor(item.label)" class="mb-2">
                                            <span class="text-white text-h6">{{ item.label }}</span>
                                        </v-avatar>
                                        <div class="text-h5">{{ item.value }}</div>
                                        <div class="text-caption">ยอดที่เพิ่มมา</div>
                                        <div :class="item.added > 0 ? 'text-green text-h6' : 'text-grey text-h6'">
                                            {{ item.added > 0 ? `+${item.added}` : '-' }}
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>



                </v-card>
            </div>
        </div>
    </v-container>
</template>
<script setup>
import { ref } from "vue";
const { getTeamColor, getMissionColor } = useColors();

const networkData = ref([
    {
        title: "เครือข่ายมวลชน",
        total: 49,
        items: [
            { label: "C", value: 7, added: 1, color: "deep-purple" },
            { label: "D", value: 4, added: 1, color: "green" },
            { label: "E", value: 2, added: 0, color: "amber" },
            { label: "F", value: 2, added: 0, color: "blue" },
            { label: "G", value: 33, added: 7, color: "red" },
        ],
    },
    {
        title: "POC (ผู้ประสานเครือข่าย)",
        total: 49,
        items: [
            { label: "C", value: 7, added: 2, color: "deep-purple" },
            { label: "D", value: 4, added: 1, color: "green" },
            { label: "E", value: 2, added: 0, color: "amber" },
            { label: "F", value: 2, added: 0, color: "blue" },
            { label: "G", value: 33, added: 5, color: "red" },
        ],
    },
]);
</script>
<style scoped>
.text-green {
    color: green;
}

.text-grey {
    color: grey;
}
</style>
