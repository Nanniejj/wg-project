<template>
    <div class="my-5">

        <ApexChart type="line" :options="chartOptions" :series="seriesData" height="400" />
    </div>
</template>

<script setup>
const chartOptions = {
    chart: {
        id: "vuechart-example",
    },
    colors: ['#722F9C', '#19B04F','#F6C32C','#1070C1','#BE0711'],
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories: ['20.ก.ค.67', '21.ก.ค.67', '22.ก.ค.67', '23.ก.ค.67', '24.ก.ค.67', '25.ก.ค.67', '26.ก.ค.67']
    }
};

const seriesData = [
    {
        name: "Team C",
        data: [30, 40, 35, 50, 49, 60, 70]
    },
    {
        name: "Team D",
        data: [40, 60, 40, 60, 70, 55, 80]
    },
    {
        name: "Team E",
        data: [50, 80, 100, 73, 80, 65, 90]
    },
    {
        name: "Team F",
        data: [80, 100, 60, 110, 95, 120, 125]
    },
    {
        name: "Team G",
        data: [100, 65, 95, 68, 130, 100, 140]
    }
];
</script>

<style>
/* คุณสามารถเพิ่มสไตล์ของคุณได้ที่นี่ */
</style>