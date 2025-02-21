<template>
  <v-container>
    <!-- แสดงหัวข้อประเด็น -->
    <span class="text-h6">ประเด็น</span>
    <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>

    <!-- แสดง v-card ด้านบนตามจำนวนข้อมูลใน cardsData -->
    <v-row>
      <v-col v-for="(card, index) in cardsData" :key="index" cols="12" md="4">
        <v-card
          class="pa-8"
          rounded="lg"
          elevation="3"
          @click="selectCard(card)"
          :class="{ 'bg-grey-lighten-2': selectedCard === card }"
        >
          <span class="text-h6">ประเด็น</span>
          <div class="pa-2">
            <v-chip size="x-large" color="#F4F4F4" variant="flat">
              <span>{{ card.title }}</span>
            </v-chip>
          </div>
          <div class="pt-2">
            <span class="text-h6">Link(url)</span>
          </div>
          <div class="pa-2">
            <div v-for="(link, idx) in card.link" :key="idx" class="pa-2">
              <v-chip size="x-large" color="#F4F4F4" variant="flat">
                <span style="color: #2ab6ea">{{ link }}</span>
              </v-chip>
            </div>
          </div>
          <div>
            <div class="pt-6">
              <span class="text-h6">รูปแนบ</span>
            </div>
            <div v-for="(image, idx) in card.image" :key="idx">
              <v-img
                class="bg-grey-lighten-2"
                height="200"
                aspect-ratio="16/9"
                :src="image"
                cover
              ></v-img>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- แสดงผลปฏิบัติการ เมื่อเลือก card ด้านบน -->
    <div v-if="selectedCard" class="pt-10">
      <span class="text-h6">ผลปฏิบัติการ</span>
    </div>
    <div v-if="selectedCard" class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>

    <v-row
      v-if="selectedCard"
      v-for="(card, index) in [selectedCard]"
      :key="index"
      class="mt-4"
    >
      <v-col cols="12">
        <v-card class="pa-6">
          <v-card-item>
            <div>
              <span class="text-h6">ประเด็นย่อย</span>
              <v-text-field
                density="compact"
                variant="outlined"
                :placeholder="
                  selectedCard ? selectedCard.title : 'กรุณากรอกประเด็นย่อย'
                "
                disabled
              ></v-text-field>
            </div>

            <div>
              <span class="text-h6">รายละเอียด</span>
              <v-text-field
                density="compact"
                variant="outlined"
                placeholder="กรอกรายละเอียด"
              ></v-text-field>
            </div>

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
                  <v-icon style="color: white; font-size: 20px"
                    >mdi-plus</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
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
  import { useRoute } from "vue-router";

  const route = useRoute();

  // รับ title จาก query
  const title = route.query.title;
  const status = route.query.status;

  const cardsData = ref([
    {
      title: "ตอบโต้ข้อมูลบิดเบือนสถาบัน",
      link: ["https://example.com/2"],
      image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
    {
      title: "ตอบโต้ข้อมูลบิดเบือนสถาบัน",
      link: ["https://example.com/2"],
      image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
    {
      title: "ตอบโต้ข้อมูลบิดเบือนองค์กร",
      link: ["https://example.com/2"],
      image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
  ]);

  const selectedCard = ref(null);

  function selectCard(card) {
    selectedCard.value = card; // เก็บข้อมูลของ card ที่ผู้ใช้เลือก
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
