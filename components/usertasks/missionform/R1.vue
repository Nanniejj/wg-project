<template>
  <!-- <div class="pt-10">
    <span class="text-h6">ผลปฏิบัติการ</span>
  </div>
  <div class="pt-5 pb-5">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div> -->

  <div class="pt-5">
    <v-card class="pa-6">
      <span class="text-h6"> ประเด็น</span>
      <div class="pt-5">
        <span class="text-h6">ประชาสัมพันธ์ผ่านเพจ</span>
      </div>
      <div class="pt-5 pb-5">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
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
            <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>

  <div class="pt-5">
    <v-card class="pa-6">
      <div>
        <span class="text-h6">Influencer ของหน่วย</span>
      </div>
      <div class="pt-5 pb-5">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
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
            <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>

  <div class="pt-5">
    <v-card class="pa-6">
      <v-row>
        <v-col cols="12" md="8">
          <span class="text-h6">ประชาสัมพันธ์ผ่านแฟนด้อม</span>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-end">
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
      <div class="pt-5 pb-5">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
      </div>

      <span class="text-h6">ชื่อแฟนด้อม</span>

      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            density="compact"
            variant="outlined"
            rounded="lg"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="ma-0 d-flex justify-center">
          <v-number-input
            density="compact"
            v-model="NumPeople"
            :min="0"
            control-variant="split"
            inset
            variant="outlined"
          ></v-number-input>
        </v-col>
      </v-row>

      <span class="text-h6">Image</span>
      <div class="pb-5">
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          class="custom-dropzone"
        />
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
            <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>

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
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  import { useRoute } from "vue-router";

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
