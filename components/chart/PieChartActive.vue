<template>

    <ApexChart type="pie" :options="chartOptions" :series="series" width="100%" height="250" />

</template>

<script setup>
import ApexChart from "vue3-apexcharts";
const props = defineProps({
    active: {
        type: Number,
        default: 0
    },
    inactive: {
        type: Number,
        default: 0
    }
})

const series = computed(() => [props.active, props.inactive])

const chartOptions = {
  labels: ['เพจที่ใช้งาน', 'เพจที่ไม่ใช้งาน'],
  colors: ['#00bcd4', '#e91e63'],
  legend: {
    position: 'bottom'
  },
  dataLabels: {
    enabled: true,
     offsetX: -5,
    offsetY: 5, // ขยับลงเล็กน้อย
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#ffff']
    },
    formatter: (val) => `${val.toFixed()}%`
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 250 },
      legend: { position: 'bottom' }
    }
  }]
}

</script>
