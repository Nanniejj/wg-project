<template>
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission R5 กิจกรรมเข้าสู่โรงเรียน และสร้างเครือข่าย</div>
        <StatNetworkR5 v-if="shouldShowComponent(subjectIndex,1)"/>
        <MapActiveR5 v-if="shouldShowComponent(subjectIndex,2)"/>
        <StackChartR5 v-if="shouldShowComponent(subjectIndex,3)"/>
        <StatAcademyR5 v-if="shouldShowComponent(subjectIndex,3)"/>
        <AcademyLineChartR5 v-if="shouldShowComponent(subjectIndex,4)"/>
        <LeaderBarChartR5 v-if="shouldShowComponent(subjectIndex,5)"/>
        <ActivitySchoolCardR5 v-if="shouldShowComponent(subjectIndex,6)"/>
        <br>
    </div>
</template>
<script setup>
import MapActiveR5 from './R5/MapActiveR5.vue';
import StatNetworkR5 from './R5/StatNetworkR5.vue';
import StackChartR5 from './R5/StackChartR5.vue';
import StatAcademyR5 from './R5/StatAcademyR5.vue';
import AcademyLineChartR5 from './R5/AcademyLineChartR5.vue';
import LeaderBarChartR5 from './R5/LeaderBarChartR5.vue';
import ActivitySchoolCardR5 from './R5/ActivitySchoolCardR5'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style></style>