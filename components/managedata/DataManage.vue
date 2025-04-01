<template>
  <v-container>
    <div>
      <span class="text-h6">Data Management</span>
    </div>
    <div class="pb-5 pt-3">
      <v-divider class="border-opacity-75"></v-divider>
    </div>
    <div class="pt-2">
      <!-- <v-card> -->
      <v-tabs v-model="tab" align-tabs="start" color="#2AB6EA">
        <v-tab :value="1">ข้อมูลโรงเรียน</v-tab>
        <v-tab :value="2">ข้อมูลสถานศึกษา</v-tab>
        <v-tab :value="3">ข้อมูลแกนนำ</v-tab>
        <v-tab :value="4">POC</v-tab>
        <v-tab :value="5">ข้อมูลสื่อ</v-tab>
        <v-tab :value="6">ข้อมูลมวลชนฝั่งเรา</v-tab>
      </v-tabs>
      <!-- </v-card> -->
    </div>
    <div class="pt-2">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="n in 6" :key="n" :value="n">
          <!-- แสดงคอมโพเนนต์ตามแท็บที่เลือก -->
          <v-container fluid>
            <div v-if="tab === 1">
              <School />
            </div>
            <div v-if="tab === 2">
              <Education />
            </div>
            <div v-if="tab === 3">
              <Mainstay />
            </div>
            <div v-if="tab === 4">
              <Network />
            </div>
            <div v-if="tab === 5">
              <Media />
            </div>
            <div v-if="tab === 6">
              <Mass />
            </div>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import Education from "./components/managedata/data/Education.vue";
  import Network from "./components/managedata/data/Network.vue";
  import School from "./components/managedata/data/School.vue";
  import Mainstay from "./data/Mainstay.vue";
  import Media from "./data/Media.vue";
  import Mass from "./data/Mass.vue";

  const tab = ref(1); // Default tab value
</script>
