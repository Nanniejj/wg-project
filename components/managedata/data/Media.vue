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

    <v-data-table :headers="headers" :items="items">
      <template v-slot:header.media>
        ประเภทสื่อ

        <!-- <v-btn style="margin-left: 5px;" rounded="xl" color="#BABABA" size="20" @click="mediaButtonClicked">
              <v-icon color="white" size="15">mdi-plus</v-icon>
            </v-btn> -->

        <v-menu :close-on-content-click="false" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              style="margin-left: 5px"
              rounded="xl"
              color="#BABABA"
              size="20"
              @click="mediaButtonClicked"
            >
              <v-icon color="white" size="15">mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card min-width="340">
            <v-card-text>
              <!-- <div class="pa-0 pb-3 align-center d-flex">
                  <span>เพิ่มประเภทสื่อ</span>
                </div> -->
              <v-row class="pa-3">
                <v-col cols="12" class="pa-1 h-100">
                  <!-- <v-text-field
                      variant="outlined"
                      density="compact"
                      label="เพิ่มประเภทสื่อ"
                      v-model="field1"
                    ></v-text-field> -->
                  <v-text-field
                    v-model="search"
                    label="เพิ่มประเภทสื่อ"                   
                    hide-details
                    rounded="lg"
                    variant="solo"
                  >
                    <template v-slot:append>
                      <v-btn
                        @click="searchData"
                        rounded="lg"
                       
                        color="#000000"
                      >
                        <span>ตกลง</span>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- <v-col cols="3" class="pa-1 h-100">
                    <v-btn color="blue darken-1" text @click="closeMenu"
                      >ADD</v-btn
                    >
                  </v-col> -->
              </v-row>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar size="40">
          <v-img :src="item.image"></v-img>
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          icon="mdi-dots-vertical"
          tooltips="Edit"
          v-tooltip="'Edit'"
          @click="!EditOverlay"
        ></v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const loaded = ref(false);
  const loading = ref(false);

  const isMobile = ref(false);

  const headers = ref([
    { title: "ลำดับ", value: "id" },
    { title: "ภาพโปรไฟล์", value: "image" },
    { title: "คำนำหน้า", value: "prefix" },
    { title: "ชื่อ-สกุล", value: "name" },
    { title: "ตำแหน่งปัจจุบัน", value: "position" },
    { title: "การศึกษา", value: "degree" },
    { title: "ผู้ประสานงาน", value: "collaborators" },
    { title: "ประเภทสื่อ", value: "media" },
    { title: "", value: "actions", sortable: false },
  ]);

  const items = ref([
    {
      id: 1,
      image:
        "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
      prefix: "นาย",
      name: "สมชาย",
      degree: "ระดับปริญญาโท",
      position: "ที่ปรึกษา",
      media: "เครือข่ายมวลชน",
      collaborators: "-",
    },
    // {
    //   id: 2,
    //   name: "สมหญิง",
    //   phone: "082-987-6543",
    //   position: "โปรแกรมเมอร์",
    //   collaborators: "สมชาย",
    // },
    // {
    //   id: 3,
    //   name: "สมพร",
    //   phone: "083-555-1212",
    //   position: "นักออกแบบ",
    //   collaborators: "สมชาย, สมหญิง",
    // },
  ]);

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
      level: "0",
      leader: "1",
      acivity: "10",
      person: "-",
    },
    {
      name: "สวนสตรี",
      student: 89,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "0",
      leader: "1",
      acivity: "20",
      person: "-",
    },
    {
      name: "เบญจมาศ",
      student: 139,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "1",
      leader: "10",
      acivity: "15",
      person: "-",
    },
    {
      name: "สามเสนวิทยา",
      student: 120,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "1",
      leader: "1",
      acivity: "0",
      person: "-",
    },
    {
      name: "มาลีพิทักษ์",
      student: 180,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "0",
      leader: "1",
      acivity: "10",
      person: "-",
    },
    {
      name: "ประชาภิบาล",
      student: 119,
      sector: "กลาง",
      province: "กรุงเทพ",
      district: "พญาไท",
      level: "0",
      leader: "1",
      acivity: "10",
      person: "-",
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
