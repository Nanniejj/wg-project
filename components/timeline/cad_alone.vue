<template>
  <v-row
    v-if="isLoading"
    class="justify-center ma-0 mx-6 mt-4 align-center h-screen"
  >
    <!-- <v-card
        class="w-100 d-flex align-center justify-center rounded-xl mx-md-12 pa-4"
        elevation="4"
        height="500"
      > -->
    <v-col cols="12" class="align-center justify-center d-flex">
      <v-progress-circular
        indeterminate
        color="#3C3C3B"
        :width="4"
        :size="30"
      ></v-progress-circular>
    </v-col>
    <!-- </v-card> -->
  </v-row>

  <v-col
    v-if="!isLoading"
    cols="12"
    sm="12"
    md="12"
    class="pa-0 justify-center d-flex align-center"
  >
    <v-card class="mx-4 mt-0 rounded-lg" elevation="4" min-width="300" max-width="1300">
      <v-row
        class="ma-0 pa-4 align-center"
        style="background-color: whitesmoke"
      >
        <v-col
          cols="2"
          sm="2"
          md="1"
          class="pa-0 position-relative d-flex align-center"
        >
          <v-avatar
            class="d-flex align-center config-profile-size"
            :image="totalPost.profile_image"
            size="60"
            style="z-index: 1; background-color: grey"
          ></v-avatar>
          <v-avatar
            v-if="computedIcon(totalPost.source)"
            class="d-flex align-center position-absolute ml-12"
            :image="computedIcon(totalPost.source)"
            size="40"
            style="
              top: 18%;
              left: 5%;
              z-index: 0;
              background-color: transparent;
            "
          ></v-avatar>
        </v-col>
        <v-col cols="10" sm="7" md="4" class="pa-0 pl-12 pl-sm-14 pl-md-10">
          <v-col cols="12" class="pa-0 font-weight-medium d-flex align-center">
            <span>{{ totalPost.account_name }}</span>
            <a :href="totalPost.url_post" target="_blank" class="ml-2">
              <v-icon size="20" style="color: black">mdi-open-in-new</v-icon>
            </a>
          </v-col>
          <v-col cols="12" class="pa-0">{{ formatDate(totalPost.date) }}</v-col>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="ma-0 pa-10 pb-0">
        <template v-if="totalPost.full_text.length > 600 && !totalPost.isExpanded">
          <span
            >{{ item.full_text.substring(0, 600)
            }}<span
              @click="totalPost.isExpanded = true"
              class="text-blue-600 cursor-pointer mt-2"
              style="color: #007bff"
            >
              ...อ่านต่อ</span
            >
          </span>
        </template>
        <template v-else>
          <span
            >{{ totalPost.full_text
            }}<span
              @click="totalPost.isExpanded = false"
              class="text-blue-600 cursor-pointer mt-2"
              v-if="totalPost.isExpanded"
              style="color: #007bff"
            >
              ...ย่อข้อความ</span
            >
          </span>
        </template>
      </v-row>
      <v-col cols="12" class="pa-0 d-flex align-center justify-center">
        <v-row
          class="ma-0 justify-center mx-8 mx-sm-16 my-4 my-sm-8"
          :style="
            totalPost.photos && totalPost.photos.length === 1
              ? 'max-width: 900px;'
              : 'max-width: 700px;'
          "
        >
          <v-col
            v-for="(photo, index) in totalPost.photos && totalPost.photos.slice(0, 4)"
            :key="index"
            cols="6"
            class="d-flex justify-center pa-0 pa-2 position-relative"
            style="max-height: 500px"
          >
            <v-img
              :width="300"
              :src="photo"
              @click="openDialog(totalPost.photos, index)"
              class="rounded-lg"
              cover
            ></v-img>

            <v-btn
              v-if="totalPost.photos.length > 4 && index === 3"
              @click="openDialog(totalPost.photos, 4)"
              color="black"
              class="position-absolute rounded-xl border-sm"
              style="
                top: 50%;
                right: -8%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.5);
              "
            >
              <span v-if="totalPost.photos.length > 4">
                +{{ totalPost.photos.length - 4 }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-dialog v-model="dialogVisible" max-width="700">
        <v-card variant="outlined" class="d-flex justify-center">
          <v-card-actions>
            <v-btn
              @click="dialogVisible = false"
              variant="text"
              color="white"
              class="rounded-xl text-h4 mb-4 h-100"
              >X</v-btn
            >
          </v-card-actions>

          <v-carousel
            v-model="currentIndex"
            :continuous="false"
            :show-arrows="false"
            style="height: 100vh"
            class="config-carousel"
          >
            <v-carousel-item
              v-for="(photo, index) in dialogPhotos"
              :key="index"
              color="black"
            >
              <v-col cols="12" class="pa-0" style="height: 600px">
                <v-img :src="photo" class="h-100"></v-img>
              </v-col>
            </v-carousel-item>
          </v-carousel>
          <v-col
            cols="12"
            class="text-center text-h4"
            style="color: white; background-color: black"
          >
            {{ currentIndex + 1 }} / {{ dialogPhotos.length }}
          </v-col>
          <v-slide-group
            v-model="currentIndex"
            show-arrows
            style="background-color: black"
            id="slide-config-carousel"
          >
            <v-slide-item
              v-for="(photo, index) in dialogPhotos"
              :key="index"
              class="cursor-pointer"
              @click="currentIndex = index"
            >
              <v-img :src="photo" width="150" height="150"></v-img>
            </v-slide-item>
          </v-slide-group>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>
      <v-row class="ma-0 pa-4" style="background-color: whitesmoke">
        <v-col cols="12" class="pa-0">
          <v-chip class="mr-2 rounded-lg" density="comfortable" variant="text"
            >Engages {{ totalPost.engagement || 0 }}
          </v-chip>
          <v-chip class="mr-2 rounded-lg" density="comfortable"
            ><v-icon class="mr-2" icon="mdi-eye"></v-icon>
            {{ totalPost.views_count || 0 }}</v-chip
          >
          <v-chip class="mr-2 rounded-lg" density="comfortable"
            ><v-icon class="mr-2" icon="mdi-thumb-up-outline"></v-icon>
            {{ totalPost.likes_count || 0 }}</v-chip
          >
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import facebookIcon from "@/assets/social_icon/facebook.png";
import xIcon from "@/assets/social_icon/x.png";
import igIcon from "@/assets/social_icon/instagram.png";
import bdIcon from "@/assets/social_icon/blockdit.png";
import ytIcon from "@/assets/social_icon/youtube.png";
import newsIcon from "@/assets/social_icon/news.png";
import ptIcon from "@/assets/social_icon/pantip.png";
import ttIcon from "@/assets/social_icon/tiktok.png";
import thIcon from "@/assets/social_icon/thread.png";
import { useNuxtApp } from "#app";
import dayjs from "dayjs";

const iconMap = {
  facebook: facebookIcon,
  twitter: xIcon,
  youtube: ytIcon,
  // news: newsIcon,
  // blockdit: bdIcon,
  instagram: igIcon,
  // pantip: ptIcon,
  tiktok: ttIcon,
  threads: thIcon,
};
const dialogVisible = ref(false); // ใช้สำหรับควบคุมการแสดงผลของ dialog
const currentIndex = ref(0); // ใช้เก็บดัชนีของภาพที่แสดง
const dialogPhotos = ref([]); // รูปภาพที่จะแสดงใน Carousel

const computedIcon = (source) => {
  return iconMap[source] || null;
};
const openDialog = (photos, index) => {
  dialogPhotos.value = photos; // ตั้งค่ารูปภาพทั้งหมดที่จะแสดงใน Carousel
  currentIndex.value = index; // ตั้งค่าดัชนีของภาพที่เลือก
  dialogVisible.value = true; // เปิด Dialog
};
const props = defineProps({
  partyName: {
    type: String,
    required: false,
  },
  startDate: String,
  party_id: {
    type: String,
    required: false,
  },
});

console.log("props", props);

const items = ref([]);
const pageSize = 1;
const totalPost = ref(1);
const totalPages = ref(1);
const isLoading = ref(true);

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD | HH:mm:ss");
};

