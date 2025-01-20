<template>
  <!-- <v-container class="d-flex justify-center">
      <v-card-title class="text-h4 font-weight-bold">Map</v-card-title>
    </v-container> -->
  <v-col cols="12">
    <heatmap />
  </v-col>
  <v-col cols="12">
    <timeline />
  </v-col>
</template>

<script setup>
  // import LeafletMap from "~/components/map/Leafletmap.vue";
  import timeline from "~/components/timeline/timeline.vue";
  import heatmap from "~/components/map/heatmap.vue";
</script>

<style scoped></style>
