<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="12" md="5" lg="4">
          <v-container
            :style="{
              width: '100%',
              maxWidth: '270px',
              height: '270px',
              maxHeight: '300px',
              border: '2px dashed #707070',
              backgroundColor: getMissionColor('M6'),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <!-- <span style="font-size: 100px; color: white">M6</span> -->
            <img
                  :src="getMissionImage('M6')"
                  alt="Mission"
                  style="max-width: 270px; max-height: 300px; object-fit: contain;"
              />
          </v-container>
          <v-col cols="12" class="d-flex justify-center">
            <span style="font-size: 16px">Logo cover mission</span>
          </v-col>
        </v-col>

        <v-col cols="12" sm="12" md="7" lg="8">
          <v-form ref="formRef" v-model="valid">
            <v-row>
                <v-col cols="12" sm="6" lg="3" class="py-0">
                    <span style="font-size: 16px">ระดับความสำคัญ</span>
                    <v-select density="compact" variant="outlined" rounded="lg" :items="priority"
                        item-title="title" item-value="value" v-model="selectedPriority" :style="{
                            marginTop: '5px',
                        }"></v-select>
                </v-col>
                <v-col cols="12" sm="6" lg="4" class="py-0">
                    <span style="font-size: 16px">ประเภท</span>
                    <v-select density="compact" variant="outlined" rounded="lg" :items="taskType"
                        item-title="title" item-value="value" v-model="selectedTaskType" :style="{
                            marginTop: '5px',
                        }"></v-select>
                </v-col>
                <v-col cols="12" lg="5" class="py-md-0">
                    <span style="font-size: 16px">วันที่กำหนด</span>
                    <date-picker style="margin-top: 5px" v-model:value="DateRange" range :editable="false"
                        :clearable="false" class="w-100"></date-picker>
                </v-col>
                <!-- ช่องกรอกรายละเอียด -->
                <v-col cols="12">
                    <span style="font-size: 16px">รายละเอียด</span>
                    <v-text-field placeholder="รายละเอียด" v-model="DescriptionMessage" variant="outlined"
                        rounded="lg" clearable :rules="[rules.required]"></v-text-field>
                </v-col>

                <!-- เลือกทีมปฏิบัติการ -->
                <v-col col="12">
                    <span style="font-size: 16px">เลือกทีมปฏิบัติการ</span>
                    <v-combobox :items="props.teams.map(team => team.name)" v-model="selectedTeam"
                        density="compact" placeholder="เลือกทีมปฏิบัติการ" multiple variant="outlined"
                        rounded="lg" :rules="[rules.required]">
                        <template v-slot:selection="data">
                            <v-chip closable :key="JSON.stringify(data.item)" v-bind="data.attrs"
                                :disabled="data.disabled" :model-value="data.selected" size="small"
                                :color="getTeamColor(data.item.title.replace('Team ', ''))"
                                @click:close="removeSelection(data.item.title)">
                                <span style="color: black"> Team {{ data.item.title }} </span>
                            </v-chip>
                        </template>
                    </v-combobox>

                    <!-- แสดงข้อความในรูปแบบ Chip -->
                    <v-row class="mt-4">
                        <v-col cols="12">
                            <div>
                                <v-chip v-for="(message, index) in formData.messages" :key="index"
                                    class="ma-1" close @click:close="removeMessage(index)">
                                    {{ message }}
                                </v-chip>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- แสดงข้อความในรูปแบบ Chip -->
            <v-row class="mt-4">
              <v-col cols="12">
                <div>
                  <v-chip
                    v-for="(message, index) in formData.messages"
                    :key="index"
                    class="ma-1"
                    close
                    @click:close="removeMessage(index)"
                  >
                    {{ message }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
     
        <v-divider
          :thickness="2"
          inset
          class="border-opacity-100 custom-divider"
          style="border-style: dashed; color: #707070"
        ></v-divider>

        <!-- import botton -->
         <div class="d-flex justify-space-between align-center w-100">
            <v-col>
                <v-card-title class="text-h5" style="font-weight: bold">
                    ประเด็นตอบโต้
                </v-card-title>
            </v-col>
            <v-col cols="auto" class="pa-4">
                <v-btn
                    color="#AEE0E8"
                    outlined
                    rounded="lg"
                    size="large"
                    @click="triggerFileInput"
                >
                    <v-icon class="pa-4">mdi-tray-arrow-down</v-icon>
                    Import CSV or XLSX
                </v-btn>

                <input
                    ref="fileInput"
                    type="file"
                    accept=".csv, .xlsx"
                    @change="handleFileUpload"
                    style="display: none"
                />
            </v-col>
         </div>
        <!-- ตัวอย่างไฟล์ CSV ที่รองรับ -->
        <!-- <div v-if="importTopics.length">
            <h3>CSV Data</h3>
            <pre>{{ importTopics }}</pre>
        </div> -->

        <v-col cols="12" class="py-0">
          <v-card class="mx-auto" rounded="xl" elevation="0" hover>
            <v-card-item class="pa-0">
              <!-- <v-col cols="12">
                <v-card-title> ประเด็นตอบโต้ </v-card-title>
              </v-col> -->

              <v-form v-model="valid">
                <v-container class="pa-0">
                  <v-col cols="12" class="py-0">
                    <span style="font-size: 16px">ประเด็น</span>
                    <v-select
                        density="compact"
                        placeholder="เลือกประเด็น"
                        variant="outlined"
                        rounded="lg"
                        :items="topics"
                        item-title="name"
                        item-value="name"
                        v-model="selectedIssue"
                        style="margin-top: 5px"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <span class="text-h6">หัวเรื่องประเด็น</span>
                    <v-text-field placeholder="รายละเอียดหัวเรื่องประเด็น" v-model="MainDescriptionMessage" variant="outlined"
                        rounded="lg" clearable></v-text-field>
                  </v-col>
                  <!-- <span class="px-3" style="font-size: 16px"
                    >Tagged topic (2)</span
                  >
                  <v-col cols="12">
                    <div class="d-flex justify-start ga-2">
                      <v-chip
                        closable
                        style="background-color: #aee0e8; color: white"
                        variant="tonal"
                      >
                        <span style="color: black">Tag 1</span>
                      </v-chip>
                      <v-chip
                        closable
                        style="background-color: #c9d85b; color: white"
                        variant="tonal"
                      >
                        <span style="color: black">Tag 2</span>
                      </v-chip>
                    </div>
                  </v-col> -->
                </v-container>
              </v-form>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" class="justify-end d-flex mt-8">
          <v-btn
            rounded="lg"
            size="x-large"
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
            ><span style="font-size: 18px">Create mission</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import vueDropzone from "dropzone-vue3";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
const emit = defineEmits(["taskDataM6"]);
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const props = defineProps({
    teams: Object,
    // topics: Object,
    selectedMission: String
});
const priority = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
]);
const taskType = ref([
    {title:"รายงานผลทั่วไป", value:"general"},
    {title:"รายงานประจำสัปดาห์", value:"week"},
    // {title:"ด่วนมาก", value:"very_urgent"},
  ]);
  const selectedPriority = ref("low");
  const selectedTaskType = ref("general");
