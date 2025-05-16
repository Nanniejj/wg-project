<template>
    <v-col cols="12">
        <div class="d-flex justify-end">
            <v-btn :color="props.buttonColor" rounded="lg" @click="ShowDialog = true">
            <v-icon class="mr-1" color="white">mdi-plus-thick</v-icon>
            <span class="text-h6 text-white">เพิ่มเครือข่าย</span>
            </v-btn>
        </div>
        <v-dialog 
            v-model="ShowDialog" 
            max-width="800px"
            scrollable
        >
        <v-card rounded="lg" class="py-0">
            <!-- card haeder -->
             <v-card-item class="py-2 ">
                    <v-card-title class="text-h6 d-flex justify-space-between align-center">
                        เพิ่มเครือข่าย
                        <v-btn  @click="ShowDialog = false" icon="$vuetify" variant="text">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </v-card-title>
             </v-card-item>
            <v-divider class="mb-3 mx-3 border-opacity-75 dashed-divider"></v-divider>

            <!-- card body -->
            <v-card-text >
                <v-row>
                    <v-col cols="12" class="pb-0">
                        <span class="text-h6">ชื่อเครือข่าย</span>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            placeholder="ชื่อกิจกรรม"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                        <span class="text-h6"> ประเภทเครือข่าย</span>
                        <v-autocomplete
                            item-title="name"
                            item-value="id"
                            :items="networkType" 
                            density="compact"
                            placeholder="เลือกประเภทเครือข่าย"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4" >
                        <span class="text-h6">จำนวนสมาชิก</span>
                        <v-number-input
                            density="compact"
                            :min="0"
                            control-variant="split"
                            inset
                            variant="outlined"
                        ></v-number-input>
                    </v-col>

                    <!-- แกนนำ -->
                    <v-col cols="12">
                        <span class="text-h6">แกนนำ</span>
                        <v-row v-for="(leader, index) in Leaders"
                        :key="'link-url-' + index">
                            <v-col class="pb-0">
                                <v-text-field density="compact" 
                                    placeholder="ชื่อ - สกุล" rounded="lg"
                                    v-model="Leaders[index]" 
                                    variant="outlined" clearable
                                >
                                </v-text-field>
                            </v-col>
                            <v-col v-if="index === 0" cols="auto" class="pb-0">
                                <v-btn density="compact" rounded="md" color="#46AFC7"
                                    @click="addLeader(Leaders)" height="63%" min-width="40" size="small">
                                    <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col v-else cols="auto">
                                <v-btn color="red" icon size="small" variant="text" @click="removeLeader(Leaders,index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-col>  
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- card footer -->
            <v-card-actions>
                <v-btn
                    color="surface-variant"
                    text="บันทึก"
                    variant="outlined"
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
const Leaders = ref(['']);
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
const networkType = ref([
    { id: 1 , name: "จัดตั้ง"},
    { id: 2 , name: "สนับสนุน"},
])
function addLeader(data) {
    data.push('');
}

function removeLeader(data, index) {
    data.splice(index, 1);
}
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