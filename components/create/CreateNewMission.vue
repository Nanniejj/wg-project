<template>
    <v-row>
        <!-- widgets list -->
        <v-col cols="4" class="py-0" style="border-right: 2px solid #2A3547;">
            <v-card flat>
                <v-card-title>
                    <div class="d-flex ga-2 align-center">
                        <v-icon class="hover-pointer" size="x-large" icon="mdi-chevron-double-left"
                            @click="closeCreateMission"></v-icon>
                        <span class="font-title2">รูปแบบ</span>
                    </div>
                    <v-col>
                        <v-text-field v-model="search" placeholder="SEARCH" prepend-inner-icon="mdi-magnify"
                            hide-details rounded="md" variant="solo-filled" density="compact"></v-text-field>
                    </v-col>
                </v-card-title>
                <v-card-text class="scrollable-body">
                    <v-row no-gutters>
                        <v-col cols="6" v-for="widget in widgets" :key="'widget- ' + widget.id">
                            <v-hover>
                                <template v-slot:default="{ isHovering, props }">
                                    <v-card class="h-100" @click="handleSelectedWidget(widget.id)" flat v-bind="props"
                                        :color="isHovering ? 'primary' : undefined">
                                        <v-card-title class="px-2 pb-0 text-capitalize text-h6">
                                            {{ widget.name }}
                                        </v-card-title>
                                        <v-img :src="`/widget_icons/${widget.id}.png`"></v-img>
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- mission details -->
        <v-col cols="8" class="py-0">
            <v-card flat>
                <v-card-title class="font-title2">
                    สร้างภารกิจ
                </v-card-title>

                <v-card-text class="scrollable-body">
                    <v-row>
                        <!-- image -->
                        <v-col cols="12" sm="12" md="auto" class="pb-0">
                            <v-col cols="12" class="pa-0">
                                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                    class="custom-dropzone" />
                            </v-col>
                            <v-col cols="12" class="text-center py-0">
                                <span style="font-size: 12px">ภาพโปรไฟล์ภารกิจ</span>
                            </v-col>
                        </v-col>

                        <!-- input -->
                        <v-col>
                            <v-row>
                                <!-- code -->
                                <v-col cols="12" sm="6" lg="4">
                                    <span style="font-size: 16px">รหัสภารกิจ</span>
                                    <v-text-field density="compact" variant="outlined" rounded="lg"
                                        v-model="createMission.mission" hide-details></v-text-field>
                                </v-col>

                                <!-- name -->
                                <v-col cols="12" sm="6" lg="8">
                                    <span style="font-size: 16px">ชื่อภารกิจ</span>
                                    <v-text-field density="compact" variant="outlined" rounded="lg"
                                        v-model="createMission.name" hide-details></v-text-field>
                                </v-col>

                                <!-- type -->
                                <v-col cols="12" sm="6" lg="4" class="">
                                    <span style="font-size: 16px">ประเภท</span>
                                    <v-select placeholder="เลือกประเภทภารกิจ" density="compact" variant="outlined"
                                        rounded="lg" :items="missionType" item-title="title" item-value="value"
                                        v-model="createMission.report" hide-details></v-select>
                                </v-col>

                                <!-- date -->
                                <v-col cols="12" sm="6" lg="8" class="">
                                    <span style="font-size: 16px">วันที่กำหนด</span>
                                    <date-picker style="margin-top: 5px" v-model:value="DateRange" range
                                        :editable="false" :clearable="false" class="w-100"></date-picker>
                                </v-col>
                            </v-row>
                        </v-col>
                        <!-- description -->
                        <v-col cols="12">
                            <span style="font-size: 16px">รายละเอียด</span>
                            <v-textarea v-model="createMission.description" placeholder="รายละเอียด" row-height="25"
                                rows="3" variant="outlined" auto-grow hide-details></v-textarea>
                        </v-col>
                        <!-- Assign (หน่วยรับผิดชอบ) -->
                        <v-col cols="12">
                            <span style="font-size: 16px">Assign (หน่วยรับผิดชอบ)</span>
                            <v-combobox :items="teams" item-value="_id" item-title="name" v-model="selectedTeams"
                                density="compact" placeholder="เลือกทีมปฏิบัติการ" multiple variant="outlined"
                                hide-details>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip :color="`${item.raw.color_code}`" :text="`Team ${item.title}`"
                                        :model-value="item.raw._id" size="small" variant="flat" closable
                                        @click:close="removeSelection(createMission.teams, index)"></v-chip>
                                </template>
                            </v-combobox>
                        </v-col>
                        <!-- Assign (Admin mission) -->
                        <v-col cols="12">
                            <span style="font-size: 16px">Assign (Admin mission)</span>
                            <v-combobox :items="adminList" item-value="_id" item-title="username"
                                v-model="selectedAdmins" density="compact" placeholder="เลือกผู้สั่งการ" multiple
                                variant="outlined" hide-details>
                                <template v-slot:selection="data">
                                    <v-chip :key="JSON.stringify(data.item)" v-bind="data.attrs"
                                        :disabled="data.disabled" :model-value="data.selected" size="small"
                                        colorr="white" closable
                                        @click:close="removeSelection(createMission.adminMissions, data.index)">
                                        <template v-slot:prepend>
                                            <v-avatar class="bg-blue-accent-4 text-uppercase" start>
                                                {{ data.item.title.slice(0, 1) }}
                                            </v-avatar>
                                        </template>
                                        {{ data.item.title }}
                                    </v-chip>
                                </template>

                            </v-combobox>
                        </v-col>
                    </v-row>
                    <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>

                    <!-- ตัวอย่างการสร้างรูปแบบ -->
                    <v-row>
                        <v-col cols="12" class="font-title2">
                            <span style="font-size: 16px">สร้างรูปแบบ</span>
                        </v-col>
                        <v-col v-if="selectedWidgets.length === 0" cols="12"
                            class="py-8 border-md border-dashed text-center">
                            <v-card-subtitle>- กดเลือกรูปแบบจากเมนูด้านซ้าย -</v-card-subtitle>
                            <v-icon color="#B4B4B4" size="x-large" icon="mdi-plus-box"></v-icon>
                        </v-col>
                        <v-col v-else cols="12">
                            <!-- {{ selectedWidgets }} -->
                            <WidgetsShowCase :widgetsList="selectedWidgets" @updateWidgetList="updateWidgets" />
                        </v-col>
                    </v-row>
                </v-card-text>

                <!-- save button -->
                <v-card-actions>
                    <v-row class="justify-end pa-5">
                        <v-btn class="text-none text-subtitle-1" rounded color="#2A3547" variant="flat"
                            @click="handleMissionData">
                            บันทึก
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <!-- {{ createMission.widget_details }} -->
    </v-row>
