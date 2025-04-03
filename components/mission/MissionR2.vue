<template>
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission R2 เพจ ISOC ประจำจังหวัด</div>  
        <IsocStatR2 v-if="shouldShowComponent(subjectIndex,1)"/>
        <ProvinceLineChartR2 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import IsocStatR2 from './R2/IsocStatR2.vue';
import ProvinceLineChartR2 from './R2/ProvinceLineChartR2'
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style>
    
</style>