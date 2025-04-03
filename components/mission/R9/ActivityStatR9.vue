<script setup>
import { ref } from 'vue';
const activitySummaries = ref([
  { id: 1, title: 'กิจกรรมที่สนับสนุนทั้งหมด', count: 200, color: '#D4EBFF', textColor: '#142948' },
  { id: 2, title: 'สนับสนุนโรงเรียน', count: 100, color: '#142948', textColor: 'white' },
  { id: 3, title: 'สนับสนุนระดับอุดมศึกษา', count: 100, color: '#F1884D', textColor: 'white' }
]);
</script>
<template>
  <v-container>
    <v-row class="mb-5">
      <v-col v-for="summary in activitySummaries" :key="summary.id" cols="12" md="4">
        <v-card :color="summary.color" class="pa-5 card-stat-shadow" :style="`color: ${summary.textColor}`">
          <v-card-title class="text-h6">{{ summary.title }}</v-card-title>
          <v-card-text class="text-h6 "> <span class="text-h5 font-weight-bold">{{ summary.count }}</span> กิจกรรม</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
