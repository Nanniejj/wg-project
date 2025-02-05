<template>
  <div>
    <div class="font-title2 font-weight-medium my-5">จำนวนโพสต์ Influencer</div>
    <div>
      <v-row>
        <v-col>
          <ApexChart type="line" :options="chartOptionsPosts" :series="seriesPosts" height="400"></ApexChart>
        </v-col>
        <v-col>
          <ApexChart type="line" :options="chartOptionsFollowers" :series="seriesFollowers" height="400"></ApexChart>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
const chartOptionsPosts = {
  chart: {
    type: "line",
    height: 350,
  },
  title: {
    text: "จำนวนโพสต์ Influencer",
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
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 6,
  },
  colors: ["#8E44AD", "#E74C3C", "#27AE60", "#3498DB", "#F1C40F"],
  legend: {
    position: "bottom",
  },
  dataLabels: {
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 4,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff',
      opacity: 0.9,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    enabled: true,
    formatter: function (val, opts) {
      const seriesIndex = opts.seriesIndex;
      const dataIndex = opts.dataPointIndex;
      const dataLength = opts.w.config.series[seriesIndex].data.length;

      // Show label only for the last data point
      if (dataIndex === dataLength - 1) {
        const dataSum = opts.w.globals.seriesTotals[seriesIndex];
        return `${Number(dataSum || 0).toLocaleString()}`;
      }
      return ""; // No label for other points
    },
    style: {
      colors: ["#000"],
      fontSize: "10px",
    },
    offsetY: -10,
  },
};

const chartOptionsFollowers = {
  chart: {
    type: "line",
    height: 350,
  },
  title: {
    text: "จำนวนโพสต์ ผู้ติดตาม",
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
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 6,
  },
  colors: ["#8E44AD", "#E74C3C", "#27AE60", "#3498DB", "#F1C40F"],
  legend: {
    position: "bottom",
  },
  dataLabels: {
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 4,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff',
      opacity: 0.9,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    enabled: true,
    formatter: function (val, opts) {
      const seriesIndex = opts.seriesIndex;
      const dataIndex = opts.dataPointIndex;
      const dataLength = opts.w.config.series[seriesIndex].data.length;

      // Show label only for the last data point
      if (dataIndex === dataLength - 1) {
        const dataSum = opts.w.globals.seriesTotals[seriesIndex];
        return `${Number(dataSum || 0).toLocaleString()}`;
      }
      return ""; // No label for other points
    },
    style: {
      colors: ["#000"],
      fontSize: "10px",
    },
    offsetY: -10,
  },
};

const seriesPosts = [
  {
    name: "Influencer A",
    data: [200, 300, 400, 500, 600, 700, 580],
  },
  {
    name: "Influencer B",
    data: [150, 180, 220, 250, 270, 300, 250],
  },
  {
    name: "Influencer C",
    data: [100, 120, 150, 200, 230, 250, 200],
  },
  {
    name: "Influencer D",
    data: [50, 70, 100, 120, 150, 170, 80],
  },
  {
    name: "Influencer E",
    data: [20, 40, 60, 80, 100, 120, 50],
  },
];

const seriesFollowers = [
  {
    name: "ผู้ติดตาม A",
    data: [200, 300, 400, 500, 600, 700, 580],
  },
  {
    name: "ผู้ติดตาม B",
    data: [150, 180, 220, 250, 270, 300, 250],
  },
  {
    name: "ผู้ติดตาม C",
    data: [100, 120, 150, 200, 230, 250, 200],
  },
  {
    name: "ผู้ติดตาม D",
    data: [50, 70, 100, 120, 150, 170, 80],
  },
  {
    name: "ผู้ติดตาม E",
    data: [20, 40, 60, 80, 100, 120, 50],
  },
];
</script>
