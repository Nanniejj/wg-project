<template>
    <div>
        <v-card class="pa-4 card-stat-shadow" border="sm" rounded="lg" >
            <!-- show  -->
            <v-col v-if="!content.editable" cols="12" class="pa-0">
                <div class="d-flex justify-space-between">
                    <v-col v-if="content.hvt_id" cols="auto" class="pt-0">
                        <v-card-title class="px-0"> 
                            {{ content.hvt_id.first_name }}
                            {{ content.hvt_id.last_name }}
                            ({{ content.hvt_id.name }})
                        </v-card-title>
                    </v-col>
                    <v-col v-else cols="auto">
                        <v-card-title class="px-0">
                            {{ content.hvt_id }}
                        </v-card-title>
                    </v-col>
                    <v-col v-if="props.status !== 'completed'" cols="auto" class="d-flex pa-0">
                        <v-btn @click="openEditContent()" color="blue" icon size="small"
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
                <v-row v-if="content.action_id">
                    <v-col cols="auto" v-for="(url, index) in content.action_id.url" :key="'url-' + index"
                        class="link-row">
                        <v-chip color="primary">
                            {{ url }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-col>

            <!-- edit -->
            <v-col v-else cols="12" class="px-0 pt-0">
                <!-- button -->
                <div v-if="content.editable" class="d-flex justify-space-between">
                    <v-col cols="auto" class="pt-0 px-0">
                        <v-card-title class="px-0">
                            <v-icon> mdi-pencil-outline </v-icon>
                            Edit Content
                        </v-card-title>
                    </v-col>
                    <div class="d-flex pa-0">
                        <!-- <v-col cols="auto" class="pt-0">
                            <v-btn @click="updateContent(team,content)" color="blue" icon size="small" variant="text">
                                บันทึก
                            </v-btn>
                        </v-col> -->
                        <v-col cols="auto" class="pt-0">
                            <v-btn @click="closeEditContent()" color="red" icon size="small"
                                variant="text">
                                <v-icon> mdi-close </v-icon>
                                <!-- ปิดการแก้ไข -->
                            </v-btn>
                        </v-col>
                    </div>
                </div>

                <!-- hvt targets -->
                <v-select
                    density="compact"
                    label="Select mission"
                    variant="outlined"
                    rounded="lg"
                    style="margin-top: 5px"
                    :items="hvtTargets"
                    item-value="_id"
                    :item-title="getFullName"
                    v-model="content.hvt_id._id"
                >
                    <template v-slot:item="{ props, item, index }">
                    <v-list-item :key="index">
                        <v-list-item-title v-bind="props" class="cursor-pointer">
                        {{ item.raw.first_name }} {{ item.raw.last_name }}
                        </v-list-item-title>
                    </v-list-item>
                    </template>
                </v-select>

                <!-- url -->
                <div v-for="(link, index) in content.action_id.url" :key="'url-' + index" class="link-row">
                    <v-row align="center">
                        <v-col>
                            <v-text-field v-model="content.action_id.url[index]" label="Link URL (ที่ปฏิบัติงาน)"
                                variant="outlined" density="compact" :rules="[rules.required]"
                                @blur="fetchPreview(content, index)"></v-text-field>
                        </v-col>
                        <v-col v-if="index === content.action_id.url.length - 1" cols="auto">
                            <v-btn color="blue" icon size="small" @click="addLink()">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col v-else cols="auto">
                            <v-btn color="red" icon size="small" variant="text"
                                @click="removeLink(index)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                        <PreviewLinkCard v-if="content.previews" :preview="content.previews[index]" />
                    </v-row>
                </div>
            </v-col>
        </v-card>
        <!-- add new content -->
        <!-- <AddNewContent 
            v-if="content"
        /> -->
            <!-- @closeAddNewContent="closeAddNewContent(getTeamContents(team))" -->

    </div>
</template>
<script setup>
import PreviewLinkCard from './PreviewLinkCard.vue';
// import AddNewContent from '../tasks/AddNewContent.vue';
import Swal from "sweetalert2";
const { getTeamColor, getMissionColor } = useColors();
const props = defineProps({
    content: Object,
    status: String,
});
const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};
const hvtTargets = ref([]);
const hvtTargetsMockup = ref([
    {
        darkside: {
            link: [],
            img: []
        },
        _id: "67b70f2d9f43f792f7d52570",
        ame: "ช่อ",
        first_name: "พรรณิการ์",
        last_name: "วานิช",
        group: "สร้างกระแสชี้นำเยาวชน",
        social: [
            {
                "_id": "67b70f2d9f43f792f7d5256c",
                "url": "https://x.com/pannika_fwp",
                "source": "twitter"
            },
            {
                "_id": "67b70f2d9f43f792f7d5256d",
                "url": "https://www.instagram.com/pannika_chor/",
                "source": "instagram"
            }
        ],
        team: "D",
        description: "สร้างกระแสชี้นำเยาวชน",
        photo: "/media/hvt/1740050221945.png",
        createdAt: "2025-02-20T11:17:02.000Z",
        updatedAt: "2025-02-20T11:17:02.000Z",
    },
    {
        darkside: {
            link: [],
            img: []
        },
        _id: "67bc21f3bd5bcec4e90e56df",
        name: "ต๋อม",
        first_name: "ชัยธวัช",
        last_name: "ตุลาธน",
        group: "สร้างกระแสชี้นำเยาวชน",
        social: [
            {
                _id: "67bc21f3bd5bcec4e90e56dd",
                url: "https://www.facebook.com/@ChaithawatTulathon/",
                source: "facebook"
            }
        ],
        team: "C",
        description: "",
        photo: "/media/hvt/1740382707705.png",
        createdAt: "2025-02-24T07:38:27.765Z",
        updatedAt: "2025-02-24T07:38:27.765Z",
    },
    {
        darkside: "[object Object]",
        _id: "67bc2474bd5bcec4e90e56ea",
        name: "หนูหริ่ง",
        first_name: "สมบัติ",
        last_name: "บุญงามอนงค์",
        group: "สร้างกระแสชี้นำเยาวชน",
        social: [
            {
                _id: "67bd8297df942350c9b6825e",
                url: "https://www.facebook.com/nuling",
                source: "facebook"
            },
            {
                _id: "67bd8297df942350c9b6825f",
                url: "https://x.com/nuling",
                source: "twitter"
            }
        ],
        team: "C",
        description: "สร้างกระแสชี้นำเยาวชน",
        photo: "/media/hvt/1740473403871.jpg",
        createdAt: "2025-02-24T07:49:08.858Z",
        updatedAt: "2025-02-25T09:43:22.915Z",
    },
    {
        darkside: "[object Object]",
        _id: "67bd9455bc0efb87b2c96971",
        name: "จอห์น",
        first_name: "วิญญู",
        last_name: "วงศ์สุรวัฒน์",
        group: "สร้างกระแสชี้นำเยาวชน",
        social: [
            {
                _id: "67bd9455bc0efb87b2c9696f",
                url: "https://www.instagram.com/johnwinyu/",
                source: "instagram"
            },
            {
                _id: "67bd9587bc0efb87b2c96978",
                url: "https://www.youtube.com/c/DailyTopicsTH",
                source: "youtube"
            },
            {
                _id: "67bd9587bc0efb87b2c96979",
                url: "https://x.com/johnwinyu",
                source: "twitter"
            },
            {
                _id: "67bd9587bc0efb87b2c9697a",
                url: "https://www.facebook.com/johnwinyu/",
                source: "facebook"
            }
        ],
        team: "E",
        description: "",
        photo: "/media/hvt/1740477831159.jpg",
        createdAt: "2025-02-25T09:58:45.755Z",
        updatedAt: "2025-02-25T10:03:51.272Z",
    }

]);
const content = ref({
    editable: false,
    hvt_id: {
        _id: "67b70f2d9f43f792f7d52570",
        name: "ช่อ",
        first_name: "พรรณิการ์",
        last_name: "วานิช",
        group: "สร้างกระแสชี้นำเยาวชน",
        social: [
            {
                "_id": "67b70f2d9f43f792f7d5256c",
                "url": "https://x.com/pannika_fwp",
                "source": "twitter"
            },
            {
                "_id": "67b70f2d9f43f792f7d5256d",
                "url": "https://www.instagram.com/pannika_chor/",
                "source": "instagram"
            }
        ],
        team: "D",
        description: "สร้างกระแสชี้นำเยาวชน",
        photo: "/media/hvt/1740050221945.png",
        darkside: {
            "link": [],
            "img": []
        }
    },
    action_id: {
        _id: "67e3bf03c920c0affe6f5123",
        mission: "M2",
        action_type: "post",
        url: [
            "www.testurl01-update.com",
            "www.testurl06-test-02-update.com",
            "www.testurl07-test-update.com"
        ]
    }
});

