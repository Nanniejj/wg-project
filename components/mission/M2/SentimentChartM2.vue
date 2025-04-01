<template>
    <div>
        <ApexChart type="bar" :options="chartOptions" :series="series" height="350"></ApexChart>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import ApexChart from "vue3-apexcharts";

const series = reactive([
    {
        name: "positive",
        data: [44, 55, ]
    },
    {
        name: "neutral",
        data: [76, 85, ]
    },
    {
        name: "negative",
        data: [35, 41,]
    }
]);

const chartOptions = reactive({
    chart: {
        type: 'bar',
        height: 350
    },
    colors: ["#5bb44a", "#f7bb2e", "#f06964"],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 5,
            borderRadiusApplication: 'end'
        }
    },
    dataLabels: {
        enabled: true
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['ทักษิณ', 'พิธา', ]
    },
    yaxis: {
        title: {
            text: 'จำนวนโพสต์',
            style: {
                fontSize: '10px'
            }
        },
        labels: {
            style: {
                fontSize: '10px'
            }
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return  val + " โพสต์";
            }
        }
    }
});
</script>

<style scoped>
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