<template>
  <div class="font-title font-weight-medium mt-8">Timeline</div>

  <!-- <v-col cols="12" class="pa-8 d-flex justify-start">
    <span style="font-size: 25px; font-weight: bold">Timeline</span>
  </v-col> -->
  <!-- Date Picker -->
  <!-- <v-col cols="12" class="pa-6 d-flex justify-end">
    <date-picker
      v-model:value="DateRange"
      range
      :editable="false"
      :clearable="false"
      :disabled-date="disabledBeforeTodayAndAfterMonth"
      class="custom-combobox date-picker date-picker-setting"
      style="max-width: 270px"
    ></date-picker>
  </v-col> -->

  <!-- <v-col class="pa-12 my-8 pb-16">
    
        <v-row justify="center">
          <v-col cols="auto">
            <v-card>
    
              <v-tabs v-model="weekIndex" bg-color="white">
                <v-tab v-for="(week, index) in weeks" :key="index" color="blue">
                  สัปดาห์ที่ {{ index + 1 }}
                </v-tab>
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
      </v-col> -->

  <!-- v-tabs-window สำหรับแสดงไทม์ไลน์ในแต่ละสัปดาห์ -->
  <v-col cols="12" class="pa-4 " style="max-height: 850px;overflow-y: auto;">
    <!-- <v-tabs-window v-model="weekIndex">
      <v-tabs-window-item
        v-for="(week, index) in weeks"
        :key="index"
        :value="index"
      > -->
    <v-timeline :direction="direction" line-thickness="4" line-color="#112D44" fill-dot class="my-timeline">
      <!-- <v-timeline-item
            v-for="(day, index) in week"
            :key="index"
            :dot-color="getDotColor(day[0].date)"
 
          > -->

      <v-timeline-item v-for="(day, index) in data" :key="index" dot-color="black" width="100%">
        <template v-slot:opposite>
          <v-row>
            <v-col cols="12" class="py-4 justify-center d-flex">
              <!-- <span>{{ day.date }}</span> -->
              <span v-if="index % 2 === 0" style="font-weight: bold">{{
                formatDate(day.date)
              }}</span>
            </v-col>
            <v-col v-if="day.countSource.instagram > 0" cols="12" class="py-1 justify-center d-flex">
              <v-avatar image="/social_icon/instagram.png"></v-avatar>
              <v-avatar class="d-flex align-center elevation-4" style="
                  z-index: 100;
                  margin: -10px -15px;
                  background-color: wheat;
                " size="25"><span style="font-size: 12px; font-weight: bold">{{
                  formatNumber(day.countSource.instagram)
                }}</span>
              </v-avatar>
            </v-col>
            <v-col v-if="day.countSource.facebook > 0" cols="12" class="py-1 justify-center d-flex">
              <v-avatar image="/social_icon/facebook.png"></v-avatar>
              <v-avatar class="d-flex align-center elevation-4" style="
                  z-index: 100;
                  margin: -10px -15px;
                  background-color: wheat;
                " size="25"><span style="font-size: 12px; font-weight: bold">{{
                  formatNumber(day.countSource.facebook)
                }}</span>
              </v-avatar>
            </v-col>
            <v-col v-if="day.countSource.twitter > 0" cols="12" class="py-1 justify-center d-flex">
              <v-avatar image="/social_icon/twitter.png"></v-avatar>
              <v-avatar class="d-flex align-center elevation-4" style="
                  z-index: 100;
                  margin: -10px -15px;
                  background-color: wheat;
                " size="25">
                <span style="font-size: 12px; font-weight: bold">{{
                  formatNumber(day.countSource.twitter)
                }}</span>
              </v-avatar>
            </v-col>
            <v-col v-if="day.countSource.tiktok > 0" cols="12" class="py-1 justify-center d-flex">
              <v-avatar image="/social_icon/tiktok.png"></v-avatar>
              <v-avatar class="d-flex align-center elevation-4" style="
                  z-index: 100;
                  margin: -10px -15px;
                  background-color: wheat;
                " size="25"><span style="font-size: 12px; font-weight: bold">{{
                  formatNumber(day.countSource.tiktok)
                }}</span>
              </v-avatar>
            </v-col>
            <v-col v-if="day.countSource.youtube > 0" cols="12" class="py-1 justify-center d-flex">
              <v-avatar image="/social_icon/youtube.png"></v-avatar>
              <v-avatar class="d-flex align-center elevation-4" style="
                  z-index: 100;
                  margin: -10px -15px;
                  background-color: wheat;
                " size="25"><span style="font-size: 12px; font-weight: bold">{{
                  formatNumber(day.countSource.youtube)
                }}</span></v-avatar>
            </v-col>
            <v-col cols="12" class="py-4 justify-center d-flex">
              <!-- <span>{{ day.date }}</span> -->
              <span v-if="index % 2 !== 0" style="font-weight: bold">{{
                formatDate(day.date)
              }}</span>
            </v-col>
          </v-row>
        </template>

        <template v-if="day.data.length > 0">
          <v-card elevation="2" class="pa-3 rounded-lg">
            <v-card-text class="bg-white text--primary pa-0">
              <v-row v-for="(event, eventIndex) in day.data.slice(0, 1)" :key="eventIndex">
                <v-col cols="5" class="pb-0 pt-0 ma-0 justify-center align-center d-flex">
                  <div class="image-container" style="position: relative; display: inline-block">
                    <v-avatar v-if="event.photos && event.photos.length > 1" size="25" style="
                        position: relative;
                        top: 20px;
                        left: 50px;
                        z-index: 100;
                        background-color: whitesmoke;
                      ">
                      <v-icon color="black" style="font-size: 12px">mdi-image-filter-none
                      </v-icon>
                      <span style="
                          font-size: 10px;
                          margin-top: -3px;
                          margin-left: 3px;
                        ">{{ event.photos.length }}</span>
                    </v-avatar>

                    <v-img :src="event.photos[0]" alt="Image for the day" width="60" height="100" class="image-crop"
                      rounded="lg" @click="handlePic(event._id)" style="cursor: pointer">
                      <template v-slot:placeholder>
                        <div style="
                            width: 100%;
                            height: 100%;
                            background-color: #f5f5f5;
                            margin-top: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          ">
                          <v-icon size="48" color="grey">mdi-image-off</v-icon>
                        </div>
                      </template>
                    </v-img>

                    <v-avatar v-if="event.photos" size="17" :key="index" :style="{
                      position: 'relative',
                      right: `calc(-50px)`,
                      top: '-10px',
                      zIndex: 200 - index * 10,
                    }">
                      <v-img :src="`/social_icon/${event.source}.png`" :alt="`Social Icon ${event.source}`" />
                    </v-avatar>
                  </div>
                </v-col>
                <v-col cols="7" class="pa-6 justify-center align-center d-flex">
                  <v-row>
                    <p style="font-size: 14px" v-html="truncateText(event.full_text, 50)"></p>
                  </v-row>
                </v-col>
              </v-row>

              <v-col cols="12" class="pt-4 pb-1 justify-center align-center d-flex">
                <v-btn class="justify-center align-center" @click="handleAll(day.date)" color="white" variant="text">
                  <span style="font-size: 14px; font-weight: bold; color: #44a7c4">แสดงเพิ่มเติม</span>
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
        <!-- <template v-else>
              <div class="d-flex justify-center align-center pa-3">
                <span
                  style="
                    width: 10px;
                    height: 10px;
                    background-color: black;
                    border-radius: 50%;
                  "
                >
                </span>
              </div>
            </template> -->
      </v-timeline-item>
    </v-timeline>
    <!-- </v-tabs-window-item>
    </v-tabs-window> -->

    <v-dialog v-model="isOverlayVisible">
      <template v-slot:default="dialog">
        <v-col cols="12" class="d-flex justify-end" style="position: relative">
          <!-- ปุ่มปิดที่มุมขวาบน -->
          <v-btn icon style="font-size: 20px; position: relative; top: 10px; right: 10px"
            @click="isOverlayVisible = false" color="gray">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="12" lg="12" xl="12" class="pa-0 mt-6 d-flex justify-center">
          <cad_alone :startDate="dateSelect" :party_id="idSelect" />
        </v-col>
      </template>
    </v-dialog>

    <v-dialog v-model="isOverlayPost" max-width="1800">
      <template v-slot:default="dialog">
        <!-- กำหนดขนาดของ v-card ให้เป็น 500px x 500px -->
        <v-card rounded="xl">
          <v-col cols="12" class="pb-6 d-flex justify-end">
            <v-btn icon style="font-size: 20px" @click="isOverlayPost = false" color="gray" variant="text">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-card-text class="d-flex justify-center">
            <v-row class="ma-0 justify-center mt-6">
              <v-col cols="12" class="pa-0 d-flex justify-center">
                <v-card elevation="2" class="ma-4 pa-4 rounded-lg w-100 w-md-50 w-xl-75">
                  <v-tabs v-model="tab" align-tabs="center" color="black" slider-color="#25B1D1"
                    class="text-h6 custom-slider">
                    <v-tab value="all" class="text-capitalize">All</v-tab>
                    <v-tab value="facebook" class="text-capitalize">Facebook</v-tab>
                    <v-tab value="instagram" class="text-capitalize">instagram</v-tab>
                    <v-tab value="youtube" class="text-capitalize">Youtube</v-tab>
                    <v-tab value="tiktok" class="text-capitalize">Tiktok</v-tab>
                    <v-tab value="x" class="text-capitalize">X</v-tab>
                  </v-tabs>
                </v-card>
              </v-col>
              <v-col cols="12" md="12" lg="10" xl="8" class="pa-0 mt-6 d-flex justify-center">
                <v-tabs-window v-model="tab" class="w-100">
                  <v-tabs-window-item value="all" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="facebook" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="instagram" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="youtube" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="tiktok" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="x" class="mx-lg-10 mx-xl-10 px-lg-10">
                    <card_infinite :platform="tab" :startDate="dateSelect" :party_id="idSelect" />
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import dayjs from "dayjs";
import { useDisplay } from "vuetify";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
// import card_infinite from "~/component/timeline/card_infinite.vue";
// import cad_alone from "~/component/timeline/cad_alone.vue";
import { useNuxtApp } from "#app";

