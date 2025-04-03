<template>
    <div>
      <div class="font-title2 font-weight-medium my-5">Mission R7 สร้างสื่อ/เครือข่ายสื่อใหม่/Influencer/นักวิชาการ</div>  
      <StatMassR7 v-if="shouldShowComponent(subjectIndex,1)"/>
      <TableNetworkM7 v-if="shouldShowComponent(subjectIndex,2)"/>
      <!-- <ActivityConectM7/> -->
    </div>
</template>
<script setup>
import StatMassR7 from './R7/StatMassR7.vue';
// import ActivityConectM7 from './M7/ActivityConectM7.vue';
import TableNetworkM7 from './R7/TableNetworkM7'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style>
</style>