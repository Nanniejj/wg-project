<template>
    <v-card class="pa-4 mb-4">
        <div class="d-flex justify-space-between">
            <v-col cols="auto" class="pt-0 px-0">
                <v-card-title class="px-0">
                    <v-icon> mdi-plus-thick </v-icon>
                    New Content
                </v-card-title>
            </v-col>
            <div class="d-flex ga-5 pa-0">
                <v-col cols="auto" class="pt-0">
                    <v-btn @click="openEditContent(content)" color="blue" icon size="small"
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
            <v-select v-model="content.hvt" 
                :items="targets" label="เป้าหมาย (HVT)"
                variant="outlined" density="compact">
            </v-select>
            <!-- Link URL -->
            <div v-for="(link, index) in content.url" :key="'url-' + index" class="link-row">
                <v-row align="center">
                    <v-col>
                        <v-text-field v-model="content.url[index]" label="Link URL (ที่ปฏิบัติงาน)"
                            variant="outlined" density="compact" :rules="[rules.required]"
                        ></v-text-field>
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
                    <!-- <PreviewLinkCard v-if="content.previews" :preview="content.previews[index]" /> -->
                </v-row>
            </div>
        </v-col>
    </v-card>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    selectedContents: Object,
});
const emit = defineEmits(["closeAddNewContent"]);
const targets = ref([
    "เป้าหมาย A",
    "เป้าหมาย B",
    "เป้าหมาย C",
    "เป้าหมาย D",
]);
const content = ref({
    hvt: null,
    url: [""]
});
const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
};
// ฟังก์ชันเพิ่มช่องกรอกลิงก์ใหม่
const addLink = (dataLinks) => {
    console.log("link : ",dataLinks);
    url.push("");
};
const closeAddNewContent = () => {
    emit("closeAddNewContent");;
};
// ฟังก์ชันลบลิงก์
const removeLink = (dataLinks, index) => {
    url.splice(index, 1);
};

</script>
<style></style>