const tab = ref("all");
const dateSelect = ref("");
const idSelect = ref("all");
const weeks = ref([]); // เพื่อเก็บข้อมูลสัปดาห์
const weekIndex = ref(0); // ใช้เพื่อจัดการการเลือกสัปดาห์
const isOverlayVisible = ref(false); // ควบคุมการแสดง Overlay
const isOverlayPost = ref(false); // ควบคุมการแสดง Overlay
const overlayImageUrl = ref(""); // เก็บ URL ของภาพที่จะโชว์ใน Overlay
// const today = new Date();
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const showImageOverlay = (imageUrl) => {
  overlayImageUrl.value = imageUrl; // ตั้งค่า URL ของภาพ
  isOverlayVisible.value = true; // เปิด Overlay
};

const dates = ref([]); // เก็บเฉพาะวันที่
const data = ref(null);

const { lgAndDown } = useDisplay();
const direction = computed(() => (lgAndDown.value ? "vertical" : "horizontal"));

function handleAll(date) {
  dateSelect.value = date;
  idSelect.value = "all";
  isOverlayPost.value = true;
  console.log("dateSelect", dateSelect.value);
  console.log("id", idSelect.value);
}

function handlePic(id) {
  isOverlayVisible.value = true; // เปิด Overlay
  idSelect.value = id;

  console.log("id", idSelect.value);
}

