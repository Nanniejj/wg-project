<template>
    <div>
        <div class="font-subtitle my-3 font-weight-medium">โรงเรียนในแต่ละภาค</div>
        <ApexChart id="st-chart" type="bar" height="400" :options="chartOptions" :series="series" class="w-100" />
    </div>
</template>

<script setup>

// Data for each region
const series = [
    {
        name: "ภาคกลาง",
        data: [95, 125, 407, 130, 100, 150],
    },
    {
        name: "ภาคตะวันออกเฉียงเหนือ",
        data: [5, 25, 777, 30, 50, 80],
    },
    {
        name: "ภาคเหนือ",
        data: [0, 10, 396, 20, 30, 40],
    },
    {
        name: "ภาคใต้",
        data: [0, 0, 280, 156, 20, 30],
    },
];

// Chart Options
const chartOptions = {
    chart: {
        type: "bar",
        stacked: true,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 4,
            dataLabels: { position: "center" },
            columnWidth: "60px",
            textAnchor: 'middle',
            dataLabels: {
                total: {
                    enabled: true,
                    offsetX: 0,
                    offsetY: -13,
                    style: {
                        fontSize: '9px',
                        fontWeight: 900
                    }
                }
            }
        },
    },
    xaxis: {
        categories: ["B", "C", "D", "E", "F", "G"],
        labels: { style: { fontSize: "14px", } },
    },
    yaxis: {
        labels: { formatter: (value) => value.toLocaleString() },
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => (val > 0 ? formatNumber(val) : ""),
        style: { color: "#fffff", fontSize: '5px' },
    },
    colors: ["#870D4F", "#F3882A", "#93C4CB", "#F75A90"], // Custom colors
    legend: {
        position: "top",
        horizontalAlign: "right",
        markers: { radius: 12 },
        fontSize: '16px',
        markers: {
            size: 9,
            shape: undefined,
            strokeWidth: 1,
            fillColors: undefined,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    tooltip: { y: { formatter: (val) => `${val} แห่ง` } },
    responsive: [{
        breakpoint: 700,
        options: {
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 4,
                    dataLabels: { position: "center" },
                    columnWidth: "30px",
                    textAnchor: 'middle',
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetX: 0,
                            offsetY: -13,
                            style: {
                                fontSize: '10px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
        },
    }]
};
</script>

<style >

</style>