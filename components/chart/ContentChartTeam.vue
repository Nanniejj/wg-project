
<template>
    <v-card class="card-stat-shadow pa-4 mt-5">
      <v-card-title class="text-title my-2">{{ title }}</v-card-title>
      <ApexChart type="bar" height="250" :options="chartOptions" :series="series" />
      <v-card-actions>
        <v-chip :color="buttonColor" class="text-white font-weight-medium" >
          {{ responseType }}
        </v-chip>
      </v-card-actions>
      <v-card-text class="text-body-2">
        <strong>รายละเอียด :</strong>
        <br />{{ details }}
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn icon>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: String,
  details: String,
  responseType: String,
  series: Array
})

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ['A', 'B', 'C', 'D', 'E']
  },
  colors: ['#722F9C', '#19B04F', '#FEC02C', '#2E75B5', '#BE0711']
}))

const buttonColor = computed(() =>
  props.responseType === 'ตอบโต้กลุ่มเห็นต่าง' ? 'deep-orange' : 'light-blue'
)
</script>