const showPostOverlay = (imageUrl) => {
  isOverlayPost.value = true; // เปิด Overlay
  //   isOverlayPost = true
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K"; // แปลงเป็นพันและเพิ่ม "k"
  }
  return number; // หากน้อยกว่าพันให้แสดงตัวเลขปกติ
};

// Function to generate the timeline based on today and lastWeek
const generateTimeline = () => {
  // Use today and lastWeek for the date range
  const startDate = lastWeek;
  const endDate = today;

  // Split the days between lastWeek and today into weeks
  let currentWeek = [];
  let weekCount = 0;
  let dateCount = 0;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    currentWeek.push({
      date: date.toDateString(),
      dateCount: dateCount + 1,
      title: `Day ${dateCount + 1}`,
      description: `กิจกรรมสำหรับวันที่ ${weekCount + 1}`,
      details: "ทนายตั้ม โดนอายัดทรัพย์ 71 ล้าน ให้ข้อมูลปมที่ดิน 9 ล้าน <br>",
      showImage: true,
      imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH29fTLG78m91bttC5OLNiDKi7J27llXhwtQ&s`,
      imageUrl2: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAuTtJVZrKhXVzS3XhQDaiuRuFs87pR7vzg&s`,
    });

    // When a week is complete (7 days) or it reaches today, start a new week
    if (currentWeek.length === 7 || date.getDate() === endDate.getDate()) {
      weeks.value.push(currentWeek); // Add the current week to the weeks array
      console.log("weeks", weeks);
      currentWeek = []; // Reset for the next week
      weekCount++;
    }
    dateCount++;
  }
};

