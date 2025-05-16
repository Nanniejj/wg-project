<template>
    <div class="px-md-10">
        <!-- {{ selectedTask.taskDetail }} -->
        <div class="d-flex">
            <v-btn icon variant="text" @click="closeEditTask">
                <v-icon size="20" color="#2A3547">mdi-chevron-double-left</v-icon>
            </v-btn>
            <div class="mt-3 text-topic">{{ selectedTask.mission }} {{ selectedTask.name }}</div>
        </div>

        <!-- content cards เชื่อม api -->
        <v-row v-if="selectedTask.assign_team" class="ga-5">
            <v-col cols="12" v-for="team in selectedTask.assign_team" :key="team">
                <v-card class="card-stat-shadow pa-4" :color="getTeamColorSoft(team)" rounded="lg">
                    <!-- Header: Team Name + Add Button -->
                    <v-row align="center" justify="space-between">
                        <v-col>
                            <div class="d-flex ga-3 text-h6 font-weight-bold" style="color: #2A3547">
                                <span>
                                    Team {{ team }}
                                </span>
                                <v-chip v-if="team.send" color="green" variant="flat">
                                    ส่งแล้ว
                                </v-chip>
                                <v-chip v-else color="red" variant="flat">
                                    ยังไม่ส่ง
                                </v-chip>
                            </div>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn 
                                @click="openAddNewContent(getTeamContents(team))" 
                                color="orange" icon size="small"
                                rounded="xs">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4 dashed-hr"></v-divider>

                    <!-- Contents Section -->
                    <!-- {{ getTeamContents(team) }} -->
                    <v-col v-if="getTeamContents(team)" cols="12" class="pa-0">
                        <h4 class="text-subtitle-1 font-weight-bold">Contents</h4>
                        <v-card v-for="(content, index) in getTeamContents(team)" :key="content" class="pa-4 mb-4"
                            elevation="2">
                            <!-- show  -->
                            <v-col v-if="!content.editable" cols="12" class="pa-0">
                                <div class="d-flex justify-space-between">
                                    <v-col v-if="content.hvt_info" cols="auto" class="pt-0">
                                        <v-card-title class="px-0">
                                            {{ content.hvt_info.first_name }}
                                            {{ content.hvt_info.last_name }}
                                            ({{ content.hvt_info.name }})
                                        </v-card-title>
                                    </v-col>
                                    <v-col v-else cols="auto">
                                        <v-card-title class="px-0">
                                            {{ content.hvt_id }}
                                        </v-card-title>
                                    </v-col>
                                    <v-col cols="auto" class="d-flex pa-0">
                                        <v-btn @click="openEditContent(content)" color="blue" icon size="small"
                                            variant="text">
                                            <v-icon> mdi-pencil-outline </v-icon>
                                            <v-tooltip activator="parent" location="top">edit</v-tooltip>
                                        </v-btn>
                                        <v-btn @click="removeContent(contents, index)" color="red" icon size="small"
                                            variant="text">
                                            <v-icon> mdi-trash-can </v-icon>
                                            <v-tooltip activator="parent" location="top">delete</v-tooltip>
                                        </v-btn>
                                    </v-col>
                                </div>
                                <v-row>
                                    <v-col cols="auto" v-for="(url, index) in content.url" :key="'url-' + index"
                                        class="link-row">
                                        <v-chip color="primary">
                                            {{ url }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <!-- edit -->
                            <v-col v-else cols="12" class="px-0 pt-0">
                                <div v-if="content.editable" class="d-flex justify-space-between">
                                    <v-col cols="auto" class="pt-0 px-0">
                                        <v-card-title class="px-0">
                                            <v-icon> mdi-pencil-outline </v-icon>
                                            Edit Content
                                        </v-card-title>
                                    </v-col>
                                    <div class="d-flex pa-0">
                                        <v-col cols="auto" class="pt-0">
                                            <v-btn @click="updateContent(team,content)" color="blue" icon size="small" variant="text">
                                                บันทึก
                                                <!-- <v-icon>mdi-content-save</v-icon> -->
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto" class="pt-0">
                                            <v-btn @click="closeEditContent(content)" color="red" icon size="small"
                                                variant="text">
                                                ยกเลิก
                                                <!-- <v-icon> mdi-close-thick</v-icon> -->
                                            </v-btn>
                                        </v-col>
                                    </div>
                                </div>
                                <!-- targets -->
                                 <!-- {{ content.hvt_id }} -->
                                <!-- <v-select v-model="content.hvt" :items="targets" label="เป้าหมาย (HVT)"
                                    variant="outlined" density="compact">
                                </v-select> -->
                                <v-select
                                    density="compact"
                                    label="Select mission"
                                    variant="outlined"
                                    rounded="lg"
                                    style="margin-top: 5px"
                                    :items="props.hvtTargets"
                                    item-value="_id"
                                    :item-title="getFullName"
                                    v-model="content.hvt_id"
                                >
                                    <template v-slot:item="{ props, item, index }">
                                    <v-list-item :key="index">
                                        <v-list-item-title v-bind="props" class="cursor-pointer">
                                        {{ item.raw.first_name }} {{ item.raw.last_name }}
                                        </v-list-item-title>
                                    </v-list-item>
                                    </template>
                                </v-select>
                                <!-- Link URL -->
                                <div v-for="(link, index) in content.url" :key="'url-' + index" class="link-row">
                                    <v-row align="center">
                                        <v-col>
                                            <v-text-field v-model="content.url[index]" label="Link URL (ที่ปฏิบัติงาน)"
                                                variant="outlined" density="compact" :rules="[rules.required]"
                                                @blur="fetchPreview(content, index)"></v-text-field>
                                        </v-col>
                                        <v-col v-if="index === content.url.length - 1" cols="auto">
                                            <v-btn color="blue" icon size="small" @click="addLink(content.url)">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col v-else cols="auto">
                                            <v-btn color="red" icon size="small" variant="text"
                                                @click="removeLink(content.url, index)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <PreviewLinkCard v-if="content.previews" :preview="content.previews[index]" />
                                    </v-row>
                                </div>
                            </v-col>

                        </v-card>

                        <!-- add new content -->
                        <AddNewContent 
                            v-if="getTeamContents(team).addContent"
                            @closeAddNewContent="closeAddNewContent(getTeamContents(team))"
                        />
                    </v-col>
                   
                    <v-col v-else cols="12" class="pa-0">
                        <v-card variant="text" class="pa-4">
                            <v-card-text class="text-center">
                                - ไม่พบข้อมูล content -
                            </v-card-text>
                        </v-card>

                    </v-col>

                </v-card>
            </v-col>
        </v-row>

        <!-- content cards team ข้อมูล mockup -->
        <v-row v-else class="ga-5">
            <v-col cols="12" v-for="item in selectedTask.check" :key="item">
                <v-card class="card-stat-shadow pa-4" :color="getTeamColorSoft(item.team.replace('Team ', ''))"
                    rounded="lg">
                    <!-- Header: Team Name + Add Button -->
                    <v-row align="center" justify="space-between">
                        <v-col>
                            <div class="d-flex ga-3 text-h6 font-weight-bold" style="color: #2A3547">
                                <span>
                                    Team {{ item.team }}
                                </span>
                                <v-chip v-if="item.send" color="green" variant="flat">
                                    ส่งแล้ว
                                </v-chip>
                                <v-chip v-else color="red" variant="flat">
                                    ยังไม่ส่ง
                                </v-chip>
                            </div>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn @click="addContent(item.contents)" color="orange" icon size="small" rounded="xs">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4 dashed-hr"></v-divider>

                    <h4 class="text-subtitle-1 font-weight-bold">Contents</h4>

                    <!-- Contents Section -->
                    <v-card v-for="(content, index) in item.contents" :key="content" class="pa-4 mb-4" elevation="2">
                        <v-col v-if="index > 0 || item.contents.length > 1" cols="12" class="px-0 pt-0">
                            <div class="d-flex flex-row-reverse">
                                <v-btn @click="removeContent(item.contents, index)" color="red" icon size="small"
                                    variant="text">
                                    <v-icon> mdi-close-thick</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <!-- เป้าหมาย (HVT) -->
                        <v-select v-model="content.hvt" :items="targets" label="เป้าหมาย (HVT)" variant="outlined"
                            density="compact">
                        </v-select>

                        <!-- Link URL -->
                        <div v-for="(link, index) in content.url" :key="'url-' + index" class="link-row">
                            <v-row align="center">
                                <v-col>
                                    <v-text-field v-model="content.url[index]" label="Link URL (ที่ปฏิบัติงาน)"
                                        variant="outlined" density="compact" :rules="[rules.required]"
                                        @blur="fetchPreview(content, index)"></v-text-field>
                                </v-col>
                                <!-- action button -->
                                <v-col v-if="index === content.url.length - 1" cols="auto">
                                    <v-btn color="blue" icon size="small" @click="addLink(content.url)">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col v-else cols="auto">
                                    <v-btn color="red" icon size="small" variant="text"
                                        @click="removeLink(content.url, index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                                <PreviewLinkCard v-if="content.previews" :preview="content.previews[index]" />
                            </v-row>
                        </div>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>

        <!-- save button -->
        <v-col cols="12" class="px-0">
            <div class="d-flex flex-row-reverse">
                <v-btn variant="outlined" size="large" @click="confirmUpdate">
                    Save
                </v-btn>
            </div>
        </v-col>
    </div>
</template>
<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import PreviewLinkCard from "../cards/PreviewLinkCard.vue";
import { da } from "vuetify/locale";
import AddNewContent from "./AddNewContent.vue";
const { getTeamColorSoft } = useColors();
const emit = defineEmits(["closeEdit"]);
const selectedTarget = ref(null);
const selectedContent = ref(null);
const contents = ref([]);
const props = defineProps({
    selectedTask: Object,
    hvtTargets: Object
});
const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};
const targets = ref([
    "เป้าหมาย A",
    "เป้าหมาย B",
    "เป้าหมาย C",
    "เป้าหมาย D",
]);
// ตัวแปรเก็บ Link URL
const links = ref([""]); // เริ่มต้นมี 1 ช่อง
const previews = ref([]); // Array of preview objects
// const preview = ref(null);

