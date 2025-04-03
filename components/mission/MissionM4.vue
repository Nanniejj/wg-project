<template >
    <div>
       <ClusterMapM4 v-if="shouldShowComponent(subjectIndex,1)"/> 
       <ActivityTimeM4 v-if="shouldShowComponent(subjectIndex,2)"/>
    </div>
</template>
<script setup>
import ClusterMapM4 from './M4/ClusterMapM4.vue';
import ActivityTimeM4 from './M4/ActivityTimeM4.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style >
    
</style>