function getDateRange(year, month, startDay, endDay) {
  const startDate = new Date(year, month - 1, startDay); // -1 เพราะเดือนใน JavaScript เริ่มต้นที่ 0
  const endDate = new Date(year, month - 1, endDay); // -1 เช่นกัน
  return { startDate, endDate };
}

// ฟังก์ชันที่ใช้ในการตัดข้อความ
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Function to generate the timeline based on today and lastWeek
const generateTimelinejson = (data) => {
  const { startDate, endDate } = getDateRange(2024, 11, 1, 7); // 1 - 7 ธ.ค. 2024
  //   console.log(startDate, endDate);

  // Split the days between lastWeek and today into weeks
  let currentWeek = [];
  let weekCount = 0;
  let dateCount = 0;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let count = 0;
    //   // ถ้าคุณต้องการวนลูปข้อมูลแต่ละรายการในอาร์เรย์
    const maxLength = 20; // กำหนดความยาวสูงสุดของข้อความที่จะแสดง
    // const maxLength = 210 / Object.keys(data).length; // กำหนดความยาวสูงสุดของข้อความที่จะแสดง
    // ใช้ Object.entries() เพื่อดึงคีย์ (วันที่) และค่าของแต่ละวัน
    Object.entries(data).forEach(([date_data, data]) => {
      const dayShow = dayjs(date).format("YYYY-MM-DD");
      //   console.log("dayShow", dayShow);

      if (dayShow === date_data) {
        // console.log(`ข้อมูลสำหรับวันที่: ${date_data}`);
        // console.log("data object", data); // แสดงข้อมูลที่กรุ๊ปตามวันนั้น

        const defaultSources = [
          "youtube",
          "twitter",
          "facebook",
          "instagram",
          "tiktok",
        ];

        const result = data.reduce((acc, item) => {
          const { source, source_count = 0 } = item;

          // ตรวจสอบว่า source เป็นอาร์เรย์หรือไม่
          const sources = Array.isArray(source) ? source : [source];

          sources.forEach((src) => {
            // ตรวจสอบว่า src มีอยู่ใน acc หรือไม่ หากไม่มีให้ตั้งค่าเริ่มต้น
            if (!acc[src]) {
              acc[src] = { count: 0, total_count: 0 };
            }

            // อัปเดตค่า count และ total_count
            acc[src].count += 1;
            acc[src].total_count += source_count;
          });

          return acc;
        }, {});

        // เพิ่ม defaultSources ที่ไม่มีใน result พร้อมค่าเริ่มต้น
        defaultSources.forEach((src) => {
          if (!result[src]) {
            result[src] = { count: 0, total_count: 0 };
          }
        });

        // กำหนดให้ค่าเริ่มต้นของ sources ที่ไม่มีข้อมูลเป็น 0
        defaultSources.forEach((source) => {
          if (!result[source]) {
            result[source] = { count: 0, total_count: 0 };
          }
        });

        console.log(result);

        data.forEach((item) => {
          //   console.log(item); // แสดงข้อมูลในอาร์เรย์แต่ละรายการ

          //   console.log("Object.keys(data).length", maxLength);
          // ใช้ฟังก์ชัน truncateText ตัดข้อความใน `details` ตามความยาวที่กำหนด
          const description = item ? item.full_text : "";
          const truncatedDescription = truncateText(description, maxLength);

          // แปลงวันที่ใน item เป็นรูปแบบวันที่ (toDateString)
          const itemDate = count; // ใช้ date_data เป็นตัวแทนของวันที่ที่ต้องการ

          // ตรวจสอบว่ามีข้อมูลในวันที่นี้ใน currentWeek หรือไม่
          if (!currentWeek[itemDate]) {
            // ถ้ายังไม่มีข้อมูลในวันนี้, สร้าง array ใหม่
            currentWeek[itemDate] = [];
          }

          // เพิ่มข้อมูลใน array ของวันนั้น
          currentWeek[itemDate].push({
            id: item._id.$oid,
            date: new Date(date_data).toDateString(),
            dateCount: currentWeek[itemDate].length + 1, // เพิ่มจำนวนรายการในวันนั้น
            date_post: date_data,
            image_count: item.photos.length,
            description: item.full_text,
            details: truncatedDescription,
            showImage: true,
            source: [item.source],
            engagement: item.engagement,
            imageUrl: [...item.photos], // เก็บรูปภาพใน array ของวันนั้น
            result: result,
          });
        });
      }
      count++;
      dateCount++;
    });

    // When a week is complete (7 days) or it reaches today, start a new week
    if (currentWeek.length === 7 || date.getDate() === endDate.getDate()) {
      //   console.log("currentWeek", currentWeek);
      weeks.value.push(currentWeek); // Add the current week to the weeks array
      console.log("weeks.value", weeks);
      currentWeek = []; // Reset for the next week
      weekCount++;
    }
  }
};

