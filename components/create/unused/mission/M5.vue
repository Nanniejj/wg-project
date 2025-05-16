<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12" sm="12" md="5" lg="4">
                    <v-container :style="{
                        width: '100%',
                        maxWidth: '270px',
                        height: '270px',
                        maxHeight: '300px',
                        border: '2px dashed #707070',
                        backgroundColor: getMissionColor('M5'),
                        borderRadius: '30px',
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }">
                        <!-- <span style="font-size: 100px; color: white">M5</span> -->
                        <img :src="getMissionImage('M5')" alt="Mission"
                            style="max-width: 270px; max-height: 300px; object-fit: contain;" />
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

                        <!-- <span style="font-size: 16px">Link URL</span>
            <v-row>
              <v-col cols="9" sm="11">
                <v-text-field
                  density="compact"
                  placeholder="Link URL"
                  v-model="newMessage"
                  variant="outlined"
                  rounded="lg"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="1" class="ma-0 d-flex justify-center">
                <v-btn
                  density="compact"
                  rounded="md"
                  color="#46AFC7"
                  @click="addMessage"
                  height="63%"
                  min-width="40"
                  size="small"
                >
                  <v-icon style="color: white; font-size: 20px"
                    >mdi-plus</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row> -->
                        <!-- แสดงข้อความในรูปแบบ Chip -->
                        <v-row class="mt-4">
                            <v-col cols="12">
                                <div>
                                    <v-chip v-for="(message, index) in formData.messages" :key="index" class="ma-1"
                                        close @click:close="removeMessage(index)">
                                        {{ message }}
                                    </v-chip>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>

                <!-- <v-col
                    class="justify-start align-start d-flex"
                    cols="12"
                    style="border-top: 2px dashed #707070; width: 100%; margin-top: 30px"
                  >
                  </v-col> -->
                <v-divider :thickness="2" inset class="border-opacity-100 custom-divider"
                    style="border-style: dashed; color: #707070"></v-divider>

                <v-row>
                    <v-col cols="12" class="justify-end d-flex mt-4 px-8">
                        <v-btn color="#529B41" @click="addMessage" size="large">
                            <v-icon style="margin-right: 5px">mdi-plus</v-icon><span>เพิ่มประเด็น</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- more details -->
                <v-col cols="12" class="pa-8 ma-0">
                    <v-card class="mx-auto" rounded="xl" elevation="3" hover>
                        <v-card-item>
                            <v-col cols="12">
                                <v-card-title> ประเด็นตอบโต้ </v-card-title>
                            </v-col>

                            <v-form v-model="valid">
                                <v-container>
                                    <v-col cols="12">
                                        <span style="font-size: 16px">ประเด็นตอบโต้</span>
                                        <v-select density="compact" placeholder="เลือกประเด็น" 
                                            variant="outlined"
                                            rounded="lg" 
                                            item-title="name"
                                            item-value="name"
                                            :items="topics" 
                                            v-model="selectedIssue"
                                            style="margin-top: 5px"></v-select>
                                    </v-col>

                                    <v-col cols="12">
                                        <span style="font-size: 16px">ประเด็น(ย่อย)</span>
                                        <v-select density="compact" placeholder="เลือกประเด็น" variant="outlined"
                                            rounded="lg" :items="issue" v-model="selectedIssue"
                                            style="margin-top: 5px"></v-select>
                                    </v-col>


                                    <v-col cols="12">
                                        <span style="font-size: 16px">Image</span>
                                        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                            class="custom-dropzone" @vdropzone-success="onUploadSuccess"
                                            v-model:files="selectedFiles" />
                                    </v-col>
                                    <!-- <v-container>
                                        <v-file-input
                                            v-model="files"
                                            label="Image"
                                            accept="image/*"
                                            show-size
                                            prepend-icon="mdi-camera"
                                            variant="outlined"
                                            >
                                            <template v-slot:selection="{ fileNames }">
                                                <v-chip v-for="file in fileNames" :key="file">
                                                {{ file }}
                                                </v-chip>
                                            </template>
                                            </v-file-input>

                                    </v-container> -->
                                    <v-col cols="12">
                                        <span style="font-size: 16px">รายละเอียดเพิ่มเติม</span>
                                        <v-text-field density="compact" v-model="MainDescriptionMessage"
                                            variant="outlined" rounded="lg" clearable></v-text-field>
                                    </v-col>
                                </v-container>
                            </v-form>
                        </v-card-item>
                    </v-card>
                </v-col>

                <!-- create button -->
                <v-col cols="12" class="justify-end d-flex mt-8">
                    <v-btn rounded="lg" size="x-large" color="#2A3547" :disabled="!valid" @click="submitForm"><span
                            style="font-size: 18px">Create mission</span>
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
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);

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
const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
      <p style="font-size: 14px;">Drag files here or click to upload</p>
    </div>
  `
});
const { getTeamColor, getMissionColor, getMissionImage } = useColors();
const formRef = ref(null);
const valid = ref(false);

const formData = ref({
    name: "",
    details: "",
    image: null,
});
const files = ref([]);
const selectedFiles = ref([]);
const DescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const MainDescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const IssueMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const NameMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
const emit = defineEmits(["taskDataM5"]);
const props = defineProps({
    teams: Object,
    // topics: Object,
    selectedMission: String
});
const topics = ref([]);
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

const selectedMission = ref("M5");

const issue = ref([
    "ตอบโด้ข้อมูลบิดเบือนเกี่ยวกันสถาบัน",
    "ตอบโต้กลุ่มเห็นต่าง",
    "อื่นๆ",
]);

const selectedIssue = ref("");
const uploadedFiles = ref([]);
const onUploadSuccess = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedFiles.value.push({ dataUrl: e.target.result });
    };
    reader.readAsDataURL(file);
    console.log(uploadedFiles.value);
    console.log("files ===== ", files.value);

};
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

const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};

const removeSelection = (item) => {
    const index = selectedTeam.value.indexOf(item);
    if (index !== -1) {
        selectedTeam.value.splice(index, 1); // ลบทีมออกจาก selectedTeam
    }
};

const submitForm = () => {
    setTaskData()
    console.log("Form submitted with mission:", selectedMission.value);
    console.log("uploadedFiles", uploadedFiles.value);
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
        "contents":[
            {
                "topic_name": selectedIssue.value,  
                "detail": MainDescriptionMessage.value,
                "url": [ "www.example.com"]
            }
        ],
        contentsPhoto: uploadedFiles.value,
        
    }
    console.log("Task Data:", taskData);
    emit("taskDataM5", taskData);
};
onMounted(async () => { 
    topics.value = await getTopics(props.selectedMission);
});
</script>
<style scoped>
.v-divider {
    height: 2000px;
    /* กำหนดความสูงที่ต้องการ */
}


.custom-dropzone {
    background-color: #E9E9E9;
    /* height: 200px; กำหนดความสูง */
    border: 2px dashed #707070;
    /* กำหนดขอบ */
    border-radius: 10px;
    /* กำหนดมุมโค้ง */
}

.custom-divider {
    margin-left: 10px;
    /* กำหนดมาร์จินซ้าย */
    max-width: 100%;

}

::v-deep(.mx-input) {
    height: 40px;
    border-radius: 8px;

}
</style>
