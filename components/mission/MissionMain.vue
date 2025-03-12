<template>
  <div>
    <!-- Dropdown with formatted display -->
    <v-select
      clearable
      label="Select Mission"
      v-model="mission"
      :items="formattedItems"
      item-title="label"
      item-value="value"
      variant="outlined"
    ></v-select>

    <!-- Conditional rendering for selected mission -->
    <MissionM1 v-if="mission === 'M1'" />
    <MissionM2 v-if="mission === 'M2'" />
    <MissionM3 v-if="mission === 'M3'" />
    <MissionM4 v-if="mission === 'M4'" />
    <MissionM5 v-if="mission === 'M5'" />
    <MissionM6 v-if="mission === 'M6'" />
    <MissionM7 v-if="mission === 'M7'" />
    <MissionM8 v-if="mission === 'M8'" />
    <MissionR1 v-if="mission === 'R1'" />
    <MissionR2 v-if="mission === 'R2'" />
    <MissionR3 v-if="mission === 'R3'" />
    <MissionR4 v-if="mission === 'R4'" />
    <MissionR5 v-if="mission === 'R5'" />
    <MissionR6 v-if="mission === 'R6'" />
    <MissionR7 v-if="mission === 'R7'" />
    <MissionR8 v-if="mission === 'R8'" />
    <MissionR9 v-if="mission === 'R9'" />
    <MissionR10 v-if="mission === 'R10'" />
    <MissionR11 v-if="mission === 'R11'" />
    <MissionR12 v-if="mission === 'R12'" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mission: "R10", // Default selected mission
        items: [
          "M1",
          "M2",
          "M3",
          "M4",
          "M5",
          "M6",
          "M7",
          "M8",
          "R1",
          "R2",
          "R3",
          "R4",
          "R5",
          "R6",
          "R7",
          "R8",
          "R9",
          "R10",
          "R11",
          "R12",
        ],
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
