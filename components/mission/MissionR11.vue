<template>
    <div>
      <div class="font-title2 font-weight-medium my-5">Mission R11 สนับสนุนเครือข่ายภาคประชาสังคม</div>  
      <ClusterMapM4 v-if="shouldShowComponent(subjectIndex,1)"/> 
      <ActivityR11 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import ClusterMapM4 from './M4/ClusterMapM4.vue';
import ActivityConectM7 from './M7/ActivityConectM7.vue';
import ActivityR11 from './R11/ActivityR11.vue';

const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style>
</style>