<template>
    <v-card class="pa-4 card-stat-shadow" border="sm" rounded="lg">
        <div class="d-flex justify-space-between">
            <v-col cols="auto" class="pt-0 px-0">
                <v-card-title class="px-0">
                    <v-icon> mdi-plus-thick </v-icon>
                    New Content
                </v-card-title>
            </v-col>
            <div class="d-flex ga-5 pa-0">
                <v-col cols="auto" class="pt-0">
                    <v-btn @click="saveNewContent(content)" color="blue" icon size="small"
                        variant="text">
                        บันทึก
                        <!-- <v-icon> mdi-pencil-outline </v-icon>
                        <v-tooltip activator="parent" location="top">edit</v-tooltip> -->
                    </v-btn>
                </v-col>
                <v-col cols="auto" class="pt-0">
                    <v-btn @click="closeAddNewContent()" color="red" icon size="small"
                        variant="text">
                        ยกเลิก
                        <!-- <v-icon> mdi-trash-can </v-icon>
                        <v-tooltip activator="parent" location="top">delete</v-tooltip> -->
                    </v-btn>
                </v-col>
            </div>
        </div>
        
        <v-col cols="12" class="px-0 pt-0">
            <!-- Target Selector -->
            <v-select
                density="compact"
                label="Select mission"
                variant="outlined"
                rounded="lg"
                style="margin-top: 5px"
                :items="hvtTargets"
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
            <!-- url -->
            <div v-for="(link, index) in content.url" :key="'url-' + index" class="link-row">
                <v-row align="center">
                    <v-col>
                        <v-text-field v-model="content.url[index]" label="Link URL (ที่ปฏิบัติงาน)"
                            variant="outlined" density="compact" :rules="[rules.required]"
                            @blur="fetchPreview(content, index)"></v-text-field>
                    </v-col>
                    <v-col v-if="index === content.url.length - 1" cols="auto">
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
</template>
<script setup>
import { onMounted, ref } from "vue";
import PreviewLinkCard from "../cards/PreviewLinkCard.vue";
const props = defineProps({
    selectedContents: Object,
});
const emit = defineEmits(["closeAddNewContent","saveNewContent"]);
const hvtTargets = ref([
    "เป้าหมาย A",
    "เป้าหมาย B",
    "เป้าหมาย C",
    "เป้าหมาย D",
]);
const content = ref({
    hvt_id: null,
    url: [""]
});
const valid = ref(false);
const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};

function getFullName(item) {
    return item.first_name + " " + item.last_name +`(${item.name})`;
};
// ฟังก์ชันเพิ่มช่องกรอกลิงก์ใหม่
const addLink = () => {
    // console.log("link : ",dataLinks);
    content.value.url.push("");
};
function saveNewContent() {
    delete content.value.previews;
    let hvt_info = hvtTargets.value.find(item => item._id === content.value.hvt_id)
    console.log("hvt_id == ", hvt_info);
    
    emit("saveNewContent", content.value,hvt_info);
    closeAddNewContent()
};
function closeAddNewContent(){
    emit("closeAddNewContent");
    // content.value.hvt_id = null;
    // content.value.url = [""]
};
// ฟังก์ชันลบลิงก์
const removeLink = (index) => {
    content.value.url.splice(index, 1);
};
async function fetchPreview (content, index){
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
onMounted(async () => { 
    try {
        hvtTargets.value = await fetchUserHvt();
    } catch (error) { 
        // hvtTargets.value = hvtTargetsMockup.value;
    }
})
</script>
<style></style>