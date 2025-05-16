<template>
  <div class="pt-10">
    <span class="text-h6">ข้อมูลสร้างสื่อ/เครือข่าย</span>
    <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>
    <AddParsonButton :showAttitude="true"/>
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
  </div>
</template>

<script setup>
  import { ref } from "vue";
import { useRoute } from "vue-router";
import AddParsonButton from "../../widgets/AddParsonButton.vue";
  import vueDropzone from "dropzone-vue3";
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 320,
    thumbnailHeight: 320,
    maxFilesize: 0.5,
    acceptedFiles: "image/jpeg,image/png",
    maxFiles: 1,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
      <div style="text-align: center;">
        <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
      </div>
    `,
  });

  const route = useRoute();
  const ShowDialog = ref(false);

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


.custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 350px; /* ตั้งค่าความสูง */
  width: 350px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: var(--dropzone-bg-color, #E9E9E9); /* ใช้ CSS Variable */
  border-radius: 20px; 
}
</style>
