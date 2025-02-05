<template >
    <div>
        <StatBoxR1 v-if="shouldShowComponent(subjectIndex,1)" />
        <PageR1 v-if="shouldShowComponent(subjectIndex,2)"/>
        <InfluencerR1 v-if="shouldShowComponent(subjectIndex,3)"/>
        <LineChartInfluencerR1 v-if="shouldShowComponent(subjectIndex,4)" />
        <StatFandomR1 v-if="shouldShowComponent(subjectIndex,5)" />
        <OpenChartR1 v-if="shouldShowComponent(subjectIndex,6)" />
        <MemberR1 v-if="shouldShowComponent(subjectIndex,7)"/>
        <PostR1 v-if="shouldShowComponent(subjectIndex,8)" />
    </div>
</template>
<script setup>
import StatBoxR1 from './R1/StatBoxR1.vue';
import PageR1 from './R1/PageR1.vue';
import InfluencerR1 from './R1/InfluencerR1.vue';
import LineChartInfluencerR1 from './R1/LineChartInfluencerR1.vue';
import StatFandomR1 from './R1/StatFandomR1.vue';
import OpenChartR1 from './R1/OpenChartR1.vue';
import MemberR1 from './R1/MemberR1.vue';
import PostR1 from './R1/PostR1.vue'

const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});

</script>
<style>
    
</style>