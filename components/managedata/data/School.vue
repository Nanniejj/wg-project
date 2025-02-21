<template>
  <v-container>
    <div class="text-end pb-5">
      <div v-if="!isMobile">
        <v-btn size="large" color="#E58383" rounded="lg"
          ><v-icon color="white">mdi-plus</v-icon>
          <span style="color: white">เพิ่มข้อมูลเครือข่าย</span>
        </v-btn>
      </div>
      <div v-else>
        <!-- <v-btn color="#FFA72F" rounded="lg"
          ><v-icon  color="white">mdi-plus</v-icon>
        </v-btn> -->
        <v-btn
          color="#E58383"
          size="large"

          density="comfortable"
          icon="mdi-plus"
        ></v-btn>
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
        <v-btn block> ล้างทิ้ง </v-btn>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-table>
        <thead>
          <tr>
            <th class="text-start">ลำดับ</th>
            <th class="text-left">ชื่อสถาณศึกษา</th>
            <th class="text-left">จำนวนศึกษา</th>
            <th class="text-start">ภาค</th>
            <th class="text-left">จังหวัด</th>
            <th class="text-left">อำเภอ</th>
            <th class="text-start">ระดับแกนนำ</th>
            <th class="text-left">แกนนำ</th>
            <th class="text-left">กิจกรรม</th>
            <th class="text-left">ผู้ที่เกี่ยวข้อง</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in desserts" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.student }}</td>
            <td>{{ item.sector }}</td>
            <td>{{ item.province }}</td>
            <td>{{ item.district }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.leader }}</td>
            <td>{{ item.acivity }}</td>
            <td>{{ item.person }}</td>
            <td>
              <div class="align-items-center">
                <v-btn variant="outlined">
                  <span style="font-size: 12px">view</span>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const loaded = ref(false);
  const loading = ref(false);

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
