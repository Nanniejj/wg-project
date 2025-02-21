<template>
  <v-container>
    <v-card class="pa-8" rounded="lg" elevation="3">
      <v-row>
        <v-col cols="12" md="6">
          <span class="text-h6">ผลปฏิบัติการ</span>
          <v-text-field
            density="compact"
            label="Autocomplete"
            variant="outlined"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <span class="text-h6">วันที่กำหนด</span>
          <date-picker
            style="margin-top: 5px"
            v-model:value="DateRange"
            range
            :editable="false"
            :clearable="false"
            class="w-100"
            disabled
          ></date-picker>
        </v-col>
      </v-row>

      <span class="text-h6">รายละเอียด</span>
      <v-text-field
        density="compact"
        label="รายละเอียด"
        variant="outlined"
        disabled
      ></v-text-field>
    </v-card>

    <div class="pt-5 pb-3"><span class="text-h5">ผลปฏิบัติการ</span></div>

    <v-divider class="border-opacity-75 dashed-divider"></v-divider>

    <v-row class="pt-10 pb-5">
      <v-col cols="12" md="6" class="justify-start d-flex">
        <span class="text-h6">Content</span>
      </v-col>
      <v-col cols="12" md="6" class="justify-end d-flex">
        <v-btn
          color="#F49525"
          @click="addCardAct"
          class="d-flex"
          style="aspect-ratio: 1; width: 30px"
          height="80%"
          size="small"
        >
          <v-icon style="color: white; font-size: 25px">mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-for="(card, index) in cardsAct" :key="index" class="mt-4">
      <v-col cols="12">
        <v-card class="pa-8" rounded="lg" elevation="3">
          <span class="text-h6">เป้าหมาย HVT</span>
          <v-autocomplete
            density="compact"
            label="รายละเอียด"
            variant="outlined"
          ></v-autocomplete>
          <span class="text-h6">Link URL</span>
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
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  import { useRoute } from "vue-router";

const route = useRoute();

// รับ title จาก query
const title = route.query.title;
const status = route.query.status;
  const today = new Date(); // วันที่ปัจจุบัน
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);
  const DateRange = ref([lastWeek, today]);

  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cardsAct = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCardAct = () => {
    cardsAct.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
  };
</script>
<style scoped>
  .v-divider {
          height: 1000px; /* กำหนดความสูงที่ต้องการ */
        }
        
        .custom-divider {
          margin-left: 30px; /* กำหนดมาร์จินซ้าย */
          margin-right: 30px; /* กำหนดมาร์จินซ้าย */
          max-width: 100%;
        
        }

        .custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}
</style>
