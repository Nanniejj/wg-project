<template>
  <v-container>
    <!-- {{ taskData.content_id }} -->
    <div class="py-5">
      <span class="text-h5"> ประเด็นตอบโต้</span>
    </div>
    <div class="py-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>
    <div class="d-flex justify-end">
      <v-btn
        color="#F49525"
        @click="addCard"
        class="d-flex"
        style="aspect-ratio: 1.3; width: 10px"
        height="50%"
        size="small"
      >
        <v-icon style="color: white; font-size: 30px">mdi-plus</v-icon>
      </v-btn>
    </div>

    <TopicDetail :localTaskData="localTaskData"/>
    
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
import vueDropzone from "dropzone-vue3";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import TopicDetail from "../../widgets/TopicDetail.vue"
import PreviewLinkCard from "../../cards/PreviewLinkCard.vue";
const props = defineProps({
  taskData: Object,
});
const route = useRoute();
// ทำสำเนาเพื่อใช้ภายใน component
const localTaskData = ref(JSON.parse(JSON.stringify(props.taskData)));

// หรือถ้าต้องการแบบ reactive:
// import { reactive } from 'vue';
// const localTaskData = reactive({ ...toRaw(props.taskData) });

// ถ้า parent อัปเดต props แล้วอยาก sync ด้วย:
watch(() => props.taskData, (newVal) => {
  localTaskData.value = JSON.parse(JSON.stringify(newVal));
});
// รับ title จาก query
const title = route.query.title;
const status = route.query.status;

const topics = ref();
const tags_topic = ref([]);
const url = ref(['']);
const previews = ref([]);
const selectedTopic = ref(null);
const detail = ref(null);
// const updateTaskContent = ref({
//     selectedTopic: null,
//     deteil: null,
//     url: [],
//     photo: [],
//     tag_topic: []
// });
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    maxFilesize: 1,
    acceptedFiles: "image/jpeg,image/png",
    maxFiles: 2,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
      <div style="text-align: center;margin-top:-40px">
        <i class="mdi mdi-upload-circle" style="font-size: 40px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
      </div>
    `,
  });
  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cards = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCard = () => {
    cards.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
};

function triggerHiddenCard(card) {
    // ฟังก์ชันที่ใช้ในการแสดงหรือซ่อน card
    card.show = !card.show;
}

async function fetchPreview (content, index){
    const url = content.url[index];
    if (!url) return;

    // ตรวจสอบว่า content.previews มีอยู่หรือไม่ ถ้าไม่มีให้สร้างใหม่
    if (!content.previews) {
        content.previews = []; // หรือใช้ reactive() ถ้าอยู่ใน Composition API
    }

    try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success") {
            // ใช้ Vue.set หรืออัปเดตค่าโดยตรง (Vue 3 รู้จัก reactive อัตโนมัติ)
            content.previews[index] = {
                title: data.data.title,
                description: data.data.description,
                image: data.data.image?.url || "",
                site: data.data.publisher || "Unknown",
                url,
            };
        }
    } catch (error) {
        console.error("Error fetching preview:", error);
    }
};
const addLink = (dataLinks) => {
    dataLinks.push("");
};
function removeLink(url, index){ 
    // console.log(content);
    url.splice(index, 1);
}

function getTopicDetail(id) { 
    console.log("topics:", topics);
    let list = Array.isArray(topics) ? topics : topics.value;
    let detail = list?.find((topic) => topic._id === id);
    return detail ? detail.name : null;
}
onMounted(async() => {
    // เรียกใช้ฟังก์ชันที่ต้องการเมื่อ component ถูก mount
    console.log("Component mounted!");
    console.log("taskData:", props.taskData);
    
    topics.value = await getTopics('M6')
    console.log(typeof (topics.value));
  });
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

.custom-dropzone {
    background-color: #E9E9E9;
    height: 100px; 
    border: 2px dashed #707070; /* กำหนดขอบ */
    border-radius: 10px; /* กำหนดมุมโค้ง */
}

  .custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}
</style>
