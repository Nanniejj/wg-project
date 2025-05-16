<template>
  <!-- <v-row class="justify-end">
    <div class="pa-1">
      <v-btn color="#2A3547" size="large" rounded="lg" @click="addCard">
        <v-icon size="large" icon="mdi-comment-plus-outline"> </v-icon>
        <span class="text-h6">Add post</span>
      </v-btn>
    </div>
    <div class="pa-1">
      <v-btn
        color="#AEE0E8"
        outlined
        rounded="lg"
        size="large"
        @click="triggerFileInput"
      >
        <v-icon class="px-5" size="large">mdi-tray-arrow-down</v-icon
        ><span class="text-h6">Import CSV</span>
      </v-btn>

      <input
        ref="fileInput"
        type="file"
        accept=".csv"
        @change="handleFileUpload"
        style="display: none"
      />
    </div>
  </v-row> -->
  <div class="pt-10">
    <span class="text-h6">ช่องทาง</span>
  </div>
  <div class="pt-5 pb-5">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div>

  <v-row v-for="(card, index) in cardsAct" :key="index" class="">
    <v-col cols="12">
      <LinkProvice @linkProviceValue="data => setLinkProviceValue(data)"/>
    </v-col>
  </v-row>

  <!-- save button -->
  <v-row v-if="status != 'PP'" class="justify-end pt-16">
    <div class="px-3">
      <v-btn
        variant="outlined"
        style="background-color: #faf1cd"
        size="large"
        rounded="lg"
        @click="addCard"
        class="custom-btn"
      >
        <span class="text-h6">บันทึกร่าง</span>
      </v-btn>
    </div>
    <div class="px-3">
      <v-btn
        variant="outlined"
        size="large"
        rounded="lg"
        @click="addCard"
        class="custom-btn"
      >
        <span class="text-h6">บันทึก</span>
      </v-btn>
    </div>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
import LinkProvice from "../../widgets/LinkProvice.vue";
const route = useRoute();

// รับ title จาก query
const title = route.query.title;
const status = route.query.status;
  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cardsAct = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCardAct = () => {
    cardsAct.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
};
function setLinkProviceValue(data) {
  console.log("LinkProvice data:", data);
}
</script>
<style scoped>
  .dashed-divider {
      border-style: dashed;
      border-width: 1px;
    }

    .custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}
</style>
