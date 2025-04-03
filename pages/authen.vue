<template>
    <!-- <v-container class="d-flex justify-center">
          <v-card-title class="text-h4 font-weight-bold">Map</v-card-title>
        </v-container> -->
    <auth />
  </template>
  
  <script setup>
    import auth from "./components/twofactor/twofactor.vue";
    definePageMeta({ layout: "false" });
    // import create from "./components/create/mission/M3.vue";
  </script>
  
  <style scoped></style>
  