const loadMore = async () => {
  const { $apiClient } = useNuxtApp();
  try {
    // const params = {
    //   // start: props.startDate,
    //   // end: props.endDate,
    //   props.party_id,

    // };

    const response = await $apiClient.get(`api/getPost/${props.party_id}`);
    console.log(
      "response ======================================> news ",
      response.data
    );
    // // ทำการ fetch ไฟล์ JSON
    // const response = await fetch("/timelinejson/rome1-7NOV.json");

    // // ตรวจสอบว่า response สำเร็จหรือไม่
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // // แปลง response เป็น JSON
    // const data = await response.json();

    // ตรวจสอบว่า data เป็น array หรือไม่
    // if (Array.isArray(data)) {
    //   totalPost.value = data.length; // จำนวนโพสต์ทั้งหมด
    //   totalPages.value = Math.ceil(totalPost.value / pageSize); // คำนวณจำนวนหน้า
    //   items.value.push(...data); // เพิ่มข้อมูลเข้าใน items
    // } else {
    //   throw new Error("Data is not an array");
    // }
    totalPost.value = response.data;
    // ใช้ข้อมูลที่ได้รับ
    console.log("Data loaded:", response.data);
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error("Error loading data:", error.message);
  }
  isLoading.value = false;
};

// const loadMore = async () => {
//   isLoading.value = true;

//   const { $apiClient } = useNuxtApp();
//   try {
//     const params = {
//       // start: props.startDate,
//       // end: props.endDate,
//       start: "2024-11-20",
//       end: "2024-11-27",
//       domain_id: 1,
//       page: currentPage.value, // ส่งค่า currentPage ปัจจุบันไปที่ API
//       limit: pageSize,
//       sort:
//         selectedSort.value === "โพสต์ล่าสุด"
//           ? "new"
//           : selectedSort.value === "โพสต์เริ่มต้น"
//           ? "old"
//           : "engagements",
//       source: props.platform,
//     };
//     if (props.party_id !== null) {
//       params.object_id = props.party_id;
//     }
//     if (selectedSentiment.value !== "all") {
//       params.sentiment = selectedSentiment.value;
//     }
//     console.log("param card",params);
//     const response = await $apiClient.get("api/getNewsDetails/", { params });
//     console.log(
//       "response ======================================> news ",
//       response.data
//     );
//     totalPost.value = response.data.total;
//     totalPages.value = Math.ceil(totalPost.value / pageSize); // กำหนด totalPages โดยการหาร totalPost

//     items.value.push(...response.data.data);
//   } catch (error) {
//     console.error("Error loading data:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

onMounted(() => {
  loadMore();
});
</script>
