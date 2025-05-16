<template>
    <v-col cols="12" class="pa-0">
        <v-col v-if="showCase" cols="12" class="text-end pt-0">
            <v-icon @click="removeWidget" color="#F44336" icon="mdi-delete" size="20"></v-icon>
        </v-col>
        <v-row class="justify-space-between align-center">
            <v-col cols="auto">
                <span class="text-h6">กิจกรรม</span>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    color="#F49525"
                    @click="addCardAct"
                    class="d-flex"
                    style="aspect-ratio: 1; width: 30px"
                    height="80%"
                    size="small"
                    :disabled="showCase"
                >
                    <v-icon style="color: white; font-size: 30px">mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-col cols="12" class="px-0">
            <v-divider class="border-opacity-75 dashed-divider"></v-divider>
        </v-col>
        <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg" >
            <!-- name + date -->
            <v-row>
                <v-col cols="12" md="8" class="pb-0">
                    <span class="text-h6">ชื่อกิจกรรม</span>
                    <v-text-field
                        v-model="activity.name"
                        density="compact"
                        variant="outlined"
                        placeholder="ชื่อกิจกรรม"
                        :disabled="showCase"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="pb-0">
                    <span class="text-h6">วันที่จัดกิจกรรม</span>
                    <date-picker
                        v-model:value="activity.dateRange"
                        range
                        :editable="false"
                        :clearable="false"
                        class="w-100"
                        :disabled="showCase"
                    ></date-picker>
                </v-col>
            </v-row>
    
            <!-- support + arcademy  -->
            <v-row v-show="props.showSupport.status && props.showSupport.academy">
                <v-col cols="12" md="4" class="pb-0">
                    <span class="text-h6">สนับสนุน</span>
                    <v-autocomplete  
                        v-model="activity.support.academy.type"
                        placeholder="เลือกประเภทสถานศึกษา"
                        density="compact"
                        item-title="name"
                        item-value="value"
                        :items="academyTypes" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                         @update:model-value="getAcademyName()"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" class="pb-0">
                    <span class="text-h6">จังหวัดที่สถานศึกษาสังกัด</span>
                    <v-autocomplete  
                        v-model="activity.support.academy.provice_id"
                        placeholder="เลือกจังหวัด"
                        density="compact"
                        item-title="name_th"
                        item-value="id"
                        :items="provices" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                        @update:model-value="getAcademyName()"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" class="pb-0">
                    <span class="text-h6">โรงเรียน/มหาวิทยาลัย</span>
                    <v-autocomplete  
                        v-model="activity.support.academy.id"
                        placeholder="เลือกโรงเรียน/มหาวิทยาลัย"
                        density="compact"
                        item-title="name"
                        item-value="id"
                        :items="academy" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                    >
                    </v-autocomplete>
                </v-col>
            </v-row>
    
            <!-- support + type  -->
            <v-row v-show="props.showSupport.status && props.showSupport.type">
                <v-col cols="12" md="6" class="pb-0">
                    <span class="text-h6">สนับสนุน</span>
                    <v-autocomplete  
                        v-model="activity.support.connection.id"
                        placeholder="เลือกสนับสนุนเครือข่าย"
                        density="compact"
                        item-title="name"
                        item-value="_id"
                        :items="supportConnections" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <span class="text-h6">รูปแบบ</span>
                    <v-autocomplete  
                        v-model="activity.support.connection.type"
                        placeholder="เลือกรูปแบบการสนับสนุน"
                        density="compact"
                        item-title="name"
                        item-value="_id"
                        :items="typeConnections" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                    >
                    </v-autocomplete>
                </v-col>
            </v-row>
    
            <!-- support connection -->
            <v-col v-show="props.showSupport.status && props.showSupport.connection" cols="12" class="px-0">
                <span class="text-h6">สนับสนุน</span>
                <v-autocomplete density="compact" variant="outlined">
                </v-autocomplete>
            </v-col>
               
            <!-- type + target  -->
            <v-row v-show="props.showActivityType">
                <v-col cols="12" md="6" class="pb-0">
                    <span class="text-h6">ประเภทกิจกรรม</span>
                    <v-autocomplete  
                        v-model="activity.type"
                        placeholder="เลือกประเภทกิจกรรม"
                        density="compact"
                        item-title="name"
                        item-value="_id"
                        :items="typeActivitys"
                        :disabled="showCase" 
                        variant="outlined"
                        hide-details
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <span class="text-h6">กลุ่มเป้าหมาย(ถ้ามี)</span>
                    <v-autocomplete  
                        v-model="activity.target"
                        placeholder="เลือกกลุ่มเป้าหมาย(ถ้ามี)"
                        density="compact"
                        item-title="name"
                        item-value="_id"
                        :items="targets" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                    >
                    </v-autocomplete>
                </v-col>
            </v-row>
    
            <!-- location -->
            <v-row>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">สถานที่</span>
                    <v-text-field 
                        v-model="activity.location.address" 
                        placeholder="สถานที่"
                        density="compact" 
                        variant="outlined"
                        :disabled="showCase"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">แขวง/ตำบล</span>
                    <v-autocomplete  
                        v-model="activity.location.subDistrict"
                        placeholder="เลือกแขวง/ตำบล"
                        density="compact"
                        item-title="name_th"
                        item-value="id"
                        :items="subDistricts" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                         @update:model-value="setZipCode()"
                        :readonly="!activity.location.district"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">เขต/อำเภอ</span>
                    <v-autocomplete  
                        v-model="activity.location.district"
                        placeholder="เลือกเขต/อำเภอ"
                        density="compact"
                        item-title="name_th"
                        item-value="id"
                        :items="districts" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                        @update:model-value="getSubDistrictSelector()"
                        :readonly="!activity.location.province"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">จังหวัด</span>
                    <v-autocomplete  
                        v-model="activity.location.province"
                        placeholder="เลือกจังหวัด"
                        density="compact"
                        item-title="name_th"
                        item-value="id"
                        :items="provices" 
                        :disabled="showCase"
                        variant="outlined"
                        hide-details
                        @update:model-value="getDistrictSelector()"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">ไปรษณีย์</span>
                    <v-text-field 
                        v-model="activity.location.zip_Code" 
                        density="compact" 
                        variant="outlined"
                        :disabled="showCase"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <span class="text-h6">จำนวนผู้เข้าร่วม</span>
                    <v-number-input
                        density="compact"
                        v-model="activity.attendants"
                        :min="0"
                        control-variant="split"
                        inset
                        variant="outlined"
                        :disabled="showCase"
                    ></v-number-input>
                </v-col>
            </v-row>
        
            <!-- description -->
            <v-col cols="12" class="px-0">
                <span class="text-h6">รายละเอียด</span>
                <v-textarea
                    v-model="activity.description"
                    density="compact"
                    variant="outlined"
                    placeholder="เพิ่มรายละเอียด"
                    :disabled="showCase"
                >
                </v-textarea>
            </v-col>
    
            <!-- connection -->
            <v-col v-show="props.showConnectionName" cols="12" class="px-0">
                <span class="text-h6">ชื่อเครือข่าย</span>
                <v-autocomplete  
                    v-model="activity.connection"
                    placeholder="เลือกเครือข่าย"
                    density="compact"
                    item-title="name"
                    item-value="_id"
                    :items="connections" 
                    variant="outlined"
                    hide-details
                >
                </v-autocomplete>
            </v-col>
    
            <!-- support group -->
            <v-col v-show="props.showSupport.status && props.showSupport.group" cols="12" class="px-0">
                <span class="text-h6">สนับสนุน</span>
                <v-autocomplete  
                    v-model="activity.support.group_id"
                    placeholder="เลือกกลุ่มสนับสนุน"
                    density="compact"
                    item-title="name"
                    item-value="_id"
                    :items="groups" 
                    variant="outlined"
                    hide-details
                >
                </v-autocomplete>
            </v-col>
    
            <!-- ผู้ประสานของหน่วย -->
            <v-col cols="12" v-show="props.showCoordinator" class="px-0">
                <span class="text-h6">ผู้ประสานของหน่วย</span>
                <v-autocomplete  
                    v-model="activity.coordinator_id"
                    placeholder="เลือกผู้ประสานของหน่วย"
                    density="compact"
                    item-title="name"
                    item-value="_id"
                    :items="coordinators" 
                    variant="outlined"
                    hide-details
                >
                </v-autocomplete>
            </v-col>
    
            <!-- academy poc -->
            <v-col cols="12" v-show="props.showAcademyPOC" class="px-0">
                <span class="text-h6">POC</span>
                <v-autocomplete  
                    v-model="activity.academyPOC_id"
                    placeholder="เลือกผู้ประสานของหน่วย"
                    density="compact"
                    item-title="person"
                    item-value="_id"
                    :items="academyPOCs" 
                    variant="outlined"
                    hide-details
                >
                </v-autocomplete>
            </v-col>
    
            <!-- POC -->
            <v-col cols="12" v-show="props.showPOC" class="px-0">
                <span class="text-h6">POC</span>
                <v-text-field
                    v-model="activity.pocName"
                    density="compact"
                    variant="outlined"
                    placeholder="ระบุบ POC"
                >
                </v-text-field>
            </v-col>
    
            <!-- image  -->
            <v-col cols="12" class="px-0 ">
                <span class="text-h6">รูปภาพ</span>
                <vue-dropzone
                ref="myVueDropzone"
                id="dropzone"
                :options="dropzoneOptions"
                class="custom-dropzone"
                />
            </v-col>
    
            <!-- link -->
            <v-row v-show="props.showLinks">
                <v-col cols="12" class="pb-0 " style="font-size: 16px">
                    Link URL
                </v-col>
                <v-col class="pt-0">
                    <v-text-field density="compact" 
                        placeholder="Link URL" rounded="lg"
                        variant="outlined" clearable
                    >
                    </v-text-field>
                </v-col>
                <v-col  cols="auto" class="pt-0">
                    <v-btn density="compact" rounded="md" color="#46AFC7"
                         height="63%" min-width="40" size="small">
                        <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            
            <!-- tags  -->
            <v-col cols="12" v-show="props.showTags" class="px-0">
                <span class="text-h6">แท็ก ({{ tags.length }})</span>
                <v-combobox
                    v-model="activity.tags"
                    placeholder="Enter a tag"
                    variant="solo"
                    chips
                    clearable
                    closable-chips
                    multiple
                >
                    <template v-slot:chip="{ props, item }">
                    <v-chip v-bind="props" variant="elevated" color="teal">
                        <span>{{ item.raw }}</span>
                    </v-chip>
                    </template>
                </v-combobox>
                
            </v-col>
    
            <!-- activity result -->
            <v-col cols="12" v-show="props.showActivityResult" class="px-0">
                <span class="text-h6">ผลที่ได้จากการทำกิจกรรม</span>
                <v-text-field
                    v-model="activity.activityResult"
                    density="compact"
                    variant="outlined"
                    placeholder="เพิ่มผลที่ได้จากการทำกิจกรรม"
                >
                </v-text-field>
            </v-col>
    
            <!-- suggestions -->
            <v-col cols="12" v-show="props.showSuggestions" class="px-0">
                <span class="text-h6">ข้อเสนอ</span>
                <v-text-field
                    v-model="activity.suggestions"
                    density="compact"
                    variant="outlined"
                    placeholder="เพิ่มข้อเสนอแนะ"
                >
                </v-text-field>
            </v-col>

            <!-- priority -->
            <v-col cols="4" class="px-0">
                <Priority 
                    v-model="selectedPriority" 
                    @handlePriority="handlePriority"
                />
                
            </v-col>
        </v-card>
    </v-col>
