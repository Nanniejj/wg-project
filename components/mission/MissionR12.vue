<template>
  <div>
    <div class="font-title2 font-weight-medium my-5">
        Mission R12 สนับสนุนเครือข่ายกลุ่มโอกาส
    </div>
    <StatNetworkR12 v-if="shouldShowComponent(subjectIndex,1)"/>
    <MapActiveR12 v-if="shouldShowComponent(subjectIndex,2)"/>
    <ActivityR12 v-if="shouldShowComponent(subjectIndex,3)"/>
  </div>
</template>
<script setup>
  import StatNetworkR12 from "./R12/StatNetworkR12.vue";
  import ClusterMapM4 from './M4/ClusterMapM4.vue';
  import ActivityR12 from './R12/ActivityR12.vue';
  import MapActiveR12 from './R12/MapActiveR12.vue';

  const props = defineProps({
    subjectIndex: {
        type: Array,
        default: () => [], // กำหนดค่าเริ่มต้นเป็น array ว่าง
    },
});
</script>
<style></style>
