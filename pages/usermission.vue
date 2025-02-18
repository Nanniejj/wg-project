<template>
  <!-- <div class="pb-10 pt-5">
    <span class="text-h4 font-weight-bold">แผนงานทั้งหมด</span>
    <v-divider style="margin-top: 20px" class="border-opacity-75"></v-divider>
  </div> -->
  <!-- <v-container class="d-flex justify-center">
          <v-card-title class="text-h4 font-weight-bold">Map</v-card-title>
        </v-container> -->
  <v-row class="pt-5 pb-5">
    <v-icon
      @click="handleBack"
      class="hover-pointer"
      size="x-large"
      icon="mdi-chevron-double-left"
    ></v-icon>
    <span class="text-h4 px-4 font-weight-bold">Mission {{ title }}</span>
    <span class="text-h5">{{ getMissionName(title) }}</span>
  </v-row>
  <component :is="getMissionComponent(title)" />
</template>

<script setup>
  //   import create from "./components/userMission/mission/M1.vue";
  import M1 from "./components/usertasks/missionform/M1.vue";
  import M6 from "./components/usertasks/missionform/M6.vue";
  // import create from "./components/create/mission/M3.vue";
  import { useRoute, useRouter } from "vue-router";
  const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
    useColors();

  const route = useRoute();
  const router = useRouter();
  // รับ title จาก query
  const title = route.query.title;

  const getMissionComponent = (missionTitle) => {
    switch (missionTitle) {
      case "M1":
        return M1;
      case "M6":
        return M6;
      // เพิ่ม case สำหรับ mission อื่นๆ
      default:
        return null; // หรือแสดง component default
    }
  };

  // ฟังก์ชันสำหรับการย้อนกลับไปยังหน้าเดิม
  const handleBack = () => {
    router.back(); // ใช้ router.back() เพื่อกลับไปยังหน้าก่อนหน้า
  };
</script>

<style scoped></style>
