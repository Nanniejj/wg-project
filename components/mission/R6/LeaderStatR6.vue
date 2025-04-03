<template>
   
      <v-card class="pa-10 card-stat-shadow mt-5">
        <v-row class="text-center" justify="center" align="center" >
          <v-col cols="" class="font-subtitle font-weight-medium" >แกนนำ</v-col>
          <v-col v-for="(value, index) in stats" :key="index" cols="">
            <div class="font-title font-weight-medium">{{ value.label }}</div>
            <div class="font-title font-weight-medium">{{ value.count }}</div>
          </v-col>
        </v-row>
      </v-card>

  </template>
  
  <script setup>
  const stats = [
    { label: "B", count: 14 },
    { label: "C", count: 23 },
    { label: "D", count: 496 },
    { label: "E", count: 40 },
    { label: "F", count: 16 },
    { label: "G", count: 88 },
  ];
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 12px;
  }
  </style>
  