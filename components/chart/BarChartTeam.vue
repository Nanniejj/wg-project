<script setup>

const props = defineProps({
    title: String,
    series: Array,

})


const chartOptions = {
    chart: {
        type: 'bar',
        toolbar: { show: false }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true,
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
        },

    },
    xaxis: {
        categories: ['C', 'D', 'E', 'F', 'G']
    },
    colors: ['#722F9C', '#19B04F', '#FEC02C', '#2E75B5', '#BE0711'],
    grid: {
        borderColor: '#f1f1f1'
    }
}
</script>

<template>
    <v-card class="pa-4 card-stat-shadow">
        <v-card-title class="font-title2">{{ title }}</v-card-title>
        <ApexChart type="bar" height="350" :options="chartOptions" :series="series" />
    </v-card>
</template>
