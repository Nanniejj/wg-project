<template>
    <div>
        <div>
            <span class="text-topic font-weight-medium">จำนวนการค้นหา</span> ( โพสต์ )
        </div>
        <ApexChart v-if="statDataReady" type="line" :options="chartOptions" :series="series" height="450"
            class="linechart" @click="onClickPie" />
        <div v-else>ไม่พบข้อมูล</div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import ApexChart from "vue3-apexcharts";
import dayjs from "dayjs";

const router = useRouter();

const props = defineProps({
    statData: {
        type: Array,
        default: () => [],
    },
});

const statDataReady = computed(() => Array.isArray(props.statData) && props.statData.length > 0);

// series data สำหรับกราฟ
const series = computed(() => {
    return props.statData.map((person) => ({
        name: person.name,
        data: person.data.map((d) => d.y),
    }));
});

// x-axis categories (วันที่)
const xCategories = computed(() => {
    const firstWithData = props.statData.find((p) => p.data && p.data.length > 0);
    return firstWithData ? firstWithData.data.map((d) => d.x) : [];
});

const onClickPie = (event, chartContext, config) => {
    console.log('config', config);

    const personIndex = config.seriesIndex;
    const pointIndex = config.dataPointIndex;


    // ต้อง access ข้อมูล statData จาก context ภายนอก
    const person = props.statData[personIndex];
    const date = person?.data[pointIndex]?.x;
    console.log('personIndex', date, personIndex, pointIndex, person);
    if (person?.id && date) {
        console.log('hvt', person.id);

        const url = router.resolve({
            name: "postcard",
            query: {
                hvtId: person.id,
                date,
            },
        }).href;

        window.open(url, "_blank");
    }
}


const chartOptions = computed(() => ({
    chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
        events: {
            dataPointSelection:onClickPie,
            markerClick:onClickPie
        }
        // ✅ เพิ่ม event handler แบบ ApexCharts
       
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => (val === 0 ? "" : val),
        style: { fontSize: "8px" },
    },
    stroke: { curve: "smooth" },
    markers: { size: 1 },
    xaxis: {
        categories: xCategories.value,
        labels: {
            formatter: (val) => dayjs(val).locale("th").format("D MMM YY"),
        },
    },
    yaxis: {
        min: 0,
        labels: { style: { fontSize: "8px" } },
    },
    legend: {
        position: "bottom",
        offsetY: -25,
    },
}));

</script>