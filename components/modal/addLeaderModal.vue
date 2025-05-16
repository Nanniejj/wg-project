<template>
    <div class="pa-4 text-center">
        <v-dialog 
            scrollable 
            persistent 
            v-model="localDialog"
        >
            <!-- max-width="800px" -->
            <v-card>
                <!-- dialog header  -->
                <v-card-title class="d-flex align-center justify-space-between pa-2">
                    <v-card-title class="text-h6">Update User</v-card-title>
                    <v-btn @click="closeModal" variant="text" color="#F44336" class="">
                        <v-icon color="primary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <!-- dialog body  -->
                <v-card-text class="px-10 py-5">
                    <v-col cols="12">
                        <v-card class="pa-4" rounded="lg" elevation="3">
                            <v-card-title class="text-h6 px-0">User Fristname Lastname</v-card-title>
                            <v-divider class="border-opacity-75 dashed-divider"></v-divider>
                            <v-card-text class="pt-4 px-0">
                                <div class="d-flex justify-space-between align-center">
                                    <div class="headline">ข้อมูลส่วนตัว</div>
                                </div>
                                <v-col cols="12" class="px-0">
                                    <span style="font-size: 16px">รายละเอียด</span>
                                    <v-text-field placeholder="รายละเอียด" 
                                        v-model="DescriptionMessage" 
                                        variant="outlined"
                                        density="compact"
                                        rounded="lg" clearable></v-text-field>
                                </v-col>
                                <v-row>
                                    <v-col cols="12">
                                        <span style="font-size: 16px">Social media</span>
                                        <v-row v-for="(link, index) in url"
                                        :key="'link-url-' + index">
                                            <v-col md="11" >
                                                <!-- <PreviewLinkCard :url="content.url[index]" /> -->
                                                <v-text-field density="compact" 
                                                    placeholder="Link URL" rounded="lg"
                                                    v-model="content.url[index]" 
                                                    variant="outlined" clearable
                                                    @blur="fetchPreview(content,index)"
                                                    :rules="[rules.required]"
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col v-if="index === 0" cols="auto" md="1" class="ma-0 d-flex justify-center">
                                                <v-btn density="compact" rounded="md" color="#46AFC7"
                                                    @click="addLink(content.url)" height="63%" min-width="40" size="small">
                                                    <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col v-else cols="3" sm="1" class="ma-0 d-flex justify-center">
                                                <v-btn color="red" icon size="small" variant="text" @click="removeLink(content.url,index)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-col>  
                                            <PreviewLinkCard v-if="previews[index]" :preview="previews[index]" />
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card class="pa-5" rounded="lg" elevation="3">
                            <!-- <v-card-title class="text-h6 px-0">User Fristname Lastname</v-card-title>
                            <v-divider class="border-opacity-75 dashed-divider"></v-divider> -->
                            <v-card-text class="pa-0">
                                <div class="d-flex justify-space-between align-center">
                                    <div class="headline">ข้อมูล Dark side</div>
                                </div>
                                <v-col cols="12" class="px-0">
                                    <span style="font-size: 16px">รายละเอียด</span>
                                    <v-text-field placeholder="รายละเอียด" v-model="DescriptionMessage" variant="outlined"
                                        rounded="lg" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" class="px-0">
                                    <span style="font-size: 16px">การดำเนินการร้างภาพจำ</span>
                                    <v-text-field placeholder="รายละเอียด" v-model="DescriptionMessage" variant="outlined"
                                        rounded="lg" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-row>
                                    <v-col cols="12">
                                        <span style="font-size: 16px">Link URL (ของผู้ที่เราติดตาม)</span>
                                        <v-row v-for="(link, index) in url"
                                        :key="'link-url-' + index">
                                            <v-col md="11" >
                                                <!-- <PreviewLinkCard :url="content.url[index]" /> -->
                                                <v-text-field density="compact" 
                                                    placeholder="Link URL" rounded="lg"
                                                    v-model="content.url[index]" 
                                                    variant="outlined" clearable
                                                    @blur="fetchPreview(content,index)"
                                                    :rules="[rules.required]"
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col v-if="index === 0" cols="auto" md="1" class="ma-0 d-flex justify-center">
                                                <v-btn density="compact" rounded="md" color="#46AFC7"
                                                    @click="addLink(content.url)" height="63%" min-width="40" size="small">
                                                    <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col v-else cols="3" sm="1" class="ma-0 d-flex justify-center">
                                                <v-btn color="red" icon size="small" variant="text" @click="removeLink(content.url,index)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-col>  
                                            <PreviewLinkCard v-if="previews[index]" :preview="previews[index]" />
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-col cols="12" class="px-0">
                                    <span style="font-size: 16px">ติดตามความเคลี่ยนไหว</span>
                                    <v-text-field placeholder="รายละเอียด" v-model="DescriptionMessage" variant="outlined"
                                        rounded="lg" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-col cols="12 px-0">
                                    <span style="font-size: 16px">Image</span>
                                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                        class="custom-dropzone" @vdropzone-success="onUploadSuccess"
                                        v-model:files="selectedFiles" />
                                </v-col>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-card-text>
                <v-divider class=""></v-divider>

                <!-- dialog footer  -->
                <v-card-actions>
                    <v-btn
                        color="surface-variant"
                        text="Save"
                        variant="flat"
                        @click="isActive.value = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import vueDropzone from "dropzone-vue3";
import PreviewLinkCard from '../cards/PreviewLinkCard.vue'; // นำเข้า component สำหรับแสดง preview ของ URL
const url = ref([""]); // ตัวแปรสำหรับเก็บ URL
const selectedFiles = ref([]); // ตัวแปรสำหรับเก็บไฟล์ที่เลือก
const previews = ref([]); // ตัวแปรสำหรับเก็บ preview ของ URL
const rules = {
    required: (value) => !!value || 'Required.', // กฎสำหรับตรวจสอบว่ามีค่าอยู่หรือไม่
};
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
const fetchPreview = async (content, index) => {
    const url = url[index];
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

function addLink (){
    url.value.push("");
};
</script>
<script>
export default {
    data() {
        return {
            DescriptionMessage: '', // ตัวแปรสำหรับเก็บข้อความ
            
            content: {
                url: [], // ตัวแปรสำหรับเก็บ URL ใน content
            },
            previews: [], // ตัวแปรสำหรับเก็บ preview ของ URL
        };
    },
  props: {
    dialog: Boolean, // รับค่า prop สำหรับการควบคุมการแสดงผลของ modal
    image: Object,
  },
  computed: {
    // ใช้ computed property เพื่อสร้างตัวแปร local สำหรับ v-model
    localDialog: {
      get() {
        return this.dialog; // คืนค่า prop
      },
      set(value) {
        this.$emit('close'); // ส่งค่าไปยัง Parent ผ่าน event
      },
    },
  },
  methods: {
    closeModal() {
      this.localDialog = false; // ปิด modal
    },
    downloadThisImage(image){
      this.$emit('increment-downloads')
      downloadImage(image, 'donwload.jpg')
    }
  },
  mounted() {
  }
};
</script>
