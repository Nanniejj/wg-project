<template>
    <div>
      <div class="font-title2 font-weight-medium my-5">Mission M7 จัดตั้งและสนับสนุน เครือข่ายประชาธิปไตย (เต็ม)</div>  
      <MapActiveM7 v-if="shouldShowComponent(subjectIndex,1)"/>
      <ActivityConectM7 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import MapActiveM7 from './M7/MapActiveM7.vue';
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