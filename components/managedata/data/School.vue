<template>
  <div class="text-end pb-10">
    <div v-if="!isMobile">
      <v-row class="justify-end">
        <div class="pa-1">
          <v-btn
            color="#AEE0E8"
            outlined
            rounded="lg"
            @click="triggerFileInput"
          >
            <v-icon class="px-3">mdi-tray-arrow-down</v-icon
            ><span>Import CSV</span>
          </v-btn>

          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
            c
          />
        </div>
        <div class="pa-1">
          <v-btn color="#E58383" rounded="lg" @click="addSchool = true"
            ><v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">เพิ่มข้อมูลโรงเรียน</span>
          </v-btn>
        </div>
      </v-row>
    </div>
    <div v-else>
      <!-- <v-btn color="#FFA72F" rounded="lg"
          ><v-icon  color="white">mdi-plus</v-icon>
        </v-btn> -->
      <v-row class="justify-end">
        <div class="pa-1">
          <v-btn
            color="#AEE0E8"
            size="large"
            density="comfortable"
            icon="mdi-tray-arrow-down"
            @click="triggerFileInput"
          ></v-btn>

          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
          />
        </div>
        <div class="pa-1">
          <v-btn
            color="#E58383"
            size="large"
            density="comfortable"
            icon="mdi-plus"
            @click="addSchool = true"
          ></v-btn>
        </div>
      </v-row>
    </div>
  </div>

  <div class="pb-8">
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

  <v-row>
    <v-col cols="12" md="3" class="py-0">
      <v-autocomplete density="compact" variant="solo" placeholder="เลือกภาค">
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="3" class="py-0">
      <v-autocomplete
        density="compact"
        variant="solo"
        placeholder="เลือกจังหวัด"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="3" class="py-0">
      <v-autocomplete density="compact" variant="solo" placeholder="เลือกอำเภอ">
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="2" class="py-0">
      <v-autocomplete density="compact" variant="solo" placeholder="ระดับแกนนำ">
      </v-autocomplete>
    </v-col>

    <v-col cols="12" md="1" class="py-0">
      <v-btn block variant="text"> ล้างทิ้ง </v-btn>
    </v-col>
  </v-row>

  <div class="pt-5">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :mobile="isMobile"
      :hide-default-header="isMobile"
      :items-per-page="isMobile ? 5 : 10"
    >
      <template v-slot:item.ลำดับ="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.ผู้ที่เกี่ยวข้อง="{ item }">
        <div
          :style="
            isMobile ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0px;'
          "
        >
          <v-avatar size="40">
            <v-img :src="item.image"></v-img>
          </v-avatar>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="!isMobile" class="align-items-center">
        <v-icon
          v-tooltip="'Edit'"
          icon="mdi-dots-vertical"
          @click="!EditOverlay"
        ></v-icon>
      </div>
      <div v-else class="align-items-center">
        <span style="color: #29a0af" @click="!EditOverlay">แก้ไข</span>
      </div>
      </template>
    </v-data-table>
  </div>

  <v-dialog v-model="addSchool" max-width="1200">
    <v-card class="pa-2" rounded="lg">
      <v-card-title class="text-h6">
        เพิ่มโรงเรียน
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="addSchool = false"
          class="float-right"
        ></v-btn>
      </v-card-title>
      <div class="pt-1 pb-1">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
      </div>

      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12" sm="8" class="pt-0 pb-0">
            <span class="text-h6">ชื่อโรงเรียน</span>
            <v-text-field
              placeholder="เพิ่มชื่อโรงเรียน"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pt-0 pb-0">
            <span class="text-h6">ภูมิภาค</span>
            <v-autocomplete
              placeholder="เลือกภาค"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <span class="text-h6">แขวง/ตำบล</span>
            <v-text-field
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <span class="text-h6">เขต/อำเภอ</span>
            <v-text-field
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" class="pt-0 pb-0">
            <span class="text-h6">จังหวัด</span>
            <v-text-field
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pt-0 pb-0">
            <span class="text-h6">ไปรษณีย์</span>
            <v-text-field
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">จำนวนนักเรียน</span>
            <v-number-input
              density="compact"
              v-model="NumImport"
              :min="0"
              control-variant="split"
              inset
              variant="outlined"
            ></v-number-input>
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">จำนวนแกนนำ</span>
            <v-number-input
              density="compact"
              v-model="NumImport"
              :min="0"
              control-variant="split"
              inset
              variant="outlined"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">เลือกระดับปฏิบัติการ</span>
            <v-autocomplete
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex justify-end pb-6 px-6">
        <v-btn
          color="#2A3547"
          rounded="lg"
          size="large"
          @click="addSchool = false"
          class="text-white"
          min-width="200"
        >
          บันทึก
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const loaded = ref(false);
  const loading = ref(false);
  const EditOverlay = ref(false);
  const addSchool = ref(false);
  const headers = ref([
    { title: "ลำดับ", value: "ลำดับ", align: "center" },
    { title: "ชื่อโรงเรียน", value: "name", align: "center" },
    { title: "จำนวนนักเรียน", value: "student", align: "center" },
    { title: "ภาค", value: "sector", align: "center" },
    { title: "จังหวัด", value: "province", align: "center" },
    { title: "อำเภอ", value: "district", align: "center" },
    { title: "ระดับปฏิบัติการ", value: "level", align: "center" },
    { title: "แกนนำ", value: "leader", align: "center" },
    { title: "กิจกรรม", value: "acivity", align: "center" },
    { title: "ผู้ที่เกี่ยวข้อง", value: "ผู้ที่เกี่ยวข้อง", align: "center" },
    { title: "", value: "actions", sortable: false },
  ]);
  const NumImport = ref(0);
  const isMobile = ref(false);

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

  const desserts = ref([
    {
      name: "รุจิเสรี",
      student: 159,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "1",
      acivity: "10",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      name: "สวนสตรี",
      student: 89,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "1",
      acivity: "20",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      name: "เบญจมาศ",
      student: 139,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "10",
      acivity: "15",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      name: "สามเสนวิทยา",
      student: 120,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "1",
      acivity: "0",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      name: "มาลีพิทักษ์",
      student: 180,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "1",
      acivity: "10",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      name: "ประชาภิบาล",
      student: 119,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "มีการประสานได้เบอร์ ผอ.รร.เบอร์ POC เหล่าทัพ",
      leader: "1",
      acivity: "10",
      person: "-",
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
  ]);

  const onClick = () => {
    loading.value = true;

    setTimeout(() => {
      loading.value = false;
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
</style>
