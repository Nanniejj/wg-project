<template>
    <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg">
        <!-- ปุ่มสำหรับลิงก์ไฟล์ -->
            <v-row class="justify-space-between align-center">
                <v-btn
                    color="#5FC0D6"
                    :href="fileLink"
                    target="_blank"
                    rounded
                    variant="text"
                >
                    <v-icon size="large" left>mdi-file-table-outline</v-icon>
                    <div class="px-2">
                    <span style="text-decoration: underline; font-size: 16px"
                        >File: แผนงานสื่อสารยุทธศาสตร์กองทัพบก ปี 2568</span
                    >
                    </div>
                </v-btn>
                <v-btn color="#F0A64B" v-if="!showDetail" icon="$vuetify" variant="text" @click="triggerShow">
                    <v-icon>mdi-chevron-up-circle</v-icon>
                </v-btn>
                <v-btn color="#F0A64B" v-else icon="$vuetify" variant="text" @click="triggerShow">
                    <v-icon>mdi-chevron-down-circle</v-icon>
                </v-btn>
            </v-row>

        <v-row v-if="showDetail">
            <!-- {{ isImagePath(scheduleMockup) }} -->
            <v-col v-if="isImagePath(scheduleMockup)" cols="12" class="">
                <!-- <div class="font-title2 font-weight-medium my-2">แผนงานสื่อสารยุทธศาสตร์กองทัพบก ปีงบประมาณ 2568</div> -->
                <v-img :src="scheduleMockup" width="100%"></v-img>
            </v-col>
            <v-col 
                v-else
                v-for="(events, month) in scheduleMockup" 
                :key="month" 
                cols="12" sm="6" md="4" lg="3"
            >
                <v-card class="pa-5 card-stat-shadow h-100" border="sm" rounded="lg">
                    <v-col cols="3" class=" bg-orange-darken-1 rounded px-3 py-2">
                        {{ month }}
                    </v-col>
                    <v-card-text>
                        <ul>
                            <li v-for="event in events" :key="event.title">
                            {{ event.date }} - {{ event.title }}
                            </li>
                        </ul>
                    </v-card-text>
                    <div>
                        <hr class="my-3" style="color:#707070 ;">
                    <v-chip v-for="tag in events.flatMap(e => e.tags)" :key="tag" class="ma-1" color="#96CCD5" variant="flat">
                        {{ tag }}
                    </v-chip>
                    </div>
                </v-card>
            </v-col>
           
      </v-row>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';

