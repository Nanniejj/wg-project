<template>
    <div>
        <div class="font-title2 font-weight-medium my-5"> Influencer ของหน่วย</div>
        <div >
            <v-row>
                <v-col>
                    <ApexChart type="bar" :options="chartOptionsPosts" :series="seriesPosts" height="350"></ApexChart>
                </v-col>
                <v-col>
                    <ApexChart type="bar" :options="chartOptionsFollowers" :series="seriesFollowers" height="350"></ApexChart>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>

const chartOptionsPosts = {
    chart: {
        type: "bar",
        height: 350,
    },
    title: {
        text: "จำนวนโพสต์",
        align: "left",
    },
    xaxis: {
        categories: ["C", "D", "E", "F", "G"],
    },
    colors: ["#722F9C", "#19B04F", "#F6C32C", "#1070C1", "#BE0711"],
    plotOptions: {
          bar: {
            columnWidth: '50%',
            distributed: true,
          }
        },
};

const chartOptionsFollowers = {
    chart: {
        type: "bar",
        height: 350,
    },
    title: {
        text: "จำนวนผู้ติดตาม",
        align: "left",
    },
    xaxis: {
        categories: ["C", "D", "E", "F", "G"],
    },
    colors: ["#722F9C", "#19B04F", "#F6C32C", "#1070C1", "#BE0711"],
    plotOptions: {
          bar: {
            columnWidth: '50%',
            distributed: true,
          }
        },
};

const seriesPosts = [
    {
        name: "โพสต์",
        data: [71, 156, 18, 28, 11],
    },
];

const seriesFollowers = [
    {
        name: "ผู้ติดตาม",
        data: [71, 156, 18, 28, 11],
    },
];
</script>
