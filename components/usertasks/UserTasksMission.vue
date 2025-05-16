<template>
  <v-app>
    <!-- FAB ลอยขวาล่าง -->
    <v-container class="d-sm-none pa-0" fluid>
        <v-fab
            app
            fixed
            icon="$vuetify"
            location="bottom end"
            class="custom-fab"
            :color="openFabMenu ? '' : 'surface-variant'"
            @click="handleFabClick"
        >
            <v-icon>{{ openFabMenu ? 'mdi-close' : 'mdi-filter-variant' }}</v-icon>
            <!-- <v-icon icon="mdi-filter-variant" /> -->
            <v-speed-dial
                v-model="openFabMenu"
                activator="parent"
                >
                <v-btn key="1" color="info" icon>
                    <!-- รูปแบบแผนงาน -->
                    <v-icon size="24">mdi-view-list</v-icon>
                </v-btn>

                <v-btn key="2" color="info" icon>
                    <!-- ระดับความสำคัญ  -->
                    <v-icon size="24"> mdi-priority-high</v-icon>
                </v-btn>

                </v-speed-dial>
        </v-fab>
    </v-container>

    <!-- dropdown -->
    <div class="d-flex d-md-none ga-2">
        <v-col class="pa-0">
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" class="w-100 text-h6"> รูปแบบแผนงาน </v-btn>
              </template>
        
              <v-list>
                <v-list-item v-for="(item, i) in planType" :key="i" :value="i"
                @click="handlePlanTypeFilter(item.value)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-col>
        <v-col class="pa-0">
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" class="w-100 text-h6"> ระดับความสำคัญ </v-btn>
              </template>
        
              <v-list>
                <v-list-item v-for="(item, i) in priority" :key="i" :value="i" 
                @click="handlePriorityFilter(item.value)">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-col>
    </div>

    <v-row >
      <!-- NOTIFICATION -->
      <v-col cols="12" md="2" class="d-none d-md-block">
        <v-row>
            <v-col cols="12" sm="6" md="12" class="pt-5">
                <div class="d-flex justify-space-between">
                <span class="text-h6">รูปแบบแผนงาน</span>
                </div>
                <v-radio-group v-model="selectedPlan">
                <v-radio label="แผนงานทั้งหมด" value="all"></v-radio>
                <v-radio label="แผนงานใหม่" value="lastest"></v-radio>
                <v-radio label="แผนงานประจำสัปดาห์" value="week"></v-radio>
                <v-radio label="แผนงานประจำปี/รายงานผล" value="general"></v-radio>
                </v-radio-group>
            </v-col>
    
            <v-col cols="12" sm="6" md="12" class="pt-5">
                <span class="text-h6 ">ระดับความสำคัญ</span>
                <v-radio-group v-model="selectedPriority" @change="filterPriorityTasks">
                <v-radio label="ทั้งหมด" color="blue" value="all"></v-radio>
                <v-radio label="ระดับสูง" color="red" value="high"></v-radio>
                <v-radio label="ระดับกลาง" color="orange" value="medium"></v-radio>
                <v-radio label="ระดับต่ำ" color="green" value="low"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
      </v-col>

      <!-- Tasks Body -->
      <v-col cols="12" md="10">

        <!-- lastest tasks -->
        <div
          class="pt-10 pt-md-1 pt-lg-0"
          v-if="
            (selectedPlan === 'all' || selectedPlan === 'lastest')"
        >
            <v-row class="d-flex">
                <v-col cols="auto" class="text-h6 py-0">
                แผนงานใหม่
                <span style="color: red" class="text-h6">(เร่งด่วน) - ({{ newTasks.length}}) </span>
                </v-col>
                <span v-if="openLastestPlan" @click="handleLastestCard()" class="text-h6 text-right">
                    <v-icon>mdi-chevron-down</v-icon>
                </span>
                <span v-else @click="handleLastestCard()" class="text-h6 text-right">
                    <v-icon>mdi-chevron-up</v-icon>
                </span>
            </v-row>

            <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>
            <v-col v-if="newTasks.length === 0" class="text-center text-grey-lighten-1">- ยังไม่มีแผนงานใหม่ -</v-col>
            <v-row v-else>
                <v-col
                    v-show="openLastestPlan"
                    v-for="item in newTasks"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="4"
                    xl="3"
                >
                    <TaskUserCard 
                        :item="item" 
                        :title="title" 
                        @click="goToMission(item.mission)" 
                    />
                </v-col>
            </v-row>
        </div>

        <!-- weekly tasks -->
        <div
          class="pt-10"
          v-if="
            (selectedPlan === 'all' || selectedPlan === 'week')"
        >
            <v-row class="d-flex">
                <v-col cols="auto" class="text-h6 py-0">
                    <span class="text-h6"> รายงานผล(ประจำสัปดาห์) - ({{ weeklyTasks.length}}) </span>
                </v-col>
                <span v-if="openWeeklyPlan" @click="handleWeeklyCard" class="text-h6 text-right">
                <v-icon>mdi-chevron-down</v-icon>
                </span>
                <span v-else @click="handleWeeklyCard" class="text-h6 text-right">
                <v-icon>mdi-chevron-up</v-icon>
                </span>
            </v-row>
          <!-- <span class="text-h6"> รายงานผล(ประจำสัปดาห์) - ({{ weeklyTasks.length}}) </span> -->
            <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>
            <v-row>
                <v-col
                    v-show="openWeeklyPlan"
                    v-for="item in weeklyTasks"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="4"
                    xl="3"
                >
                    <TaskUserCard 
                        :item="item" 
                        :title="title" 
                        @click="goToMission(item.mission)" 
                    />
                </v-col>
            </v-row>
        </div>

        <!-- general tasks -->
        <div
          class="pt-10"
          v-if="
            (selectedPlan === 'all' || selectedPlan === 'general')"
        >
        <v-row class="d-flex ">
                <v-col cols="auto" class="text-h6 py-0">
                    <span class="text-h6"> รายงานผล - ({{ generalTasks.length }})</span>
                </v-col>
                <span v-if="openGeneralPlan" @click="handleGeneralCard" class="text-h6 text-right">
                <v-icon>mdi-chevron-down</v-icon>
                </span>
                <span v-else @click="handleGeneralCard" class="text-h6 text-right">
                <v-icon>mdi-chevron-up</v-icon>
                </span>
            </v-row>
          <!-- <span class="text-h6"> รายงานผล - ({{ generalTasks.length }})</span> -->
          <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>
          <v-row>
            <v-col
                v-show="openGeneralPlan"
                v-for="item in generalTasks"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                xl="3"
            >
                <TaskUserCard 
                    :item="item" 
                    :title="title" 
                    @click="goToMission(item.mission)" 
                />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>
