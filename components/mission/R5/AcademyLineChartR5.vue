<template>
    <div class="mt-2">
      <v-card class="pa-10 card-stat-shadow" >
      <h3 class="font-subtitle my-3 font-weight-medium">โรงเรียนที่รับผิดชอบ vs ปฏิบัติแล้ว</h3>
      <ApexChart type="line" height="350" :options="chartOptions" :series="series" />
      </v-card>
    </div>
  </template>
  
  <script setup>
  
  // Data for the chart
  const series = [
    {
      name: "โรงเรียนที่รับผิดชอบ",
      data: [95, 286, 1860, 111, 212, 188], // Pink Line Data
    },
    {
      name: "ปฏิบัติแล้ว",
      data: [95, 222, 1029, 82, 108, 123], // Green Line Data
    },
  ];
  
  // Chart Options
  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 5,
      hover: { size: 8 },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => (val > 0 ? formatNumber(val) : ""),     
      background: { enabled: true, foreColor: "#343a40" },
    },
    colors: ["#F8BBD0", "#8BC34A"], // Pink & Green
    xaxis: {
      categories: ["B", "C", "D", "E", "F", "G"],
    },
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
    tooltip: {
      y: { formatter: (val) => `${formatNumber(val)} แห่ง` },
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 900px;
  }
  </style>
  