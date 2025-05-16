<template>
  <v-container>
    <!-- details  -->
    <v-card class="pa-8" rounded="lg" elevation="3">
      <v-row>
        <v-col cols="12" md="6">
          <span class="text-h6">ผลปฏิบัติการ</span>
          <v-text-field
            density="compact"
            label="Autocomplete"
            variant="outlined"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <span class="text-h6">วันที่กำหนด</span>
          <date-picker
            style="margin-top: 5px"
            v-model:value="DateRange"
            range
            :editable="false"
            :clearable="false"
            class="w-100"
            disabled
          ></date-picker>
        </v-col>
      </v-row>

      <span class="text-h6">รายละเอียด</span>
      <v-text-field
        v-model="props.taskData.description"
        density="compact"
        label="รายละเอียด"
        variant="outlined"
        disabled
      ></v-text-field>
    </v-card>

    <!-- content  -->
    <div class="pt-5 pb-3"><span class="text-h5">ผลปฏิบัติการ</span></div>

    <v-divider class="border-opacity-75 dashed-divider"></v-divider>

    <v-row class="pt-10 pb-5">
      <v-col cols="12" md="6" class="justify-start d-flex">
        <span class="text-h6">Content</span>
      </v-col>
      <v-col v-if="status != 'completed'" cols="12" md="6" class="justify-end d-flex">
        <v-btn
          color="#F49525"
          @click="openAddNewContent"
          class="d-flex"
          style="aspect-ratio: 1; width: 30px"
          height="80%"
          size="small"
          :disabled="status == 'completed'"
        >
          <v-icon style="color: white; font-size: 25px">mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-col v-if="addNewContent" cols="12" class="px-0">
      <AddNewContent 
        @saveNewContent="(dataNewContent, hvt_info) => setNewConten(dataNewContent,  hvt_info)"
        @closeAddNewContent="closeAddNewContent"
      />
    </v-col>
    <v-row 
      v-for="(content, index) in props.taskData.response_hvt" 
      :key="index" class="mt-4"
    >
      <v-col cols="12">
        <LinkHvt/>
        <!-- <ContentCard :content="content" :status="status"/> -->
      </v-col>
    </v-row>



    <!-- save button -->
    <v-row v-if="status != 'completed'" class="justify-end pt-16 pb-16">
        <div class="px-3">
        <v-btn
            variant="outlined"
            style="background-color: #faf1cd"
            size="large"
            rounded="lg"
            @click="updateContent('in_progress')"
            class="custom-btn"
        >
            <span class="text-h6">บันทึกร่าง</span>
        </v-btn>
        </div>
        <div class="px-3">
        <v-btn
            variant="outlined"
            size="large"
            rounded="lg"
            @click="updateContent('completed')"
            class="custom-btn"
        >
            <span class="text-h6">บันทึก</span>
        </v-btn>
        </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { useRoute } from "vue-router";
import LinkHvt from "../../widgets/LinkHvt.vue";
import ContentCard from "../../cards/ContentCard.vue";
import AddNewContent from "../../tasks/AddNewContent.vue";
import Swal from "sweetalert2";
const emit = defineEmits(["handleBack"]);
const props = defineProps({
  taskData: Object,
});
const addNewContent = ref(false);
const route = useRoute();
// รับ title จาก query
const title = route.query.title;
const status = route.query.status;
// const props.taskData = route.query.task ? JSON.parse(route.query.task) : {};
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);

// สร้างตัวแปร cards เพื่อเก็บข้อมูลของแต่ละ card
const cardsAct = ref([1]);

// ฟังก์ชันเพิ่ม card
const addCardAct = () => {
    cardsAct.value.push({}); // เพิ่ม card ใหม่ลงไปใน array
};

function openAddNewContent() {
  addNewContent.value = true  
};

function closeAddNewContent() {
  addNewContent.value = false
};
async function setNewConten(newContent, hvt_info) {
  let taskID = props.taskData._id
  const updateNewContents = {
    status: "in_progress",
    response_hvt: [
      {
        hvt_id: newContent.hvt_id,
        url: newContent.url
      }
    ]
  }
  // console.log(props.taskData.response_hvt.length);
  let res = await updateTaskUser(taskID, updateNewContents);
  if (props.taskData.response_hvt.length == 0) {
    props.taskData.response_hvt[0] = {
      hvt_id: hvt_info,
      action_id : res.response_hvt[0].action_id
    }
  } else {
    const currentContent = {
      hvt_id: hvt_info,
      action_id : res.response_hvt.at(-1).action_id
    }
    props.taskData.response_hvt.push(currentContent)
  }
  emit("handleBack");
  console.log("content === ", props.taskData.response_hvt);  
};

function updateContent(status){
    let taskID = props.taskData._id
    const updateContents = {
        status: status,
        response_hvt : props.taskData.response_hvt.map(item => ({
            action_id: item.action_id._id,
            hvt_id: item.hvt_id._id,
            url: item.action_id.url
        }))
    }
    updateTaskUser(taskID, updateContents);
    console.log("task === ", taskID);
    console.log("update contents === ", updateContents);
    // console.log("hvt === ",updateHvt_info);
    
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

        .custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}
</style>