// ฟังก์ชันสำหรับสลับการแสดงรูปภาพ
const toggleImage = (index) => {
  weeks.value[weekIndex.value][index].showImage =
    !weeks.value[weekIndex.value][index].showImage;
};

// ฟังก์ชันเพื่อปรับสีพื้นหลังตามตำแหน่งคู่/คี่
const getCardStyle = (index) => {
  return {
    backgroundColor: index % 2 === 0 ? "#E4F3D8" : "#FFE5EC", // สีพื้นหลังจะเป็น beige สำหรับตำแหน่งคู่ (even) และ lightgray สำหรับตำแหน่งคี่ (odd)
  };
};

const getDotColor = (day) => {
  const date = new Date(day);
  //   console.log("dayName",date);
  const dayName = getDayName(date); // ใช้ฟังก์ชัน getDayName เพื่อดึงชื่อวันจาก day.date
  const dayColors = {
    Sunday: "#FF0000",
    Monday: "#F6C32C",
    Tuesday: "#E84796",
    Wednesday: "#19B04F ",
    Thursday: "#F37229",
    Friday: "#1070C1",
    Saturday: "#722F9C",
  };

  return dayColors[dayName] || "grey"; // ใช้สีตามวันที่ดึงจาก dayName
};

// ฟังก์ชันเพื่อดึงชื่อวันจากวันที่
const getDayName = (dateString) => {
  const date = new Date(dateString); // สร้างอ็อบเจ็กต์ Date จากวันที่
  const options = { weekday: "long" }; // กำหนดให้ดึงชื่อวันเต็ม (เช่น Monday, Tuesday)
  return date.toLocaleDateString("en-US", options); // แสดงชื่อวัน
};

