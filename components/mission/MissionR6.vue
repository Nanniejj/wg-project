<template>
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission R6 กิจกรรมเข้าสู่สถานศึกษา ระดับอุดมศึกษา และสร้างเครือข่าย</div>
        <StatNetworkR5 />
        <MapActiveR5 />
        <StackChartR5 />
        <StatAcademyR6 />
        <AcademyLineChartR6 />
        <LeaderStatR6/>
        <!-- <LeaderBarChartR5 /> -->
        <ActivitySchoolCardR5 />
        <br>
    </div>
</template>
<script setup>
import MapActiveR5 from './R5/MapActiveR5.vue';
import StatNetworkR5 from './R5/StatNetworkR5.vue';
import StackChartR5 from './R5/StackChartR5.vue';
import StatAcademyR6 from './R6/StatAcademyR6.vue';
import AcademyLineChartR6 from './R6/AcademyLineChartR6.vue';
// import LeaderBarChartR5 from './R5/LeaderBarChartR5.vue';
import ActivitySchoolCardR5 from './R5/ActivitySchoolCardR5'
import LeaderStatR6 from './R6/LeaderStatR6'
</script>
<style></style>