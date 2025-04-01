<template>
    <div>
        <ApexChart type="bar" :options="chartOptions" :series="series" height="250"></ApexChart>
        <b-row align-h="center" class="mt-3">
            <b-col cols="2" class="bl-txt md-font" v-for="(value, key) in getShortNumber" :key="key">
                <img :src="getImageSrc(key)" class="img-size"
                    @click="stmbtn({ sentiment: sentimentMapping[key], source })" />
                <div>{{ capitalizeFirstLetter(key) }}</div>
                <div class="bold">{{ value }}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {

    props: {
        chartData: {
            type: Object,
            default: () => ({ positive: 10, neutral: 20, negative: 30 }),
        },
        source: String,
    },
    data() {
        return {
            series: [{
                data: [400, 430, 448]
            }],
            chartOptions: {
                grid: {
                    show: false,
                },
                chart: {
                    type: "bar",
                    height: 350,
                    borderRadius: 10,
                },
                xaxis: {
                    lines: {
                        show: false,
                    }, axisTicks: {
                        show: false,
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        columnWidth: '50%',
                        distributed: true,

                    },
                },
                colors: ["#5bb44a", "#f5a700", "#f06964"],
                xaxis: {
                    categories: ["Positive", "Neutral", "Negative"],
                    lines: {
                        show: false,
                    }
                },
            },
        };
    },
    methods: {
        getChangeFormat(num) {
            if (num >= 1000 && num < 1000000) {
                return (num / 1000).toFixed(1) + "K";
            } else if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + "M";
            } else {
                return num;
            }
        },
        getImageSrc(type) {
            const images = {
                positive: "./Positive.png",
                neutral: "./Neutral.png",
                negative: "./Negative.png",
            };
            return images[type];
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        stmbtn(datas) {
            console.log(datas);
        },
    },

};
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