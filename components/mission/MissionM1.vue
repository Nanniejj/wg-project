<template>
    <div>
        <!-- {{ subjectIndex }} -->
        <!-- ตรวจสอบเงื่อนไขและแสดง component ตาม index -->
        <StatBoxM1 v-if="shouldShowComponent(subjectIndex,1)" />
        <ReportStatM1 v-if="shouldShowComponent(subjectIndex,2)" />
        <TargetM1 v-if="shouldShowComponent(subjectIndex,3)" />
        <SocialBotM1 v-if="shouldShowComponent(subjectIndex,4)" />
        <EngageReport v-if="shouldShowComponent(subjectIndex,5)" />
    </div>
</template>

<script setup>
import StatBoxM1 from './M1/StatBoxM1.vue';
import ReportStatM1 from './M1/ReportStatM1.vue';
import TargetM1 from './M1/TargetM1.vue';
import SocialBotM1 from './M1/SocialBotM1.vue';
import EngageReport from './M1/EngageReport.vue';


// ใช้ defineProps เพื่อรับค่า subjectIndex จาก props
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});

// ฟังก์ชันช่วยสำหรับการตรวจสอบเงื่อนไขของ index
// function shouldShowComponent(index) {
//     // ถ้า subjectIndex ว่างหรือ undefined ให้แสดงทุก component
//     if (!props.subjectIndex || props.subjectIndex.length === 0) {
//         return true;
//     }
//     // ถ้า subjectIndex มีค่า ให้แสดง component ที่ตรงกับ index เท่านั้น
//     return props.subjectIndex.includes(index);
// }
</script>

<style>
/* Add any necessary styling here */
</style>
