<template >
    <div>
        <LineChartReponM6 v-if="shouldShowComponent(subjectIndex,1)"/>
        <PostM6 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import LineChartReponM6 from './M6/LineChartReponM6.vue';
import PostM6 from './M6/PostM6.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style >
    
</style>