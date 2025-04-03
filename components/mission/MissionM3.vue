<template>
    <div>
        <ActivityTrackerM3  v-if="shouldShowComponent(subjectIndex,1)"/>
        <ProfileDarkSideM3 v-if="shouldShowComponent(subjectIndex,2)"/>
        <ProfileCardM3 v-if="shouldShowComponent(subjectIndex,2)"/>
        <timeline v-if="shouldShowComponent(subjectIndex,3)"/>
        <heatmap v-if="shouldShowComponent(subjectIndex,4)"/>
        <PostCardM3 v-if="shouldShowComponent(subjectIndex,5)"/>
    </div>
</template>
<script setup>
import ActivityTrackerM3 from './M3/ActivityTrackerM3.vue';
import ProfileDarkSideM3 from './M3/ProfileDarkSideM3.vue';
import ProfileCardM3 from './M3/ProfileCardM3.vue';
import timeline from "~/components/timeline/timeline.vue";
import heatmap from "~/components/map/heatmap.vue";
import PostCardM3 from "./M3/PostCardM3.vue"
const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});

</script>
<style></style>