</template>
<script setup>
import vueDropzone from "dropzone-vue3";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import WidgetsShowCase from "./WidgetsShowCase.vue";
import { onMounted } from "vue";
import { getTeams } from "../../composables/useApi";
const emit = defineEmits(["close"]);
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 250,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 36px; color: #29A0AF;"></i>
      <p style="font-size: 14px;">Drag files here or click to upload</p>
    </div>
  `,
});
const widgets = ref([
    { id: 1, name: "link page" },
    { id: 2, name: "fandom detail" },
    { id: 3, name: "link provice" },
    { id: 4, name: "link hvt" },
    { id: 5, name: "activity" },
    { id: 6, name: "leader" },
    { id: 7, name: "add parson button" },
    { id: 8, name: "annual plan" },
    { id: 9, name: "objective plan" },
    { id: 10, name: "import file button" },
    { id: 11, name: "table hvt" },
    { id: 12, name: "add network button" },
    { id: 13, name: "topic detail" },
    { id: 14, name: "topic link with result" }
])
// const widgets = ref([]);
const missionType = ref([
    { title: "รายงานผลทั่วไป", value: "general" },
    { title: "รายงานประจำสัปดาห์", value: "week" },
]);
const selectedMissionType = ref("general");
const teams = ref([]);
const adminList = ref([]);
const selectedWidgets = ref([]);
const selectedTeams = ref([]);
const selectedAdmins = ref([]);
const createMission = ref({
    mission: null,
    name: null,
    description: null,
    report: "general",
    start_date: null,
    end_date: null,
    team_id: [],
    adminmission_id: [],
    widget_details: []
});

function closeCreateMission() {
    emit('close')
};
function handleSelectedWidget(widget_id) {
    let widget = null
    widget = widgets.value.find(item => item.id === widget_id)
    console.log("select === ", widget);

    selectedWidgets.value.push(widget)
    console.log("selectedWidgets === ", selectedWidgets.value);

};
function sortByPriority(data) {
    const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2,
        undefined: 3
    }

    return data.slice().sort((a, b) => {
        const aPriority = priorityOrder[a.priority?.toLowerCase()] ?? priorityOrder.undefined
        const bPriority = priorityOrder[b.priority?.toLowerCase()] ?? priorityOrder.undefined
        return aPriority - bPriority
    })
};
function updateWidgets() {
    selectedWidgets.value = sortByPriority(selectedWidgets.value)
};
function removeSelection(list, index) {
    list.splice(index, 1)
};
function extractIdStrings(array) {
    return array.map(item => item._id);
};
function handleWidgetList() {

}
function handleMissionData() {
    createMission.value.team_id = extractIdStrings(selectedTeams.value)
    createMission.value.adminmission_id = extractIdStrings(selectedAdmins.value)
    createMission.value.start_date = DateRange.value[0].toISOString().split("T")[0],
        createMission.value.end_date = DateRange.value[1].toISOString().split("T")[0],
        // createMission.value.widget_details = [
        //     {"name": "test 1 ","priority": "high","widget_id": 1},
        //     {"name": "test 2 ","priority": "low","widget_id": 1}

        // ]
        // createMission.value.widget_details = selectedWidgets.value.map(({ id, ...rest }) => ({
        //     widget_id: id,
        //     ...rest
        // }));
        saveMission();
    console.log("create === ", createMission.value);
    // closeCreateMission()
};
async function saveMission() {
    const formData = new FormData();

    Object.keys(createMission.value).forEach(key => {
        const value = createMission.value[key];

        // ถ้าเป็น array หรือ object ให้ stringify
        if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
    });

    // ดูค่าใน FormData
    for (let [key, value] of formData.entries()) {
        try {
            // ถ้าเป็น JSON string ให้พยายาม parse กลับเป็น object/array เพื่อแสดงสวย ๆ
            const parsed = JSON.parse(value);
            console.log(key, parsed);
        } catch {
            console.log(key, value);
        }
    }
    if (formData) {
        await createNewMission(formData);
    }
}
onMounted(async () => {
    teams.value = await getTeams();
    // widgets.value = await getWidgets();
    adminList.value = await getUsers('ADMIN');
});
</script>
<style scoped>
.scrollable-body {
    max-height: 70vh;
    /* หรือปรับเป็น 60vh, 70vh */
    overflow-y: auto;
}

@media (max-height: 600px) {
    .scrollable-body {
        max-height: 200px;
    }
}

@media (min-height: 601px) and (max-height: 800px) {
    .scrollable-body {
        max-height: 65vh;
    }
}

@media (min-height: 801px) {
    .scrollable-body {
        max-height: 75vh;
    }
}

.custom-dropzone {
    position: relative;
    border: 2px dashed #ccc;
    height: 170px;
    /* ตั้งค่าความสูง */
    width: 170px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #707070;
    background-color: #E9E9E9;
    border-radius: 20px;
}
</style>