<template>
  <v-container >
    <v-card class="pa-10 h-100 card-stat-shadow">
    <v-row class="px-md-10"  justify="center" >
      <!-- First Card (Influencer) -->
      <v-col cols="12" sm="6" style="text-align: -webkit-right;" class="pr-5">
        <v-card class="influencer-card pa-4 h-100 card-stat-shadow" max-width="350" >
          <v-card-text>
            <div class="font-title text-left">มิติผู้มีอิทธิพลทางความคิด</div>
            <div class="text-left">Influencer</div>
            <div class="font-title font-weight-bold text-right">136 บัญชี / 140 โพสต์</div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Second Card (Public Relations) -->
      <v-col cols="12" sm="6" style="text-align: -webkit-left;" class="pl-5">
        <v-card class="news-card pa-4 h-100 card-stat-shadow" max-width="350">
          <v-card-text>
            <div class="font-title text-left">มิตข้อมูลข่าวสาร</div>
            <div class="text-left">เพจหน่วยประชาสัมพันธ์</div>
            <div class="font-title font-weight-bold text-right">86 โพสต์</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
</script>

<style scoped>


.influencer-card {
  background-color: #a8d3e6; /* Light blue */
  color: #2c3e50;
 
}

.news-card {
  background-color: #4d2c2c; /* Dark brown */
  color: #ffffff;
}


</style>
