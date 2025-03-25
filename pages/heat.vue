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
  <v-container>
    <span> เลือกภาค</span>
    <div class="mx-auto mt-5 mb-5 d-flex align-center">
      <v-autocomplete
        density="compact"
        variant="outlined"
        max-height="140"
        v-model="selectedZone"
        :items="zone"
        item-text="name"
        item-value="name"
        max-width="240"
        label="Select Zone"
        @change="zoomToZone"
      ></v-autocomplete>

      <v-icon
        size="large"
        style="margin-top: -20px; margin-left: 10px"
        @click="resetZone"
      >
        mdi-refresh
      </v-icon>
    </div>

    <!-- Date Picker -->
    <!-- <v-col cols="12" class="px-16 mt-0">
            <date-picker v-model:value="DateRange" range :editable="false" :clearable="false"
              :disabled-date="disabledBeforeTodayAndAfterMonth" class="custom-combobox date-picker date-picker-setting"
              style="z-index: 500"></date-picker>
          </v-col> -->
    <!-- <v-row class="ma-0 d-flex align-center">
      <v-col class="d-flex align-end" style="flex-grow: 1; max-width: auto">
        <v-radio-group v-model="selectedLayer" label="รูปแบบการแสดงผลบนแผนที่" row inline>
          <v-radio v-for="(radio, index) in radioOptions" :key="index" :label="radio.label" :value="radio.value"
            append-icon="mdi-map" class="mx-2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col v-if="zone_true == false" cols="12" sm="12" md="4">
        <v-col
          cols="12"
          v-for="(region, index) in leftRegions"
          :key="index"
          class="d-flex justify-start"
        >
          <v-card
            rounded="lg"
            class="mb-4"
            elevation="3"
            height="200"
            width="450"
            max-width="450"
          >
            <div
              :style="{
                background: `linear-gradient(to bottom, 
                  ${region.color}, 
                  ${adjustColor(region.color, 0.8)})`,
                height: '70px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                opacity: 0.9,
              }"
            >
              <v-card-title
                class="d-flex align-center justify-center text-white pt-5 custom-title"
              >
                {{ region.name }} ({{ region.activities || 0 }} กิจกรรม)
              </v-card-title>
            </div>
            <v-card-text>
              <div class="d-flex align-center justify-center">
                <v-col
                  cols="4"
                  v-for="item in region.data"
                  :key="item.month"
                  class="text-h6 d-flex align-center justify-center flex-column"
                >
                  <span class="text-h5 pb-2" >{{
                    item.month
                  }}</span>
                  <span class="text-h4">{{
                    item.activities
                  }}</span>
                </v-col>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>

      <v-col :cols="12" :md="zone_true ? 6 : 4" class="pa-1">
        <div
          id="map"
          ref="mapElement"
          style="
            height: 820px;
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            /* border: 2px solid #000000; */
          "
        >
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
      <!-- ฝั่งขวา -->
      <v-col v-if="zone_true == false" cols="12" sm="12" md="4">
        <v-col
          cols="12"
          v-for="(region, index) in rightRegions"
          :key="index"
          class="d-flex justify-end"
        >
          <v-card
            rounded="lg"
            class="mb-4"
            elevation="3"
            height="200"
            width="450"
            max-width="450"
          >
            <div
              :style="{
                background: `linear-gradient(to bottom, 
                  ${region.color}, 
                  ${adjustColor(region.color, 0.8)})`,
                height: '70px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                opacity: 0.9,
              }"
            >
              <v-card-title
                class="d-flex align-center justify-center text-white pt-5 custom-title"
              >
                {{ region.name }} ({{ region.activities || 0 }} กิจกรรม)
              </v-card-title>
            </div>
            <v-card-text>
              <div class="d-flex align-center justify-center">
                <v-col
                  cols="4"
                  v-for="item in region.data"
                  :key="item.month"
                  class="text-h6 d-flex align-center justify-center flex-column"
                >
                  <span class="text-h5 pb-2" >{{
                    item.month
                  }}</span>
                  <span class="text-h4" >{{
                    item.activities
                  }}</span>
                </v-col>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        md="6"
        v-if="zone_true === true"
        class="d-flex justify-start"
      >
        <v-timeline
          align="start"
          side="end"
          style="max-height: 780px; overflow-y: auto"
        >
          <v-timeline-item
            v-for="(item, index) in timelineData"
            :key="index"
            dot-color="grey"
            size="small"
          >
            <div class="d-flex">
              <strong class="me-4"><span style="font-size: 18px;">{{ item.date }}</span></strong>
              <div>
                <strong
                  ><span style="font-size: 18px;">{{ item.category }}</span>
                  <span :style="{ color: getTeamColor(item.team)}" style="font-size: 18px; margin-left: 5px;"
                    >({{ item.team }})</span
                  ></strong
                >

                <div class="text-caption"><span style="font-size: 16px;">{{ item.content }}</span></div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
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
  definePageMeta({ layout: "false" });
  const selectedLayer = ref("Mark"); // กำหนดค่าเริ่มต้นเป็น Heatmap
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  const DateRange = ref([lastWeek, today]);
  const { getTeamColor } = useColors();

  const zone_true = ref(false);

  const response = await fetch("/map/provinces.geojson"); // โหลดไฟล์จาก public/
  const geojsonProvinces = await response.json();

  const responseZone = await fetch("/map/zone.geojson"); // โหลดไฟล์จาก public/
  const geojsonZone = await responseZone.json();

  // ฟังก์ชันตัดคำว่า "ภาค" ออก
  const cleanZone = (zone) => {
    return zone.replace("ภาค", "").trim(); // ตัดคำว่า "ภาค" ออก
  };

  // ข้อมูลภาคฝั่งซ้าย
  const leftRegions = ref([
    {
      name: "ภาคเหนือ",
      color: "#ACD6E1", // จาก zone[3].color
      activities: 12,
      status: "ปกติ",
      data: [
        { month: "พ.ย.67", activities: 4 },
        { month: "ธ.ค.67", activities: 4 },
        { month: "ม.ค.68", activities: 4 },
      ],
    },
    {
      name: "ภาคกลาง",
      color: "#F6DCDC", // จาก zone[2].color
      activities: 15,
      status: "กำลังดำเนินการ",
      data: [
        { month: "พ.ย.67", activities: 3 },
        { month: "ธ.ค.67", activities: 7 },
        { month: "ม.ค.68", activities: 5 },
      ],
    },

    {
      name: "ภาคตะวันตก",
      color: "#FAD466", // จาก zone[7].color
      activities: 6,
      status: "ปกติ",
      data: [
        { month: "พ.ย.67", activities: 1 },
        { month: "ธ.ค.67", activities: 2 },
        { month: "ม.ค.68", activities: 3 },
      ],
    },
  ]);

  // ข้อมูลภาคฝั่งขวา
  const rightRegions = ref([
    {
      name: "ภาคตะวันออกเฉียงเหนือ",
      color: "#D7DE99", // จาก zone[6].color
      activities: 20,
      status: "กำลังดำเนินการ",
      data: [
        { month: "พ.ย.67", activities: 10 },
        { month: "ธ.ค.67", activities: 5 },
        { month: "ม.ค.68", activities: 5 },
      ],
    },
    {
      name: "ภาคตะวันออก",
      color: "#C5532E", // จาก zone[5].color
      activities: 8,
      status: "เสร็จสิ้น",
      data: [
        { month: "พ.ย.67", activities: 4 },
        { month: "ธ.ค.67", activities: 2 },
        { month: "ม.ค.68", activities: 2 },
      ],
    },

    {
      name: "ภาคใต้",
      color: "#885784", // จาก zone[4].color
      activities: 10,
      status: "เสร็จสิ้น",
      data: [
        { month: "พ.ย.67", activities: 3 },
        { month: "ธ.ค.67", activities: 5 },
        { month: "ม.ค.68", activities: 2 },
      ],
    },
  ]);

  const zone = ref([
    {
      id: 1,
      title: "ทั้งหมด",
      lat: 13.2563,
      lng: 101.3018,
      zoom: 6.2,
      color: "",
    },
    {
      id: 2,
      title: "กลาง",
      lat: 15.522,
      lng: 100.025,
      zoom: 7.8,
      color: "#F6DCDC",
      edge_color: "#F0629E",
    },
    {
      id: 3,
      title: "เหนือ",
      lat: 18.769,
      lng: 99.042,
      zoom: 7.7,
      color: "#ACD6E1",
      edge_color: "#3280C3",
    },
    {
      id: 4,
      title: "ใต้",
      lat: 8.356,
      lng: 99.963,
      zoom: 7.5,
      color: "#ECDBEB",
      edge_color: "#885784",
    },
    {
      id: 5,
      title: "ตะวันออก",
      lat: 13.028,
      lng: 101.758,
      zoom: 8.3,
      color: "#C5532E",
      edge_color: "#C5532E",
    },
    {
      id: 6,
      title: "ตะวันออกเฉียงเหนือ",
      lat: 16.554,
      lng: 103.006,
      zoom: 7.4,
      color: "#D7DE99",
      edge_color: "#899249",
    },
    {
      id: 7,
      title: "ตะวันตก",
      lat: 14.441,
      lng: 97.584,
      zoom: 7.2,
      color: "#FAD466",
      edge_color: "#E2AF2F",
    },
  ]); // ข้อมูลเขต

  const selectedZone = ref("ทั้งหมด"); // สถานะเก็บเขตที่เลือก

  let map, heatmapLayer, markersLayer, markersLayer2; // ตัวแปรแผนที่ และ Layer ทั้งสอง
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

  // ข้อมูล timeline
  const timelineData = ref([
    {
      date: "20พ.ย.67",
      category: "สาธารณสุข",
      team: "C",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "27พ.ย.67",
      category: "สาธารณสุข",
      team: "D",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "30พ.ย.67",
      category: "สาธารณสุข",
      team: "C",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "1ธ.ค.67",
      category: "สาธารณสุข",
      team: "E",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "10ธ.ค.67",
      category: "สาธารณสุข",
      team: "F",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "20ธ.ค.67",
      category: "สาธารณสุข",
      team: "D",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "31ธ.ค.67",
      category: "สาธารณสุข",
      team: "F",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "1ม.ค.68",
      category: "สาธารณสุข",
      team: "E",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
    {
      date: "2ม.ค.68",
      category: "สาธารณสุข",
      team: "F",
      content:
        "ในช่วงที่หลายคนต้องทำงานจากที่บ้าน การดูแลสุขภาพจิตใจเป็นสิ่งสำคัญมาก เพื่อป้องกันความเครียดและภาวะหมดไฟ ลองทำตาม 5 วิธีนี้ดูนะคะ: กำหนดตารางเวลาทำงานและพักผ่อนให้ชัดเจน หาเวลาออกกำลังกายอย่างน้อย 30 นาทีต่อวัน พูดคุยกับเพื่อนหรือครอบครัวเพื่อระบายความรู้สึก หากิจกรรมผ่อนคลายทำ เช่น อ่านหนังสือ ฟังเพลง หรือดูหนัง หากรู้สึกเครียดมาก ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต",
    },
  ]);

  const ZoneData = [
    {
      region: "เหนือ",
      data: [
        {
          lat: 18.8891,
          lng: 98.9841,
          province: "เชียงใหม่",
          activity: "เทศกาลโคมยี่เป็ง",
        },
        {
          lat: 19.9312,
          lng: 99.8329,
          province: "เชียงราย",
          activity: "งานมหกรรมไม้ดอกอาเซียนเชียงราย",
        },
        {
          lat: 18.7891,
          lng: 98.9841,
          province: "เชียงใหม่",
          activity: "งานสืบสานวัฒนธรรมหริภุญชัย",
        },
        {
          lat: 19.2332,
          lng: 99.3887,
          province: "พะเยา",
          activity: "งานประเพณีแปดเป็งนมัสการพระเจ้าตนหลวง",
        },
      ],
    },
    {
      region: "ตะวันออกเฉียงเหนือ",
      data: [
        {
          lat: 16.4333,
          lng: 102.8333,
          province: "ขอนแก่น",
          activity: "งานเทศกาลไหมนานาชาติ",
        },
        {
          lat: 15.1293,
          lng: 104.8528,
          province: "อุบลราชธานี",
          activity: "งานแห่เทียนพรรษา",
        },
        {
          lat: 14.8804,
          lng: 102.0906,
          province: "นครราชสีมา",
          activity: "งานเทศกาลเที่ยวพิมาย",
        },
        {
          lat: 15.9723,
          lng: 104.7431,
          province: "อำนาจเจริญ",
          activity: "งานบุญบั้งไฟ",
        },
        {
          lat: 16.4411,
          lng: 103.2829,
          province: "กาฬสินธุ์",
          activity: "งานมหาทานบารมี",
        },
      ],
    },
    {
      region: "กลาง",
      data: [
        {
          lat: 13.7563,
          lng: 100.5018,
          province: "กรุงเทพมหานคร",
          activity: "งานเทศกาลสงกรานต์",
        },
        {
          lat: 14.3524,
          lng: 100.5653,
          province: "พระนครศรีอยุธยา",
          activity: "งานยอยศยิ่งฟ้าอยุธยามรดกโลก",
        },
        {
          lat: 13.9517,
          lng: 100.5489,
          province: "ปทุมธานี",
          activity: "งานประเพณีรับบัว",
        },

        {
          lat: 13.9165,
          lng: 100.0034,
          province: "นครปฐม",
          activity: "งานองค์พระปฐมเจดีย์",
        },
      ],
    },
    {
      region: "ตะวันออก",
      data: [
        {
          lat: 13.3611,
          lng: 100.9847,
          province: "ชลบุรี",
          activity: "งานวิ่งควาย",
        },
        {
          lat: 12.5582,
          lng: 102.1268,
          province: "จันทบุรี",
          activity: "งานเทศกาลผลไม้",
        },
        {
          lat: 12.2384,
          lng: 102.4938,
          province: "ตราด",
          activity: "งานวันระกำหวาน ผลไม้และของดีเมืองตราด",
        },
        {
          lat: 12.9234,
          lng: 101.7616,
          province: "ระยอง",
          activity: "งานเทศกาลผลไม้และของดีเมืองระยอง",
        },
        {
          lat: 13.7563,
          lng: 101.1018,
          province: "ฉะเชิงเทรา",
          activity: "งานนมัสการหลวงพ่อโสธร",
        },
      ],
    },
    {
      region: "ตะวันตก",
      data: [
        {
          lat: 14.0294,
          lng: 99.5208,
          province: "กาญจนบุรี",
          activity: "งานสัปดาห์สะพานข้ามแม่น้ำแคว",
        },
        {
          lat: 13.1504,
          lng: 99.9578,
          province: "เพชรบุรี",
          activity: "งานพระนครคีรี",
        },
        {
          lat: 12.7108,
          lng: 99.9525,
          province: "ประจวบคีรีขันธ์",
          activity: "งานว่าวและกีฬาทางอากาศ",
        },
        {
          lat: 13.5413,
          lng: 99.9592,
          province: "ราชบุรี",
          activity: "งานเทศกาลกินปลาและของดีเมืองราชบุรี",
        },
        {
          lat: 14.5447,
          lng: 99.5218,
          province: "สุพรรณบุรี",
          activity: "งานอนุสรณ์ดอนเจดีย์",
        },
      ],
    },
    {
      region: "ใต้",
      data: [
        {
          lat: 9.1356,
          lng: 99.3253,
          province: "สุราษฎร์ธานี",
          activity: "งานชักพระ",
        },
        {
          lat: 7.2019,
          lng: 100.6099,
          province: "สงขลา",
          activity: "งานเทศกาลอาหาร 2 ทะเล",
        },
        {
          lat: 8.0532,
          lng: 98.8306,
          province: "ภูเก็ต",
          activity: "เทศกาลกินเจ",
        },
        {
          lat: 8.3752,
          lng: 98.6383,
          province: "กระบี่",
          activity: "งานเทศกาลลานตา ลันตา",
        },
        {
          lat: 7.8931,
          lng: 98.3512,
          province: "ตรัง",
          activity: "งานเทศกาลหมูย่างเมืองตรัง",
        },
      ],
    },
  ];

  const heatData = [
    [13.7563, 100.5018, 0.5], // Bangkok
    [18.7883, 98.9853, 0.6], // Chiang Mai
    [16.4395, 99.4181, 0.7], // Nakhon Ratchasima
    [14.8977, 102.1077, 0.8], // Khon Kaen
    [12.9226, 100.8761, 0.5], // Pattaya
    [13.6207, 99.6618, 0.9], // Hua Hin
    [15.87, 100.9937, 0.7], // Suphanburi
    [13.7814, 100.7981, 0.8], // Samut Prakan
    [14.605, 99.4599, 0.7], // Nakhon Sawan
    [18.7883, 98.9853, 0.5], // Chiang Rai
    [13.7367, 100.5131, 0.6], // Nonthaburi
    [16.2716, 102.8081, 0.8], // Nakhon Si Thammarat
    [13.73, 100.5215, 0.6], // Ayutthaya
    [13.5841, 100.6401, 0.5], // Phetchaburi
    [13.7985, 100.2555, 0.9], // Pathum Thani
    [16.7471, 100.7395, 0.7], // Tak
    [12.9181, 101.2701, 0.6], // Rayong
    [18.2324, 99.7727, 0.8], // Lampang
    [14.8983, 103.105, 0.5], // Nakhon Phanom
    [13.6984, 100.3859, 0.7], // Saraburi
    [17.0926, 100.7785, 0.6], // Phetchabun
    [13.5659, 101.6765, 0.4], // Rayong
    [7.8517, 99.9254, 0.7], // Trang
    [13.6107, 100.8719, 0.8], // Sing Buri
    [16.4005, 102.8187, 0.9], // Kalasin
    [15.9448, 103.2114, 0.5], // Yasothon
    [14.2457, 100.0087, 0.4], // Loei
    [13.9631, 100.6242, 0.8], // Chaiyaphum
    [15.4052, 103.1339, 0.7], // Amnat Charoen
    [15.8759, 101.0097, 0.6], // Nakhon Nayok
    [15.8534, 100.6901, 0.5], // Kanchanaburi
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

  // ฟังก์ชันสำหรับเลือกสีของ dot ตามหมวดหมู่
  function getDotColor(category) {
    if (category === "สาธารณสุข") {
      return "orange";
    }
    return "teal-lighten-3";
  }

  // ฟังก์ชันสำหรับปรับความเข้มของสี
  const adjustColor = (color, opacity) => {
    // ถ้าสีเป็นรูปแบบ Hex
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // ถ้าสีเป็นรูปแบบอื่นๆ ให้ใช้ความโปร่งใสเป็นตัวไล่ระดับ
    return `${color}${Math.round(opacity * 100)}`;
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

  const findRegionData = (selectedZone) => {
    return ZoneData.find((item) => item.region === cleanZone(selectedZone));
  };

  // ฟังก์ชันที่จะตั้งค่า selectedZone เป็น "ทั้งหมด" เมื่อคลิกปุ่ม refresh
  const resetZone = () => {
    selectedZone.value = "ทั้งหมด"; // เปลี่ยนค่า selectedZone เป็น "ทั้งหมด"
  };
  // ฟังก์ชันเพื่อหาสีจากชื่อภาค
  function getRegionColor(regionName) {
    // console.log("regionColor", regionName);
    const cleanedZone = cleanZone(regionName); // ตัดคำว่า "ภาค" ออก
    const matchingRegion = zone.value.find(
      (zone) => "ภาค" + zone.title === "ภาค" + cleanedZone
    );
    return matchingRegion ? matchingRegion.color : "#FFFFFF"; // หากไม่พบให้ใช้สีเริ่มต้น
  }

  const getRegionCenter = (regionName) => {
    const region = zone.value.find((item) => item.title === regionName);
    if (region) {
      return [region.lat, region.lng, region.zoom, region.color];
    }
    return null; // หรือค่าเริ่มต้นอื่น ๆ หากไม่พบภาค
  };

  let currentLayer = null; // ตัวแปรเก็บ layer ที่เราเพิ่มในแผนที่
  watch(selectedZone, async () => {
    if (selectedZone.value) {
      // ลบ marker เก่าทั้งหมดออกจากแผนที่
      if (window.markers && window.markers.length > 0) {
        window.markers.forEach((marker) => {
          map.removeLayer(marker);
        });
        window.markers = []; // ล้าง array ของ marker เก่า
      }
      console.log("selectedZone.value", selectedZone.value);
      const zoneData = zone.value.find(
        (z) => z.title === cleanZone(selectedZone.value)
      );
      if (zoneData) {
        map.setView([zoneData.lat, zoneData.lng], zoneData.zoom); // ซูมไปที่ตำแหน่งของเขตที่เลือก
      }

      console.log("zoneData", zoneData);
      if (zoneData.title != "ทั้งหมด") {
        zone_true.value = true;
        // กรองข้อมูลให้ตรงกับ selectedZone.title
        const filteredData = {
          ...geojsonProvinces,
          features: geojsonProvinces.features.filter(
            (feature) => feature.properties.reg_royin === "ภาค" + zoneData.title
          ),
        };

        // หากมี layer เก่า ให้ลบก่อนที่จะเพิ่มใหม่
        if (currentLayer) {
          map.removeLayer(currentLayer);
        }
        // // เพิ่ม GeoJSON ใหม่
        // currentLayer = L.geoJSON(filteredData, {
        //   style: {
        //     color: '#ffffff', // สีเส้นขอบ
        //     fillColor: zoneData.color || "#ffffff", // สีเติม
        //     fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
        //   },
        // }).addTo(map);
        // เพิ่ม GeoJSON ใหม่
        currentLayer = L.geoJSON(filteredData, {
          style: {
            color: "#ffffff", // สีเส้นขอบ
            fillColor: zoneData.color || "#ffffff", // สีเติม
            fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
          },
          onEachFeature: function (feature, layer) {
            // เพิ่มชื่อจังหวัด (pro_th) ใน Tooltip
            if (feature.properties && feature.properties.pro_th) {
              // ผูก tooltip กับ layer
              const offset = feature.properties.offset
                ? feature.properties.offset
                : [0, 0];
              console.log("offset zone", offset);
              layer.bindTooltip(feature.properties.pro_th, {
                permanent: true, // แสดงข้อความตลอดเวลา
                direction: "center", // กำหนดตำแหน่งของ tooltip
                className: "custom-tooltip", // ใช้ className สำหรับการปรับแต่งเพิ่มเติม
                offset: offset,
              });
            }

            // // หรือเพิ่มชื่อจังหวัด (pro_th) ใน Popup (แสดงเมื่อคลิกที่ feature)
            // layer.bindPopup("<strong>" + feature.properties.pro_th + "</strong><br>" +
            //                 "พื้นที่: " + feature.properties.area_sqkm + " ตร.กม." + "<br>" +
            //                 "รัศมี: " + feature.properties.perimeter + " กม.");
          },
        }).addTo(map);

        const selectedRegion = findRegionData(selectedZone.value);
        console.log("selectedRegion", selectedRegion);
        // ลบ marker เก่าทั้งหมดออกจากแผนที่
        if (window.markers && window.markers.length > 0) {
          window.markers.forEach((marker) => {
            map.removeLayer(marker);
          });
          window.markers = []; // ล้าง array ของ marker เก่า
        }

        // สร้าง marker ใหม่และเพิ่มลงในแผนที่
        if (selectedRegion) {
          window.markers = []; // สร้าง array ใหม่สำหรับเก็บ markers
          selectedRegion.data.forEach((item) => {
            const markerIcon = L.divIcon({
              className: "custom-icon",
              html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="display: flex; align-items: center; width: 40px; height: 40px; background-color: #FF6A00; border-radius: 50px; text-align: center; line-height: 40px; position: relative;">
            <img src="https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg" alt="icon" style="border-radius: 50%; width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          </div>
          <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 20px solid #FF6A00; margin-top: -7px;"></div>
        </div>
      `,
              iconSize: [40, 50],
              iconAnchor: [20, 50],
              popupAnchor: [0, -30],
            });

            const marker = L.marker([item.lat, item.lng], { icon: markerIcon })
              .bindPopup(
                `Location: ${item.lat}, ${item.lng} <br> Province: ${item.province} <br> Activity: ${item.activity}`
              )
              .addTo(map);

            window.markers.push(marker); // เก็บ marker ไว้ใน array
          });
        }
      } else {
        console.log(zoneData.title);
        zone_true.value = false;
        if (currentLayer) {
          map.removeLayer(currentLayer);
        }
        currentLayer = L.geoJSON(geojsonZone, {
          // style: {
          //   color: "#ffffff", // สีเส้นขอบ
          //   fillColor: fillColor, // สีพื้นหลังที่จับคู่กับชื่อภาค
          //   fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
          // },
          style: function (feature) {
            // กำหนดสีของพื้นที่ตามชื่อภาค
            const regionName = feature.properties.reg_royin;
            const fillColor = getRegionColor(regionName);

            return {
              color: "#ffffff", // สีเส้นขอบ
              fillColor: fillColor, // สีพื้นหลังที่จับคู่กับชื่อภาค
              fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
            };
          },
          onEachFeature: function (feature, layer) {
            // เพิ่มชื่อจังหวัด (pro_th) ใน Tooltip
            if (feature.properties && feature.properties.reg_royin) {
              // ผูก tooltip กับ layer
              const offset = feature.properties.offset
                ? feature.properties.offset
                : [0, 0];

              const regRoyin = "ภาค" + feature.properties.reg_royin;

              // ค้นหาข้อมูลใน leftRegions และ rightRegions
              const regionData = [
                ...leftRegions.value,
                ...rightRegions.value,
              ].find((region) => region.name === regRoyin);
              const activityTotal = regionData.activities; // ค่า activities
              console.log("activityTotal", activityTotal);

              layer.bindTooltip(
                `
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <strong>${feature.properties.reg_royin}</strong><br> 
                    <div style="display: flex; justify-content: center; align-items: center; margin-top: -25px;">
                 <div style="border-radius: 50%; width: 35px; height: 35px;color: #282828; background: radial-gradient(circle, #FFD700, #FAFAD2); display: flex; align-items: center; justify-content: center; text-align: center;">
                       ${activityTotal}
                      </div>
                    </div>
                  </div>
                `,
                {
                  permanent: true, // แสดงข้อความตลอดเวลา
                  direction: "center", // กำหนดตำแหน่งของ tooltip
                  className: "custom-all-tooltip", // ใช้ className สำหรับการปรับแต่งเพิ่มเติม
                  offset: offset,
                }
              );
            }

            // เพิ่ม event listener สำหรับการคลิก
            layer.on("click", function (e) {
              // ดึง bounds ของ feature
              const zone_select = "ภาค" + feature.properties.reg_royin;
              console.log(zone_select);
              const Zoom = getRegionCenter(feature.properties.reg_royin);
              console.log(Zoom);
              zone_true.value = true;
              selectedZone.value = zone_select;

              if (currentLayer) {
                map.removeLayer(currentLayer);
              }

              map.setView([Zoom[0], Zoom[1]], Zoom[2]); // ซูมไปที่ตำแหน่งของเขตที่เลือก

              // const center = getRegionCenter(feature.properties.reg_royin);
              // map.setView([center[0], center[1]], center[2]);

              // กรองข้อมูลให้ตรงกับ selectedZone.title
              const filteredData = {
                ...geojsonProvinces,
                features: geojsonProvinces.features.filter(
                  (feature) => feature.properties.reg_royin === zone_select
                ),
              };

              console.log(filteredData);

              currentLayer = L.geoJSON(filteredData, {
                style: {
                  color: "#ffffff", // สีเส้นขอบ
                  fillColor: Zoom[3] || "#ffffff", // สีเติม
                  fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
                },
                onEachFeature: function (feature, layer) {
                  const offset = feature.properties.offset
                    ? feature.properties.offset
                    : [0, 0];

                  // เพิ่มชื่อจังหวัด (pro_th) ใน Tooltip
                  if (feature.properties && feature.properties.pro_th) {
                    // ผูก tooltip กับ layer
                    layer.bindTooltip(feature.properties.pro_th, {
                      permanent: true, // แสดงข้อความตลอดเวลา
                      direction: "center", // กำหนดตำแหน่งของ tooltip
                      className: "custom-tooltip", // ใช้ className สำหรับการปรับแต่งเพิ่มเติม
                      offset: offset,
                    });
                  }
                },
              }).addTo(map);
            });

            // // หรือเพิ่มชื่อจังหวัด (pro_th) ใน Popup (แสดงเมื่อคลิกที่ feature)
            // layer.bindPopup("<strong>" + feature.properties.pro_th + "</strong><br>" +
            //                 "พื้นที่: " + feature.properties.area_sqkm + " ตร.กม." + "<br>" +
            //                 "รัศมี: " + feature.properties.perimeter + " กม.");
          },
        }).addTo(map);
      }
    }
  });

  onMounted(async () => {
    // สร้างแผนที่และตั้งพิกัดเริ่มต้น
    map = L.map("map", {
      center: [13.2563, 101.3018],
      zoom: 6.2,
      zoomSnap: 0.1, // ✅ กำหนดให้ zoom รองรับค่าทศนิยม
      zoomControl: false, // ปิดปุ่ม component Zoom
      scrollWheelZoom: false, // ปิดการ zoom ด้วยเมาส์
      doubleClickZoom: false, // ปิดการ zoom ด้วยการดับเบิ้ลคลิก
    });

    map.dragging.disable();

    const offset = 3.5; // Offset ที่ต้องการ
    const bounds = [
      [5.61 - offset, 97.343 - offset],
      [20.463 + offset, 105.636 + offset],
    ];
    map.setMinZoom(6);
    map.setMaxZoom(10);
    map.setMaxBounds(bounds);
    // //     เพิ่มแผนที่ฐาน
    // const baseLayer = L.tileLayer(
    //   "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    //   {
    //     maxZoom: 20,
    //     attribution:
    //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     name: "Base Layer",
    //   }
    // ).addTo(map);
    zone_true.value = false;
    if (currentLayer) {
      map.removeLayer(currentLayer);
    }
    currentLayer = L.geoJSON(geojsonZone, {
      // style: {
      //   color: "#ffffff", // สีเส้นขอบ
      //   fillColor: fillColor, // สีพื้นหลังที่จับคู่กับชื่อภาค
      //   fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
      // },
      style: function (feature) {
        // กำหนดสีของพื้นที่ตามชื่อภาค
        const regionName = feature.properties.reg_royin;
        const fillColor = getRegionColor(regionName);

        return {
          color: "#ffffff", // สีเส้นขอบ
          fillColor: fillColor, // สีพื้นหลังที่จับคู่กับชื่อภาค
          fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
        };
      },
      onEachFeature: function (feature, layer) {
        // เพิ่มชื่อจังหวัด (pro_th) ใน Tooltip
        if (feature.properties && feature.properties.reg_royin) {
          // ผูก tooltip กับ layer
          const offset = feature.properties.offset;
          const regRoyin = "ภาค" + feature.properties.reg_royin;

          // ค้นหาข้อมูลใน leftRegions และ rightRegions
          const regionData = [...leftRegions.value, ...rightRegions.value].find(
            (region) => region.name === regRoyin
          );
          const activityTotal = regionData.activities; // ค่า activities
          console.log("activityTotal", activityTotal);

          layer.bindTooltip(
            `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <strong>${feature.properties.reg_royin}</strong><br> 
                <div style="display: flex; justify-content: center; align-items: center; margin-top: -25px;">
                 <div style="border-radius: 50%; width: 35px; height: 35px;color: #282828; background: radial-gradient(circle, #FFD700, #FAFAD2); display: flex; align-items: center; justify-content: center; text-align: center;">
                        ${activityTotal}
                  </div>
                </div>
              </div>
            `,
            {
              permanent: true, // แสดงข้อความตลอดเวลา
              direction: "center", // กำหนดตำแหน่งของ tooltip
              className: "custom-all-tooltip", // ใช้ className สำหรับการปรับแต่งเพิ่มเติม
              offset: offset,
            }
          );
        }

        // เพิ่ม event listener สำหรับการคลิก
        layer.on("click", function (e) {
          // ดึง bounds ของ feature
          const zone_select = "ภาค" + feature.properties.reg_royin;
          console.log(zone_select);
          const Zoom = getRegionCenter(feature.properties.reg_royin);
          console.log(Zoom);
          zone_true.value = true;
          selectedZone.value = zone_select;

          if (currentLayer) {
            map.removeLayer(currentLayer);
          }

          map.setView([Zoom[0], Zoom[1]], Zoom[2]); // ซูมไปที่ตำแหน่งของเขตที่เลือก

          // const center = getRegionCenter(feature.properties.reg_royin);
          // map.setView([center[0], center[1]], center[2]);

          // กรองข้อมูลให้ตรงกับ selectedZone.title
          const filteredData = {
            ...geojsonProvinces,
            features: geojsonProvinces.features.filter(
              (feature) => feature.properties.reg_royin === zone_select
            ),
          };

          console.log(filteredData);

          currentLayer = L.geoJSON(filteredData, {
            style: {
              color: "#ffffff", // สีเส้นขอบ
              fillColor: Zoom[3] || "#ffffff", // สีเติม
              fillOpacity: 0.8, // ความโปร่งแสงของสีเติม (0-1)
            },
            onEachFeature: function (feature, layer) {
              const offset = feature.properties.offset
                ? feature.properties.offset
                : [0, 0];
              // เพิ่มชื่อจังหวัด (pro_th) ใน Tooltip
              if (feature.properties && feature.properties.pro_th) {
                // ผูก tooltip กับ layer
                layer.bindTooltip(feature.properties.pro_th, {
                  permanent: true, // แสดงข้อความตลอดเวลา
                  direction: "center", // กำหนดตำแหน่งของ tooltip
                  className: "custom-tooltip", // ใช้ className สำหรับการปรับแต่งเพิ่มเติม
                  offset: offset,
                });
              }
            },
          }).addTo(map);
        });

        // // หรือเพิ่มชื่อจังหวัด (pro_th) ใน Popup (แสดงเมื่อคลิกที่ feature)
        // layer.bindPopup("<strong>" + feature.properties.pro_th + "</strong><br>" +
        //                 "พื้นที่: " + feature.properties.area_sqkm + " ตร.กม." + "<br>" +
        //                 "รัศมี: " + feature.properties.perimeter + " กม.");
      },
    }).addTo(map);

    document.getElementById("map").style.backgroundColor = "white";
    isLoading.value = false;

    // await fetchtitleSoicial(map);

    // Heatmap Layer
    heatmapLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      minOpacity: 0.5,
    });

    //   // Circle Markers Layer
    //   // สร้างกลุ่มมาร์กเกอร์คลัสเตอร์
    //   const markers = L.markerClusterGroup({
    //     disableClusteringAtZoom: 8,
    //     iconCreateFunction: function (cluster) {
    //       // นับจำนวนมาร์กเกอร์ในคลัสเตอร์
    //       const count = cluster.getChildCount();

    //       // กำหนดสีของวงกลมตามจำนวนมาร์กเกอร์
    //       let color = "rgba(255, 106, 0, 0.8)"; // สีส้ม
    //       let border_color = "rgba(255, 185, 0, 0.6)";
    //       // if (count > 5) {
    //       //   color = 'rgba(255, 0, 0, 0.6)'; // สีแดง
    //       // } else if (count > 3) {
    //       //   color = 'rgba(255, 165, 0, 0.6)'; // สีส้มเข้ม
    //       // }

    //       // สร้างไอคอนคลัสเตอร์ด้วย HTML และ CSS
    //       const html = `
    //   <div style="
    //     background-color: ${color};
    //     border-radius: 80%;
    //     width: 45px;
    //     height: 45px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     color: white;
    //     font-size: 14px;
    //     border: 4px solid ${border_color};
    //   ">
    //     ${count}
    //   </div>
    // `;

    //       // ส่งคืนไอคอนคลัสเตอร์
    //       return L.divIcon({
    //         html: html,
    //         className: "custom-cluster-icon",
    //         iconSize: [40, 40],
    //       });
    //     },
    //   });

    //   markersLayer = L.layerGroup(
    //     heatData.map(([lat, lng]) => {
    //       // ใช้ L.divIcon เพื่อสร้าง icon ที่ครอบหมุด
    //       const markerIcon = L.divIcon({
    //         className: "custom-icon", // คลาสสำหรับสไตล์ที่เราจะใช้
    //         html: `
    //         <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
    //       <!-- วงกลมใหญ่ที่มีไอคอนและตัวเลข -->
    //       <div style="display: flex; align-items: center; width: 40px; height: 40px; background-color: #FF6A00; border-radius: 50px; text-align: center; line-height: 40px; position: relative;">
    //         <img src="https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg" alt="icon" style="border-radius: 50%; width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">

    //       </div>
    //       <!-- หมุดทรงสามเหลี่ยมด้านล่าง -->
    //       <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 20px solid  #FF6A00; margin-top: -7px;"></div>
    //     </div>
    //     `,
    //         iconSize: [40, 50], // ขนาดรวมของ icon และหมุด
    //         iconAnchor: [20, 50], // จุดอ้างอิงของ icon
    //         popupAnchor: [0, -30], // ตำแหน่งของ popup
    //       });

    //       // สร้าง marker และใช้ไอคอนที่กำหนด
    //       return markers.addLayer(
    //         L.marker([lat, lng], { icon: markerIcon }).bindPopup(
    //           `Location: ${lat}, ${lng}`
    //         )
    //       );
    //     })
    //   );

    //   // Circle Markers Layer
    //   // สร้างกลุ่มมาร์กเกอร์คลัสเตอร์
    //   const markers2 = L.markerClusterGroup({
    //     disableClusteringAtZoom: 8,
    //     iconCreateFunction: function (cluster) {
    //       // นับจำนวนมาร์กเกอร์ในคลัสเตอร์
    //       const count = cluster.getChildCount();
    //       let color = "rgba(0, 0, 255, 0.8)"; // สีฟ้าเข้ม
    //       let border_color = "rgba(0, 0, 205, 0.6)"; // สีน้ำเงิน
    //       // if (count > 5) {
    //       //   color = 'rgba(255, 0, 0, 0.6)'; // สีแดง
    //       // } else if (count > 3) {
    //       //   color = 'rgba(255, 165, 0, 0.6)'; // สีส้มเข้ม
    //       // }

    //       // สร้างไอคอนคลัสเตอร์ด้วย HTML และ CSS
    //       const html = `
    //   <div style="
    //     background-color: ${color};
    //     border-radius: 80%;
    //     width: 45px;
    //     height: 45px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     color: white;
    //     font-size: 14px;
    //     border: 4px solid ${border_color};
    //   ">
    //     ${count}
    //   </div>
    // `;

    //       // ส่งคืนไอคอนคลัสเตอร์
    //       return L.divIcon({
    //         html: html,
    //         className: "custom-cluster-icon",
    //         iconSize: [40, 40],
    //       });
    //     },
    //   });

    //   markersLayer2 = L.layerGroup(
    //     heatData2.map(([lat, lng]) => {
    //       // ใช้ L.divIcon เพื่อสร้าง icon ที่ครอบหมุด
    //       const markerIcon = L.divIcon({
    //         className: "custom-icon", // คลาสสำหรับสไตล์ที่เราจะใช้
    //         html: `
    //         <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
    //       <!-- วงกลมใหญ่ที่มีไอคอนและตัวเลข -->
    //       <div style="display: flex; align-items: center; width: 40px; height: 40px; background-color: #01579b; border-radius: 50px; text-align: center; line-height: 40px; position: relative;">
    //     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHhnpUugNoVsyIpAjMySt9RbQcBypk5JEYg&s" alt="icon" style="border-radius: 50%; width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">

    //       </div>
    //       <!-- หมุดทรงสามเหลี่ยมด้านล่าง -->
    //       <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 20px solid  #01579b; margin-top: -7px;"></div>
    //     </div>
    //     `,
    //         iconSize: [40, 50], // ขนาดรวมของ icon และหมุด
    //         iconAnchor: [20, 50], // จุดอ้างอิงของ icon
    //         popupAnchor: [0, -30], // ตำแหน่งของ popup
    //       });

    //       // สร้าง marker และใช้ไอคอนที่กำหนด
    //       return markers2.addLayer(
    //         L.marker([lat, lng], { icon: markerIcon }).bindPopup(
    //           `Location: ${lat}, ${lng}`
    //         )
    //       );
    //     })
    //   );

    // // สร้างเลเยอร์คอนโทรล
    // var overlayMaps = {
    //   "พิธา ลิ้มเจริญรัตน์": markers,
    //   "อนุทิน ชาญวีรกุล": markers2,
    // };

    // L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

    // // เพิ่ม MarkerClusterGroup ลงในแผนที่
    // map.addLayer(markers);

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
        heatmapLayer.addTo(map);
      } else if (newValue === "Mark") {
        markersLayer.addTo(map);
      }
    });

    watch(DateRange, async () => {
      console.log("change Date");
      // isLoading.value = true;
    });
  });
</script>

<style>
  .rounded-card {
  border-radius: 30px;
  /* ขอบมุมวงรี */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  /* สีพื้นหลังของ v-card */
}

/* ปรับแต่ง tooltip */
.custom-tooltip {
  background-color: transparent; /* พื้นหลังโปร่งใส */
  border: none; /* ไม่มีกรอบ */
  font-size: 12px; /* ขนาดฟอนต์ */
  color: #000; /* สีข้อความ */
  padding: 4px 4px; /* ระยะห่างภายใน tooltip */
  font-weight: bold; /* ตัวหนาของข้อความ */
  border-radius: 0px; /* ไม่มีมุมโค้ง */
  box-shadow: none; /* ไม่มีเงา */
}

/* ปรับแต่ง tooltip */
.custom-all-tooltip {
  background-color: transparent; /* พื้นหลังโปร่งใส */
  border: none; /* ไม่มีกรอบ */
  font-size: 14px; /* ขนาดฟอนต์ */
  color: #000; /* สีข้อความ */
  padding: 4px 4px; /* ระยะห่างภายใน tooltip */
  font-weight: bold; /* ตัวหนาของข้อความ */
  border-radius: 0px; /* ไม่มีมุมโค้ง */
  box-shadow: none; /* ไม่มีเงา */
}

.custom-title {
  color: black!important; /* เปลี่ยนสีตัวอักษรเป็นสีเขียว */
  
}

/* สำหรับ Tooltip ของภาคตะวันออก */
.custom-east-tooltip {
  background-color: transparent; /* พื้นหลังโปร่งใส */
  border: none; /* ไม่มีกรอบ */
  font-size: 14px; /* ขนาดฟอนต์ */
  color: #000; /* สีข้อความ */
  padding: 4px 4px; /* ระยะห่างภายใน tooltip */
  font-weight: bold; /* ตัวหนาของข้อความ */
  border-radius: 0px; /* ไม่มีมุมโค้ง */
  box-shadow: none; /* ไม่มีเงา */
  margin-top: -70px; /* ขยับขึ้นด้านบน */
  margin-left: -28px; /* ขยับขึ้นด้านบน */
}
</style>
