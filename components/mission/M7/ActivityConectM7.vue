<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="font-title my-5">กิจกรรมสนับสนุนเครือข่าย</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(activity, index) in activities" :key="index" cols="12" md="4">
                <v-card class="pa-4 rounded-lg">
                    <v-avatar size="45" :color="getTeamColor(activity.team)" class="white--text text-h6 my-2">
                        {{ activity.team }}
                    </v-avatar>
                    <v-carousel hide-delimiters height="200">
                        <v-carousel-item v-for="(image, i) in activity.images" :key="i" :src="image"></v-carousel-item>
                    </v-carousel>
                    <v-card-title class="text-subtitle-1 font-weight-bold">
                        {{ activity.title }}
                    </v-card-title>
                    <v-card-text class="text-body-2">
                        รายละเอียด: {{ activity.description }}
                    </v-card-text>
                    <v-row class="px-4 mb-2">
                        <v-col cols="6" class="d-flex align-center">
                            <v-icon color="red" class="mr-1">mdi-map-marker</v-icon>
                            <span class="text-caption">{{ activity.location }}</span>
                        </v-col>
                        <v-col cols="6" class="d-flex align-center justify-end">
                            <v-icon color="red" class="mr-1">mdi-calendar</v-icon>
                            <span class="text-caption">{{ activity.date }}</span>
                        </v-col>
                    </v-row>

                    <v-card-actions>
                        <v-chip color="#96CCD5" block      variant="flat">
                            ชื่อเครือข่าย
                        </v-chip>
                        <v-btn class="text-right"> <v-icon end>mdi-arrow-right</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
const { getTeamColor, getMissionColor } = useColors();
const activities = ref([
    {
        team: "C",
        color: "purple",
        title: "การจัดเสวนา “จิบกาแฟแลสยาม”",
        description: "หัวข้อ: บูรพาทิวัตน์ ต้นทุนภูมิปัญญารัฐศาสตร์ไทย...",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        images: [
            "./R11(3).png", // แทนที่ด้วย URL ของรูปจริง
            "./R11(2).png"
        ],
    },
    {
        team: "C",
        color: "purple",
        title: "การจัดเสวนา “จิบกาแฟแลสยาม”",
        description: "หัวข้อ: บูรพาทิวัตน์ ต้นทุนภูมิปัญญารัฐศาสตร์ไทย...",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        images: [
            "./R11(1).png",
            "./R11(2).png"
        ],
    },
    {
        team: "D",
        color: "green",
        title: "การจัดเสวนา “จิบกาแฟแลสยาม”",
        description: "หัวข้อ: บูรพาทิวัตน์ ต้นทุนภูมิปัญญารัฐศาสตร์ไทย...",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        images: [
            "./R12(3).png",
            "./R12(1).png"
        ],
    },
]);
</script>

<style scoped>
.v-card {
    border-radius: 12px;
}
</style>