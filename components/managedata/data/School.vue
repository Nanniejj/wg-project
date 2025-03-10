<template>
  <v-container>
    <div class="text-end pb-5">
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
            />
          </div>
          <div class="pa-1">
            <v-btn color="#E58383" rounded="lg"
              ><v-icon color="white">mdi-plus</v-icon>
              <span style="color: white">เพิ่มข้อมูลเครือข่าย</span>
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
            ></v-btn>
          </div>
        </v-row>
      </div>
    </div>

    <div class="pb-5">
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
      <v-col cols="12" md="3">
        <v-autocomplete density="compact" variant="solo" placeholder="เลือกภาค">
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          density="compact"
          variant="solo"
          placeholder="เลือกจังหวัด"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          density="compact"
          variant="solo"
          placeholder="เลือกอำเภอ"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="2">
        <v-autocomplete
          density="compact"
          variant="solo"
          placeholder="ระดับแกนนำ"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="1">
        <v-btn block variant="text"> ล้างทิ้ง </v-btn>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-data-table :headers="headers" :items="desserts">
        <template v-slot:item.ลำดับ="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.ผู้ที่เกี่ยวข้อง="{ item }">
          <div class="d-flex align-items-center mx-5">
            <v-avatar size="40">
              <v-img :src="item.image"></v-img>
            </v-avatar>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="align-items-center">
            <v-icon
              v-tooltip="'Edit'"
              icon="mdi-dots-vertical"
              @click="!EditOverlay"
            ></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const loaded = ref(false);
  const loading = ref(false);
  const EditOverlay = ref(false);

  const headers = ref([
    { title: "ลำดับ", value: "ลำดับ", align: "start" },
    { title: "ชื่อโรงเรียน", value: "name", align: "left" },
    { title: "จำนวนนักเรียน", value: "student", align: "left" },
    { title: "ภาค", value: "sector", align: "start" },
    { title: "จังหวัด", value: "province", align: "left" },
    { title: "อำเภอ", value: "district", align: "left" },
    { title: "ระดับปฏิบัติการ", value: "level", align: "center" },
    { title: "แกนนำ", value: "leader", align: "left" },
    { title: "กิจกรรม", value: "acivity", align: "left" },
    { title: "ผู้ที่เกี่ยวข้อง", value: "ผู้ที่เกี่ยวข้อง", align: "left" },
    { title: "", value: "actions", sortable: false },
  ]);

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
