<template>
    <v-row>
        <!-- <v-col cols="2">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title style="font-size: 30px">Create Mission</v-card-title>
        </v-col>

        <v-col cols="12" class="d-flex pa-1">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
          >
            <span style="font-size: 16px">Create new</span>
          </v-btn>
          <v-divider
            vertical
            :thickness="2"
            style="margin-top: -55px"
            class="px-1 border-opacity-50"
            color="#707070"
          ></v-divider>
        </v-col>
      </v-row>
    </v-col> -->

        <v-col cols="12">
            <v-row>
                <!-- <v-col
              class="justify-center align-center d-flex pa-0"
              cols="1"
              style="
                border-right: 2px solid #707070;
                height: 800px;
                margin-top: 30px;
              "
            >
            </v-col> -->

                <v-col cols="12" sm="12" md="5" lg="4">
                    <v-container :style="{
                        width: '100%',
                        maxWidth: '270px',
                        height: '270px',
                        maxHeight: '300px',
                        border: '2px dashed #707070',
                        backgroundColor: getMissionColor('M1'),
                        borderRadius: '30px',
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }">
                        <!-- <span style="font-size: 100px; color: white">M1</span> -->
                        <img
                            :src="getMissionImage('M1')"
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
                        <!-- <span style="font-size: 16px">Mission name</span>
            <v-text-field
              density="compact"
              variant="outlined"
              rounded="lg"
              v-model="selectedMission"
              disabled
            ></v-text-field> -->

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

                <v-col>
                    <v-col cols="12" class="justify-end d-flex mt-4">
                        <!-- <div class="px-4">
                            <v-btn rounded="lg" size="large" color="#529B41" :disabled="!valid"
                                @click="submitForm"><v-icon style="margin-right: 5px">mdi-plus</v-icon>
                                <span style="font-size: 18px">เพิ่มข้อมูล</span>
                            </v-btn>
                        </div> -->
                        <div>
                            <v-btn rounded="lg" size="large" color="#000000" :disabled="!valid"
                                @click="submitForm"><span style="font-size: 18px">ประวัติ</span>
                            </v-btn>
                        </div>
                    </v-col>

                    <v-row>
                        <v-col cols="12" class="justify-end d-flex mt-4 px-8">
                            <v-btn color="#F49525" @click="addContent" class="d-flex"
                                style="aspect-ratio: 1; width: 30px" height="80%" size="small">
                                <v-icon style="color: white; font-size: 30px">mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" class="pa-4 ma-0">
                    <v-card v-for="(content, content_index) in contents" :key="'content - ' + content_index"
                        class="mx-auto pa-2 pb-4 mb-4" border rounded="xl" elevation="3" hover>
                        <v-card-item>
                            <v-row>
                                <v-col cols="12">
                                    <span style="font-size: 16px">Action</span>
                                    <v-select density="compact" placeholder="Link URL" :items="action" disabled
                                        v-model="content.action_type" variant="outlined" rounded="lg"
                                        clearable></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <span style="font-size: 16px">Link URL</span>
                                    <v-row v-for="(link, index) in content.url"
                                    :key="'link-url-' + index">
                                        <v-col cols="9" sm="11" >
                                            <!-- <PreviewLinkCard :url="content.url[index]" /> -->
                                            <v-text-field density="compact" 
                                                placeholder="Link URL" rounded="lg"
                                                v-model="content.url[index]" 
                                                variant="outlined" clearable
                                                @blur="fetchPreview(content,index)"
                                                :rules="[rules.required]"
                                            >
                                            </v-text-field>
                                            <!-- Preview Card Below Input -->
                                        </v-col>
                                        <v-col v-if="index === content.url.length -1" cols="3" sm="1" class="ma-0 d-flex justify-center">
                                            <v-btn density="compact" rounded="md" color="#46AFC7"
                                                @click="addLink(content.url)" height="63%" min-width="40" size="small">
                                                <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col v-else cols="auto">
                                            <v-btn color="red" icon size="small" variant="text" @click="removeLink(content.url,index)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-col>  
                                        <PreviewLinkCard v-if="previews[index]" :preview="previews[index]" />
                                    </v-row>
                                </v-col>
                            </v-row>
                            <!-- {{ content }} -->
                        </v-card-item>
                    </v-card>
                </v-col>

                <v-col cols="12" class="justify-end d-flex mt-8">
                    <v-btn rounded="lg" size="x-large" color="#2A3547" :disabled="!valid" @click="submitForm"><span
                            style="font-size: 18px">Create mission</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <!-- test show preview link -->
        <!-- <v-container>
            <v-text-field v-model="url" @input="fetchPreview" label="Paste a link..." variant="outlined" class="mb-4">
            </v-text-field>

            <v-card v-if="preview" max-width="500" border
                class="d-flex pa-3 align-center text-decoration-none card-stat-shadow" :href="preview.url"
                target="_blank">
                <v-card-text class="flex-grow-1 pa-0">
                    <v-col cols="12" sm="8" class="px-0">
                        <a :href="preview.url" target="_blank"
                            class="text-blue-darken-2 text-decoration-none font-weight-medium">
                            {{ preview.title }}
                        </a>
                        <v-card-title class="px-0">{{ preview.title }}</v-card-title>
                        <v-card-subtitle class="px-0">{{ preview.site }}</v-card-subtitle>
                        <v-card-text class="px-0 pb-0">{{ preview.description }}</v-card-text>
                    </v-col>
                    <div class="text-grey-darken-1 text-body-2">
                        {{ preview.metadata }}
                    </div>
                </v-card-text>

                <v-avatar size="150" class="ml-3" border rounded="0">
                    <v-img v-if="preview.image" :src="preview.image" alt="preview image" cover></v-img>
                </v-avatar>
            </v-card>
        </v-container> -->
    </v-row>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import DatePicker from "vue-datepicker-next";
