<template>
    <div>
      <!-- Dropdown with formatted display -->
      <v-autocomplete
        clearable
        label="Select Mission"
        v-model="mission"
        :items="formattedItems"
        item-title="label"
        item-value="value"
        variant="outlined"
      ></v-autocomplete>
  
      <!-- Conditional rendering for selected mission -->
      <MissionM1 v-show="mission === 'M1'" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mission: "M1", // Default selected mission
        items: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
      };
    },
    computed: {
      // Map items to a formatted structure
      formattedItems() {
        return this.items.map((item) => ({
          label: `Mission ${item}`, // Display text
          value: item, // Actual value for selection
        }));
      },
    },
  };
  </script>
  
  <style></style>
  