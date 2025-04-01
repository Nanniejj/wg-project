<template>
  <div class="pt-10">
    <span class="text-h6">ข้อมูลสร้างสื่อ/เครือข่าย</span>
  </div>
  <div class="pt-5 pb-5">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div>

  <div class="d-flex justify-end">
    <v-btn color="#5FC0D6" rounded="lg" @click="ShowDialog = true">
      <v-icon class="mr-1" color="white">mdi-plus</v-icon>
      <span class="text-h6 text-white">เพิ่มบุคคล</span>
    </v-btn>
  </div>

  <v-dialog v-model="ShowDialog" max-width="1500">
    <v-card class="pa-4" rounded="lg">
      <v-card-title class="text-h6">
        ข้อมูลสร้างสื่อ/เครือข่าย
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="ShowDialog = false"
          class="float-right"
        ></v-btn>
      </v-card-title>
      <div class="pt-2 pb-2">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
      </div>
      <v-row class="pt-5">
        <v-col cols="12" sm="8">
          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="12" sm="4" class="pt-0 pb-0">
                <span class="text-h6">ยศ/คำนำหน้า</span>
                <v-text-field
                  placeholder="คำนำหน้า"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" class="pt-0 pb-0">
                <span class="text-h6">ชื่อ-นามสกุล</span>
                <v-text-field
                  placeholder="ชื่อ-นามสกุล"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="pt-0 pb-0">
                <span class="text-h6">ประเภทสื่อ</span>
                <v-autocomplete
                  placeholder="เลือกประเภทสื่อ"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0 pb-0">
                <span class="text-h6">ระดับการศึกษา</span>
                <v-autocomplete
                  label="เลือกระดับการศึกษา"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8" class="pt-0 pb-0">
                <span class="text-h6">ตำแหน่งปัจจุบัน</span>
                <v-text-field
                  placeholder="เลือกประเภทสื่อ"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="pt-0 pb-0">
                <span class="text-h6">ทัศนคติ</span>
                <v-autocomplete
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <div class="pt-2">
              <span class="text-h6">ผลงานทางวิชาการ</span>
              <v-autocomplete
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </div>
            <div>
              <span class="text-h6">กิจกรรมที่เคยร่วมกับทหาร/ตำรวจ</span>
              <v-autocomplete
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </div>
            <div>
              <span class="text-h6">ผู้ประสานงาน</span>
              <v-autocomplete
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </div>
            <div>
              <span class="text-h6">เบอร์โทรผู้ประสานงาน</span>
              <v-autocomplete
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </div>
          </v-card-text>
        </v-col>

        <v-col cols="12" sm="1" class="d-flex justify-center pt-10">
          <v-divider
            vertical
            :thickness="2"
            style="margin-top: 0px"
            class="px-3 border-opacity-50"
            color="#707070"
          ></v-divider>
        </v-col>

        <v-col cols="12" sm="3" class="d-flex justify-center pt-10 pl-0 pr-6">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            class="custom-dropzone"
            v-model:files="selectedFiles"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <v-btn
          color="#2A3547"
          rounded="lg"
          size="large"
          @click="ShowDialog = false"
          class="text-white"
          min-width="200"
        >
          บันทึก
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <!-- <v-row v-for="(card, index) in cardsAct" :key="index" class="pt-4">
    <v-col cols="12">
      <div class="pt-5">
        <v-card class="pa-6">
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
    </v-col>
  </v-row> -->
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
