<template>
    <div>
      <div class="font-title2 font-weight-medium my-5">Mission M7 สร้างมวลชนฝั่งเรา</div>  
      <StatMassR8 v-if="shouldShowComponent(subjectIndex,1)"/>
      <ActivityConectM7 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import StatMassR8 from './R8/StatMassR8.vue';
import ActivityConectM7 from './M7/ActivityConectM7.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style>
</style>