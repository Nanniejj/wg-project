<template>
  <v-container>
    <div class="pt-5 pb-5">
      <span class="text-h5"> ประเด็นตอบโต้</span>
    </div>
    <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div>

    <div class="d-flex justify-end pb-5">
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

    <v-row v-for="(card, index) in cards" :key="index" class="mt-4">
      <v-col cols="12">
        <v-card class="pa-8" rounded="lg">
          <div>
            <span class="text-h6"> ประเด็น</span>
            <v-autocomplete
              density="compact"
              placeholder="เลือกประเด็น"
              variant="outlined"
            ></v-autocomplete>
          </div>

          <div>
            <span class="text-h6">หัวเรื่อง</span>
            <v-autocomplete
              density="compact"
              placeholder="ใส่หัวเรื่อง"
              variant="outlined"
            ></v-autocomplete>
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

          <span class="text-h6">Image</span>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            class="custom-dropzone"
          />

          <div class="pt-5">
            <span class="text-h6">Tagged topic (0)</span>

            <v-text-field
              density="compact"
              placeholder="Search for a tag"
              rounded="lg"
              variant="outlined"
            ></v-text-field>
          </div>
        </v-card>
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
  </v-container>
</template>

<script setup>
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
  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cards = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCard = () => {
    cards.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
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
