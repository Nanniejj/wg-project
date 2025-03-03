<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="font-title my-5">กิจกรรม</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(activity, index) in activities" :key="index" cols="12" md="4">
                <v-card class="pa-5 rounded-lg card-stat-shadow h-100 position-relative">
                    <v-avatar size="45" :color="getTeamColor(activity.team)" class="white--text text-h6 my-2">
                        {{ activity.team }}
                    </v-avatar>
                    <v-carousel hide-delimiters height="200">
                        <v-carousel-item v-for="(image, i) in activity.images" :key="i" :src="image"></v-carousel-item>
                    </v-carousel>
                    <v-card-title class="text-subtitle-1 font-weight-bold">
                        {{ activity.title }}
                    </v-card-title>
                    <v-card-text class="text-body-2" style="height: 130px">
                        <div class="truncate-text-3">
                            รายละเอียด: {{ activity.description }}</div>
                    </v-card-text>
                    <div>
                        <v-row class="px-4 mb-2 position-absolute bottom-0 mb-3" no-gutters>
                            <v-col cols="6" class="d-flex align-center">
                                <v-icon color="#BE0711" class="mr-1">mdi-map-marker</v-icon>
                                <span class="text-caption">{{ activity.location }}</span>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center justify-end">
                                <v-icon color="#ED4A9A" class="mr-1">mdi-calendar</v-icon>
                                <span class="text-caption">{{ activity.date }}</span>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <v-icon class="mr-2" color="#707070">mdi-account-group</v-icon>
                                    <span class="text-body-2">{{ activity.participants }}</span>
                                </div>
                            </v-col>
                            <v-col cols="6" class="text-right">
                                <v-btn variant="text"> <v-icon end>mdi-arrow-right</v-icon></v-btn>

                            </v-col>
                        </v-row>
                    </div>


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
        title: "การอบรมให้ความรู้การป้องกันและการแก้ไขปัญหายาเสพติด",
        description:
            "ให้ความรู้แก่เด็กเรียนในการป้องกันตนเองจาก ยาเสพติด, การเคารพกฎหมายจราจร, กิจกรรมสร้างเครือข่ายในโรงเรียน",
        location: "สภ. เมืองพังงา",
        date: "12 ก.ค. 67",
        participants: "100",
        images: [
            "./R12(3).png",
            "./R12(1).png"
        ],
    },
    {
        team: "D",
        title: "ประชาสัมพันธ์กิจกรรมป้องกันและแก้ไขปัญหายาเสพติด",
        description: "กิจกรรมประกวดความสามารถ",
        location: "สภ. เมืองพังงา",
        date: "12 ก.ค. 67",
        participants: "100",
        images: [
            "./R12(3).png",
            "./R12(1).png"
        ],
    },
    {
        team: "D",
        title: "ประชาสัมพันธ์กิจกรรมป้องกันและแก้ไขปัญหายาเสพติด",
        description: "กิจกรรมประกวดความสามารถ",
        location: "สภ. เมืองพังงา",
        date: "12 ก.ค. 67",
        participants: "100",
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