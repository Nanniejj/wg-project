<script setup>
import ContentChartTeam from "./components/chart/ContentChartTeam.vue";

const issues = [
  {
    title: 'กองทัพชอบสร้างลัทธิชาตินิยม',
    details: 'ตอบโต้ Breaking the Cycle ตอบโต้การโฆษณาของพรรคฝ่ายเห็นต่าง...',
    responseType: 'ตอบโต้กลุ่มเห็นต่าง',
    series: [{ name: 'Data', data: [10, 15, 20, 5, 10] }]
  },
  {
    title: 'หนุ่มเมืองจันทร์',
    details: 'ตอบโต้ Breaking the Cycle ตอบโต้การโฆษณาของพรรคฝ่ายเห็นต่าง...',
    responseType: 'ตอบโต้บิดเบือนเกี่ยวกับสถาบัน',
    series: [{ name: 'Data', data: [20, 45, 30, 10, 5] }]
  },
  {
    title: 'แนวคิดฝ่ายเห็นต่างเรื่องรัฐสวัสดิการ',
    details: 'ตอบโต้ Breaking the Cycle ตอบโต้การโฆษณาของพรรคฝ่ายเห็นต่าง...',
    responseType: 'ตอบโต้กลุ่มเห็นต่าง',
    series: [{ name: 'Data', data: [30, 20, 40, 40, 35] }]
  }
]
</script>

<template>
  <v-container>
    <h2 class="font-title2 my-4">ประเด็น</h2>
    <v-row>
      <v-col v-for="(issue, index) in issues" :key="index" cols="12" md="4">
        <ContentChartTeam
          :title="issue.title"
          :details="issue.details"
          :responseType="issue.responseType"
          :series="issue.series"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
