<template >
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission R10 สนับสนุนเครือข่ายสื่อ/ Influencer/นักวิชาการ/</div>  
        <SupportRespondR10 v-if="shouldShowComponent(subjectIndex,1)"/>
        <!-- <ActivityStatR9 v-if="shouldShowComponent(subjectIndex,1)" /> -->
        <!-- <ActivitySchoolR9 v-if="shouldShowComponent(subjectIndex,2)" /> -->
        <ActivityR10 v-if="shouldShowComponent(subjectIndex,2)"/>
        <AcademicArticle v-if="shouldShowComponent(subjectIndex,2)"/>
        <SupportPage v-if="shouldShowComponent(subjectIndex,3)"/>
        <!-- <PageStatLineChartR10/> -->
    </div>
</template>
<script setup>
// import ActivityStatR9 from './R9/ActivityStatR9.vue';
// import ActivitySchoolR9 from './R9/ActivitySchoolR9.vue';
import ActivityR10 from './R10/ActivityR10.vue';
import SupportRespondR10 from './R10/SupportStatR10.vue';
import AcademicArticle from './R10/AcademicArticle.vue';
import SupportPage from './R10/SupportPage.vue'
// import PageStatLineChartR10 from './R10/PageStatLineChartR10.vue'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});

</script>
<style>
    
</style>