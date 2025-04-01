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
            <v-btn color="#529B41" rounded="lg" @click="addMainstay = true"
              ><v-icon color="white">mdi-plus</v-icon>
              <span style="color: white">เพิ่มแกนนำ</span>
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
              color="#529B41"
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
      <v-table>
        <thead>
          <tr>
            <th class="text-start">ลำดับ</th>
            <th class="text-left">โรงเรียน</th>
            <th class="text-left">ชื่อ-สกุล</th>
            <th class="text-start">จำนวนกิจกรรม</th>
            <th class="text-left">เบอร์โทร</th>
            <th class="text-left">สถานะแกนนำ</th>
            <th class="text-left">ผู้ที่เกี่ยวข้อง</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in desserts" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.school }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.position }}</td>
            <td>
              <div class="d-flex align-items-center mx-5">
                <!-- v-avatar for profile picture -->
                <v-avatar size="40">
                  <v-img :src="item.image"></v-img>
                </v-avatar>
                <!-- Name next to avatar -->
              </div>
            </td>
            <td>
              <div class="align-items-center">
                <v-icon
                  v-tooltip="'Edit'"
                  icon="mdi-dots-vertical"
                  @click="!EditOverlay"
                ></v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
    <v-dialog v-model="addMainstay" max-width="1200">
      <v-card class="pa-2" rounded="lg">
        <v-card-title class="text-h6">
          เพิ่มแกนนำ
          <v-btn
            icon="mdi-close"
            variant="text"
            size="large"
            @click="addMainstay = false"
            class="float-right"
          ></v-btn>
        </v-card-title>
        <div class="pt-1 pb-1">
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
        </div>

        <v-card-text class="pt-4">
          <div class="pt-0 pb-0">
            <span class="text-h6">ชื่อ-สกุล</span>
            <v-text-field
              placeholder="กรอกชื่อ-สกุล"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </div>

          <div class="pt-0 pb-0">
            <span class="text-h6">การศึกษา</span>
            <v-text-field
              placeholder="กรอกข้อมูล"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </div>
          <v-row>
            <v-col cols="12" sm="8" class="pt-4 pb-0">
              <span class="text-h6">เบอร์โทรผู้ประสาน</span>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pt-4 pb-0">
              <span class="text-h6">สถานะแกนนำ</span>
              <v-autocomplete
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>

        <div class="d-flex justify-end pb-6 px-6">
          <v-btn
            color="#2A3547"
            rounded="lg"
            size="large"
            @click="addMainstay = false"
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
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  // Reactive property to track if the viewport is mobile
  const isMobile = ref(false);
  const addMainstay = ref(false);

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
  const loaded = ref(false);
  const loading = ref(false);

  const desserts = ref([
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    },
    {
      school: "รุจิเสรี",
      name: "น.ส.เขมอัปสร จันทรา",
      student: 159,
      level: "0",
      position: "แกนนำ",
      phone: "082-5555555",

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
