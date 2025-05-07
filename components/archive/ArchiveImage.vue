<template>
  <v-row>
    <v-col v-if="loading" cols="12" class="d-flex justify-center align-center">
      <v-progress-circular
        indeterminate
        color="grey"
        size="50"
        width="3"
      ></v-progress-circular>
    </v-col>

    <!-- แสดงข้อมูลหลังจากโหลดเสร็จ -->
    <v-col
      v-else
      v-for="(media, index) in ArchiveData"
      :key="index"
      cols="12"
      sm="4"
      md="3"
      class="justify-center align-center"
    >
      <v-img
        :aspect-ratio="1"
        class="bg-white hover-image"
        rounded="xl"
        @click="openDialog(media)"
        :src="media.file"
        style="width: 350px; height: 400px"
        cover
        @contextmenu.prevent
        @copy.prevent
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="7"> {{ media.title }} </v-col>
        <v-col cols="5" class="justify-end d-flex">
          <v-btn
            v-tooltip="'ดาวน์โหลดรูปภาพ'"
            @click="downloadThisImage(media.file, media._id)"
            variant="text"
          >
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <div class="text-center pt-16">
    <v-pagination
      v-model="page"
      :length="pagination.value"
      rounded="circle"
      class="my-4"
    ></v-pagination>
  </div>

  <v-dialog
    max-width="1200"
    v-model="isOverlayVisible"
    @click:outside="handleClick"
  >
    <v-card width="1000" class="mx-auto pa-8" rounded="xl" elevation="2">
      <div class="pa-2 d-flex align-start justify-end">
        <v-btn variant="text" @click="handleClick"
          ><v-icon class="text-h4">mdi-close</v-icon></v-btn
        >
      </div>

      <v-row>
        <v-col cols="4" class="pt-12">
          <div class="justify-center">
            <v-img
              :aspect-ratio="0.8"
              class="bg-white"
              rounded="xl"
              :src="selectedMedia.file"
              width="100%"
              cover
            ></v-img>
          </div>
          <v-row class="pt-2">
            <v-col cols="9"> ผู้นำเข้า: {{ selectedMedia.user_insert }}</v-col>
            <v-col cols="3" class="justify-end d-flex">
              <v-btn
                v-tooltip="'ดาวน์โหลดรูปภาพ'"
                @click="
                  downloadThisImage(selectedMedia.file, selectedMedia._id)
                "
                variant="text"
              >
                <v-icon> mdi-tray-arrow-down </v-icon></v-btn
              >
            </v-col>
          </v-row>
          <div class="justify-end d-flex pt-10">
            จำนวนครั้งดาวน์โหลด {{ formatNumber(selectedMedia.download) }} ครั้ง
          </div>
        </v-col>

        <v-col cols="8" class="pa-4">
          <v-card-item>
            <span style="font-size: 16px">Title</span>
            <v-text-field
              density="compact"
              v-model="selectedMedia.title"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Description</span>
            <v-text-field
              v-model="selectedMedia.description"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-text-field>

            <!-- <span style="font-size: 16px">Link</span>
            <v-text-field
              density="compact"
              v-model="selectedMedia.link"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-text-field> -->

            <span style="font-size: 16px">Type</span>
            <v-select
              density="compact"
              :items="Type"
              v-model="selectedMedia.type"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-select>
            <span style="font-size: 16px">Hastag</span>
            <v-text-field
              density="compact"
              v-model="selectedMedia.hastag"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-text-field>
            <span style="font-size: 16px">Tagged topic(0)</span>
            <v-text-field
              density="compact"
              v-model="selectedMedia.tagged_topic"
              variant="outlined"
              rounded="lg"
              :disabled="isDisabled"
              clearable
            ></v-text-field>
          </v-card-item>
        </v-col>
      </v-row>
      <div class="d-flex justify-end px-6">
        <v-btn
          width="150"
          size="large"
          @click="editdialog(selectedMedia)"
          :color="isDisabled ? '#AEE0E8' : '#2A3547'"
          >{{ isDisabled ? "แก้ไข" : "บันทึก" }}</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import { useRuntimeConfig } from "#imports";
  import { title } from "process";
  import { onMounted, ref } from "vue";
  import { defineEmits } from "vue";
  import { defineProps } from "vue";

  // สร้าง emit event
  const emit = defineEmits();
  const config = useRuntimeConfig();
  const Type = ref([
    "Image",
    "Infographic",
    "Video",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const props = defineProps({
    type: String,
    search: String,
  });
  // console.log(props);

  const isDisabled = ref(true); // สถานะเริ่มต้นเป็น disabled

  const selectedType = ref("Image");
  const isOverlayVisible = ref(false);
  const { $apiClient } = useNuxtApp();
  const selectedMedia = ref({}); // ใช้เก็บข้อมูลของ media ที่เลือก
  let ArchiveData = ref(null);
  const loading = ref(true); // สถานะการโหลด

  const page = ref(1);
  const pagination = ref({});

  // ฟังก์ชัน downloadThisImage
  async function downloadThisImage(image, id) {
    emit("increment-downloads"); // ส่ง event ไปยัง parent
    downloadImage(image, "download.jpg"); // เรียกฟังก์ชัน downloadImage ที่จะดาวน์โหลดไฟล์
    // console.log(id);
    try {
      const response = await $apiClient.put(`/api/ImageDownload/${id}`);

      // console.log(response.data);

      loading.value = false; // เปลี่ยนสถานะเป็นไม่โหลดเมื่อเสร็จแล้ว
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  }

  // ฟังก์ชันสำหรับดาวน์โหลดภาพ
  function downloadImage(image, filename) {
    const link = document.createElement("a");
    link.href = image;
    link.download = filename;
    link.click();
  }

  const handleClick = () => {
    isOverlayVisible.value = false; // ปิด overlay
    isDisabled.value = true; // เปิดใช้งาน field
  };

  // ฟังก์ชันเปิด dialog และตั้งค่า selectedMedia
  const openDialog = (mediaItem) => {
    selectedMedia.value = mediaItem; // เก็บข้อมูลของ media ที่คลิก
    isOverlayVisible.value = true; // เปิด dialog
  };

  // ฟังก์ชันสำหรับเปิด/ปิดการแก้ไข
  async function editdialog(data) {
    if (isDisabled.value != true) {
      // console.log(data);
      const payload = {
        title: data.title,
        description: data.description,
        tagged_topic: data.tagged_topic,
        link: data.link,
        hastag: data.hastag,
      };

      try {
        const response = await $apiClient.put(
          `/api/updateArchive/${data._id}`,
          payload
        );

        // console.log(response.data);

        loading.value = false; // เปลี่ยนสถานะเป็นไม่โหลดเมื่อเสร็จแล้ว
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    }
    isDisabled.value = !isDisabled.value; // เปลี่ยนสถานะ disabled
  }

  // ฟังก์ชัน format ตัวเลขให้มีคอมม่า
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number); // เพิ่มคอมม่าให้กับตัวเลข
  };

  const fetchData = async (type, search) => {
    loading.value = true;
 
    const params = {
      page: page.value, // กำหนดค่า default ของ status เป็น "school"
    };
    if (type !== "") {
      params.type = type;
    }
    if (search !== "") {
      params.search = search;
    }
    // console.log(params);
    try {
      const response = await $apiClient.get("/api/getArchive", {
        params: params,
      });

      // MediaData.value = response.data[0].file;
      // console.log(response.data);
      // // สร้าง URL ของภาพ
      // const imageUrl = config.public.API_BASE_URL + "/" + MediaData.value;

      // // ตรวจสอบว่าค่าของ imageUrl ถูกต้องหรือไม่
      // image.value = imageUrl;

      // // ตรวจสอบว่า response.data มีข้อมูลหรือไม่
      // if (response.data && Array.isArray(response.data)) {
      //   response.data.forEach((item) => {
      //     console.log(item);
      //     MediaData.push(item.file);
      //     // // ถ้ามี field 'file' และมันเป็น array ให้ดึงข้อมูลจาก file
      //     // if (item.file) {
      //     //   // เพิ่ม path ของไฟล์ใน array filePaths
      //     //   item.file.forEach((filePath) => {
      //     //     MediaData.push(filePath); // เก็บ path ของไฟล์ลงใน array
      //     //   });
      //     // }
      //   });
      // }

      ArchiveData = response.data.data;

      pagination.value = response.data.pagination;

      // จัดเรียงข้อมูลตาม create_date จากใหม่ไปเก่า (จากหลังมาหน้า)
      ArchiveData.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
      );

      // ตรวจสอบว่าได้ path ของไฟล์แล้วหรือไม่
      // console.log("ArchiveData:", ArchiveData);
      loading.value = false; // เปลี่ยนสถานะเป็นไม่โหลดเมื่อเสร็จแล้ว
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchData();
  });

  // ใช้ watch เพื่อเฝ้าดูการเปลี่ยนแปลงของ props.type
  watch(
    () => [props.type, props.search],
    ([newType, newSearch]) => {
      fetchData(newType, newSearch);
    },
    { immediate: true }
  );
</script>
<style scoped>
  .hover-image:hover {
  transform: scale(1.05);
  opacity: 0.9; /* ปรับค่า opacity ให้เหมาะสม */
  filter: grayscale(10%); /* ปรับค่า grayscale ให้เหมาะสม */

  transition: transform 0.4s ease;
}
</style>
