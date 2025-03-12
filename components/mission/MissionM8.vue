<template>
    <div>
      <div class="font-title2 font-weight-medium my-5">Mission M8 วิเคราะห์ข้อมูล</div>  
      <WorkPlanM8 v-if="shouldShowComponent(subjectIndex,1)"/>
      <ActivityPlanM8 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import WorkPlanM8 from './M8/WorkPlanM8.vue';
import ActivityPlanM8 from './M8/ActivityPlanM8.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style>
</style>