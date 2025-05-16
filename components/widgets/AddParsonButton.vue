<template>
    <v-col cols="12">
        <div class="d-flex justify-end">
            <v-btn :color="props.buttonColor" rounded="lg" @click="ShowDialog = true">
            <v-icon class="mr-1" color="white">mdi-plus-thick</v-icon>
            <span class="text-h6 text-white">เพิ่มบุคคล</span>
            </v-btn>
        </div>
        <v-dialog 
            v-model="ShowDialog" 
            
            scrollable
        >
        <v-card rounded="lg" class="py-0">
            <!-- card haeder -->
             <v-card-item class="py-2 ">
                    <v-card-title class="text-h6 d-flex justify-space-between align-center">
                        {{ props.title }}
                        <v-btn  @click="ShowDialog = false" icon="$vuetify" variant="text">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </v-card-title>
             </v-card-item>
            <v-divider class="mb-3 mx-3 border-opacity-75 dashed-divider"></v-divider>

            <!-- card body -->
            <v-card-text >
                <v-row>
                    <!-- input  -->
                    <v-col cols="12" sm="8" class="border-e border-opacity-75">
                        <!-- prefix + name -->
                        <v-row>
                            <v-col cols="12" sm="4" class="pt-0 pb-0">
                                <span class="text-h6">ยศ/คำนำหน้า</span>
                                <v-text-field
                                v-model="parson.prefix"
                                placeholder="คำนำหน้า"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8" class="pt-0 pb-0">
                                <span class="text-h6">ชื่อ-นามสกุล</span>
                                <v-text-field
                                v-model="parson.name"
                                placeholder="ชื่อ-นามสกุล"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <!-- type + education level -->
                        <v-row>
                            <v-col cols="12" sm="6" class="pt-0 pb-0">
                                <span class="text-h6">ประเภทสื่อ</span>
                                <v-autocomplete
                                    v-model="parson.type"
                                    :items="mediaType"  
                                    item-title="name"
                                    item-value="_id"
                                    placeholder="เลือกประเภทสื่อ"
                                    variant="outlined"
                                    density="compact"
                                    rounded="lg"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" class="pt-0 pb-0">
                                <span class="text-h6">ระดับการศึกษา</span>
                                <v-autocomplete
                                    v-model="parson.education"
                                    :items="educationType"  
                                    item-title="name"
                                    item-value="_id"
                                    label="เลือกระดับการศึกษา"
                                    variant="outlined"
                                    density="compact"
                                    rounded="lg"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>

                        <!-- position + attitude -->
                        <v-row>
                            <v-col class="pt-0 pb-0">
                                <span class="text-h6">ตำแหน่งปัจจุบัน</span>
                                <v-text-field
                                    v-model="parson.position"
                                    placeholder="เลือกตำแหน่งปัจจุบัน"
                                    variant="outlined"
                                    density="compact"
                                    rounded="lg"
                                ></v-text-field>
                            </v-col>
                            <v-col v-show="props.showAttitude" cols="12" sm="4" class="pt-0 pb-0">
                                <span class="text-h6">ทัศนคติ</span>
                                <v-autocomplete
                                    v-model="parson.attitude"
                                    :items="attitudeType"  
                                    item-title="name"
                                    item-value="_id"
                                    placeholder="เลือกทัศนคติ"
                                    variant="outlined"
                                    density="compact"
                                    rounded="lg"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>

                        <!-- academic -->
                        <div class="pt-2">
                            <span class="text-h6">ผลงานทางวิชาการ</span>
                            <v-text-field
                            v-model="parson.academic"
                                placeholder="ระบุผลงานทางวิชาการ"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                            ></v-text-field>
                        </div>

                        <!-- activity -->
                        <div>
                            <span class="text-h6">กิจกรรมที่เคยร่วมกับทหาร/ตำรวจ</span>
                            <v-text-field
                                v-model="parson.activity"
                                placeholder="ระบุกิจกรรมที่เคยร่วมกับทหาร/ตำรวจ"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                            ></v-text-field>
                        </div>

                        <!-- coordinetor -->
                        <div>
                            <span class="text-h6">ผู้ประสานงาน</span>
                            <v-text-field
                                v-model="parson.coordinator"
                                placeholder="ระบุผู้ประสานงาน"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                            ></v-text-field>
                        </div>
                        <!-- tel -->
                        <div>
                            <span class="text-h6">เบอร์โทรผู้ประสานงาน</span>
                            <v-text-field
                                v-model="parson.tel"
                                placeholder="ระบุเบอร์โทรผู้ประสานงาน"
                                variant="outlined"
                                density="compact"
                                rounded="lg"
                            ></v-text-field>
                        </div>
                    </v-col>

                    <!-- image upload -->
                    <v-col cols="12" sm="4" class="pe-0">
                        <v-col cols="12" class="pa-0">
                            <vue-dropzone
                                ref="myVueDropzone"
                                id="dropzone"
                                :options="dropzoneOptions"
                                class="custom-dropzone"
                                v-model:files="selectedFiles"
                            />
                        </v-col>
                        <v-row class="justify-center mt-2">ภาพโปรไฟล์</v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- card footer -->
            <v-card-actions>
                <v-btn
                    color="surface-variant"
                    text="เพิ่ม"
                    variant="flat"
                    @click="ShowDialog = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-col>
</template>
<script setup>
import vueDropzone from "dropzone-vue3";
const props = defineProps({
    title: {
        type: String,
        default: 'ข้อมูลสร้างสื่อ/เครือข่าย',
    },
    buttonColor: {
        type: String,
        default: "#5FC0D6",
    },
    showMedia: {
        type: Boolean,
        default: false,
    },
    showConnection: {
        type: Boolean,
        default: false,
    },
    showAttitude: {
        type: Boolean,
        default: false,
    },
});
const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    // thumbnailWidth: 50,
    thumbnailHeight: 50,
    maxFilesize: 0.5,
    acceptedFiles: "image/jpeg,image/png",
    maxFiles: 1,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
        <div style="text-align: center;">
        <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
        </div>
    `,
});
const ShowDialog = ref(false);
const mediaType = ref([]);
const educationType = ref([]);
const attitudeType = ref([]);
const mission = ref('');
const parson = ref({
    prefix: '',
    name: '',
    type: null,
    education: null,
    position: '',
    attitude: null,
    academic: '',
    activity: '',
    coordinator: '',
    tel: ''
})
async function checkMission() {
    if (props.showMedia) {
        mission.value = 'R7'
        
    } else if (props.showConnection) {
        mission.value = 'R8'
    } 
    else {
        mission.value = 'R7';
    }
}
async function getMediaType() {
    if (mission.value) {
        mediaType.value = await getTopics(mission.value, 'media');
    }
    console.log("mediaType ==== ", mediaType.value);
}
async function getEducationType() {
    if (mission.value) {
        educationType.value = await getTopics('R7','education');
    }
    console.log("educationType ==== ", educationType.value);
}
async function getAttitudeType() {
    if (mission.value) {
        attitudeType.value = await getTopics('R7','attitude');
    }
    console.log("educationType ==== ", educationType.value);
}
onMounted(async () => {
    await checkMission();
    await getMediaType();
    await getEducationType();
    await getAttitudeType();
});
</script>

<style scoped>
.dashed-divider {
  border-style: dashed;
}
</style>