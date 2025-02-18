<template>
  <v-row class="pt-5">
    <v-icon
      @click="handleBack"
      class="hover-pointer"
      size="x-large"
      icon="mdi-chevron-double-left"
    ></v-icon>
    <span class="text-h4 px-4 font-weight-bold">Mission {{ title }}</span>
    <span class="text-h5">{{ getMissionName(title) }}</span>
    <v-divider style="margin-top: 20px" class="border-opacity-75"></v-divider>
  </v-row>

  <div class="pt-10">
    <span class="text-h5 font-weight-bold">
      แผนงานใหม่ ({{ items.length }})</span
    >
    <v-row>
      <v-col
        class="pt-10"
        v-for="item in items"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2"
          elevation="4"
          @click="goToMission(title)"
        >
          <v-row>
            <v-col cols="12" md="2">
              <v-avatar
                :color="getMissionColor(title)"
                rounded="lg"
                style="margin-left: 10px; margin-top: 10px"
                size="x-large"
              ></v-avatar>
            </v-col>
            <v-col cols="12" md="10">
              <v-card-title>{{ title }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pt-5">
            <v-card-text>รายระเอียด:{{ item.description || "-" }}</v-card-text>
          </div>
          <v-row>
            <v-col cols="12" md="7" class="text-start">
              <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
            </v-col>
            <v-col cols="12" md="5" class="text-end">
              <v-card-text :style="{ color: getColorPriority(item.priority) }"
                >ระดับ{{ item.priority }}</v-card-text
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

  <div class="pt-10">
    <span class="text-h5 font-weight-bold">
      กำลังดำเนินการ ({{ items2.length }})</span
    >
    <v-row>
      <v-col
        class="pt-10"
        v-for="item in items2"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2"
          elevation="4"
          @click="goToMission(title)"
        >
          <v-row>
            <v-col cols="12" md="2">
              <v-avatar
                :color="getMissionColor(title)"
                rounded="lg"
                style="margin-left: 10px; margin-top: 10px"
                size="x-large"
              ></v-avatar>
            </v-col>
            <v-col cols="12" md="10">
              <v-card-title>{{ title }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pt-5">
            <v-card-text>รายระเอียด:{{ item.description || "-" }}</v-card-text>
          </div>
          <v-row>
            <v-col cols="12" md="7" class="text-start">
              <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
            </v-col>
            <v-col cols="12" md="5" class="text-end">
              <v-card-text :style="{ color: getColorPriority(item.priority) }"
                >ระดับ{{ item.priority }}</v-card-text
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

  <div class="pt-10">
    <span class="text-h5 font-weight-bold">
      แผนงานที่เสร็จสมบูรณ์ ({{ items3.length }})</span
    >

    <v-row>
      <v-col
        class="pt-10"
        v-for="item in items3"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          class="pa-2"
          elevation="4"
          @click="goToMission(title)"
        >
          <v-row>
            <v-col cols="12" md="2">
              <v-avatar
                :color="getMissionColor(title)"
                rounded="lg"
                style="margin-left: 10px; margin-top: 10px"
                size="x-large"
              ></v-avatar>
            </v-col>
            <v-col cols="12" md="10">
              <v-card-title>{{ title }}</v-card-title>
              <v-card-subtitle>{{ getMissionName(title) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <div class="pt-5">
            <v-card-text>รายระเอียด:{{ item.description || "-" }}</v-card-text>
          </div>
          <v-row>
            <v-col cols="12" md="7" class="text-start">
              <v-card-text>ระยะเวลา:{{ item.date || "-" }}</v-card-text>
            </v-col>
            <v-col cols="12" md="5" class="text-end">
              <v-card-text :style="{ color: getColorPriority(item.priority) }"
                >ระดับ{{ item.priority }}</v-card-text
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

  const route = useRoute();
  const router = useRouter();
  // รับ title จาก query
  const title = route.query.title;

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

  // ฟังก์ชันที่ใช้ในการไปยังหน้า Detail
  const goToMission = (title) => {
    // ใช้ router.push เพื่อเปลี่ยนหน้าไปยัง detail page

    // router.push({ name: 'detail', params: { id: 1 } }) // ส่ง id หรือข้อมูลที่คุณต้องการ
    router.push({ name: "usermission", query: { title } });
  };
  // ฟังก์ชันสำหรับการย้อนกลับไปยังหน้าเดิม
  const handleBack = () => {
    router.back(); // ใช้ router.back() เพื่อกลับไปยังหน้าก่อนหน้า
  };
</script>
