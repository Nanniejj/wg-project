<template>
  <div>
    <!-- {{ statData }} -->
    <ApexChart type="bar" :options="chartOptions" :series="series" height="450" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ApexChart from "vue3-apexcharts";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  statData: {
    type: Array,
    default: () => [],
  },
});
const sentimentMap = {
  positive: 1,
  neutral: 0,
  negative: -1,
};
const onBarClick = (event, chartContext, config) => {
  const seriesIndex = config.seriesIndex;
  const dataPointIndex = config.dataPointIndex;

  const sentimentText = series.value[seriesIndex].name; // ✅ ต้องอยู่ตรงนี้ก่อน
  const sentimentValue = sentimentMap[sentimentText.toLowerCase()] ?? null;

  const name = categories.value[dataPointIndex];
  const value = series.value[seriesIndex].data[dataPointIndex];
  const person = props.statData[dataPointIndex]; // ✅ ใช้ index ของ bar

  if (sentimentValue === null) {
    console.warn("Unknown sentiment:", sentimentText);
    return;
  }

  const url = router.resolve({
    name: "postcard",
    query: {
      hvtId: person.id, // สมมุติว่า person มี field id
      date: new Date().toISOString().slice(0, 10), // หรือใช้ date จาก props/query
      sentiment: sentimentValue,
    },
  }).href;

  window.open(url, "_blank");

  console.log("คลิกที่:", {
    name,
    sentiment: sentimentText,
    sentimentValue,
    value,
  });
};
const categories = computed(() =>
  Array.isArray(props.statData) ? props.statData.map((item) => item.name) : []
);

const series = computed(() => {
  const data = Array.isArray(props.statData) ? props.statData : [];
  return [
    {
      name: "positive",
      data: data.map((item) => item.positive),
    },
    {
      name: "neutral",
      data: data.map((item) => item.neutral),
    },
    {
      name: "negative",
      data: data.map((item) => item.negative),
    },
  ];
});

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    height: 350,
    events: {
    dataPointSelection: onBarClick, // ⭐ ใช้ event นี้
  },

  },
  colors: ["#5bb44a", "#4d9be7", "#f06964"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "25",
      borderRadius: 5,
      borderRadiusApplication: "end",
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,

    style: {
      fontSize: "8px",
      colors: ["#000"],

    },
    offsetY: -30, // ⭐ ขยับขึ้นเล็กน้อย
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: categories.value,
  },
  yaxis: {
    title: {
      text: "จำนวนโพสต์",
      style: {
        fontSize: "10px",
      },
    },
    labels: {
      style: {
        fontSize: "8px",
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " โพสต์";
      },
    },
  },
}));
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