<script setup>
    import { useRouter } from "vue-router";
    import { ref, watchEffect, computed,shallowRef, watch } from "vue";
    import { formatDate } from "../../composables/useColors";
    import TaskUserCard from "../cards/TaskUserCard.vue";
    const selectedPlan = ref("all"); // ค่าเริ่มต้นสำหรับ "รูปแบบแผนงาน" เป็น 0 (แผนงานทั้งหมด)
    const selectedPriority = ref("all"); // ค่าเริ่มต้นสำหรับ "ระดับความสำคัญ" เป็น 0 (ทั้งหมด)
// ใช้ useRouter เพื่อเข้าถึง Vue Router
    const openFabMenu = shallowRef(false)
    const router = useRouter();
    const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
        useColors();

    const date = ref(new Date());
    const newTasks = ref([]);
    const weeklyTasks = ref([]);
    const generalTasks = ref([]);
    const priority = ref([
        {title:"ทั้งหมด", value:"all"},
        {title:"ต่ำ", value:"low"},
        {title:"ปานกลาง", value:"medium"},
        {title:"สูง", value:"high"},
    ]);
    const planType = ref([
        {title:"ทั้งหมด", value:"all"},
        {title:"แผนงานใหม่", value:"lastest"},
        {title:"แผนงานประจำสัปดาห์", value:"week"},
        {title:"แผนงานประจำปี/รายงานผล", value:"general"},
    ]);
    const openLastestPlan = shallowRef(false);
    const openWeeklyPlan = shallowRef(false);
    const openGeneralPlan = shallowRef(false);
  //   const filters = ref([
  //   { name: "ทั้งหมด", value: 0 },
  //   { name: "ระดับสูง", value: 1 },
  //   { name: "ระดับกลาง", value: 2 },
  //   { name: "ระดับต่ำ", value: 3 },
  // ]);
    const tasks = ref([
    {
        id: 1,
        mission: "M1",
        description: "Report",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "week",
        priority: "high",
        },
        {
        id: 2,
        mission: "M2",
        description: "mock up description",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "low",
        },
        {
        id: 3,
        mission: "M3",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "low",
        },
        {
        id: 4,
        mission: "M4",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "week",
        priority: "medium",
        },
        {
        id: 5,
        mission: "M5",
        description: "Report",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "medium",
        },
        {
        id: 6,
        mission: "M6",
        description: "ประเด็นตอบโต้",
        date: "31/10/67-04/11/67",
        report: "week",
        priority: "high",
        },
        {
        id: 7,
        mission: "M7",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "high",
        },
        {
        id: 8,
        mission: "M8",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "high",
        },
        {
        id: 9,
        mission: "R1",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "low",
        },
        {
        id: 10,
        mission: "R2",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "week",
        priority: "low",
        },
        {
        id: 11,
        mission: "R3",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "low",
        },
        {
        id: 11,
        mission: "R4",
        description: "",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "week",
        priority: "low",
        },
        {
        id: 12,
        mission: "R12",
        description: "ประเด็นตอบโต้",
        start_date: "2025-03-25T00:00:00.000Z",
        end_date: "2025-03-31T00:00:00.000Z",
        report: "general",
        priority: "low",
        },
    ])
    const userTasks = ref([]);

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
        {
        id: 4,
        title: "M2",
        description: "",
        date: "29/10/67-02/11/67",
        priority: "ต่ำ",
        },
        {
        id: 5,
        title: "M3",
        description: "",
        date: "29/10/67-02/11/67",
        priority: "ต่ำ",
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
        {
        id: 3,
        title: "M4",
        description: "",
        date: "29/10/67-02/11/67",
        priority: "ปานกลาง",
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

    const filterReportTasks = (type) => {
        return userTasks.value.filter(task => task.report === type)
    };
    const handlePriorityFilter = (value) => {
        selectedPriority.value = value;
        filterPriorityTasks()
};
    const handlePlanTypeFilter = (value) => {
        selectedPlan.value = value;
        filterReportTasks(value)
    };
    const filterPriorityTasks = () => {
      setFilter()
        // console.log("selectedPriority ==== ", selectedPriority.value);
      if (selectedPriority.value === "all") {
        setFilter()
      } else {
          newTasks.value = newTasks.value.filter(item => item.priority === selectedPriority.value);
          weeklyTasks.value = weeklyTasks.value.filter(item => item.priority === selectedPriority.value);
          generalTasks.value = generalTasks.value.filter(item => item.priority === selectedPriority.value);
          // console.log("Filtered Tasks:", newTasks.value);
          // setFilter(filtered);
      }
    };
    const setFilter = () => {
        newTasks.value =  userTasks.value.slice(0, 6);
        weeklyTasks.value = filterReportTasks('week')
        generalTasks.value = filterReportTasks('general')
    };
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
    function handleLastestCard() {
        openLastestPlan.value = !openLastestPlan.value;
};
    function handleWeeklyCard() {
        openWeeklyPlan.value = !openWeeklyPlan.value;
    };
    function handleGeneralCard() {
        openGeneralPlan.value = !openGeneralPlan.value;
    };
    async function resetShowCard() {
        openLastestPlan.value = true;
        openWeeklyPlan.value = true;
        openGeneralPlan.value = true;
    };
onMounted(async () => {
    await resetShowCard()
    try {
          
      userTasks.value = await getAllTasksUser();
      // userTasks.value = tasks.value;
        setFilter()
    } catch (error) {
        userTasks.value = tasks.value;
    }
    });
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
