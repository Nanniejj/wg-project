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
                            <div class="text-h6 px-3 font-weight-medium" v-if="network.news && network.person && network.inter">
                                <div> สำนักข่าว {{ network.news }} </div>
                                <div> บุคคล {{ network.person }} </div>
                                <div> ต่างประเทศ {{ network.inter }} </div>
                            </div>
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
        title: "สื่อสร้างกระแส",
        total: 123,
        items: [
            { label: "C", value: 50, added: 12, color: "deep-purple" },
            { label: "D", value: 26, added: 2, color: "green" },
            { label: "E", value: 5, added: 0, color: "amber" },
            { label: "F", value: 20, added: 2, color: "blue" },
            { label: "G", value: 22, added: 5, color: "red" },
        ],
    },
    {
        title: "เครือข่ายสื่อใหม่",
        total: 42,
        news: 10,
        person: 10,
        inter: 10,
        items: [
            { label: "C", value: 22, added: 8, color: "deep-purple" },
            { label: "D", value: 13, added: 1, color: "green" },
            { label: "E", value: 0, added: 0, color: "amber" },
            { label: "F", value: 1, added: 0, color: "blue" },
            { label: "G", value: 6, added: 0, color: "red" },
        ],
    },
    {
        title: "เครือข่าย influencer ภายนอก",
        total: 53,
        items: [
            { label: "C", value: 11, added: 3, color: "deep-purple" },
            { label: "D", value: 30, added: 2, color: "green" },
            { label: "E", value: 1, added: 0, color: "amber" },
            { label: "F", value: 0, added: 0, color: "blue" },
            { label: "G", value: 15, added: 4, color: "red" },
        ],
    },
    {
        title: "เครือข่ายนักวิชาการ",
        total: 53,
        items: [
            { label: "C", value: 11, added: 3, color: "deep-purple" },
            { label: "D", value: 30, added: 2, color: "green" },
            { label: "E", value: 1, added: 0, color: "amber" },
            { label: "F", value: 0, added: 0, color: "blue" },
            { label: "G", value: 15, added: 4, color: "red" },
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
