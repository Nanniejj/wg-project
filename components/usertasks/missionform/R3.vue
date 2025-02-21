<template>
    <v-row class="justify-end">
      <div class="px-3">
        <v-btn color="#2A3547" size="large" rounded="lg" @click="addCard">
          <v-icon size="large" icon="mdi-comment-plus-outline"> </v-icon>
          <span class="text-h6">Add post</span>
        </v-btn>
      </div>
      <div class="px-3">
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
    </v-row>
    <div class="pt-10">
      <span class="text-h6">ช่องทาง</span>
    </div>
    <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>
  
    <v-row v-for="(card, index) in cardsAct" :key="index" class="mt-4">
      <v-col cols="12">
        <div class="pt-5">
          <v-card class="pa-6">
            <span class="text-h6"> จังหวัด</span>
            <v-autocomplete variant="outlined" density="compact">
            </v-autocomplete>
            <span class="text-h5">Link URL</span>
            <v-row>
              <v-col cols="9" sm="11">
                <v-text-field
                  density="compact"
                  placeholder="Link URL"
                  variant="outlined"
                  rounded="lg"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="1" class="ma-0 d-flex justify-center">
                <v-btn
                  density="compact"
                  rounded="md"
                  color="#46AFC7"
                  height="63%"
                  min-width="40"
                  size="small"
                >
                  <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
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
        <span class="text-h6 custom-btn">บันทึกร่าง</span>
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
        <span class="text-h6 custom-btn">บันทึก</span>
      </v-btn>
    </div>
  </v-row>
  </template>
  
  <script setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";

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
  