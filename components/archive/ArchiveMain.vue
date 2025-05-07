<template>
  <v-container>
    <!-- Title -->
    <v-row>
      <v-col class="justify-start align-center d-flex">
        <div class="text-h4 font-weight-bold base-color">Archive</div>
      </v-col>
      <v-col cols="auto" class="justify-end align-center d-flex">
        <v-btn
          color="#2A3547"
          size="large"
          rounded
          @click="createNew = !createNew"
          style="margin-top: -10px"
          width="220px"
        >
          <span class="text-h6">Create new</span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Search Bar -->
    <v-row class="mb-4" justify="center" align="center">
      <v-col cols="12" md="10">
        <v-text-field
          v-model="search"
          placeholder="SEARCH"
          prepend-inner-icon="mdi-magnify"
          hide-details
          rounded="lg"
          variant="solo-filled"
          @click:append="toggleMarker"
        >
          <template v-slot:append-inner>
            <v-btn color="#000000" rounded="lg" class="ml-2" @click="updateSearch">
              <span class="text-white">ค้นหา</span>
            </v-btn>
          </template>
          <!-- <template v-slot:append>
            <div>
              <v-icon
                class="text-h4"
                style="color: #f4ca21"
                v-tooltip="'ค้นหาด้วยภาพ'"
                @click="isOverlayVisible = true"
                >mdi-image-filter-center-focus-strong-outline
 
              </v-icon>
            </div>
          </template> -->
        </v-text-field>

        <!-- <v-text-field
          v-model="search"
          placeholder="SEARCH"
          hide-details
          rounded
          variant="solo-filled"
          append-inner-icon="mdi-image-filter-center-focus-strong-outline"
          @click:append-inner="toggleMarker"
        >
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="font-weight-bold"
          color="#2A3547"
          rounded
          @click="isOverlayVisible = true"
        >
          SEARCH
        </v-btn> -->
      </v-col>

      <v-dialog max-width="1200" v-model="isOverlayVisible">
        <template v-slot:activator="{ props: activatorProps }"> </template>
        <template v-slot:default="{ isActive }">
          <v-card rounded="xl">
            <v-col cols="12">
              <v-col
                cols="12"
                class="pa-0 d-flex justify-end"
                style="position: relative"
              >
                <!-- ปุ่มปิดที่มุมขวาบน -->
                <v-btn
                  icon
                  variant="text"
                  style="
                    font-size: 20px;
                    position: relative;
                    top: 10px;
                    right: 10px;
                  "
                  @click="isOverlayVisible = false"
                  color="gray"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" class="pa-0 d-flex align-center justify-center">
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  class="custom-dropzone"
                />
              </v-col>

              <v-col cols="12" class="pa-4 d-flex align-center justify-center">
                <span> หรือ </span>
              </v-col>
              <v-row>
                <!-- คอลัมน์สำหรับวางลิ้งค์รูปภาพ -->
                <v-col cols="9" class="pa-4 d-flex align-end justify-end">
                  <v-sheet width="90%">
                    <v-text-field
                      density="compact"
                      v-model="firstname"
                      label="วางลิ้งค์รูปภาพ"
                      variant="outlined"
                    ></v-text-field>
                  </v-sheet>
                </v-col>

                <!-- คอลัมน์สำหรับปุ่ม -->
                <v-col cols="3" class="pa-4 d-flex align-start justify-start">
                  <v-btn
                    style="width: 70%"
                    color="#2A3547"
                    text="ค้นหา"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </template>
      </v-dialog>

      <v-col cols="auto">
        <v-row justify="end">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" rounded="lg" size="x-large">
                <v-icon class="text-h4">mdi-filter-outline</v-icon>
                <span class="ml-2">Source by</span>
              </v-btn>
            </template>
            <v-list>
              <!-- Loop through menu options -->
              <v-list-item
                v-for="(option, index) in menuOptions"
                :key="index"
                :value="index"
              >
                <v-list-item-title>
                  <v-icon :icon="option.icon" class="me-2"></v-icon>
                  {{ option.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
    </v-row>

    <!-- Categories -->
    <v-container class="justify-center d-flex">
      <v-row class="mb-4" justify="center">
        <v-col cols="12" md="3" align="center" justify="center">
          <v-card
            class="pa-2 card-stat-shadow card-archive"
            max-width="230"
            @click="toggleCardImage"
            :style="{
              backgroundColor: isCardImgClicked ? '#F9E795' : '',
              opacity: isCardInfoClicked ? 0.8 : 1,
            }"
          >
            <v-row justify="center" align="center">
              <v-col justify="center" align="center" cols="4">
                <div
                  style="background-color: #fece2f"
                  class="pa-2 text-center box-a-menu"
                >
                  <v-icon color="white" size="30">mdi-image-outline</v-icon>
                </div>
              </v-col>
              <v-col>
                <div class="text-h6">Image</div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" align="center" justify="center">
          <v-card
            class="pa-2 card-stat-shadow card-archive"
            max-width="230"
            @click="toggleCardInfo"
            :style="{
              backgroundColor: isCardInfoClicked ? '#BDBDBD' : '',
              opacity: isCardInfoClicked ? 0.8 : 1,
            }"
          >
            <v-row justify="center" align="center">
              <v-col justify="center" align="center" cols="4">
                <div
                  style="background-color: #210504"
                  class="pa-2 text-center box-a-menu"
                >
                  <v-icon color="white" size="30"
                    >mdi-file-chart-outline</v-icon
                  >
                </div>
              </v-col>
              <v-col>
                <div class="text-h6">Infographic</div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" align="center" justify="center">
          <v-card
            class="pa-2 card-stat-shadow card-archive"
            max-width="230"
            @click="toggleVideo"
            :style="{
              backgroundColor: isCardVdoClicked ? '#AFD5F0' : '',
              opacity: isCardInfoClicked ? 0.8 : 1,
            }"
          >
            <v-row justify="center" align="center">
              <v-col justify="center" align="center" cols="4">
                <div
                  style="background-color: #6bb9db"
                  class="pa-2 text-center box-a-menu"
                >
                  <v-icon color="white" size="30">mdi-video-box</v-icon>
                </div>
              </v-col>
              <v-col>
                <div class="text-h6">Video</div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <!-- Sort By Dropdown -->
  <v-container v-if="createNew" style="margin-top: -70px">
    <ArchiveCreate />
  </v-container>
  <v-container v-else>
    <ArchiveImage :type="selectedType" :search="searchUpdate" />
    <!-- <ArchiveImage  /> -->
  </v-container>
