<template>
  <v-container>
    <div>
      <!-- <div v-if="isMobile">
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
    </div> -->

      <div class="justify-end d-flex">
        <v-row>
          <v-col cols="6" class="text-start">
            <span class="text-h6"> My Tasks</span>
          </v-col>
          <v-col cols="6" class="text-end">
            <v-menu location="bottom end" offset-y>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" rounded="lg" variant="text">
                  <v-icon size="large">mdi-filter-outline</v-icon>
                  <div class="px-1">
                    <span class="text-h6">source by</span>
                  </div>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="filter in filters"
                  :key="filter.value"
                  @click="handleFilterClick(filter)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ filter.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </div>
      <div class="pb-5 pt-3">
        <v-divider class="border-opacity-75"></v-divider>
      </div>

      <div v-if="isMobile">
        <div class="text-start" style="margin-left: -20px">
          <v-btn @click="toggleVisibility" variant="text">
            <v-icon size="x-large" v-if="isVisible">mdi-chevron-down</v-icon>
            <v-icon size="x-large" v-else>mdi-chevron-up</v-icon>
            <span class="text-h6">filter</span>
          </v-btn>
        </div>
        <!-- แสดงข้อมูลเมื่อ isVisible เป็น true -->
        <div v-if="isVisible" class="pt-5">
          <div v-if="isMobile">
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
                <v-radio
                  label="ระดับกลาง"
                  color="orange"
                  value="ปานกลาง"
                ></v-radio>
                <v-radio label="ระดับต่ำ" color="green" value="ต่ำ"></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>
      <v-row>
        <!-- NOTIFICATION -->
        <v-col v-if="!isMobile" cols="12" md="2">
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
              <v-radio
                label="ระดับกลาง"
                color="orange"
                value="ปานกลาง"
              ></v-radio>
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
                md="3"
              >
                <v-card
                  rounded="lg"
                  class="pa-2 h-100"
                  elevation="4"
                  @click="goToMission(item.title)"
                >
                  <v-row>
                    <v-col cols="2">
                      <v-avatar
                        :color="getMissionColor(item.title)"
                        rounded="lg"
                      ></v-avatar>
                    </v-col>
                    <v-col cols="10" class="pa-1">
                      <v-card-title class="pb-0">{{ item.title }}</v-card-title>
                      <v-card-subtitle>{{
                        getMissionName(item.title)
                      }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                  <div class="pt-3 pb-3">
                    <v-card-text class="pa-2"
                      >รายระเอียด:{{ item.description || "-" }}</v-card-text
                    >
                  </div>
                  <v-row>
                    <v-col cols="8" class="text-start pa-0 d-flex align-end">
                      <v-card-text class="pa-4"
                        ><v-icon icon="mdi-calendar-blank"></v-icon
                        >{{ item.date || "-" }}</v-card-text
                      >
                    </v-col>
                    <v-col cols="4" class="text-end pa-0 d-flex align-end">
                      <v-card-text
                        class="pa-4"
                        :style="{ color: getColorPriority(item.priority) }"
                        >{{ item.priority }}</v-card-text
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
                md="3"
              >
                <v-card
                  rounded="lg"
                  class="pa-2 h-100"
                  elevation="4"
                  @click="goToMission(item.title)"
                >
                  <v-row>
                    <v-col cols="2">
                      <v-avatar
                        :color="getMissionColor(item.title)"
                        rounded="lg"
                      ></v-avatar>
                    </v-col>
                    <v-col cols="10" class="pa-1">
                      <v-card-title class="pb-0">{{ item.title }}</v-card-title>
                      <v-card-subtitle>{{
                        getMissionName(item.title)
                      }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                  <div class="pb-3 pt-3">
                    <v-card-text class="pa-2"
                      >รายระเอียด:{{ item.description || "-" }}</v-card-text
                    >
                  </div>
                  <v-row>
                    <v-col cols="8" class="text-start pa-0 d-flex align-end">
                      <v-card-text class="pa-4"
                        ><v-icon icon="mdi-calendar-blank"></v-icon
                        >{{ item.date || "-" }}</v-card-text
                      >
                    </v-col>
                    <v-col cols="4" class="text-end pa-0 d-flex align-end">
                      <v-card-text
                        class="pa-4"
                        :style="{ color: getColorPriority(item.priority) }"
                        >{{ item.priority }}</v-card-text
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
                md="3"
              >
                <v-card
                  rounded="lg"
                  class="pa-2 h-100"
                  elevation="4"
                  @click="goToMission(item.title)"
                >
                  <v-row>
                    <v-col cols="2">
                      <v-avatar
                        :color="getMissionColor(item.title)"
                        rounded="lg"
                      ></v-avatar>
                    </v-col>
                    <v-col cols="10" class="pa-1">
                      <v-card-title class="pb-0">{{ item.title }}</v-card-title>
                      <v-card-subtitle>{{
                        getMissionName(item.title)
                      }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                  <div class="pb-3 pt-3">
                    <v-card-text class="pa-2"
                      >รายระเอียด:{{ item.description || "-" }}</v-card-text
                    >
                  </div>
                  <v-row>
                    <v-col cols="8" class="text-start pa-0 d-flex align-end">
                      <v-card-text class="pa-4"
                        ><v-icon icon="mdi-calendar-blank"></v-icon
                        >{{ item.date || "-" }}</v-card-text
                      >
                    </v-col>
                    <v-col cols="4" class="text-end pa-0 d-flex align-end">
                      <v-card-text
                        class="pa-4"
                        :style="{ color: getColorPriority(item.priority) }"
                        >{{ item.priority }}</v-card-text
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
  </v-container>
</template>
<script setup>
  import { useRouter } from "vue-router";
  import { ref, watchEffect, computed, onMounted, onBeforeUnmount } from "vue";
  const selectedPlan = ref("0"); // ค่าเริ่มต้นสำหรับ "รูปแบบแผนงาน" เป็น 0 (แผนงานทั้งหมด)
  const selectedPriority = ref("ทั้งหมด"); // ค่าเริ่มต้นสำหรับ "ระดับความสำคัญ" เป็น 0 (ทั้งหมด)
  // ใช้ useRouter เพื่อเข้าถึง Vue Router
  const router = useRouter();

  const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
    useColors();

  const date = ref(new Date());

  const filters = ref([
    { name: "ภาพรวม", value: 0 },
    { name: "กำลังดำเนินการ", value: 1 },
    { name: "แผนงานที่เสร็จสิ้นแล้ว", value: 2 },
  ]);

  // ตัวแปร activeFilter เก็บค่าของ filter ที่ถูกเลือก
  const activeFilter = ref(0);

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
      title: "M5",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "สูง",
    },
    {
      id: 3,
      title: "M6",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "สูง",
    },
    {
      id: 4,
      title: "M7",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "สูง",
    },
  ]);

  const items2 = ref([
    {
      id: 1,
      title: "M2",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "สูง",
    },
    {
      id: 2,
      title: "M3",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "ปานกลาง",
    },
    {
      id: 3,
      title: "M8",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "สูง",
    },
  ]);

  const items3 = ref([
    {
      id: 1,
      title: "หัวข้อประสาน",

      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "ต่ำ",
    },
    {
      id: 2,
      title: "M4",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "ต่ำ",
    },
    {
      id: 3,
      title: "M5",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 4,
      title: "R1",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 5,
      title: "R2",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 6,
      title: "R3",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 7,
      title: "R4",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 8,
      title: "R5",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 9,
      title: "R6",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 10,
      title: "R7",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 11,
      title: "R8",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 12,
      title: "R9",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 13,
      title: "R10",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 14,
      title: "R11",
      description: "",
      date: "29/10/67-02/11/67",
      priority: "ต่ำ",
    },
    {
      id: 15,
      title: "R12",
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
  const isVisible = ref(false); // ตัวแปรในการเปิด/ปิดข้อมูล
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
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
