<template>
  <v-container>
    <!-- <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <span class="text-h6">กิจกรรม</span>
      </v-col>
      <v-col cols="auto">
        <div class="d-flex ga-3">
          <v-btn
            color="#F49525"
            @click="addCardAct"
            size="large" rounded="lg"
          >
            <v-icon style="color: white;">mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row> -->
    <ImportFileButton mission="R12" title="นำเข้าข้อมูลเครือข่าย"/>

    <!-- <div class="pt-5 pb-5">
      <v-divider class="border-opacity-75 dashed-divider"></v-divider>
    </div> -->

    <v-row v-for="(card, index) in cardsAct" :key="index" class="mt-4">
      <v-col cols="12">
        <Activity
          :showSupport="options"
          :showCoordinator="true"
        />
        <!-- <v-card class="pa-6">
          <v-card-item>
            <div>
              <span class="text-h6">ชื่อกิจกรรม</span>
              <v-text-field
                density="compact"
                variant="outlined"
                placeholder="ชื่อกิจกรรม"
              >
              </v-text-field>
            </div>

            <v-row>
              <v-col cols="12" md="8" class="pb-0">
                <span class="text-h6">สถานที่</span>
                <v-text-field density="compact" variant="outlined">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="pb-0">
                <span class="text-h6">จำนวนผู้เข้าร่วม</span>
                <v-number-input
                  density="compact"
                  v-model="NumImport"
                  :min="0"
                  control-variant="split"
                  inset
                  variant="outlined"
                ></v-number-input>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="8" class="pt-0">
                <span class="text-h6">รายละเอียด</span>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  placeholder="เพิ่มรายละเอียด"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="pt-0">
                <span class="text-h6">จำนวนผู้เข้าร่วม</span>
                <date-picker
                  v-model:value="DateRange"
                  range
                  :editable="false"
                  :clearable="false"
                  class="w-100"
                ></date-picker>
              </v-col>
            </v-row>
            <div>
              <span class="text-h6">สนับสนุน</span>
              <v-autocomplete
                density="compact"
                variant="outlined"
                placeholder="เพิ่มสนับสนุน"
              >
              </v-autocomplete>
            </div>

            <div>
              <span class="text-h6">ผู้ประสานงานของหน่วย</span>
              <v-text-field
                density="compact"
                variant="outlined"
                placeholder="เพิ่มผู้ประสานงานของหน่วย"
              >
              </v-text-field>
            </div>

            <span class="text-h6">Image</span>
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              class="custom-dropzone"
            />
          </v-card-item>
        </v-card> -->
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
// import vueDropzone from "dropzone-vue3";
// import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { useRoute } from "vue-router";
import ImportFileButton from "../../widgets/ImportFileButton.vue";
import Activity from "../../widgets/Activity.vue"
const options = ref({
        status: true,
        type: false,
        connection: false,
        academy: false,
        group: true
    },)  
  const route = useRoute();

  // รับ title จาก query
//   const title = route.query.title;
  const status = route.query.status;
  const today = new Date(); // วันที่ปัจจุบัน
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);
  const DateRange = ref([lastWeek, today]);

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
  const NumImport = ref(0);

  // สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
  const cards = ref([1]);

  // ฟังก์ชันเพิ่ม card
  const addCard = () => {
    cards.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
  };

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
    
.custom-dropzone {
    background-color: #E9E9E9;
    height: 100px; 
    border: 2px dashed #707070; /* กำหนดขอบ */
    border-radius: 10px; /* กำหนดมุมโค้ง */
}

.dashed-divider {
    border-style: dashed;
    border-width: 1px;
}

.custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}

::v-deep(.mx-input) {
  height: 40px;
  border-radius: 8px;

}
</style>