const importTopics = ref([]);

  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
  });
  const { getTeamColor, getMissionColor, getMissionImage } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });

const DescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const MainDescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const IssueMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const NameMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field

const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
]);

const selectedTeam = ref(null);

const missions = ref([
"Mission R",
"Mission M1",
"Mission M2",
"Mission M3",
"Mission M4",
"Mission M5",
"Mission M6",
"Mission M7",
"Mission M8",
// เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
]);

const selectedMission = ref("M6");

const issue = ref([
    "ตอบโด้ข้อมูลบิดเบือนเกี่ยวกันสถาบัน",
    "ตอบโต้กลุ่มเห็นต่าง",
    "อื่นๆ",
]);

const selectedIssue = ref(null);
const topics = ref([]);
// const contents = ref([
//     {
//         "topic_name": selectedIssue.value,
//         "detail": MainDescriptionMessage.value,
//         // "url": [""]
//     }
// ]);
// ฟังก์ชันเพิ่มข้อความ
const addMessage = () => {
if (newMessage.value.trim()) {
    formData.value.messages.push(newMessage.value.trim());
    newMessage.value = ""; // ล้างข้อความในช่อง
}
};

// ฟังก์ชันลบข้อความ
const removeMessage = (index) => {
formData.value.messages.splice(index, 1);
};

