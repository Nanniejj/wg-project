<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <BarChartTeam title="จำนวน Content" :series="contentData"  />
        </v-col>
        <v-col cols="12" md="6">
          <BarChartTeam title="จำนวน Follower" :series="followerData" />
        </v-col>
      </v-row>
    </v-container>
  </template>
<script setup>
import BarChartTeam from "./components/chart/BarChartTeam.vue";

const contentData = [
  { name: 'จำนวน Content', data: [100, 150, 250, 300, 280] }
]

const followerData = [
  { name: 'จำนวน Follower', data: [100, 150, 250, 300, 280] }
]

</script>
<style >
    
</style>