<template>
    <v-container>
      <!-- <h3 class="text-h6 font-weight-bold">Mission R5</h3>
      <p class="text-body-2">กิจกรรมเข้าสู่โรงเรียน และสร้างเครือข่าย</p> -->
  
      <v-card class="pa-4 mt-3">
        <v-row class="mx-auto">
          <v-col v-for="(item, index) in missionData" :key="index" cols="12" sm="6" md="" class="border-e-sm">
            <div class="px-8">
              <h4 class="font-title font-weight-bold">{{ item.label }}</h4>
              <div class="d-flex align-end">
                <h3 class="font-title font-weight-bold">{{ item.count }}</h3>
                <span class="text-body-1 font-title font-weight-bold pa-1">กิจกรรม</span>
              </div>
            </div>
            <!-- <v-divider v-if="index < missionData.length - 1" vertical></v-divider> -->
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  const missionData = [
    { label: "C", count: 840 },
    { label: "D", count: 437 },
    { label: "E", count: 530 },
    { label: "F", count: 602 },
    { label: "G", count: 640 },
  ];
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 12px;
    box-shadow: none;
  }
  .v-divider {
    height: 50px;
    margin: auto;
  }
  </style>
  