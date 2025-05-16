<template>
  <v-container class="align-start">
    <v-col>
      <v-icon
        @click="handleBack"
        class="hover-pointer"
        size="x-large"
        icon="mdi-chevron-double-left"
      ></v-icon>
      
      <span class="text-h6 px-4 font-weight-bold">Mission {{ title }}</span>
      <span class="text-h6">{{ getMissionName(title) }}</span>
    </v-col>
  
    <!-- แสดง widget แบบแยก mission -->
    <!-- <v-col cols="12">
      <component 
        :is="getMissionComponent(title)" 
        :taskData="taskData"
        @handleBack="handleBack"
      />
    </v-col> -->

    <!-- แสดง widget แบบไม่แยก mission -->
    <v-col cols="12">
      <MissionResults
        :title="title"
        :widgetsList="getMockUpWidgetList(title)"
        :resetWidgetsList="showWidget"
      />
    </v-col>
  </v-container>
</template>

<script setup>
//   import create from "./components/userMission/mission/M1.vue";
import M1 from "./components/usertasks/missionform/M1.vue";
import M2 from "./components/usertasks/missionform/M2.vue";
import M3 from "./components/usertasks/missionform/M3.vue";
import M4 from "./components/usertasks/missionform/M4.vue";
import M5 from "./components/usertasks/missionform/M5.vue";
import M6 from "./components/usertasks/missionform/M6.vue";
import M7 from "./components/usertasks/missionform/M7.vue";
import M8 from "./components/usertasks/missionform/M8.vue";
import R1 from "./components/usertasks/missionform/R1.vue";
import R2 from "./components/usertasks/missionform/R2.vue";
import R3 from "./components/usertasks/missionform/R3.vue";
import R4 from "./components/usertasks/missionform/R4.vue";
import R5 from "./components/usertasks/missionform/R5.vue";
import R6 from "./components/usertasks/missionform/R6.vue";
import R7 from "./components/usertasks/missionform/R7.vue";
import R8 from "./components/usertasks/missionform/R8.vue";
import R9 from "./components/usertasks/missionform/R9.vue";
import R10 from "./components/usertasks/missionform/R10.vue";
import R11 from "./components/usertasks/missionform/R11.vue";
import R12 from "./components/usertasks/missionform/R12.vue";
import Coordinate from "./components/usertasks/missionform/Coordinate.vue";
import MissionResults from "../components/usertasks/MissionResults.vue";
// import ImportFileButton from "../components/widgets/ImportFileButton.vue";
// import create from "./components/create/mission/M3.vue";
import { useRoute, useRouter } from "vue-router";
const { getTeamColor, getMissionColor, getMissionName, getColorPriority } =
  useColors();

const route = useRoute();
const router = useRouter();
// รับ title จาก query
const title = route.query.title;
const taskData = route.query.task ? JSON.parse(route.query.task) : {};
const getMissionComponent = (missionTitle) => {
  switch (missionTitle) {
    case "M1":
      return M1;
    case "M2":
      return M2;
    case "M3":
      return M3;
    case "M4":
      return M4;
    case "M5":
      return M5;
    case "M6":
      return M6;
    case "M7":
      return M7;
    case "M8":
      return M8;
    case "R1":
      return R1;
    case "R2":
      return R2;
    case "R3":
      return R3;
    case "R4":
      return R4;
    case "R5":
      return R5;
    case "R6":
      return R6;
    case "R7":
      return R7;
    case "R8":
      return R8;
    case "R9":
      return R9;
    case "R10":
      return R10;
    case "R11":
      return R11;
    case "R12":
      return R12;
    case "หัวข้อประสาน":
      return Coordinate;
    // เพิ่ม case สำหรับ mission อื่นๆ
    default:
      return null; // หรือแสดง component default
  }
};

const widgets = ref([]);
function getMockUpWidgetList(mission) {
  let widget = null
  switch (mission) {
    case 'R1':
      widget = [
        { id: 1, props: { title: 'ประชาสัมพันธ์ผ่านเพจ'} },
        { id: 1, props: { title: 'Influencer ของหน่วย'} },
        { id: 2, props: null }
      ]
        // widgets.value = [1,1,2]
      return widget
    case 'R2':
      return [{id:3}]
    case 'R3':
      return [{id:3}]
    case 'R4':
      return [{id:8},{id:5, props:{ showTags:true, showActivityType:true}}]
    case 'R5':
      return [{ id: 6 }, {
        id: 5,
        props: {
          showTags:true,
          showCoordinator:true,
          showAcademyPOC:true
      }}]
    case 'R6':
      return [
        { id: 6, props: { academyTypes: "university" } },
        {
          id: 5, props: {
            showTags:true,
            showCoordinator:true,
            showAcademyPOC:true
          }
        }
      ]
    case 'R7':
      return [{id:7, props:{showAttitude:true}}]
    case 'R8':
      return [{
        id: 7,
        props: {
          title:"ข้อมูลสร้างมวลชน",
          buttonColor:"#FEA72F",
          showConnection: true
        }
      }]
    case 'R9':
      return [{ id: 10 }, { id: 5, props:{
          showSupport: {
            status: true,
            type: false,
            connection: false,
            academy: true,
            group: false
          },
          showCoordinator:true,
          showAcademyPOC:true
      } }]
    case 'R10':
      return [
        { id: 10 },
        {
          id: 5,
          props: {
            showSupport: {
              status: true,
              type: true,
              connection: false,
              academy: false,
              group: false
            },
            showCoordinator:true,
            showPOC:true
          }
        },
        {
          id: 1,props: { title: 'มิติผู้มีอิทธิพลทางความคิด (Influencer)'} 
        },
        {
          id: 1,props: { title: 'บทความ (Influencer)'} 
        }
      ]
    case 'R11':
      return [{ id: 10 }, { id: 5, props:{
        showSupport: {
          status: true,
          type: false,
          connection: true,
          academy: false,
          group: false
        },
        showCoordinator:true,
        showPOC:true,
        showLinks:true
      } }]
    case 'R12':
      return [{ id: 10 }, {
        id: 5, props: {
          showSupport: {
            status: true,
        type: false,
        connection: false,
        academy: false,
        group: true
        },
        showCoordinator:true
      } }]
    default:
      break;
  }
}
const showWidget = ref(false);
// const resetResult = ref(false)
function resetResult() {
  showWidget.value = !showWidget.value
}
// ฟังก์ชันสำหรับการย้อนกลับไปยังหน้าเดิม
const handleBack = () => {
  router.back(); // ใช้ router.back() เพื่อกลับไปยังหน้าก่อนหน้า
  resetResult()
};
</script>