</template>

<script setup>
  import { ref, provide } from "vue";
  import ArchiveCreate from "./ArchiveCreate.vue";
  import vueDropzone from "dropzone-vue3";
  import ArchiveImage from "./ArchiveImage.vue";
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
      <p style="font-size: 14px;">Drag files here or click to upload</p>
    </div>
  `,
  });

  const searchUpdate = ref("");

  const Type = ref([
    "Image",
    "Infographic",
    "Video",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const isOverlayVisible = ref(false);
  const createNew = ref(false);
  provide("createNew", createNew);
  const search = ref("");
  const menuOptions = ref([
    { title: "Name", icon: "mdi-format-letter-case" },
    { title: "Latest date", icon: "mdi-calendar-range" },
    { title: "Tags", icon: "mdi-tag-outline" },
    { title: "Location", icon: "mdi-map-marker-outline" },
    { title: "Document", icon: "mdi-file-document-outline" },
  ]);

  const isCardImgClicked = ref(false); // สถานะการคลิก
  const isCardInfoClicked = ref(false); // สถานะการคลิก
  const isCardVdoClicked = ref(false); // สถานะการคลิก

  // ตัวแปรที่เก็บค่า type ที่เลือก
  const selectedType = ref("");

  // ฟังก์ชัน toggle เพื่อสลับสถานะการคลิก
  const toggleCardImage = () => {
    isCardInfoClicked.value = false;
    isCardVdoClicked.value = false;
    isCardImgClicked.value = !isCardImgClicked.value;

    selectedType.value = isCardImgClicked.value ? "Image" : "";
  };

  const toggleCardInfo = () => {
    isCardVdoClicked.value = false;
    isCardImgClicked.value = false;
    isCardInfoClicked.value = !isCardInfoClicked.value;

    selectedType.value = isCardInfoClicked.value ? "Infographic" : "";
  };

  const toggleVideo = () => {
    isCardInfoClicked.value = false;
    isCardImgClicked.value = false;
    isCardVdoClicked.value = !isCardVdoClicked.value;

    selectedType.value = isCardVdoClicked.value ? "Video" : "";
  };

  const { $apiClient } = useNuxtApp();
  let MediaData = ref([]);
  const image = ref([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await $apiClient.get("/api/getArchive");
  //     MediaData.value = response.data.data;
  //   } catch (error) {
  //     console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  //   }
  // };

  // onMounted(() => {
  //   fetchData();
  // });
  const updateSearch = () => {
  // console.log("ค้นหาด้วยคำ:", search.value);
  searchUpdate.value =  search.value;
};


</script>

<style scoped>
  :hover.card-archive {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
}

.box-a-menu {
    box-shadow: inset 0px 0px 0px #00000029, 2px 3px 6px #00000029;
    border-radius: 13px;
}

.dashed-border .v-input__control {
  border: 3px dashed #2A3547; /* สีเส้นประ */
  border-radius: 0; /* เอาความโค้งมุมออก */
}
.custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 350px; /* ตั้งค่าความสูง */
  width: 1000px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: #E9E9E9;
  border-radius: 20px; 
}

::v-deep(.v-input__append){
  margin-inline-start: -50px !important; 
}
</style>
