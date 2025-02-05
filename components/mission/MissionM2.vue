<template >
    <div>
        <div class="font-title2 font-weight-medium base-color my-2"> Mission M2 การปฏิบัติทางข้อมูลข่าวสาร (กลยุทธ์สร้างภาพจำ) </div>
        <TargetStatM2 class="mt-2"v-if="shouldShowComponent(subjectIndex,1)"/>
        <ContentStatM2 v-if="shouldShowComponent(subjectIndex,2)"/>
        <PostStatM2 v-if="shouldShowComponent(subjectIndex,3)"/>
        <AccessStatM2 v-if="shouldShowComponent(subjectIndex,4)"/>
        <ContentPlatformM2 v-if="shouldShowComponent(subjectIndex,5)"/>
    </div>
</template>
<script setup>
import TargetStatM2 from './M2/TargetStatM2.vue';
import ContentStatM2 from './M2/ContentStatM2.vue';
import PostStatM2 from './M2/PostStatM2.vue';
import AccessStatM2 from './M2/AccessStatM2.vue';
import ContentPlatformM2 from './M2/ContentPlatformM2.vue';
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style >
    
</style>