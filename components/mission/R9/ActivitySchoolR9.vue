<script setup>
import { ref } from 'vue';
const activities = ref([
  {
    id: 1, category: 'โรงเรียน', title: 'การอบรมให้ความรู้การป้องกันและการแก้ไขปัญหายาเสพติด', date: '12 ก.ค. 67', room: 'ห้องประชุมนันทา โรงเรียนเอเซีย', team: 'C', img: 'R9(1).png'
    , description: 'ให้ความรู้แก่นักเรียนในการป้องกันตนเองจาก ยาเสพติด,การเคารพกฎหมายจราจร,กิจกรรมสร้าง...'
  },
  {
    id: 2, category: 'อุดมศึกษา', title: 'การอบรมให้ความรู้การป้องกันและการแก้ไขปัญหายาเสพติด', date: '12 ก.ค. 67', room: 'ห้องประชุมนันทา โรงเรียนเอเซีย', team: 'C', img: 'R9(2).png'
    , description: 'ให้ความรู้แก่นักเรียนในการป้องกันตนเองจาก ยาเสพติด,การเคารพกฎหมายจราจร,กิจกรรมสร้าง...'
  },
  { id: 3, category: 'อุดมศึกษา', title: 'การอบรมให้ความรู้การป้องกันและการแก้ไขปัญหายาเสพติด', date: '12 ก.ค. 67', room: 'ห้องประชุมนันทา โรงเรียนเอเซีย', team: 'D', img: 'R9(3).png', description: 'ให้ความรู้แก่นักเรียนในการป้องกันตนเองจาก ยาเสพติด,การเคารพกฎหมายจราจร,กิจกรรมสร้าง...' }
]);
</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="activity in activities" :key="activity.id" cols="12" md="4">
        <v-card class="card-stat-shadow">
          <v-img :src="activity.img" height="250px" cover></v-img>
          <v-card-title>
            <v-chip :color="activity.team === 'C' ? 'blue' : 'green'" class="mr-2">{{ activity.team }}</v-chip>
            {{ activity.title }}
          </v-card-title>
          <v-card-text>
            <div>{{ activity.description }}</div>

          </v-card-text>
          <v-card-subtitle>
            <v-icon icon="mdi-calendar" class="mr-1"></v-icon> {{ activity.date }}
            <br>
            <v-icon icon="mdi-map-marker" class="mr-1"></v-icon> {{ activity.room }}
          </v-card-subtitle>
          <v-card-actions>
            <v-chip :color="activity.category === 'โรงเรียน' ? '#142948' : '#F1884D'" variant="flat" class="px-3">{{
              activity.category }}</v-chip>
            <v-btn icon="mdi-arrow-right"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
