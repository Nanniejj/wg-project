<template>
  <v-row class="pt-5">
    <v-col cols="12" md="8">
      <v-icon
        @click="handleBack"
        class="hover-pointer"
        size="large"
        icon="mdi-chevron-double-left"
      ></v-icon>
      <span class="text-h6 px-4 font-weight-bold">Mission {{ title }}</span>
      <span class="text-h6">{{ getMissionName(title) }}</span>
    </v-col>
    <v-col cols="12" md="4" class="justify-end d-flex">
      <v-menu location="bottom end" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <v-icon size="x-large">mdi-filter-variant</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="filter in filters"
            :key="filter.value"
            @click="handleFilterClick(filter.value)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ filter.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
  <v-divider style="margin-top: 20px" class="border-opacity-75"></v-divider>

  <!-- newTasks -->
  <div v-if="ShowSelect === 0 || ShowSelect === 1" class="pt-10">
    <span class="text-h6 font-weight-bold">
      แผนงานใหม่ ({{ newTasks.length }})</span
    >
    <v-row>
      <v-col
        class="pt-10"
        v-for="item in newTasks"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2 h-100"
          elevation="4"
          @click="goToMission(title, item.status,item)"
        >
          <v-row>
            <v-col cols="2">
              <v-avatar :color="getMissionColor(item.mission)" rounded="lg"></v-avatar>
            </v-col>
            <v-col cols="10" class="pa-1">
              <v-card-title class="pb-0">{{ item.mission }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pb-3 pt-3">
            <v-card-text class="py-2 px-0 truncate-text-1"
              >รายระเอียด:{{ item.description || "-" }}</v-card-text
            >
          </div>
          <v-row>
            <v-col cols="8" sm="7" md="6" lg="7" class="text-start py-0 d-flex align-end">
              <v-card-text class="px-0 truncate-text-1" v-if="(item.start_date) && (item.end_date)">
                <v-icon icon="mdi-calendar-blank"></v-icon> 
                {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
              </v-card-text>
              <v-card-text class="px-0 truncate-text-1" v-else><v-icon icon="mdi-calendar-blank"></v-icon> - </v-card-text>
            </v-col>
            <v-col cols="4" sm="5" md="6" lg="5" class="text-end pa-0 d-flex align-end">
              <v-card-text
                class="py-4 px-2"
                :style="{ color: getColorPriority(getPriorityTitle(item.priority)) }"
                >ระดับ{{ getPriorityTitle(item.priority) }}</v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider
      style="margin-top: 50px"
      class="border-opacity-75 dashed-divider"
    ></v-divider>
  </div>

  <!-- inProgressTasks -->
  <div v-if="ShowSelect === 0 || ShowSelect === 2" class="pt-10">
    <span class="text-h6 font-weight-bold">
      กำลังดำเนินการ ({{ inProgressTasks.length }})</span
    >
    <v-row>
      <v-col
        class="pt-10"
        v-for="item in inProgressTasks"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2 h-100"
          elevation="3"
          @click="goToMission(title, item.status,item)"
        >
          <v-row>
            <v-col cols="2">
              <v-avatar :color="getMissionColor(title)" rounded="lg"></v-avatar>
            </v-col>
            <v-col cols="10" class="pa-1">
              <v-card-title class="pb-0">{{ title }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pb-3 pt-3">
            <v-card-text class="py-2 px-0 truncate-text-1"
              >รายระเอียด:{{ item.description || "-" }}</v-card-text
            >
          </div>
          <v-row>
            <v-col cols="8" sm="7" md="6" lg="7" class="text-start py-0 d-flex align-end">
              <v-card-text class="px-0 truncate-text-1" v-if="(item.start_date) && (item.end_date)">
                <v-icon icon="mdi-calendar-blank"></v-icon> 
                {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
              </v-card-text>
              <v-card-text class="px-0 truncate-text-1" v-else><v-icon icon="mdi-calendar-blank"></v-icon> - </v-card-text>
            </v-col>
            <v-col cols="4" sm="5" md="6" lg="5" class="text-end pa-0 d-flex align-end">
              <v-card-text
                class="py-4 px-2"
                :style="{ color: getColorPriority(getPriorityTitle(item.priority)) }"
                >ระดับ{{ getPriorityTitle(item.priority) }}</v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider
      style="margin-top: 50px"
      class="border-opacity-75 dashed-divider"
    ></v-divider>
  </div>

  <!-- completedTasks -->
  <div v-if="ShowSelect === 0 || ShowSelect === 3" class="pt-10">
    <span class="text-h6 font-weight-bold">
      แผนงานที่เสร็จสมบูรณ์ ({{ completedTasks.length }})</span
    >

    <v-row>
      <v-col
        class="pt-10"
        v-for="item in completedTasks"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2 h-100"
          elevation="4"
          @click="goToMission(title, item.status, item)"
        >
          <v-row>
            <v-col cols="2">
              <v-avatar :color="getMissionColor(title)" rounded="lg"></v-avatar>
            </v-col>
            <v-col cols="10" class="pa-1">
              <v-card-title class="pb-0">{{ title }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pb-3 pt-3">
            <v-card-text class="py-2 px-0 truncate-text-1"
              >รายระเอียด:{{ item.description || "-" }}</v-card-text
            >
          </div>
          <v-row>
            <v-col cols="8" sm="7" md="6" lg="7" class="text-start py-0 d-flex align-end">
              <v-card-text class="px-0 truncate-text-1" v-if="(item.start_date) && (item.end_date)">
                <v-icon icon="mdi-calendar-blank"></v-icon> 
                {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
              </v-card-text>
              <v-card-text class="px-0 truncate-text-1" v-else><v-icon icon="mdi-calendar-blank"></v-icon> - </v-card-text>
            </v-col>
            <v-col cols="4" sm="5" md="6" lg="5" class="text-end pa-0 d-flex align-end">
              <v-card-text
                class="py-4 px-2"
                :style="{ color: getColorPriority(getPriorityTitle(item.priority)) }"
                >ระดับ{{ getPriorityTitle(item.priority) }}</v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider
      style="margin-top: 50px"
      class="border-opacity-75 dashed-divider"
    ></v-divider>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from "vue-router";
  const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
    useColors();

  const filters = ref([
    { name: "ทั้งหมด", value: 0 },
    { name: "แผนงานใหม่", value: 1 },
    { name: "กำลังดำเนินการ", value: 2 },
    { name: "แผนงานที่เสร็จสมบูรณ์", value: 3 },
  ]);

  const priority = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
  ]);
  const route = useRoute();
  const router = useRouter();
  // รับ title จาก query
  const title = route.query.title;
  const ShowSelect = ref(0);
  const handleFilterClick = (filter) => {
    ShowSelect.value = filter; // ใช้ .value เพื่อแก้ไขค่า
    // console.log("filter",filter);
  };

  const tasks = ref([]);
  const newTasks = ref([]);
  const inProgressTasks = ref([]);
  const completedTasks = ref([]);
  
  const items = ref([
    {
      id: 1,
      title: "M1",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "สูง",
    },
  ]);

  const items2 = ref([
    {
      id: 1,
      title: "M2",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "ต่ำ",
    },
    {
      id: 2,
      title: "M3",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
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
    {
      id: 4,
      title: "R1",
      description: "Report",
      date: "30/10/67-01/11/67",
      priority: "ต่ำ",
    },
    {
      id: 5,
      title: "R3",
      description: "ประเด็นตอบโต้",
      date: "31/10/67-04/11/67",
      priority: "ปานกลาง",
    },
  ]);

  const getPriorityTitle = (itemValue) => {
    // let priorityItem = 
    return priority.value.find(item => item.value === itemValue ).title
  };
  const filterTasks = (status) => {
    return tasks.value.filter(task => task.status === status)
  };
  const setFilterTasks = () => {
    newTasks.value =  filterTasks('create')
    inProgressTasks.value = filterTasks('in_progress')
    completedTasks.value = filterTasks('completed')
  };
  
  // ฟังก์ชันที่ใช้ในการไปยังหน้า Detail
const goToMission = (title, status, task) => {
    // console.log("task === ", task);
    
    // ใช้ router.push เพื่อเปลี่ยนหน้าไปยัง detail page
    router.push({
      name: "usermission",
      query: { title, status, task: JSON.stringify(task) },
      // state: {task}
    });
  };
  // ฟังก์ชันสำหรับการย้อนกลับไปยังหน้าเดิม
  const handleBack = () => {
    router.back(); // ใช้ router.back() เพื่อกลับไปยังหน้าก่อนหน้า
  };

  onMounted(async () => {
    try {
      console.log(title);
      if (title) {
        tasks.value = await getTasksByMission(title)
        setFilterTasks()
      }
      // userTasks.value = await getAllTasksUser();
      // setFilter()
      // console.log("user tasks === ", userTasks.value);
    } catch (error) {
        tasks.value = items.value;
    }
  });
  
</script>