// ฟังก์ชันเพิ่มช่องกรอกลิงก์ใหม่
const addLink = (dataLinks) => {
    dataLinks.push("");
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

const openEditContent = (dataContents) => {
    // console.log("dataContents === ", dataContents);
    dataContents.editable = true;
    // console.log("dataContents === ", dataContents);
};

const closeEditContent = (dataContents) => {
    dataContents.editable = false;
    // console.log("dataContents === ", dataContents);
};

const openAddNewContent = (dataTeam) => {
    dataTeam.addContent = true;
    // console.log("dataTeam === ", dataTeam);
    // dataContents.push({
    //     hvt: null,
    //     editable: true,
    //     url: [""]
    // });
};

const closeAddNewContent = (dataTeam) => {
    dataTeam.addContent = false;
    // console.log("dataTeam === ", dataTeam);
};

const removeContent = (dataContents, index) => {
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
            Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว", "success");
            dataContents.splice(index, 1);

        }
    });
};

const updateData = () => {
    Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกอัปเดตแล้ว", "success");
    emit("closeEdit")
};

const confirmUpdate = () => {
    Swal.fire({
        title: "ยืนยันการอัปเดต?",
        text: "คุณต้องการอัปเดตข้อมูลใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, อัปเดตเลย!",
        cancelButtonText: "ยกเลิก",
    }).then((result) => {
        if (result.isConfirmed) {
            updateData();
        }
    });
};