</template>
<script setup>
import vueDropzone from "dropzone-vue3";
import { ref } from "vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import Priority from './_WidgetPriority.vue';
const emit = defineEmits('widgetPriority', 'deleteWidget');
const props = defineProps({
    showConnectionName: {
        type: Boolean,
        default: false,
    },
    showTags: {
        type: Boolean,
        default: false,
    },
    showActivityResult: {
        type: Boolean,
        default: false,
    },
    showSuggestions: {
        type: Boolean,
        default: false,
    },
    showLinks: {
        type: Boolean,
        default: false,
    },
    showActivityType: {
        type: Boolean,
        default: false,
    },
    showCoordinator: {
        type: Boolean,
        default: false,
    },
    showPOC: {
        type: Boolean,
        default: false,
    },
    showAcademyPOC: {
        type: Boolean,
        default: false,
    },
    showSupport: {
        type: Boolean,
        default: {
            status: false,
            type: false,
            connection: false,
            academy: false,
            group: false
        },
    },
    academtId: {
        type: String,
        default : null
    },
    showCase: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'low',
    }
});
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
const selectedPriority = ref(props.priority);
const tags = ref([]);
const groups = ref([]);
const supportConnections = ref([]);
const typeConnections = ref([]);
const typeActivitys = ref([]);
const targets = ref([]);
const connections = ref([]);
const coordinators = ref([]);
const academy = ref([]);
const academyPOCs = ref([]);
const provices = ref([]);
const districts = ref([]);
const subDistricts = ref([]);
const academyTypes = ref([
    { name: "โรงเรียน", key:true ,value: "school" },
    { name: "มหาวิทยาลัย", key:false ,value: "university" },
]);
const today = new Date();
const endOfWeek = new Date();
endOfWeek.setDate(today.getDate() + 6); // วันนี้ + 6 วัน = รวม 7 วัน

