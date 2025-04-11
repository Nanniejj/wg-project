<template>
    <div>
        <div class="font-title2 font-weight-medium base-color my-2"> Mission M2 การปฏิบัติทางข้อมูลข่าวสาร
            (กลยุทธ์สร้างภาพจำ) </div>
        <TargetStatM2 class="mt-2" v-if="shouldShowComponent(subjectIndex, 1)" />
        <ContentStatM2 v-if="shouldShowComponent(subjectIndex, 2)" />
        <PostStatM2 v-if="shouldShowComponent(subjectIndex, 3)" />
        <AccessStatM2 v-if="shouldShowComponent(subjectIndex, 4)" />
        <ContentPlatformM2 v-if="shouldShowComponent(subjectIndex, 5)" />
        <v-row>
            <v-col cols="12">
                <SentimentChartM2 :statData="statData" />
            </v-col>
            <v-col cols="12">
                <LineChartPersonM2 :statData="statData" />
            </v-col>
        </v-row>
        <!-- <RecogMainM2/> -->
    </div>
</template>
<script setup>
import TargetStatM2 from './M2/TargetStatM2.vue';
import ContentStatM2 from './M2/ContentStatM2.vue';
import PostStatM2 from './M2/PostStatM2.vue';
import AccessStatM2 from './M2/AccessStatM2.vue';
import ContentPlatformM2 from './M2/ContentPlatformM2.vue';
import LineChartPersonM2 from './M2/LineChartPersonM2.vue';
import SentimentChartM2 from './M2/SentimentChartM2.vue';
// const start =  "2025-03-20T00:00:00"
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
const statData = ref(null);
const loading = ref(false);
const error = ref(null);
onMounted(async () => {
    try {
        loading.value = true;
        statData.value = await getStatKeyword(
            "2025-03-20T00:00:00",
            "2025-03-31T23:59:59"
        );
    } catch (err) {
        error.value = err;
        console.error("Error loading stat data:", err);
    } finally {
        loading.value = false;
    }
});
</script>
<style></style>