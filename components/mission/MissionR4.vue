<template>
    <div>

        <div class="font-title2 font-weight-medium my-5">Mission R4 IRC วันสำคัญประจำเดือน 3 มิติ</div>
        <IRCPlanYearR4 v-if="shouldShowComponent(subjectIndex,1)"/>
        <DomainInfoR4 v-if="shouldShowComponent(subjectIndex,2)"/>
        <AccessLineChartR4 v-if="shouldShowComponent(subjectIndex,3)"/>
        <AccessLineChartInfoR4 v-if="shouldShowComponent(subjectIndex,4)"/>
       <ActivityStatR4 v-if="shouldShowComponent(subjectIndex,5)"/>
       <ActivityCardR4 v-if="shouldShowComponent(subjectIndex,6)"/>
    </div>
</template>
<script setup>
import IRCPlanYearR4 from './R4/IRCPlanYearR4.vue';
import DomainInfoR4 from './R4/DomainInfoR4'
import AccessLineChartR4 from './R4/AccessLineChartR4'
import AccessLineChartInfoR4 from './R4/AccessLineChartInfoR4'
import ActivityStatR4 from './R4/ActivityStatR4'
import ActivityCardR4 from './R4/ActivityCardR4'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style></style>