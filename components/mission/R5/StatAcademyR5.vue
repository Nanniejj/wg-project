<template>
  
      <v-card class="pa-10 card-stat-shadow" >
      <v-row class="px-md-10">
        <v-col v-for="(card, index) in stats" :key="index" cols="12" sm="6" md="3">
          <v-card class="pa-4 card-stat-shadow h-100" :style="{ backgroundColor: card.bgColor, color: card.textColor }">
            <div class="d-flex align-center justify-space-between">
              <span class="text-subtitle-1 font-weight-medium">{{ card.title }}</span>
              <v-icon size="30">{{ card.icon }}</v-icon>
            </div>
            <h3 class="text-h5 font-weight-bold mt-2">{{ card.value }}</h3>
            <span class="text-body-2">{{ card.unit }}</span>
          </v-card>
        </v-col>
      </v-row></v-card>
   
  </template>
  
  <script setup>
  const stats = [
    { title: "โรงเรียน", value: "2,752", unit: "แห่ง", bgColor: "#FDD7E4", textColor: "#5C3D5B", icon: "mdi-office-building-outline" },
    { title: "โรงเรียนที่ปฏิบัติแล้ว", value: "1,689", unit: "แห่ง", bgColor: "#BDDBA5", textColor: "#4D6939", icon: "mdi-map-marker-check" },
    { title: "แกนนำ/เก็บตัว", value: "684/570", unit: "คน", bgColor: "#96CCD5", textColor: "#3D4B72", icon: "mdi-human-male-female" },
    { title: "โรงเรียนที่ยังไม่ปฏิบัติ", value: "1,063", unit: "แห่ง", bgColor: "#E57373", textColor: "#B71C1C", icon: "mdi-close-box" },
  ];
  </script>
  
  <style scoped>
  .stat-card {
    border-radius: 12px;
  }
  </style>
  