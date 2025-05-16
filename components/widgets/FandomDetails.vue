<template>
    <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg" >
        <v-col v-if="props.showCase" cols="12" class="text-end pt-0">
            <v-icon @click="removeWidget" color="#F44336" icon="mdi-delete" size="20"></v-icon>
        </v-col>
        <!-- header  -->
        <v-row class="align-center">
            <v-col cols="12" md="8" class="">
                <span class="text-h6">ประชาสัมพันธ์ผ่านแฟนด้อม</span>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-btn
                    color="#F49525"
                    @click="addFandomContent"
                    class="d-flex h-100"
                    style="aspect-ratio: 1;"
                    size="small"
                    :disabled="showCase"
                >
                    <v-icon style="color: white; font-size: 25px">mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        
        <!-- body  -->
        <v-col cols="12" class="px-0"  v-for="(fandom,index) in fandomContents" :key="fandom + index">
            <div class="d-flex justify-end pt-5">
                <v-btn
                    v-if="index !== 0"
                    color="#F44336"
                    variant="text"
                    @click="removeFandomContent(index)"
                    icon="$vuetify"
                    size="small"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>

            </div>
            <v-divider class="border-opacity-75 dashed-divider"></v-divider>
            
            <v-col cols="12" class="px-0">
                <v-row>
                    <v-col cols="12" md="8">
                        <span class="text-h6">ชื่อแฟนด้อม</span>
                        <v-text-field
                            v-model="fandom.name"
                            density="compact"
                            variant="outlined"
                            rounded="lg"
                            clearable
                            :disabled="showCase"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0">
                        <span class="text-h6">จำนวนสมาชิก</span>
                        <v-number-input
                            density="compact"
                            v-model="fandom.members"
                            :min="0"
                            control-variant="split"
                            inset
                            :disabled="showCase"
                            variant="outlined"
                        ></v-number-input>
                    </v-col>
                </v-row>
            </v-col>
    
            <v-col cols="12" class="px-0">
                <span class="text-h6">Image</span>
                <vue-dropzone
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
                    class="custom-dropzone"
                    :disabled="true"
                />
            </v-col>
            <v-col cols="12" class="px-0">
                <span class="text-h6">Link URL</span>
                <v-text-field
                    v-model="fandom.url"
                    density="compact"
                    placeholder="Link URL"
                    variant="outlined"
                    rounded="lg"
                    clearable
                    hide-details
                    :disabled="showCase"
                    @blur="fetchPreview(url)"
                    ></v-text-field>
            </v-col>
            <PreviewLinkCard v-if="fandom.preview" :preview="fandom.preview" />
        </v-col>

        <!-- priority -->
        <v-col cols="4" class="px-0">
            <Priority 
                v-model="selectedPriority" 
                @handlePriority="handlePriority"
            />
            <!-- <span style="font-size: 16px">ระดับความสำคัญ</span>
            <v-select
                placeholder="เลือกระดับความสำคัญ"
                density="compact"
                variant="outlined"
                rounded="lg"
                :items="prioritise"
                item-title="title"
                item-value="value"
                v-model="selectedPriority"
                @update:model-value="handlePriority"
                hide-details
            ></v-select> -->
        </v-col>
    </v-card>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import vueDropzone from "dropzone-vue3";
import PreviewLinkCard from '../cards/PreviewLinkCard.vue';
import Priority from './_WidgetPriority.vue';
const props = defineProps({
    showCase: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'low',
    }
});
const emit = defineEmits('linkProviceValue', 'widgetPriority', 'deleteWidget');
const selectedPriority = ref(props.priority);
const prioritise = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
]);
const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    maxFilesize: 1,
    acceptedFiles: "image/jpeg,image/png",
    maxFiles: 2,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
      <div style="text-align: center;margin-top:-40px">
        <i class="mdi mdi-upload-circle" style="font-size: 40px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
      </div>
    `,
});
const fandomContents = ref([
        {
            name: "",
            members: 0,
            image: null,
            url: "",
            preview: null,
        }
]);
const name = ref('');
const members = ref(0);
const image = ref(null);
const url = ref('');
const myVueDropzone = ref(null)
// let content = {
//     name: "",
//     members: 0,
//     image: null,
//     url: "",
//     preview: null,
// };
const preview = ref(null);
function addFandomContent() {
    let content = {
        name: name.value,
        members: members.value,
        image: image.value,
        url: url.value,
        preview: preview.value,
    };
    fandomContents.value.push(content);
    resetInput();
}
function removeFandomContent(index) {
    fandomContents.value.splice(index, 1);
}
function resetInput() {
    name.value = '';
    members.value = 0;
    image.value = null;
    url.value = '';
    preview.value = null;
}
async function  fetchPreview (link)  {
    const url = link;
    if (!url) return;

    try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success") {
            preview.value = {
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
    // emitLinkPagesValue();
};
function handlePriority() {
    // console.log('ส่งค่า widget Priority:', selectedPriority.value)
    emit('widgetPriority',selectedPriority.value)
};
function removeWidget() {
    emit('deleteWidget')
};

watch(
  () => props.showCase,
  (val) => {
    const dz = myVueDropzone.value?.dz
    if (dz) {
      val ? dz.disable() : dz.enable()
    }
  }
)
</script>
<style scoped>
  .dashed-divider {
      border-style: dashed;
      border-width: 1px;
    }

    .custom-dropzone {
      background-color: #E9E9E9;
         height: 100px; 
        border: 2px dashed #707070; /* กำหนดขอบ */
        border-radius: 10px; /* กำหนดมุมโค้ง */
    }

</style>