<template >
    <div>
        <div class="font-title2 font-weight-medium my-5">Mission R9 สนับสนุนเครือข่ายโรงเรียน และอุดมศึกษา</div>  
        <ActivityStatR9 v-if="shouldShowComponent(subjectIndex,1)" />
        <ActivitySchoolR9 v-if="shouldShowComponent(subjectIndex,2)" />
    </div>
</template>
<script setup>
import ActivityStatR9 from './R9/ActivityStatR9.vue';
import ActivitySchoolR9 from './R9/ActivitySchoolR9.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});

</script>
<style>
    
</style>