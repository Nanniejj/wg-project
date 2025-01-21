<template>
    <v-row>
      <!-- Default template -->
      <v-col v-if="!selectedMission" cols="12">
        <v-row>
          <v-col cols="12" class="justify-center align-center d-flex pa-1">
            <v-card-title style="font-size: 30px">Create Mission</v-card-title>
          </v-col>
  
          <v-col cols="12" class="d-flex pa-1">
            <v-btn
              rounded="xl"
              size="large"
              block
              color="#2A3547"
              :disabled="!valid"
              @click="submitForm"
            >
              <span style="font-size: 16px">Create new</span>
            </v-btn>
            <v-divider
              vertical
              :thickness="2"
              style="margin-top: -55px"
              class="px-1 border-opacity-50"
              color="#707070"
            ></v-divider>

          </v-col>
        </v-row>
        <v-select
  label="Select mission"
  variant="outlined"
  rounded="lg"
  style="margin-top: 5px"
  :items="missions"
  v-model="selectedMission"
></v-select>
      </v-col>
  
      <!-- Display specific components based on selectedMission -->
      <v-col v-else cols="12">
        <component :is="getMissionComponent(selectedMission)" />
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  
  // Import mission components
  import M1 from "./components/create/mission/M1.vue";
  import M2 from "./components/create/mission/M2.vue";
  import M3 from "./components/create/mission/M3.vue";
  import M4 from "./components/create/mission/M4.vue";
  import M5 from "./components/create/mission/M5.vue";
  import M6 from "./components/create/mission/M6.vue";
  import M7 from "./components/create/mission/M7.vue";
  import M8 from "./components/create/mission/M8.vue";
  
  // Data references
  const missions = ["Mission 1", "Mission 2", "Mission 3", "Mission 4"];
  const selectedMission = ref(""); // Default: no mission selected
  const valid = ref(false);
  
  // Method to map mission name to component
  const getMissionComponent = (missionName) => {
    const missionComponents = {
      "Mission 1": M1,
      "Mission 2": M2,
      "Mission 3": M3,
      "Mission 4": M4,
      "Mission 5": M5,
      "Mission 6": M6,
      "Mission 7": M7,
      "Mission 8": M8,
    };
  
    return missionComponents[missionName] || null;
  };
  
  // Form submission
  const submitForm = () => {
    console.log("Form submitted with mission:", selectedMission.value);
  };
  </script>
  