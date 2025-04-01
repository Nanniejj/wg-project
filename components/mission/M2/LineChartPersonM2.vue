<template>
    <div>
        <ApexChart type="line" :options="chartOptions" :series="series" height="450"></ApexChart>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import ApexChart from "vue3-apexcharts";

const series = reactive([
    {
        name: "พิธา",
        data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
        name: "ทักษิณ",
        data: [12, 11, 14, 18, 17, 13, 13]
    }
]);

const chartOptions = reactive({
    chart: {
        height: 350,
        type: 'line',

        fontSize: '10px',

        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.5
        },
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    // colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '10px'
        }
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        text: 'จำนวนการค้นหา',
        align: 'left',
        style: {
            fontSize: '10px'
        }
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        },
    },
    markers: {
        size: 1
    },
    xaxis: {
        categories: ['2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04', '2025-03-05', '2025-03-06', '2025-03-07'],
        labels: {
            style: {
                fontSize: '10px'
            }
        }
        // title: {
        //     text: 'Month'
        // }
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '10px'
            }
        },
        min: 5,
        max: 40
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
});
</script>

<style scoped>
.apexcharts-text tspan {
    font-size: 10px;
}

.img-size {
    width: 30px;
    cursor: pointer;
}

.bl-txt {
    color: black;
    text-align: center;
}

.bold {
    font-weight: bold;
}
</style>