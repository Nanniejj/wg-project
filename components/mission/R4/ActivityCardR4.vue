<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="font-title my-5">กิจกรรม</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(activity, index) in activities" :key="index" cols="12" md="4">
                <v-card class="pa-4 rounded-lg card-stat-shadow">
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
                    <div class="mt-2">
                        <span class="text-body-2 font-weight-medium">กลุ่มเป้าหมาย :</span>
                        <v-chip v-for="group in activity.targetGroups" :key="group" class="ml-2" variant="flat"
                            color="#EFF0A3" size="small">
                            {{ group }}
                        </v-chip>
                    </div>
                    <v-card-actions>
                        <div>
                            <v-chip class="ml-2" variant="flat" color="#FFBC50" size="small">
                                กิจกรรมริเริ่ม
                            </v-chip>
                        </div>  <v-spacer></v-spacer>
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
        team: "D",
        color: "purple",
        title: "กิจกรรม ชป.กร. ร่วมกับเครือข่ายมวลชนในพื้นที่",
        description: "อส.กร.301 บ้านบ่อแร่ ร่วทกับ ผบ.ร้อน.ร.1433,ชป.บ้านมะโอ ป่าไม้โครงการฯ และหน่วยงานในพื้นที่ดำเนินกิจกรรมจิตอาสาตามโครงการจิตอาสา “ปลูกป่า”",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        targetGroups: ["Gen Y", "Gen X"],
        images: [
            "./R12(3).png",
            "./R12(1).png"
        ],
    },
    {
        team: "D",
        color: "purple",
        title: "กิจกรรม ชป.กร. ร่วมกับเครือข่ายมวลชนในพื้นที่",
        description: "อส.กร.301 บ้านบ่อแร่ ร่วทกับ ผบ.ร้อน.ร.1433,ชป.บ้านมะโอ ป่าไม้โครงการฯ และหน่วยงานในพื้นที่ดำเนินกิจกรรมจิตอาสาตามโครงการจิตอาสา “ปลูกป่า”",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        targetGroups: ["Gen Y", "Gen X"],
        images: [
            "./R12(3).png",
            "./R12(1).png"
        ],
    },
    {
        team: "D",
        color: "green",
        title: "กิจกรรม ชป.กร. ร่วมกับเครือข่ายมวลชนในพื้นที่",
        description: "อส.กร.301 บ้านบ่อแร่ ร่วทกับ ผบ.ร้อน.ร.1433,ชป.บ้านมะโอ ป่าไม้โครงการฯ และหน่วยงานในพื้นที่ดำเนินกิจกรรมจิตอาสาตามโครงการจิตอาสา “ปลูกป่า”",
        location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
        date: "12 ก.ค. 67",
        targetGroups: ["Gen Y", "Gen X"],
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