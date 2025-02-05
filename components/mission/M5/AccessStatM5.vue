<template>
    <div>
        <div class="font-title2 font-weight-medium my-5">จำนวนการเข้าถึง</div>
      <v-row>
        <v-col cols="12" md="8">
          <ApexChart type="line" :options="lineChartOptions" :series="lineChartSeries" height="450"></ApexChart>
        </v-col>
        <v-col cols="12" md="4">
          <ApexChart type="bar" :options="barChartOptions" :series="barChartSeries" height="450"></ApexChart>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  const lineChartSeries = [
    {
      name: "C",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
    {
      name: "D",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "E",
      data: [23, 24, 27, 31, 27, 27, 28],
    },
    {
      name: "F",
      data: [20, 20, 20, 24, 21, 20, 23],
    },
    {
      name: "G",
      data: [10, 8, 12, 16, 15, 11, 10],
    },
  ];
  
  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    title: {
      text: "จำนวนการเข้าถึง",
      align: "left",
    },
    xaxis: {
      categories: [
        "20 ก.ค. 67",
        "21 ก.ค. 67",
        "22 ก.ค. 67",
        "23 ก.ค. 67",
        "24 ก.ค. 67",
        "25 ก.ค. 67",
        "26 ก.ค. 67",
      ],
    },
    yaxis: {
      title: {
        text: "จำนวนการเข้าถึง",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    colors: ["#722F9C", "#19B04F", "#F6C32C", "#1070C1", "#BE0711"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toLocaleString(); // Format numbers
      },
      style: {
        fontSize: "9px",
       
      },
    },
  };
  
  // Bar Chart Data and Options
  const barChartSeries = [
    {
      name: "Total",
      data: [85, 235, 170, 130, 76],
    },
  ];
  
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "รวมจำนวนการเข้าถึง",
      align: "left",
    },
    xaxis: {
      categories: ["C", "D", "E", "F", "G"],
    },

    colors: ["#DDD6F1", "#CDEAD7", "#FFE6B4", "#DBEBF4", "#FFC3C9"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toLocaleString(); // Format numbers
      },
      style: {
        fontSize: "12px",
        colors: ["#000"], // Black text
      },
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  