const activity = ref({
    name: "",
    date: [],
    type: null,
    target:null,
    support: {
        academy: {
            type: null,
            provice_id: null,
            id: null,
        },
        group_id:null,
        connection: {
            id: null,
            type: null,
        },
        
    },
    location: {
        address: null,
        subDistrict: null,
        district: null,
        province: null,
        zip_Code: null,
    },
    attendants: 0,
    description: "",
    networkName: "",
    coordinator_id: null,
    academyPOC_id: null,
    pocName: "",
    imageUrl: [],
    linkUrl: [],
    activityResult: "",
    suggestions: "",
    connection: null,
    tags: [],
    dateRange : ref([today,endOfWeek])
});
function handlePriority() {
    // console.log('ส่งค่า widget Priority:', selectedPriority.value)
    emit('widgetPriority',selectedPriority.value)
};
function removeWidget() {
    emit('deleteWidget')
};
async function fetchGroupsData() {
    try {
        let res = await getGroups();
        groups.value  = res.items  
        console.log("groups === ",groups.value);
         
    } catch (error) {
        console.error("Error fetching groups data :", error);
    }
}
function setZipCode() {
    if(activity.value.location.subDistrict) {
        let selectedSubDistrict = subDistricts.value.find(subDistrict => subDistrict.id === activity.value.location.subDistrict);
        console.log("selectedSubDistrict === ",selectedSubDistrict);
        
        if (selectedSubDistrict) {
            activity.value.location.zip_Code = selectedSubDistrict.zip_code
            ;
        } else {
            activity.value.location.zip_Code = null; // Reset if not found
        }
    } else {
        activity.value.location.zip_Code = null; // Reset if no subdistrict is selected
    }
}
async function getAcademyName() {
    if (activity.value.support.academy.type && activity.value.support.academy.provice_id) { 
        activity.value.support.academy.id = null
        let school = academyTypes.value.find(academy => academy.value === activity.value.support.academy.type).key
        console.log("academyKey === ", school);
        let id = activity.value.support.academy.provice_id
        academy.value = await getAcademyNames(id, school)
        console.log("Academy === ", academy.value);
    } else {
        activity.value.support.academy.id = null
        academy.value = []
    }
}
async function getAcademyPoc() {
    if (props.academtId) {
        academyPOCs.value = await getPocByAcademyID(props.academtId)
        console.log("academyPOCs === ",academyPOCs.value);
        
    }
}
async function getSubDistrictSelector() {
    if (activity.value.location.district) {
        activity.value.location.subDistrict = null
        activity.value.location.zip_Code = null
        subDistricts.value = await getSubDistrict(activity.value.location.district)
    }
    console.log("SubDistricts === ", subDistricts.value);
}
async function getDistrictSelector() {
    if (activity.value.location.province) {
        activity.value.location.district = null
        activity.value.location.subDistrict = null
        activity.value.location.zip_Code = null
        districts.value = await getDistrict(activity.value.location.province)
    }
    console.log("Districts === ", districts.value);
}
async function getProvicesSelector() {
    provices.value = await getProvinces()
}
async function getCoordinatorsSelector() {
    coordinators.value = await getCoordinators()
    console.log("getCoordinators ==== ", coordinators.value);
    
}
async function getSupporteConnections() {
    supportConnections.value = await getTopics('R10', 'support')
}
async function getTypeConnections() {
    typeConnections.value = await getTopics('R10', 'type')
}
async function getTypeActivitys() {
    typeActivitys.value = await getTopics('R4', 'activity')
}
async function getTargets() {
    targets.value = await getTopics('R4', 'target')
}
watch(
  () => props.academtId,
    async() => {
        await getAcademyPoc();
    },
//   { immediate: true } // เรียกตอน component mount ครั้งแรกด้วย
)
onMounted(async () => {
    await fetchGroupsData();
    await getProvicesSelector();
    await getCoordinatorsSelector();
    await getSupporteConnections();
    await getTypeConnections();
    await getTypeActivitys();
    await getTargets();
});
</script>
<style scoped>
.v-divider {
    height: 1000px; /* กำหนดความสูงที่ต้องการ */
}

.custom-divider {
    margin-left: 30px; /* กำหนดมาร์จินซ้าย */
    margin-right: 30px; /* กำหนดมาร์จินซ้าย */
    max-width: 100%;

}

.custom-dropzone {
    background-color: #E9E9E9;
    height: 100px;
    border: 2px dashed #707070; /* กำหนดขอบ */
    border-radius: 10px; /* กำหนดมุมโค้ง */
}

.custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}

::v-deep(.mx-input) {
  height: 40px;
  border-radius: 8px;

}
</style>