import PreviewLinkCard from "../../cards/PreviewLinkCard.vue";
import "vue-datepicker-next/index.css";
const props = defineProps({
    teams: Object
});
const emit = defineEmits(["taskData"]);
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const priority = ref([
    { title: "ต่ำ", value: "low" },
    { title: "ปานกลาง", value: "medium" },
    { title: "สูง", value: "high" },
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
]);
const taskType = ref([
    {title:"รายงานผลทั่วไป", value:"general"},
    {title:"รายงานประจำสัปดาห์", value:"week"},
    // {title:"ด่วนมาก", value:"very_urgent"},
]);
const selectedTaskType = ref("general");
const selectedPriority = ref("low");
const previews = ref([]); // Array of preview objects
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
//   const Teamrules = {
//   required: (v) => (v.length > 0) || "กรุณาเลือกทีมอย่างน้อย 1 ทีม",
// };
const action = ref([
    "Like",
    "Report",
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
]);

const contents = ref([
    {
        "action_type": "report",
        "url": [""]
    }
]);
// const updateUrl = (index, value) => {
//   contents.value[0].url[index] = value; // แก้ไขโดยตรงเพื่อไม่ให้รีเรนเดอร์
// };
const addContent = () => {
    contents.value.push(
        {
            "action_type": "report",
            "url": [""]
        }
    );
}
const addLink = (dataLinks) => {
    dataLinks.push("");
};
const selectedAction = ref("report");

// const missions = ref([
//   "Mission R",
//   "Mission M1",
//   "Mission M2",
//   "Mission M3",
//   "Mission M4",
//   "Mission M5",
//   "Mission M6",
//   "Mission M7",
//   "Mission M8",
//   // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
// ]);

const selectedMission = ref("M1");

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

const submitForm = () => {
    setTaskData()
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
};

const removeSelection = (item) => {
    const index = selectedTeam.value.indexOf(item);
    if (index !== -1) {
        selectedTeam.value.splice(index, 1); // ลบทีมออกจาก selectedTeam
    }
};
const setTaskData = () => {
    const taskData = {
        "mission": selectedMission.value,
        "description": DescriptionMessage.value,
        "priority": selectedPriority.value,
        "report": selectedTaskType.value,
        "assign_team": selectedTeam.value,
        "start_date": DateRange.value[0].toISOString().split("T")[0],
        "end_date": DateRange.value[1].toISOString().split("T")[0],
        "action_content": contents.value
    };
    console.log("taskData ==== ", taskData);

    emit("taskData", taskData);
};

// const url = ref("");
// const preview = ref(null);

const fetchPreview = async (content, index) => {
    const url = content.url[index];
    if (!url) return;

    try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success") {
            previews.value[index] = {
                title: data.data.title,
                description: data.data.description,
                image: data.data.image?.url || "",
                site: data.data.publisher || "Unknown",
                url,
            };
        }
    } catch (error) {
        console.error("Error fetching preview:", error);
    }
};

// ฟังก์ชันลบลิงก์
const removeLink = (dataLinks, index) => {
    Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "ใช่, ลบเลย!",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
        //   deleteData();
        // removeLink(dataContents,index);
        dataLinks.splice(index, 1);
        previews.value.splice(index, 1);
        Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว", "success");

    }
  });
};
</script>

<style scoped>
.v-divider {
    height: 1000px;
    /* กำหนดความสูงที่ต้องการ */
}

.custom-divider {
    margin-left: 25px;
    /* กำหนดมาร์จินซ้าย */
    max-width: 100%;

}

::v-deep(.mx-input) {
    height: 40px;
    border-radius: 8px;

}
</style>