const fetchPreview = async (content, index) => {
    const url = content.url[index];
    if (!url) return;

    // ตรวจสอบว่า content.previews มีอยู่หรือไม่ ถ้าไม่มีให้สร้างใหม่
    if (!content.previews) {
        content.previews = []; // หรือใช้ reactive() ถ้าอยู่ใน Composition API
    }

    try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success") {
            // ใช้ Vue.set หรืออัปเดตค่าโดยตรง (Vue 3 รู้จัก reactive อัตโนมัติ)
            content.previews[index] = {
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

const getTeamContents = (team) => {
    let taskUser = getTaskUserDetail(team)
    if (taskUser && taskUser.response_hvt.length > 0 && JSON.stringify(taskUser.response_hvt[0]) !== "{}") {
        return taskUser.response_hvt;
    } else {
        return null;
    }
};
const getTaskUserDetail = (team) => {
    let getTeam = team.replace("Team ", "");
    let taskUsers = props.selectedTask.taskDetail
    let taskUser = taskUsers.find((item) => item.creator_info.affiliation === getTeam);
    return taskUser;
};
const updateContent = (team, content) => {
    let taskUser = getTaskUserDetail(team)
    const updateContents = {
        "status":"in_progress",
        "response_hvt": [
            {
                "action_id": content.action_id,
                "hvt_id": content.hvt_id,
                "url":  content.url,
            }
        ]
    }
    updateTaskUser(taskUser._id, updateContents);
    let updateHvt_info = props.hvtTargets.find(item => item._id === content.hvt_id)
    content.hvt_info = updateHvt_info
    closeEditContent(content);
    // console.log("task detail === ", taskUser._id);
    // console.log("update contents === ", updateContents);
    // console.log("hvt === ",updateHvt_info);
    
};
const getFullName = (item) => {
    return item.first_name + " " + item.last_name +`(${item.name})`;
};

onMounted(async () => { 
    if (props.hvtTargets) {
        console.log("targets ==== ",props.hvtTargets);
        
        // targets.value = props.hvtTargets
    }
})
</script>
<script>
export default {
    // props: {
    //     selectedTask: {
    //         type: Object,
    //         default: {}
    //     }
    // },
    methods: {
        closeEditTask() {
            this.$emit("closeEdit")
        },

    },
}
</script>
<style scoped>
.dashed-hr {
    border-top: 2px dashed;
    /* สีเทา */
}
</style>