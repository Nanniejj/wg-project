<template>
    <div>
        <ActivityTrackerM3 />
        <ProfileCardM3/>
        <timeline/>
        <heatmap/>
        <PostCardM3/>
    </div>
</template>
<script setup>
import ActivityTrackerM3 from './M3/ActivityTrackerM3.vue';
import ProfileDarkSideM3 from './M3/ProfileDarkSideM3.vue';
import ProfileCardM3 from './M3/ProfileCardM3.vue';
import timeline from "~/components/timeline/timeline.vue";
import heatmap from "~/components/map/heatmap.vue";
import PostCardM3 from "./M3/PostCardM3.vue"
</script>
<style></style>