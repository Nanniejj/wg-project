<template>
  <v-container>
    <div class="pb-5 px-8">
      <v-text-field
        v-model="search"
        placeholder="SEARCH"
        prepend-inner-icon="mdi-magnify"
        hide-details
        rounded="lg"
        variant="solo"
      >
        <template v-slot:append>
          <v-btn @click="searchData" rounded="lg" size="large" color="#000000">
            <span>ค้นหา</span>
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="pt-5 pb-5">
      <v-divider :thickness="2"></v-divider>
    </div>
    <div class="text-end pb-5">
      <div v-if="!isMobile">
        <v-btn color="#95D51E" rounded="lg" @click="addNetwork = true"
          ><v-icon color="white">mdi-plus</v-icon>
          <span style="color: white">เพิ่มผู้ประสาน</span>
        </v-btn>
      </div>
      <div v-else>
        <!-- <v-btn color="#FFA72F" rounded="lg"
          ><v-icon  color="white">mdi-plus</v-icon>
        </v-btn> -->
        <v-btn
          color="#95D51E"
          size="large"
          density="comfortable"
          icon="mdi-plus"
        ></v-btn>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="POC"
      :mobile="isMobile"
      :hide-default-header="isMobile"
      :loading="isLoading"
      loading-text="กำลังโหลดข้อมูล..."
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          icon="mdi-dots-vertical"
          v-tooltip="'Edit'"
          @click="!EditOverlay"
        ></v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="addNetwork" max-width="1200">
      <v-card class="pa-2" rounded="lg">
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          <span class="text-h6"> เพิ่มผู้ประสาน</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="large"
            @click="addNetwork = false"
          ></v-btn>
        </v-card-title>
        <div class="pt-1 pb-1">
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
        </div>

        <v-card-text class="pt-4">
          <div class="pa-4 d-flex align-center justify-center">
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              class="custom-dropzone"
              @vdropzone-success="handleSuccess"
              v-model:files="selectedFiles"
            />
          </div>
          <div class="pt-0 pb-0">
            <span class="text-h6">ชื่อ-สกุล</span>
            <v-text-field
              placeholder="กรอกชื่อ-สกุล"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </div>

          <v-row>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">เบอร์โทรผู้ประสาน</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
                   :rules="[isNumber, minLength(10)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">ทัพภาค</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">การศึกษา</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">กิจกรรมที่มีความเชื่อมโยง/ตำรวจ</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">ตำแหน่งปัจจุบัน</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">ผู้ที่เกี่ยวข้อง</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <div class="d-flex justify-end pb-6 px-6">
          <v-btn
            color="#2A3547"
            rounded="lg"
            size="large"
            @click="addNetwork = false"
            class="text-white"
            min-width="200"
          >
            บันทึก
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 110,
    thumbnailHeight: 150,
    maxFilesize: 5,
    maxFiles: 1,
    acceptedFiles:
      "image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/mov", // รองรับไฟล์ GIF, JPG, JPEG, PNG, MOV, MP4
    headers: { "My-Awesome-Header": "header value" },
    //   dictDefaultMessage: `
    //   <div style="text-align: center;">
    //     <i class="mdi mdi-upload-circle" style="font-size: 30px; color: #29A0AF;"></i>
    //     <p style="font-size: 12px;">Drag files here or click to upload</p>
    //   </div>
    //    <p style="position: absolute; bottom: 0; left: 30%; transform: translateX(-20%); font-size: 10px;">
    //     Recommend using high quality.jpg files less than 2MB .mp4 file less than 5MB
    //   </p>
    // `,
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 30px; color: #29A0AF;"></i>
      <p style="font-size: 12px;">Drag files here or click to upload</p>
    </div>
  
  `,
  });
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const { $apiClient } = useNuxtApp();
  const isLoading = ref(true);
  const addNetwork = ref(false);
  const isMobile = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");
  const myVueDropzone = ref(null);
  const POC = ref([]);
  const headers = ref([
    { title: "ลำดับ", value: "id" },
    { title: "ชื่อ-สกุล", value: "name" },
    { title: "เบอร์โทร", value: "phone_number" },
    { title: "ทัพภาค", value: "army_region" },
    // { title: "ผู้เกี่ยวข้อง", value: "stakeholder" },
    { title: "", value: "actions", sortable: false },
  ]);

  const item = ref([]);

  
  const isNumber = (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return /^[0-9]+$/.test(value) || "กรุณาใส่ตัวเลขเท่านั้น";
  };

  const minLength = (min) => (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return value.length >= min || `ต้องมีอย่างน้อย ${min} หลัก`;
  };

  // Only run this logic in the client environment
  if (process.client) {
    isMobile.value = window.innerWidth < 860;

    // Function to update `isMobile` on window resize
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 960;
    };

    // Watch for window resize events
    watchEffect(() => {
      window.addEventListener("resize", updateIsMobile);
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });
  }

  async function fetchPoc() {
    try {
      // params.page = page.value;

      const response = await $apiClient.get("/api/getPOC");

      POC.value = response.data;
      // console.log(POC.value);

      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchPoc();
  });

  const onClick = () => {
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
      loaded.value = true;
    }, 2000);
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
  
          ::v-deep(.v-input__append){
      margin-inline-start: -95px !important; 
    }

    .custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 250px; /* ตั้งค่าความสูง */
  width: 250px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: #E9E9E9;
  border-radius: 20px; 
}
</style>
