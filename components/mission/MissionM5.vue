<template >
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission M5 ตอบโต้ประเด็นประจำวัน / สัปดาห์</div>  
        <StatRespondM5 v-if="shouldShowComponent(subjectIndex,1)"/>
        <PostStatM5 v-if="shouldShowComponent(subjectIndex,2)"/>
        <AccessStatM5 v-if="shouldShowComponent(subjectIndex,3)"/>
        <BarChartStatTeamM5 v-if="shouldShowComponent(subjectIndex,4)"/>
        <ContentPhotoM5 v-if="shouldShowComponent(subjectIndex,5)"/>
        <SummaryContentM5 v-if="shouldShowComponent(subjectIndex,6)"/>
    </div>
</template>
<script setup>
import StatRespondM5 from './M5/StatRespondM5.vue';
import PostStatM5 from './M5/PostStatM5.vue';
import AccessStatM5 from './M5/AccessStatM5.vue';
import BarChartStatTeamM5 from './M5/BarChartStatTeamM5.vue';
import ContentPhotoM5 from './M5/ContentPhotoM5.vue';
import SummaryContentM5 from './M5/SummaryContentM5.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style >
    
</style>