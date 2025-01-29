<template >
    <v-container>
        <v-card class="rounded-xl py-5 my-2" elevation="3">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-avatar size="48" class="mr-3" color="primary">
            <v-icon>mdi-account</v-icon>
            <!-- <img src="https://via.placeholder.com/48" alt="Avatar" /> -->
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">MayaLoveSUA</div>
            <div class="text-caption grey--text">2024-07-31 | 08:03:11</div>
          </div>
        </div>
        <div>
          <v-btn color="red lighten-1" class="text-caption">Negative</v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="text-body-1 mb-3">
          <strong>#คัดค้านการยุบพรรคก้าวไกล</strong> เรามาช่วยกันติด hashtag กัน ให้ขึ้น x trend กันพร้อมลงรูป ให้เขาเคารพ 14.5 ล้านเสียง และก้าวไกลไม่ได้ผิดอะไรค่ะ
        </div>
        <v-img src="/path-to-your-image.png" class="rounded-lg" max-height="400px" />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <div>
          <v-btn icon>
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </div>
        <v-btn color="blue" text small>View More</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
</template>
<script>
export default {
    
}
</script>
<style >
    
</style>