async function get_timeline() {
  const { $apiClient } = useNuxtApp();
  try {
    const params = {
      start: "2024-11-10",
      end: "2024-11-16",
      // start: dayjs(DateRange.value[0]).format("YYYY-MM-DD"),
      // end: dayjs(DateRange.value[1]).format("YYYY-MM-DD"),
    };
    console.log("param card", params);
    const response = await $apiClient.get("api/timeline/", { params });
    console.log(
      "response ======================================> news ",
      response.data
    );

    // try {
    //   const response = await fetch("/timelinejson/rome1-7NOV.json");
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   data.value = await response.json();
    data.value = response.data;

    // // สมมติว่า data เป็นอาเรย์ที่เก็บข้อมูล
    // data.value.sort((a, b) => {
    //   // แปลงวันที่จาก a และ b เป็นรูปแบบของวันที่ที่สามารถเปรียบเทียบได้
    //   const dateA = new Date(a.date.$date); // แปลงวันที่จาก a
    //   const dateB = new Date(b.date.$date); // แปลงวันที่จาก b

    //   // เปรียบเทียบวันที่
    //   return dateA - dateB; // ผลลัพธ์จะเป็นค่าลบ ถ้า dateA มากกว่า dateB, หรือค่าบวกถ้า dateA น้อยกว่า dateB
    // });

    // // ใช้ for ลูปเพื่อดึงวันที่และแปลงรูปแบบให้เป็น YYYY-MM-DD
    // for (const item of data.value) {
    //   // console.log(item.date)
    //   const formattedDate = dayjs(item.date.$date).format("YYYY-MM-DD"); // แปลงวันที่
    //   dates.value.push(formattedDate); // เพิ่มวันที่ที่แปลงแล้วลงใน dates
    // }
    // // console.log("Dates:", dates.value); // ตรวจสอบใน Console

    // // ใช้ reduce เพื่อกรุ๊ปข้อมูลตามวันที่
    // const groupedByDate = data.value.reduce((acc, item) => {
    //   const formattedDate = dayjs(item.date.$date).format("YYYY-MM-DD"); // แปลงวันที่
    //   if (!acc[formattedDate]) {
    //     acc[formattedDate] = []; // ถ้ายังไม่มีวันที่นี้ใน acc ให้สร้างอาเรย์ใหม่
    //   }
    //   acc[formattedDate].push(item); // เพิ่มข้อมูลในอาเรย์ตามวันที่ที่ตรงกัน
    //   return acc; // คืนค่า acc
    // }, {});

    // console.log("groupedByDate", groupedByDate); // ตรวจสอบข้อมูลที่ถูกกรุ๊ปตามวันที่

    // // // ตัวอย่างการเข้าถึงข้อมูลที่กรุ๊ปโดยวันที่
    // // for (const date in groupedByDate) {
    // // console.log(`Date: ${date}`);
    // // console.log(groupedByDate[date]); // ข้อมูลที่มีวันที่ตรงกัน
    // // }

    // generateTimelinejson(groupedByDate);
    // // generateTimeline();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

onMounted(async () => {
  await get_timeline();
});

watch(DateRange, (newVal, oldVal) => {
  console.log("DateRange changed from", oldVal, "to", newVal);


  if (newVal && newVal.length === 2) {
    const startDate = new Date(newVal[0]);
    const endDate = new Date(newVal[1]);
    const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // คำนวณความแตกต่างในวัน

    // ถ้าช่วงวันที่เกิน 30 วัน ให้แสดง Dialog และรีเซ็ตค่า DateRange
    if (diffInDays > 7) {
      alert(`กรุณาเลือกช่วงเวลาไม่เกิน 7 วัน`);
    } else {
      get_timeline();

    }
  }
  // เพิ่มโค้ดที่ต้องการทำงานเมื่อ DateRange เปลี่ยนแปลง
});
</script>

<style scoped>
.image-crop {
  object-fit: cover;
  /* ครอบภาพเพื่อให้เต็มขนาดและ crop ส่วนเกิน */
}

.overlay-avatar {
  position: absolute;
  top: 190;
  /* ชิดด้านบน */
  left: 100;
  /* ชิดด้านซ้าย */
  margin: 10px;
  /* เพิ่มระยะห่างเล็กน้อย */
  z-index: 100;
  /* ให้อยู่ด้านบนของภาพ */
}

.my-timeline {
  height: 800px;
  /* กำหนดความสูงที่ต้องการ */
  max-width: 1800px;
}

.v-timeline--horizontal.v-timeline {
  grid-column-gap: 1px;
  /* ระยะห่างระหว่างคอลัมน์ */
  width: 100%;
}
</style>
