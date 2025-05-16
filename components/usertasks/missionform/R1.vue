<template>
  <div>
    <!-- test widget components -->
    <v-row class="">
      <v-col cols="12">
        <LinkPages @linkPagesValue="data => setPageData(data)"/>
      </v-col>
      <v-col cols="12">
        <LinkPages title="Influencer ของหน่วย" @linkPagesValue="data => setInfuencerData(data)"/>
      </v-col>
      <v-col cols="12">
        <FandomDetails/>
      </v-col>
    </v-row>

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
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  import { useRoute } from "vue-router";
  import LinkPages from "../../widgets/LinkPages.vue";
  import FandomDetails from "../../widgets/FandomDetails.vue";
  const route = useRoute();

  // รับ title จาก query
  const title = route.query.title;
  const status = route.query.status;
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
  const NumPeople = ref(0);
  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cardsAct = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCardAct = () => {
    cardsAct.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
};

  const setPageData = (data) => {
    console.log("test setPageData ===> ",data);
  };

  const setInfuencerData = (data) => {
    console.log("test setInfucencerData ===> ",data);
  };
</script>
<style scoped>
  .dashed-divider {
      border-style: dashed;
      border-width: 1px;
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
