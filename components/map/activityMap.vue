<!-- <template>
  <v-container>
    <v-card class="px-6 py-4 pb-0" style="max-width: 280px;">
   
     <v-radio-group
    v-model="selectedLayer"
    inline
    label="รูปแบบการแสดงผลบนแผนที่"
    row
  >
    <v-card
      v-for="(radio, index) in radioOptions"
      :key="index"
      class="rounded-card"
      :style="{ margin: '0 10px', padding: '10px' }"
    >
      <v-radio :label="radio.label" :value="radio.value"></v-radio>
    </v-card>
  </v-radio-group>
  </v-card>
    
    <div id="map" style="height: 700px"></div>
  </v-container>
</template> -->

<template>
  <div class="font-title font-weight-medium mt-8">Map</div>

  <v-container>
    <v-row class="ma-0 d-flex align-center">
      <!-- Radio Button Group -->
      <v-col class="d-flex align-end" style="flex-grow: 1; max-width: auto">
        <v-radio-group
          v-model="selectedLayer"
          label="รูปแบบการแสดงผลบนแผนที่"
          row
          inline
        >
          <v-radio
            v-for="(radio, index) in radioOptions"
            :key="index"
            :label="radio.label"
            :value="radio.value"
            append-icon="mdi-map"
            class="mx-2"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <!-- ส่วนแผนที่ -->
      <v-col cols="12" md="9" class="map-container pa-0">
        <div
          id="map"
          ref="mapElement"
          style="
            height: 800px;
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
          "
        >
          <!-- Date Picker -->
          <v-row>
            <v-col cols="4" class="px-16 mt-3">
              <date-picker
                v-model:value="DateRange"
                range
                :editable="false"
                :clearable="false"
                :disabled-date="disabledBeforeTodayAndAfterMonth"
                class="custom-combobox date-picker date-picker-setting"
                style="z-index: 500"
              ></date-picker>
            </v-col>
          </v-row>
          <!-- Overlay -->
          <div
            v-if="isLoading"
            style="
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.2); /* สีดำโปร่งแสง */
              z-index: 1000; /* ให้อยู่ด้านล่าง progress circular */
            "
          ></div>

          <!-- Progress Circular -->
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="#757575"
            size="70"
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1500; /* ให้อยู่ด้านบน overlay */
            "
          />
        </div>
      </v-col>
      <v-col cols="12" md="3" class="pa-0">
        <v-card
          class="rounded-xl"
          color="#FBFBFB"
          height="800px"
          style="overflow-y: auto"
        >
          <v-card-title>
            <v-row class="pt-2">
              <v-col cols="12" md="8" class="justify-start d-flex">
                <span class="font-weight-medium text-h6">
                  ข้อมูลกิจกรรม ({{ sortedHeatData.length }})
                </span>
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
                        <v-list-item-title
                          >เรียงตาม{{ filter.name }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-title>

          <div
            class="pa-2"
            v-for="(item, index) in sortedHeatData"
            :key="index"
            cols="12"
          >
            <v-card
              rounded="lg"
              variant="elevated"
              class="ma-1"
              @click="showDetail(item)"
            >
              <v-card-text>
                <div class="d-flex align-start flex-column">
                  <span>{{ item.name }}</span>
                  <div class="mt-10">
                    <v-chip :color="getTeamColor(item.team)" size="small">
                      <span class="font-weight-medium"
                        >หน่วย {{ item.team }}</span
                      >
                    </v-chip>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <!-- <v-dialog v-model="openDetail" width="auto">
            <v-card rounded="xl" max-width="1000" class="pa-2">
              <v-card-title class="d-flex align-center">
                <span class="font-weight-medium text-h6">
                  {{ selectedItem.name }}
                </span>

           
                <div class="px-2">
                  <v-chip :color="getTeamColor(selectedItem.team)" size="small">
                    <span class="font-weight-medium">
                      หน่วย {{ selectedItem.team }}
                    </span>
                  </v-chip>
                </div>
              </v-card-title>

              <v-card-text>
                Your application will relaunch automatically after the update is
                complete.
              </v-card-text>

              <div class="d-flex align-end justify-start px-4 pb-2">
                <v-icon icon="mdi-office-building-marker" size="small"></v-icon>
                <div class="d-flex align-center px-2 d-flex align-end">
                  <span style="font-size: 14px">{{
                    selectedItem.location
                  }}</span>
                </div>
              </div>
              <div class="d-flex align-end justify-start px-4 pb-2">
                <v-icon icon="mdi-calendar-blank-outline" size="small"></v-icon>
                <div class="d-flex align-center px-2 d-flex align-end">
                  <span style="font-size: 14px">{{ selectedItem.date }}</span>
                </div>
              </div>

      
            </v-card>
          </v-dialog> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref, watch } from "vue";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import "leaflet.heat";
  import "leaflet.markercluster";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  import dayjs from "dayjs";
  const { getTeamColorSoft, getTeamColor } = useColors();
  const selectedLayer = ref("Mark"); // กำหนดค่าเริ่มต้นเป็น Heatmap
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  const DateRange = ref([lastWeek, today]);
  const openDetail = ref(false);
  const selectedItem = ref(null); // สร้าง selectedItem เป็น ref

  let heatmapLayer, markersLayer, markersLayer2; // ตัวแปรแผนที่ และ Layer ทั้งสอง
  const map = ref(null);

  const isLoading = ref(true);
  const SocialsGroups = {};
  const { $apiClient } = useNuxtApp();
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_BASE_URL; // เข้าถึงค่า API_BASE_URL ที่ตั้งใน .env
  console.log(apiUrl); // พิมพ์ค่า URL ที่ได้รับ
  const radioOptions = [
    { label: "Marker", value: "Mark" },
    { label: "Heat map", value: "Heatmap" },
  ];
  const event = [
    { name: "กิจกรรมพระราชา", team: "C" },
    { name: "โครงการสุขภาพชุมชุน", team: "E" },
    { name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา", team: "D" },
    { name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา", team: "B" },
    { name: "กิจกรรมพระราชา", team: "C" },
  ];

  const filters = ref([
    { name: "วันที่ล่าสุด", value: 0 },
    { name: "วันที่เก่าสุด", value: 1 },
    { name: "หน่วย", value: 2 },
  ]);

  // const heatData = [
  //   [13.7563, 100.5018, 0.5], // Bangkok
  //   [18.7883, 98.9853, 0.6], // Chiang Mai
  //   [16.4395, 99.4181, 0.7], // Nakhon Ratchasima
  //   [14.8977, 102.1077, 0.8], // Khon Kaen
  //   [7.8804, 98.3923, 0.4], // Phuket
  //   [12.9226, 100.8761, 0.5], // Pattaya
  //   [13.6207, 99.6618, 0.9], // Hua Hin
  //   [15.87, 100.9937, 0.7], // Suphanburi
  //   [13.7814, 100.7981, 0.8], // Samut Prakan
  //   [14.605, 99.4599, 0.7], // Nakhon Sawan
  //   [18.7883, 98.9853, 0.5], // Chiang Rai
  //   [13.7367, 100.5131, 0.6], // Nonthaburi
  //   [16.2716, 102.8081, 0.8], // Nakhon Si Thammarat
  //   [13.73, 100.5215, 0.6], // Ayutthaya
  //   [14.998, 100.2528, 0.7], // Sukhothai
  //   [13.5841, 100.6401, 0.5], // Phetchaburi
  //   [13.7985, 100.2555, 0.9], // Pathum Thani
  //   [16.7471, 100.7395, 0.7], // Tak
  //   [12.9181, 101.2701, 0.6], // Rayong
  //   [18.2324, 99.7727, 0.8], // Lampang
  //   [14.8983, 103.105, 0.5], // Nakhon Phanom
  //   [13.6984, 100.3859, 0.7], // Saraburi
  //   [17.0926, 100.7785, 0.6], // Phetchabun
  //   [13.5659, 101.6765, 0.4], // Rayong
  //   [7.8517, 99.9254, 0.7], // Trang
  //   [13.6107, 100.8719, 0.8], // Sing Buri
  //   [16.4005, 102.8187, 0.9], // Kalasin
  //   [15.9448, 103.2114, 0.5], // Yasothon
  //   [14.2457, 100.0087, 0.4], // Loei
  //   [13.9631, 100.6242, 0.8], // Chaiyaphum
  //   [15.4052, 103.1339, 0.7], // Amnat Charoen
  //   [15.8759, 101.0097, 0.6], // Nakhon Nayok
  //   [15.8534, 100.6901, 0.5], // Kanchanaburi
  // ];
  const heatData = [
    {
      coords: [13.7563, 100.5018, 0.5],
      name: "กิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Bangkok
    {
      coords: [18.7883, 98.9853, 0.6],
      name: "โครงการสุขภาพชุมชุน",
      team: "D",
      date: "2025-04-12",
      location: "กทม.",
    }, // Chiang Mai
    {
      coords: [16.4395, 99.4181, 0.7],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "E",
      date: "2025-03-12",
      location: "กทม.",
    }, // Nakhon Ratchasima
    {
      coords: [14.8977, 102.1077, 0.8],
      name: "กิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Khon Kaen
    {
      coords: [7.8804, 98.3923, 0.4],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Phuket
    {
      coords: [12.9226, 100.8761, 0.5],
      name: "กิจกรรมพระราชา",
      team: "F",
      date: "2025-03-12",
      location: "กทม.",
    }, // Pattaya
    {
      coords: [13.6207, 99.6618, 0.9],
      name: "กิจกรรมพระราชา",
      team: "E",
      date: "2025-03-12",
      location: "กทม.",
    }, // Hua Hin
    {
      coords: [15.87, 100.9937, 0.7],
      name: "กิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Suphanburi
    {
      coords: [13.7814, 100.7981, 0.8],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "F",
      date: "2025-03-12",
      location: "กทม.",
    }, // Samut Prakan
    {
      coords: [14.605, 99.4599, 0.7],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "E",
      date: "2025-03-12",
      location: "กทม.",
    }, // Nakhon Sawan
    {
      coords: [18.7883, 98.9853, 0.5],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Chiang Rai
    { coords: [13.7367, 100.5131, 0.6], name: "กิจกรรมพระราชา", team: "E" }, // Nonthaburi
    { coords: [16.2716, 102.8081, 0.8], name: "กิจกรรมพระราชา", team: "D" }, // Nakhon Si Thammarat
    { coords: [13.73, 100.5215, 0.6], name: "กิจกรรมพระราชา", team: "E" }, // Ayutthaya
    { coords: [14.998, 100.2528, 0.7], name: "กิจกรรมพระราชา", team: "E" }, // Sukhothai
    {
      coords: [13.5841, 100.6401, 0.5],
      name: "โครงการสุขภาพชุมชุน",
      team: "D",
      date: "2025-03-12",
      location: "กทม.",
    }, // Phetchaburi
    {
      coords: [13.7985, 100.2555, 0.9],
      name: "โครงการสุขภาพชุมชุน",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Pathum Thani
    { coords: [16.7471, 100.7395, 0.7], name: "กิจกรรมพระราชา", team: "F" }, // Tak
    {
      coords: [12.9181, 101.2701, 0.6],
      name: "โครงการสุขภาพชุมชุน",
      team: "D",
      date: "2025-04-12",
      location: "กทม.",
    }, // Rayong
    {
      coords: [18.2324, 99.7727, 0.8],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "C",
      date: "2025-03-12",
      location: "กทม.",
    }, // Lampang
    {
      coords: [14.8983, 103.105, 0.5],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "E",
      date: "2025-03-12",
      location: "กทม.",
    }, // Nakhon Phanom
    {
      coords: [13.6984, 100.3859, 0.7],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "F",
      date: "2025-03-12",
      location: "กทม.",
    }, // Saraburi
    { coords: [17.0926, 100.7785, 0.6], name: "กิจกรรมพระราชา", team: "C" }, // Phetchabun
    { coords: [13.5659, 101.6765, 0.4], name: "กิจกรรมพระราชา", team: "E" }, // Rayong
    { coords: [7.8517, 99.9254, 0.7], name: "กิจกรรมพระราชา", team: "F" }, // Trang
    { coords: [13.6107, 100.8719, 0.8], name: "กิจกรรมพระราชา", team: "C" }, // Sing Buri
    { coords: [16.4005, 102.8187, 0.9], name: "กิจกรรมพระราชา", team: "E" }, // Kalasin
    { coords: [15.9448, 103.2114, 0.5], name: "กิจกรรมพระราชา", team: "D" }, // Yasothon
    {
      coords: [14.2457, 100.0087, 0.4],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "C",
    }, // Loei
    { coords: [13.9631, 100.6242, 0.8], name: "กิจกรรมพระราชา", team: "E" }, // Chaiyaphum
    {
      coords: [15.4052, 103.1339, 0.7],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "D",
    }, // Amnat Charoen
    { coords: [15.8759, 101.0097, 0.6], name: "กิจกรรมพระราชา", team: "C" }, // Nakhon Nayok
    {
      coords: [15.8534, 100.6901, 0.5],
      name: "โครงการประกวดการนำเสนอผลงานกิจกรรมพระราชา",
      team: "E",
    }, // Kanchanaburi
  ];

  const heatData2 = [
    [13.7563, 101.5018, 0.5], // Bangkok
    [18.7883, 100.9853, 0.6], // Chiang Mai
    [16.4395, 100.4181, 0.7], // Nakhon Ratchasima
    [14.8977, 101.1077, 0.8], // Khon Kaen
    [7.8804, 99.3923, 0.4], // Phuket
    [13.6207, 100.6618, 0.9], // Hua Hin
    [16.4625, 100.6301, 0.6], // Ubon Ratchathani
    [15.87, 101.9937, 0.7], // Suphanburi
    [13.7814, 101.7981, 0.8], // Samut Prakan
    [13.8581, 100.698, 0.4], // Koh Samui
    [15.605, 105.4599, 0.7], // Nakhon Sawan
    [12.7883, 101.9853, 0.5], // Chiang Rai
    [13.7367, 101.5131, 0.6], // Nonthaburi
    [12.5657, 102.4963, 0.4], // Chonburi
    [16.2716, 101.8081, 0.8], // Nakhon Si Thammarat
    [13.73, 101.5215, 0.6], // Ayutthaya
    [14.998, 104.2528, 0.7], // Sukhothai
    [13.7985, 101.2555, 0.9], // Pathum Thani
    [16.7471, 104.7395, 0.7], // Tak
    [12.9181, 102.2701, 0.6], // Rayong
    [18.2324, 97.7727, 0.8], // Lampang
    [14.8983, 104.105, 0.5], // Nakhon Phanom
    [13.6984, 101.3859, 0.7], // Saraburi
    [17.0926, 101.7785, 0.6], // Phetchabun
    [12.8825, 102.0789, 0.9], // Chanthaburi
    [13.5659, 99.6765, 0.4], // Rayong
    [13.8517, 101.9254, 0.7], // Trang
    [13.6107, 101.8719, 0.8], // Sing Buri
    [16.4005, 101.8187, 0.9], // Kalasin
    [15.9448, 104.2114, 0.5], // Yasothon
    [13.9058, 99.5372, 0.6], // Udon Thani
    [14.2457, 101.0087, 0.4], // Loei
    [13.9631, 101.6242, 0.8], // Chaiyaphum
    [15.4052, 101.1339, 0.7], // Amnat Charoen
    [17.0396, 102.7853, 0.9], // Loei
    [15.8759, 103.0097, 0.6], // Nakhon Nayok
    [12.8534, 101.6901, 0.5], // Kanchanaburi
  ];
  const sortedHeatData = ref([...heatData]);
  const handleFilterClick = (filterValue) => {
    console.log("filterValue", filterValue);
    switch (filterValue) {
      case 0: // วันที่ล่าสุด
        sortedHeatData.value = [...heatData].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        break;

      case 1: // วันที่เก่าสุด
        sortedHeatData.value = [...heatData].sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        break;

      case 2: // เรียงตามหน่วย
        sortedHeatData.value = [...heatData].sort((a, b) => {
          return a.team.localeCompare(b.team);
        });
        break;
    }
  };

  // เพิ่มฟังก์ชันรีเซ็ตการ sort
  const resetSort = () => {
    currentFilter.value = null;
    sortedHeatData.value = [...heatData];
  };

  const initFilter = (dataItem, group, map, subdomain) => {
    // console.log("dataItem,group", dataItem, group);
    const color = dataItem.color || generateRandomColors();
    const layerId = `<span style="color: ${color}; font-size: 16px">${
      dataItem.problem_name || dataItem.name || dataItem.title
    }</span>`;

    if (!group[layerId]) {
      group[layerId] = L.layerGroup(); // สร้าง Layer Group ใหม่
      group[layerId].options.name =
        dataItem.problem_name || dataItem.name || dataItem.title; // เพิ่มชื่อให้กับ Layer Group
      group[layerId].options.groupName = subdomain;
    }

    // ตรวจสอบว่า Layer Group มีค่าก่อนเพิ่มลงในแผนที่
    if (group[layerId]) {
      group[layerId].addTo(map); // เพิ่ม Layer Group ลงในแผนที่
      // console.log(`Layer created and added to map for: ${layerId}`);
    } else {
      console.error(`Failed to create Layer Group for: ${layerId}`);
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูล Social
  const fetchtitleSoicial = async (map) => {
    try {
      // ตรวจสอบว่า map และ map.value พร้อมใช้งาน
      if (!map) {
        throw new Error("Map instance is not initialized.");
      }

      const response = await $apiClient.get(`/api/problems/`);
      const data = response.data;

      // ตรวจสอบว่ามีข้อมูลที่ได้รับ
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data received from API.");
      }
      const subdomain = "social";
      // เพิ่มข้อมูลลงใน SocialsGroups และเพิ่มลงในแผนที่
      data.forEach((item) => initFilter(item, SocialsGroups, map, subdomain));

      // แปลง SocialsGroups ให้เป็นรูปแบบที่ใช้กับ L.control.layers ได้
      const socialLayers = Object.fromEntries(
        Object.entries(SocialsGroups).map(([key, layerGroup]) => [
          key,
          layerGroup,
        ])
      );

      // เพิ่ม Layer Control ลงในแผนที่
      const SocialsControl = L.control
        .layers(
          null, // Base layers (สามารถเพิ่ม base layer ได้หากต้องการ)
          socialLayers, // ใช้เฉพาะ SocialsGroups
          {
            collapsed: false, // ตั้งค่าให้กล่องเลเยอร์เปิดอยู่ตลอดเวลา
          }
        )
        .addTo(map);
      Object.values(socialLayers).forEach((layer) => {
        map.removeLayer(layer); // ลบ layer ออกจากแผนที่
      });
      const controlContainerSocial = SocialsControl.getContainer(); // ดึง DOM ของ Control Panel
      const titleSocial = document.createElement("div");
      titleSocial.innerHTML = `<strong style="font-size: 16px; color: black;">ข้อมูล บุคคล:</strong>`;
      titleSocial.style.marginBottom = "5px"; // กำหนดสไตล์เพิ่มเติมถ้าต้องการ

      // แทรกข้อความหัวข้อไปที่ด้านบนของ Control Panel
      controlContainerSocial.insertBefore(
        titleSocial,
        controlContainerSocial.firstChild
      );
      map.removeLayer(socialLayers);
      // console.log("SocialsGroups:", SocialsGroups);
    } catch (error) {
      console.error("Error fetching social data:", error);
    }
  };

  const remap = async (data) => {
    console.log("data", data);
    console.log(layeredData.value);

    if (
      layeredData.value != null &&
      Array.isArray(layeredData.value) &&
      layeredData.value.length > 0
    ) {
      const layerGroup = L.layerGroup();
      layeredData.value.forEach((dataItem) => {
        dataItem.data.forEach((subArray) => {
          const locationIdString = subArray.location.toString();
          // console.log("entry.subdomain_color", entry.subdomain_color);
          let geoJsonData = null;

          // Find GeoJSON data based on location_id
          if (locationIdString.length === 2) {
            geoJsonData = geoJsonProvincesResponse.value.features.find(
              (feature) => feature.properties.pro_code === locationIdString
            );
          } else if (locationIdString.length === 4) {
            geoJsonData = geoJsonDistrictsResponse.value.features.find(
              (feature) => feature.properties.amp_code === locationIdString
            );
            // } else if (locationIdString.length === 6) {
            //   geoJsonData = geoJsonSubDistrictsResponse.value.features.find(
            //     (feature) => feature.properties.tam_code === locationIdString
            //   );
          }

          if (geoJsonData) {
            const color = subArray.subdomain_color; // Placeholder color, can be dynamic
            const topProblems = subArray.TopObject;

            // Create GeoJSON layer
            const geoJsonLayer = createGeoJsonLayer(
              geoJsonData,
              color,
              (feature) => generatePopupContent(feature, topProblems)
            );

            //const layerId = dataItem.subdomain_name; // Use location as unique layer ID

            // const layerId = `<span style="color: ${subArray.subdomain_color};font-size: 16px">${dataItem.subdomain_name}</span>`;
            // if (!layerGroups[layerId]) {
            //   layerGroups[layerId] = L.layerGroup();
            // }

            // if (!layerGroups[all_layer]) {
            //   layerGroups[all_layer] = L.layerGroup();
            // }

            // layerGroups[layerId].addLayer(geoJsonLayer);
            // layerGroups[all_layer].addLayer(geoJsonLayer);
            // data.geocode = geoJsonLayer;
            // data.geocode.addTo(map.value);
            layerGroup.addLayer(geoJsonLayer);
            // map.value.addLayer(data.geocode);
            // console.log("remap StatisticsGroups", StatisticsGroups);
            // console.log(data);
          }
        });
      });
      // เพิ่ม layerGroup ที่สร้างขึ้นลงในแผนที่
      layerGroup.addTo(map);
      // เก็บ layerGroup ไว้ใน data สำหรับใช้งานต่อไป
      data.geocode = layerGroup;
    }

    if (
      StatisticsData.value != null &&
      Array.isArray(StatisticsData.value) &&
      StatisticsData.value.length > 0
    ) {
      const randomColors = generateRandomColors(10);
      let colorIndex = 0;
      StatisticsData.value.forEach((dataItem) => {
        // console.log("dataItem", dataItem);
        const color = randomColors[colorIndex % randomColors.length];
        colorIndex++; // เพิ่ม index เพื่อใช้สีถัดไป
        dataItem.data.forEach((subArray) => {
          const locationIdString = subArray.pro_code.toString();
          // console.log("subArray.subdomain_color", dataItem.problem_name);
          let geoJsonData = null;

          // Find GeoJSON data based on location_id
          if (locationIdString.length === 2) {
            geoJsonData = geoJsonProvincesResponse.value.features.find(
              (feature) => feature.properties.pro_code === locationIdString
            );
          } else if (locationIdString.length === 4) {
            geoJsonData = geoJsonDistrictsResponse.value.features.find(
              (feature) => feature.properties.amp_code === locationIdString
            );
          } else if (locationIdString.length === 6) {
            geoJsonData = geoJsonSubDistrictsResponse.value.features.find(
              (feature) => feature.properties.tam_code === locationIdString
            );
          }

          if (geoJsonData) {
            const level = subArray.level;

            // Create GeoJSON layer
            const geoJsonLayer = createGeoJsonStatistic(
              geoJsonData,
              color,
              level,
              (feature) => generatePopupStatic(feature, level)
            );

            // const layerId = `<span style="color:  ${color};font-size: 16px">${dataItem.problem_name}</span>`;
            // if (!StatisticsGroups[layerId]) {
            //   StatisticsGroups[layerId] = L.layerGroup();
            // }

            // if (!StatisticsGroups[all_layer]) {
            //   StatisticsGroups[all_layer] = L.layerGroup();
            // }
            console.log(data);
            data.geocode = geoJsonLayer;
            console.log("remap StatisticsGroups", StatisticsGroups);

            // StatisticsGroups[data].addLayer(geoJsonLayer);
            // StatisticsGroups[all_layer].addLayer(geoJsonLayer);
          }
        });
      });
    }
    if (props.userId != null) {
      // ตรวจสอบว่าไม่เป็น null หรือ undefined
      const coordinates_pro = geoJsonProvincesResponse.value.features.find(
        (feature) => feature.properties.pro_code === props.userId.toString()
      );

      if (coordinates_pro) {
        const bounds = L.geoJson(coordinates_pro).getBounds();
        const center = bounds.getCenter();

        map.setView(center, 10);
      }
    } else {
      map.setView([13.7563, 100.5018], 6); // กรณีที่ userId เป็น null หรือ undefined
    }
    const isMobile = window.innerWidth <= 1000;

    isLoading.value = false;
  };

  // const fetchtitleSocial = async (map) => {
  //   if (!map) {
  //     console.log("return");
  //     console.error("Map instance is not initialized.");
  //     return;
  //   }

  //   try {
  //     console.log("Get API");
  //     console.log(apiUrl);
  //     // ตัวอย่างการดึงข้อมูลและแสดงบนแผนที่
  //     const response = await $apiClient.get(`/api/problems/`);
  //     const data = response.data;

  //     console.log("Social Data:", data);

  //     // // การแสดงข้อมูลบนแผนที่
  //     // data.forEach((item) => {
  //     //   L.marker([item.lat, item.lng]).addTo(map).bindPopup(item.title);
  //     // });
  //   } catch (error) {
  //     console.error("Error fetching social data:", error);
  //   }
  // };

  onMounted(async () => {
    // สร้างแผนที่และตั้งพิกัดเริ่มต้น
    map.value = L.map("map").setView([13.7563, 100.5018], 6);

    // เพิ่มแผนที่ฐาน
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: "Base Layer", // เพิ่มชื่อใน options
      }
    ).addTo(map.value);

    const offset = 3.5; // Offset ที่ต้องการ
    const bounds = [
      [5.61 - offset, 97.343 - offset],
      [20.463 + offset, 105.636 + offset],
    ];
    map.value.setMinZoom(6);
    map.value.setMaxBounds(bounds);

    // await fetchtitleSoicial(map);

    // ... existing code ...
    heatmapLayer = L.heatLayer(
      // แปลง heatData เป็นรูปแบบที่ heatLayer ต้องการ
      heatData.map((item) => item.coords),
      {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        minOpacity: 0.5,
      }
    );

    // Circle Markers Layer
    // สร้างกลุ่มมาร์กเกอร์คลัสเตอร์
    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 8,
      iconCreateFunction: function (cluster) {
        // นับจำนวนมาร์กเกอร์ในคลัสเตอร์
        const count = cluster.getChildCount();

        // กำหนดสีของวงกลมตามจำนวนมาร์กเกอร์เป็นสีเขียว
        let color = "rgba(85, 107, 47, 0.8)"; // สีเขียวทหารที่โปร่งใส 80%
        let border_color = "rgba(85, 107, 47, 0.6)"; // สีเขียวทหารที่โปร่งใส 60%
        // if (count > 5) {
        //   color = 'rgba(255, 0, 0, 0.6)'; // สีแดง
        // } else if (count > 3) {
        //   color = 'rgba(255, 165, 0, 0.6)'; // สีส้มเข้ม
        // }

        // สร้างไอคอนคลัสเตอร์ด้วย HTML และ CSS
        const html = `
        <div style="
          background-color: ${color};
          border-radius: 80%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          border: 4px solid ${border_color};
        ">
          ${count}
        </div>
      `;

        // ส่งคืนไอคอนคลัสเตอร์
        return L.divIcon({
          html: html,
          className: "custom-cluster-icon",
          iconSize: [40, 40],
        });
      },
    });

    markersLayer = L.layerGroup(
      heatData.map((item) => {
        // เปลี่ยนจาก ([lat, lng]) เป็น (item)
        const [lat, lng] = item.coords; // destructuring coords array
        const color = getTeamColor(item.team);

        // ใช้ L.divIcon เพื่อสร้าง icon ที่ครอบหมุด
        const markerIcon = L.divIcon({
          className: "custom-icon", // คลาสสำหรับสไตล์ที่เราจะใช้
          html: `
              <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <!-- วงกลมใหญ่ที่มีไอคอนและตัวเลข -->
            <div style="display: flex; align-items: center; width: 40px; height: 40px; background-color:${color}; border-radius: 50px; text-align: center; line-height: 40px; position: relative;">
              <img src="https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg" alt="icon" style="border-radius: 50%; width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
         
            </div>
            <!-- หมุดทรงสามเหลี่ยมด้านล่าง -->
            <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 20px solid  ${color}; margin-top: -7px;"></div>
          </div>
          `,
          iconSize: [40, 50], // ขนาดรวมของ icon และหมุด
          iconAnchor: [20, 50], // จุดอ้างอิงของ icon
          popupAnchor: [0, -30], // ตำแหน่งของ popup
        });

        // สร้าง marker และใช้ไอคอนที่กำหนด
        return markers.addLayer(
          L.marker([lat, lng], { icon: markerIcon }).bindPopup(
            `<div style="
        text-align: center;
        padding: 10px 5px;
        min-width: 200px;
      ">
      <div style="
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
      ">
        ${item.name}
      </div>
      <div style="
        color: #666;
        font-size: 14px;
      ">
        <span class="mdi mdi-calendar-blank">  ${item.date}</span>  <br>
    
        <div class="chip">หน่วย ${item.team}</div>
      </div>
      <style>
            .chip {
              display: inline-flex;
              align-items: center;
              padding: 0.5rem 1rem;
              background-color: ${getTeamColor(item.team)};
              opacity: 0.9;
              border-radius: 50px;
              font-size: 1rem;
              font-weight: 600;
              color: #333;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              margin: 0.5rem;
            }
          </style>
        </div>`
          )
        );
      })
    );

    // // Circle Markers Layer
    // // สร้างกลุ่มมาร์กเกอร์คลัสเตอร์
    // const markers2 = L.markerClusterGroup({
    //   disableClusteringAtZoom: 8,
    //   iconCreateFunction: function (cluster) {
    //     // นับจำนวนมาร์กเกอร์ในคลัสเตอร์
    //     const count = cluster.getChildCount();
    //     let color = "rgba(0, 0, 255, 0.8)"; // สีฟ้าเข้ม
    //     let border_color = "rgba(0, 0, 205, 0.6)"; // สีน้ำเงิน
    //     // if (count > 5) {
    //     //   color = 'rgba(255, 0, 0, 0.6)'; // สีแดง
    //     // } else if (count > 3) {
    //     //   color = 'rgba(255, 165, 0, 0.6)'; // สีส้มเข้ม
    //     // }

    //     // สร้างไอคอนคลัสเตอร์ด้วย HTML และ CSS
    //     const html = `
    //     <div style="
    //       background-color: ${color};
    //       border-radius: 80%;
    //       width: 45px;
    //       height: 45px;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       color: white;
    //       font-size: 14px;
    //       border: 4px solid ${border_color};
    //     ">
    //       ${count}
    //     </div>
    //   `;

    //     // ส่งคืนไอคอนคลัสเตอร์
    //     return L.divIcon({
    //       html: html,
    //       className: "custom-cluster-icon",
    //       iconSize: [40, 40],
    //     });
    //   },
    // });

    // markersLayer2 = L.layerGroup(
    //   heatData2.map(([lat, lng]) => {
    //     // ใช้ L.divIcon เพื่อสร้าง icon ที่ครอบหมุด
    //     const markerIcon = L.divIcon({
    //       className: "custom-icon", // คลาสสำหรับสไตล์ที่เราจะใช้
    //       html: `
    //           <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
    //         <!-- วงกลมใหญ่ที่มีไอคอนและตัวเลข -->
    //         <div style="display: flex; align-items: center; width: 40px; height: 40px; background-color: #01579b; border-radius: 50px; text-align: center; line-height: 40px; position: relative;">
    //       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHhnpUugNoVsyIpAjMySt9RbQcBypk5JEYg&s" alt="icon" style="border-radius: 50%; width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">

    //         </div>
    //         <!-- หมุดทรงสามเหลี่ยมด้านล่าง -->
    //         <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 20px solid  #01579b; margin-top: -7px;"></div>
    //       </div>
    //       `,
    //       iconSize: [40, 50], // ขนาดรวมของ icon และหมุด
    //       iconAnchor: [20, 50], // จุดอ้างอิงของ icon
    //       popupAnchor: [0, -30], // ตำแหน่งของ popup
    //     });

    //     // สร้าง marker และใช้ไอคอนที่กำหนด
    //     return markers2.addLayer(
    //       L.marker([lat, lng], { icon: markerIcon }).bindPopup(
    //         `Location: ${lat}, ${lng}`
    //       )
    //     );
    //   })
    // );

    // // สร้างเลเยอร์คอนโทรล
    // var overlayMaps = {
    //   "พิธา ลิ้มเจริญรัตน์": markers,
    //   // "อนุทิน ชาญวีรกุล": markers2,
    // };

    // L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map.value);

    // เพิ่ม MarkerClusterGroup ลงในแผนที่
    map.value.addLayer(markers);

    // แสดง Heatmap เป็นค่าเริ่มต้น
    // heatmapLayer.addTo(map);
    isLoading.value = false;
    // ฟังก์ชันเปลี่ยน Layer
    watch(selectedLayer, (newValue) => {
      // ลบ Layer ที่มีอยู่ก่อน
      map.removeLayer(heatmapLayer);
      map.removeLayer(markersLayer);

      // เพิ่ม Layer ใหม่ตามที่เลือก
      if (newValue === "Heatmap") {
        heatmapLayer.addTo(map.value);
      } else if (newValue === "Mark") {
        markersLayer.addTo(map.value);
      }
    });
  });

  const showDetail = (item) => {
    selectedItem.value = item;
    openDetail.value = true;
    console.log("item", item.coords);
    console.log("map", map.value);
    if (item.coords && map.value) {
      console.log("set view", item.coords);

      //     const [lat, lng] = item.coords;
      // Zoom to location
      map.value.setView([item.coords[0], item.coords[1]], 15, {
        animate: true,
        duration: 1,
      });

      // Zoom to location
      //       const bounds = L.geoJson([item.coords[0], item.coords[1]]).getBounds();
      //       const center = bounds.getCenter();
      // console.log("center",center)
      //       map.value.setView(center, 10);

      // map.value.setView([lat, lng], 15, {
      //   animate: true,
      //   duration: 1
      // });

      // // Optional: แสดง popup ที่ตำแหน่งนั้น
      // L.popup()
      //   .setLatLng([lat, lng])
      //   .setContent(`
      //     <div style="text-align: center; padding: 10px;">
      //       <strong>${item.name}</strong><br>
      //       หน่วย ${item.team}
      //     </div>
      //   `)
      //   .openOn(map.value);
    }
  };

  // เพิ่ม watcher เพื่อดูการเปลี่ยนแปลงของ sortedHeatData
  watch(
    sortedHeatData,
    (newValue) => {
      console.log("sortedHeatData changed:", newValue);
    },
    { deep: true }
  );

  watch(DateRange, async () => {
    console.log("change Date");
    // isLoading.value = true;
  });
</script>

<style scoped>
  .rounded-card {
    border-radius: 30px; /* ขอบมุมวงรี */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f5f5f5; /* สีพื้นหลังของ v-card */
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #e0e0e0;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 0.5rem;
}
</style>
