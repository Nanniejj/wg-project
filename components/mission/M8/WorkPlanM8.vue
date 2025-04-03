<template>
    <v-container>
        <div class="font-title2 font-weight-medium my-2">แผนงานสื่อสารยุทธศาสตร์กองทัพบก ปีงบประมาณ 2568</div>
        <v-img src="M8Plan.png" width="100%"></v-img>
      
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
