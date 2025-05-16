<template>
  <v-container>
    <!-- {{ taskData }} -->
    <!-- แสดงหัวข้อประเด็น -->
    <span class="text-h6">ประเด็น</span>
    <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>

    <!-- แสดง v-card ด้านบนตามจำนวนข้อมูลใน cardsData -->
   
    <TopicLinkWithResult :cards="cardsData"/>
      

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
            <v-row v-for="(link, index) in card.url" :key="index" class="pt-2">
              <v-col cols="9" sm="11">
                <v-text-field
                  v-model="card.url[index]"
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

    <!-- save button -->
    <v-row v-if="status != 'PP'" class="justify-end pt-16 pb-16">
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
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import TopicLinkWithResult from "../../widgets/TopicLinkWithResult.vue"
const props = defineProps({
  taskData: Object,
});
const route = useRoute();
const topics = ref([]);
// รับ title จาก query
const title = route.query.title;
const status = route.query.status;

const cardsData = ref([
  {
    title: "ตอบโต้ข้อมูลบิดเบือนสถาบัน",
    url: ["https://example.com/2"],
    image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
  },
  {
    title: "ตอบโต้ข้อมูลบิดเบือนสถาบัน",
    url: ["https://example.com/2"],
    image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
  },
  {
    title: "ตอบโต้ข้อมูลบิดเบือนองค์กร",
    url: ["https://example.com/2"],
    image: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
  },
]);

const selectedCard = ref(null);

function selectCard(card) {
  selectedCard.value = card; // เก็บข้อมูลของ card ที่ผู้ใช้เลือก
}

function getTopicDetail(topicId) {
  console.log("topic id", topicId);
  
  return topics.value.find((topic) => topic._id === topicId).name;
}
onMounted(async () => {
  topics.value = await getTopics('M5')
  console.log(topics.value);
  if (props.taskData.content_id) {
    cardsData.value = props.taskData.content_id
    cardsData.value.forEach((card) => {
      card.title = getTopicDetail(card.topic_id);
      console.log("card === ",card);
    });
  }
  
  
});
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
