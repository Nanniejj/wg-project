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

    <!-- Display selected mission component with transition -->
    <v-col v-if="selectedMission" cols="12">
      <v-btn
        size="small"
        color="error"
        class="mb-2"
        @click="selectedMission = ''"
      >
        <v-icon icon="mdi-arrow-left" start /> Back
      </v-btn>

      <transition name="fade" mode="out-in">
        <component
          :is="missionComponent"
          :key="selectedMission"
        />
      </transition>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'

// Dynamic lazy-load mission components
const missionComponents = {
  'Mission 1': () =>
    import('./components/create/mission/M1.vue'),
  'Mission 2': () =>
    import('./components/create/mission/M2.vue'),
  'Mission 3': () =>
    import('./components/create/mission/M3.vue'),
  'Mission 4': () =>
    import('./components/create/mission/M4.vue'),
  'Mission 5': () =>
    import('./components/create/mission/M5.vue'),
  'Mission 6': () =>
    import('./components/create/mission/M6.vue'),
  'Mission 7': () =>
    import('./components/create/mission/M7.vue'),
  'Mission 8': () =>
    import('./components/create/mission/M8.vue'),
}

// State
const missions = Object.keys(missionComponents)
const selectedMission = ref('')
const valid = ref(true)

// Load component with loading spinner
const missionComponent = computed(() => {
  const loader = missionComponents[selectedMission.value]
  if (!loader) return null

  return defineAsyncComponent({
    loader,
    loadingComponent: {
      template: `
        <div class="d-flex justify-center align-center pa-10">
          <v-progress-circular indeterminate color="primary" size="50" />
        </div>
      `,
    },
    delay: 200,
    timeout: 15000,
  })
})

// Submit
const submitForm = () => {
  console.log('Form submitted with mission:', selectedMission.value)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
