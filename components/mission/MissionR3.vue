<template>
    <div>

        <div class="font-title2 font-weight-medium my-5">Mission R3 เพจข่าวและสื่อมวลชนประจำจังหวัด</div>
        <PageStatR3 v-if="shouldShowComponent(subjectIndex,1)"/>
        <ProvinceLineChartR2 v-if="shouldShowComponent(subjectIndex,2)"/>
        <v-container v-if="shouldShowComponent(subjectIndex,3)">
            <PostR3 />
        </v-container>
    </div>
</template>
<script setup>
import PageStatR3 from './R3/PageStatR3.vue';
import PostR3 from './R3/PostR3.vue';
import ProvinceLineChartR2 from './R2/ProvinceLineChartR2'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style></style>