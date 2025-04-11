<template>
    <v-container>
        <div class="font-title2 font-weight-medium my-5">กิจกรรม</div>
      <v-row>
    
        <!-- Left Card: Activity Statistics -->
        <v-col cols="12" md="6">
          <v-card class="dark-card pa-4 h-100">
            
            <v-card-text>
              <div class="stat-row font-subtitle">
                <span class="font-subtitle">กิจกรรมทั้งหมด</span>
                <span class="font-subtitle">54</span>
              </div>
              <v-divider></v-divider>
              <div class="stat-row">
                <span>กิจกรรมริเริ่ม</span>
                <span>4</span>
              </div>
              <div class="stat-row">
                <span>กิจกรรมประจำปี</span>
                <span>50</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Right Card: Target Group Breakdown -->
        <v-col cols="12" md="6">
        <v-card class="dark-card pa-4">
          <v-card-title class="text-h6">แบ่งตามกลุ่มเป้าหมาย</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-for="(group, index) in targetGroups" :key="index">
              <div class="stat-row">
                <span>{{ group.name }} ({{ group.ageRange }})</span>
                <span>{{ group.count }} <span class="text-caption"> ({{ group.percentage.toFixed(1) }}%)</span></span>
              </div>
              <v-progress-linear :model-value="group.percentage" color="yellow" height="6"></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from "vue";
  // Data for target groups
  const targetGroupsRaw = [
    { name: "Babyboomer", ageRange: "ช่วง 55 ปีขึ้นไป", count: 150 },
    { name: "Gen X", ageRange: "38-53 ปี", count: 120 },
    { name: "Gen Y", ageRange: "21-37 ปี", count: 100 },
    { name: "Gen Z", ageRange: "8-20 ปี", count: 110 },
    { name: "Gen Alpha", ageRange: "อายุน้อยกว่า 8 ปี", count: 30 },
  ];
  
  // Compute total count
  const totalCount = computed(() => targetGroupsRaw.reduce((sum, group) => sum + group.count, 0));
  
  // Compute percentage for each group
  const targetGroups = computed(() =>
    targetGroupsRaw.map((group) => ({
      ...group,
      percentage: (group.count / totalCount.value) * 100,
    }))
  );
  </script>
  
  <style scoped>
  .dark-card {
    background-color: #1e1e1e; /* Dark Mode */
    color: white;
    border-radius: 12px;
  }
  
  .stat-row {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 16px;
  }
  </style>
  