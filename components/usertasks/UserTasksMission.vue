<template>
  <div>
    <v-row>
      <!-- NOTIFICATION -->
      <v-col cols="12" md="2">
        <div class="pt-5">
          <span class="text-h6">รูปแบบแผนงาน</span>
          <v-radio-group v-model="selectedPlan">
            <v-radio label="แผนงานทั้งหมด" value="0"></v-radio>
            <v-radio label="แผนงานใหม่" value="1"></v-radio>
            <v-radio label="แผนงานประจำสัปดาห์" value="2"></v-radio>
            <v-radio label="แผนงานประจำปี/รายงานผล" value="3"></v-radio>
          </v-radio-group>
        </div>

        <div class="pt-5">
          <span class="text-h6">ระดับความสำคัญ</span>
          <v-radio-group v-model="selectedPriority">
            <v-radio label="ทั้งหมด" color="blue" value="ทั้งหมด"></v-radio>
            <v-radio label="ระดับสูง" color="red" value="สูง"></v-radio>
            <v-radio label="ระดับกลาง" color="orange" value="ปานกลาง"></v-radio>
            <v-radio label="ระดับต่ำ" color="green" value="ต่ำ"></v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col cols="12" md="10">
        <div
          class="pt-5"
          v-if="
            (selectedPlan === '0' || selectedPlan === '1') &&
            filteredItems != ''
          "
        >
          <span class="text-h6">
            แผนงานใหม่
            <span style="color: red" class="text-h6">(เร่งด่วน)</span>
          </span>
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
          <v-row>
            <v-col
              class="pt-10"
              v-for="item in filteredItems"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                rounded="lg"
                class="pa-2"
                elevation="4"
                @click="goToMission(item.title)"
              >
                <v-row>
                  <v-col cols="12" md="2">
                    <v-avatar
                      :color="getMissionColor(item.title)"
                      rounded="lg"
                      size="x-large"
                      style="margin-left: 10px; margin-top: 10px"
                    ></v-avatar>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-subtitle>{{
                      getMissionName(item.title)
                    }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <div class="pt-5">
                  <v-card-text
                    >รายระเอียด:{{ item.description || "-" }}</v-card-text
                  >
                </div>
                <v-row>
                  <v-col cols="12" md="7" class="text-start">
                    <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5" class="text-end">
                    <v-card-text
                      :style="{ color: getColorPriority(item.priority) }"
                      >ระดับ{{ item.priority }}</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div
          class="pt-10"
          v-if="
            (selectedPlan === '0' || selectedPlan === '2') &&
            filteredItems2 != ''
          "
        >
          <span class="text-h6"> รายงานผล(ประจำสัปดาห์) </span>
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
          <v-row>
            <v-col
              class="pt-10"
              v-for="item in filteredItems2"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                rounded="lg"
                class="pa-2"
                elevation="4"
                @click="goToMission(item.title)"
              >
                <v-row>
                  <v-col cols="12" md="2">
                    <v-avatar
                      :color="getMissionColor(item.title)"
                      rounded="lg"
                      style="margin-left: 10px; margin-top: 10px"
                      size="x-large"
                    ></v-avatar>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-subtitle>{{
                      getMissionName(item.title)
                    }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <div class="pt-5">
                  <v-card-text
                    >รายระเอียด:{{ item.description || "-" }}</v-card-text
                  >
                </div>
                <v-row>
                  <v-col cols="12" md="7" class="text-start">
                    <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5" class="text-end">
                    <v-card-text
                      :style="{ color: getColorPriority(item.priority) }"
                      >ระดับ{{ item.priority }}</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div
          class="pt-10"
          v-if="
            (selectedPlan === '0' || selectedPlan === '3') &&
            filteredItems3 != ''
          "
        >
          <span class="text-h6"> รายงานผล</span>
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
          <v-row>
            <v-col
              class="pt-10"
              v-for="item in filteredItems3"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                rounded="lg"
                class="pa-2"
                elevation="4"
                @click="goToMission(item.title)"
              >
                <v-row>
                  <v-col cols="12" md="2">
                    <v-avatar
                      :color="getMissionColor(item.title)"
                      rounded="lg"
                      style="margin-left: 10px; margin-top: 10px"
                      size="x-large"
                    ></v-avatar>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-subtitle>{{
                      getMissionName(item.title)
                    }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <div class="pt-5">
                  <v-card-text
                    >รายระเอียด:{{ item.description || "-" }}</v-card-text
                  >
                </div>
                <v-row>
                  <v-col cols="12" md="7" class="text-start">
                    <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5" class="text-end">
                    <v-card-text
                      :style="{ color: getColorPriority(item.priority) }"
                      >ระดับ{{ item.priority }}</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>


</template>
<script setup>
  import { useRouter } from "vue-router";
  import { ref, watchEffect, computed } from "vue";
  const selectedPlan = ref("0"); // ค่าเริ่มต้นสำหรับ "รูปแบบแผนงาน" เป็น 0 (แผนงานทั้งหมด)
  const selectedPriority = ref("ทั้งหมด"); // ค่าเริ่มต้นสำหรับ "ระดับความสำคัญ" เป็น 0 (ทั้งหมด)
  // ใช้ useRouter เพื่อเข้าถึง Vue Router
  const router = useRouter();

  const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
    useColors();

  const date = ref(new Date());

  const items = ref([
    {
      id: 1,
      title: "M1",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "สูง",
    },
    {
      id: 2,
      title: "M6",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "สูง",
    },
    {
      id: 3,
      title: "M7",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "สูง",
    },
  ]);

  const items2 = ref([
    {
      id: 1,
      title: "R1",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "ต่ำ",
    },
    {
      id: 2,
      title: "R3",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "ปานกลาง",
    },
    {
      id: 3,
      title: "M8",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
  ]);

  const items3 = ref([
    {
      id: 1,
      title: "M5",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "ปานกลาง",
    },
    {
      id: 2,
      title: "R12",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "ต่ำ",
    },
    {
      id: 3,
      title: "R2",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
  ]);

  const filteredItems = computed(() => {
    console.log("selectedPriority.value", selectedPriority.value);
    if (selectedPriority.value === "ทั้งหมด") {
      return items.value; // แสดงทั้งหมด
    } else {
      return items.value.filter(
        (item) => item.priority === selectedPriority.value
      );
    }
  });

  const filteredItems2 = computed(() => {
    console.log("selectedPriority.value", selectedPriority.value);
    if (selectedPriority.value === "ทั้งหมด") {
      return items2.value; // แสดงทั้งหมด
    } else {
      return items2.value.filter(
        (item) => item.priority === selectedPriority.value
      );
    }
  });

  const filteredItems3 = computed(() => {
    console.log("selectedPriority.value", selectedPriority.value);
    if (selectedPriority.value === "ทั้งหมด") {
      return items3.value; // แสดงทั้งหมด
    } else {
      return items3.value.filter(
        (item) => item.priority === selectedPriority.value
      );
    }
  });

  // ฟังก์ชันที่ใช้ในการไปยังหน้า Detail
  const goToMission = (title) => {
    // ใช้ router.push เพื่อเปลี่ยนหน้าไปยัง detail page
    // router.push({ name: 'detail', params: { id: 1 } }) // ส่ง id หรือข้อมูลที่คุณต้องการ
    router.push({ name: "taskmission", query: { title } });
    console.log("title", title);
  };

  // Reactive property to track if the viewport is mobile
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
</script>

<style>
  ::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #f1f1f1;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-date-picker-header {
  background-color: white !important;
  height: 50px;
}

.v-date-picker-header__content {
  align-items: center;
  display: inline-flex;
  font-size: 23px;
  line-height: 30px;
  grid-area: content;
  justify-content: space-between;
}

.card-h-maxmin {
  max-height: 450px;
  min-height: 200px;

}

.card-h-90 {
  height: 90%;
  overflow-y: auto;
}

.dashed-divider {
  border-style: dashed;
}

.v-picker-title {
  display: none;
}
</style>
