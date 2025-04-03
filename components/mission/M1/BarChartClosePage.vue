<template>
    <div class="my-5">
        <div class="font-title2 font-weight-medium mt-8 mb-2">จำนวนเพจที่ปิด (หลังจาก report)</div>

        <ApexChart type="bar" :options="chartOptions" :series="seriesData" height="400" />
    </div>
</template>

<script setup>
const chartOptions = {
    chart: {
        id: "vuechart-example",
    },
    plotOptions: {
        bar: {
            horizontal: false, // แสดงแนวตั้ง
            columnWidth: '55%',
            endingShape: 'rounded'
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#722F9C', '#19B04F', '#F6C32C', '#1070C1', '#BE0711'],
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['20.ก.ค.67', '21.ก.ค.67', '22.ก.ค.67', '23.ก.ค.67', '24.ก.ค.67', '25.ก.ค.67', '26.ก.ค.67']
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val  + " เพจ";
            }
        }
    }
};

const seriesData = [
    {
        name: "Team C",
        data: [3, 5, 1, 4, 5, 6, 7]
    },
    {
        name: "Team D",
        data: [4, 6, 4, 6, 7, 5, 8]
    },
    {
        name: "Team E",
        data: [5, 8, 15, 9, 8, 6, 9]
    },
    {
        name: "Team F",
        data: [8, 10, 6, 11, 9, 12, 12]
    },
    {
        name: "Team G",
        data: [10, 6, 9, 6, 13, 10, 14]
    }
];
</script>

<style>
.apexcharts-text tspan {
    /* font-size: small !important; */
}
</style>