const showDetail = ref(false);
// const scheduleMockup = {
//     "ต.ค.": [
//       { date: "13 ต.ค.", title: "วันน้อมรำลึกมหาราช", tags: ["#รัชการที่9", "#สมเด็จ"] },
//       { date: "21 ต.ค.", title: "วันคล้ายวันพระราชสมภพ สมเด็จพระศรีนครินทราบรมราชชนนี", tags: ["#แม่ฟ้าหลวง", "#รำลึก"] },
//       { date: "23 ต.ค.", title: "วันปิยมหาราช", tags: ["#รัชกาลที่ 5", "#วันปิยมหาราช"] },
//     ],
//     "พ.ย.": [
//       { date: "14 พ.ย.", title: "วันพระบิดาแห่งฝนหลวง", tags: ["#วันแห่งฝนหลวง", "#ฝนเทียม"] },
//     ],
//     "ธ.ค.": [
//       { date: "5 ธ.ค.", title: "วันพ่อแห่งชาติ", tags: ["#ทำดีเพื่อพ่อ", "#วันพ่อ"] },
//       { date: "10 ธ.ค.", title: "วันรัฐธรรมนูญ", tags: ["#วันรัฐธรรมนูญ", "#วันสำคัญ"] },
//       { date: "28 ธ.ค.", title: "วันสมเด็จพระเจ้าตากสินมหาราช", tags: ["#สมเด็จพระเจ้าตากสิน"] },
//     ],
//     "ม.ค.": [
//       { date: "8 ม.ค.", title: "วันคล้ายวันประสูติ 918", tags: ["#วันองค์เทพกุมาร", "#4320วันยุทธศาสตร์"] },
//       { date: "17 ม.ค.", title: "วันยุทธหัตถี", tags: ["#วันกองทัพไทย"] },
//       { date: "18 ม.ค.", title: "วันกองทัพไทย", tags: ["#กองทัพ"] },
//     ],
//     "ก.พ.": [
//         { date: "2 ก.พ.", title: "วันเกษตรแห่งชาติ", tags: ["#ภาคการเกษตร", "#เราคู่กสิกรรม"] },
//         { date: "3 ก.พ.", title: "วันทหารผ่านศึก", tags: ["#สดุดีวีรชน"] },
//     ],
//     "มี.ค.": [
//         { date: "31 มี.ค.", title: "วันพระบาทสมเด็จพระนั่งเกล้าเจ้าอยู่หัว", tags: ["#วันพระนั่งเกล้า", "#วันอนุชา"] },
//     ],
//     "เม.ย.": [
//         { date: "2 เม.ย.", title: "วันคล้ายวันราชสมภพ 905", tags: ["#สมเด็จพระเทพฯ"] },
//         { date: "6 เม.ย.", title: "วันจักรี", tags: ["#จักรีราชวงศ์"] },
//         { date: "25 เม.ย.", title: "วันคล้ายวันสวรรคตสมเด็จพระนเรศวรมหาราช", tags: ["#ตรวจเลือดทหาร67", "#ผลการรบอินทา"] },
//         { date: "29 เม.ย.", title: "วันคล้ายวันประสูติ 919", tags: ["#วันจักรี"] },
//     ],
//     "พ.ค.": [
//         { date: "4 พ.ค.", title: "วันฉัตรมงคล", tags: ["#มงคลบารมี", "#ฉัตรมงคล"] },
//         { date: "10 พ.ค.", title: "วันวิสาขบูชา", tags: ["#พระโก", "#วันพระ"] },
//     ],
//     "มิ.ย.": [
//         { date: "2 มิ.ย.", title: "วันเกษตรแห่งชาติ", tags: ["#ภาคการเกษตร", "#เราคู่กสิกรรม"] },
//         { date: "3 มิ.ย.", title: "วันทหารผ่านศึก", tags: ["#สดุดีวีรชน"] },
//     ],
//     "ก.ค.": [
//         { date: "31 ก.ค.", title: "วันพระบาทสมเด็จพระนั่งเกล้าเจ้าอยู่หัว", tags: ["#วันพระนั่งเกล้า", "#วันอนุชา"] },
//     ],
//     "ส.ค.": [
//         { date: "2 ส.ค.", title: "วันคล้ายวันราชสมภพ 905", tags: ["#สมเด็จพระเทพฯ"] },
//         { date: "6 ส.ค.", title: "วันจักรี", tags: ["#จักรีราชวงศ์"] },
//         { date: "25 ส.ค.", title: "วันคล้ายวันสวรรคตสมเด็จพระนเรศวรมหาราช", tags: ["#ตรวจเลือดทหาร67", "#ผลการรบอินทา"] },
//         { date: "29 ส.ค.", title: "วันคล้ายวันประสูติ 919", tags: ["#วันจักรี"] },
//     ],
//     "ก.ย.": [
//         { date: "4 ก.ย.", title: "วันฉัตรมงคล", tags: ["#มงคลบารมี", "#ฉัตรมงคล"] },
//         { date: "10 ก.ย.", title: "วันวิสาขบูชา", tags: ["#พระโก", "#วันพระ"] },
//     ],
// };

const scheduleMockup = "M8Plan.png"
function isImagePath(path) {
  return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(path);
}

function triggerShow() {
    showDetail.value = !showDetail.value
}
</script>