<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        :src="image"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9"> พรรณิการ์ วานิช </v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        src="data:image/jpeg;base64,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"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9">สุดารัตน์ เกยุราพันธุ์</v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDfPwO67aqO7zsQxj7EcSK5catG81Ai11rXw&s"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9"> พิธา ลิ้มเจริญรัตน์ </v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        src="data:image/jpeg;base64,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"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9"> ณัฐพงษ์ เรืองปัญญาวุฒิ </v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdIvtBFwbLAFgd_SEf0nx2Xpi4BRfBNonpMQ&s"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9"> ธนาธร จึงรุ่งเรืองกิจ </v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="4" md="2" class="justify-center align-center">
      <v-img
        :aspect-ratio="0.8"
        class="bg-white hover-image"
        rounded="xl"
        @click="isOverlayVisible = true"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx8jVIzXBozl08HnDPpCAure52Jbuq7re2HA&s"
        width="500"
        cover
      ></v-img>
      <v-row class="pt-2">
        <v-col cols="9"> วิโรจน์ ลักขณาอดิศร </v-col>
        <v-col cols="3" class="justify-end d-flex">
          <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
            <v-icon> mdi-tray-arrow-down </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-dialog max-width="1200" v-model="isOverlayVisible">
    <v-card width="1000" class="mx-auto pa-8" rounded="xl" elevation="2">
      <div class="pa-2 d-flex align-start justify-end">
        <v-btn variant="text" @click="isOverlayVisible = false"
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
              :src="image"
              width="100%"
              cover
            ></v-img>
          </div>
          <v-row class="pt-2">
            <v-col cols="9"> ผู้นำเข้า: Team C </v-col>
            <v-col cols="3" class="justify-end d-flex">
              <v-btn v-tooltip="'ดาวน์โหลดรูปภาพ'" variant="text">
                <v-icon> mdi-tray-arrow-down </v-icon></v-btn
              >
            </v-col>
          </v-row>
          <div class="justify-end d-flex pt-10">
            จำนวนครั้งดาวน์โหลด 0 ครั้ง
          </div>
        </v-col>

        <v-col cols="8" class="pa-4">
          <v-card-item>
            <span style="font-size: 16px">Title</span>
            <v-text-field
              label="Add a title"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Description</span>
            <v-text-field
              label="Add description"
              v-model="MainDescriptionMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Link</span>
            <v-text-field
              label="Add a link"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Type</span>
            <v-select
              label="Choose a type"
              density="compact"
              :items="Type"
              v-model="selectedType"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-select>
            <span style="font-size: 16px">Hastag</span>
            <v-text-field
              label="Search for a hastag"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
            <span style="font-size: 16px">Tagged topic(0)</span>
            <v-text-field
              label="Search for a tag"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import { useRuntimeConfig } from "#imports";
  const config = useRuntimeConfig();
  const Type = ref([
    "Image",
    "Infographic",
    "Video",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);
  const selectedType = ref("Image");
  const isOverlayVisible = ref(false);
  const { $apiClient } = useNuxtApp();
  let MediaData = ref([]);
  const image = ref(null);

  const fetchData = async () => {
    try {
      const response = await $apiClient.get("/api/getArchive");

      MediaData.value = response.data[0].file;

      // สร้าง URL ของภาพ
      const imageUrl = config.public.API_BASE_URL + "/" + MediaData.value;

      // ตรวจสอบว่าค่าของ imageUrl ถูกต้องหรือไม่
      image.value = imageUrl;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>
<style scoped>
  .hover-image:hover {
  transform: scale(1.05);
  transition: transform 0.4s ease;
}
</style>