const removeSelection = (item) => {
    const index = selectedTeam.value.indexOf(item);
    if (index !== -1) {
        selectedTeam.value.splice(index, 1); // ลบทีมออกจาก selectedTeam
    }
};

const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
        // 👉 ประมวลผล CSV
        const reader = new FileReader()
        reader.onload = (e) => {
        const csvText = e.target.result
            const parsed = parseCSV(csvText)
            importTopics.value = parsed // เก็บข้อมูลที่แปลงแล้วใน importTopics
            console.log('Parsed CSV:', parsed)
            checkTopicsImport()
        }
        reader.readAsText(file)

    } else if (fileName.endsWith('.xlsx')) {
        // 👉 ประมวลผล XLSX ด้วย xlsx library (จำเป็นต้องใช้)
        import('xlsx').then(XLSX => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = XLSX.utils.sheet_to_json(worksheet)
                console.log('Parsed XLSX:', json)
                importTopics.value = json // เก็บข้อมูลที่แปลงแล้วใน importTopics
                checkTopicsImport()
            }
            reader.readAsArrayBuffer(file)
        })
    }else {
        alert('รองรับเฉพาะไฟล์ .csv และ .xlsx เท่านั้น')
    }
    // checkTopicsImport()
};

function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim();
    });
        return obj;
    });
};

async function checkTopicsImport() { 
    if (importTopics.value.length > 0) {
        topics.value = importTopics.value
        console.log('Topics', topics.value);
    } else {
        topics.value = await getTopics(props.selectedMission);
    }
};
  
const submitForm = () => {
    setTaskData(); // เรียกใช้ฟังก์ชัน setTaskData() เพื่อส่งข้อมูล
    console.log("Form submitted with mission:", selectedMission.value);
    props.selectedMission = null; // รีเซ็ต selectedMission เป็น null
};
const setTaskData = () => {
    const taskData = {
        "mission": props.selectedMission,
        // "name": "การปฏิบัติทางไซเบอร์",
        "description": DescriptionMessage.value,
        "priority": selectedPriority.value,
        "assign_team": selectedTeam.value,
        "report": selectedTaskType.value,
        "start_date": DateRange.value[0].toISOString().split("T")[0],
        "end_date": DateRange.value[1].toISOString().split("T")[0],
        "contents": [
            {
                "topic_name": selectedIssue.value,
                "detail": MainDescriptionMessage.value,
            }
        ]
    }
    console.log("Task Data:", taskData);
    emit("taskDataM6", taskData);
};
onMounted(async () => { 
    topics.value = await getTopics(props.selectedMission);
});
</script>
<style scoped>
  .v-divider {
        height: 2000px; /* กำหนดความสูงที่ต้องการ */
    }
            
            
    .custom-dropzone {
      background-color: #E9E9E9;
        height: 150px; /* กำหนดความสูง */
        border: 2px dashed #707070; /* กำหนดขอบ */
        border-radius: 10px; /* กำหนดมุมโค้ง */
    }
    
    .custom-divider {
        margin-left: 10px; /* กำหนดมาร์จินซ้าย */
        max-width: 100%;
            
    }

    ::v-deep(.mx-input) {
  height: 40px;
  border-radius: 8px;

}
</style>