function getFullName(item) {
    return item.first_name + " " + item.last_name +`(${item.name})`;
};

function openEditContent(){
    content.value.editable = true;
};
function filterNullUrl() {
   return content.value.action_id.url.filter(Boolean); 
};
function closeEditContent(){
    content.value.hvt_id = hvtTargets.value.find(item => item._id === content.value.hvt_id?.['_id']) || null;
    content.value.editable = false;
    content.value.action_id.url = filterNullUrl()
};
// ฟังก์ชันเพิ่มช่องกรอกลิงก์ใหม่
function addLink() {
    // console.log(content);
    
    content.value.action_id.url.push("");
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
            content.value.action_id.url.splice(index, 1);
            previews.value.splice(index, 1);
            Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว", "success");

        }
    });
};
async function fetchPreview (content, index){
    const url = content.action_id.url[index];
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

async function checkHvtTargets() {
    try {
        hvtTargets.value = await fetchUserHvt();
    } catch (error) { 
        hvtTargets.value = hvtTargetsMockup.value;
    }
    console.log("hvtTargets === ", hvtTargets.value);
    console.log("content === ", content.value);
    
};

onMounted(async () => { 
    if (props.content) {
        content.value = props.content
        // targets.value = props.hvtTargets
    }
    checkHvtTargets()
})

</script>

<style scoped>
.custom-chip {
display: flex;
align-items: center;
justify-content: center;
min-height: 40px; 
/* font-size: 14px; */
/* padding: 0px; */
max-width: 200px;
}
.chip-text{
    font-size: 12px;
    line-height: 1; /* ลดความสูงของบรรทัด */
}
.chip-subtext {
font-size: 10px;
/* opacity: 0.8; */
}
</style>
  