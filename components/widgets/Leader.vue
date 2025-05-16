<template>
    <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg" >
        <v-col v-if="showCase" cols="12" class="text-end pt-0">
            <v-icon @click="removeWidget" color="#F44336" icon="mdi-delete" size="20"></v-icon>
        </v-col>
        <v-row>
            <v-col cols="12" md="4">
                <span class="text-h6">จังหวัด</span>
                <v-autocomplete  
                    v-model="selectedProvince"
                    placeholder="เลือกจังหวัด"
                    density="compact"
                    item-title="name_th"
                    item-value="id"
                    :items="provices" 
                    variant="outlined"
                    hide-details
                    @update:model-value="getAcademyName()"
                >
                </v-autocomplete>
            </v-col>
            <v-col v-show="props.academyTypes === 'school'" cols="12" md="8">
                <span class="text-h6"> โรงเรียน/สถานศึกษาที่ปฏิบัติ</span>
                <v-autocomplete  
                    v-model="selectedAcademy"
                    placeholder="เลือกโรงเรียน/สถานศึกษาที่ปฏิบัติ"
                    density="compact"
                    item-title="name"
                    item-value="id"
                    :items="academy" 
                    variant="outlined"
                    hide-details
                    @update:model-value="getLeaderName()"
                >
                </v-autocomplete>
            </v-col>
            <v-col v-show="props.academyTypes === 'university'" cols="12" md="8">
                <span class="text-h6"> สถานศึกษา </span>
                <v-autocomplete  
                    v-model="selectedAcademy"
                    placeholder="เลือกสถานศึกษา"
                    density="compact"
                    item-title="name"
                    item-value="id"
                    :items="academy" 
                    variant="outlined"
                    hide-details
                    @update:model-value="getLeaderName()"
                >
                </v-autocomplete>
            </v-col>
            <v-col cols="12">
            <span class="text-h6">รายชื่อแกนนำ</span>
            <v-autocomplete  
                    v-model="selectedLeader"
                    placeholder="เลือกแกนนำ"
                    density="compact"
                    item-title="name"
                    item-value="id"
                    :items="leaders" 
                    variant="outlined"
                    hide-details
                >
                </v-autocomplete>
            </v-col>
    
            <v-col cols="12">
            <span class="text-h6">ระดับปฏิบัติการ</span>
            <v-autocomplete  
                    v-model="selectedLevel"
                    placeholder="เลือกแกนนำ"
                    density="compact"
                    item-title="name"
                    item-value="_id"
                    :items="levels" 
                    variant="outlined"
                    hide-details
                    @update:model-value="exportLeaderData()"
                >
                </v-autocomplete>
            </v-col>
        </v-row>
        <!-- priority -->
        <v-col cols="4" class="px-0">
            <Priority 
                v-model="selectedPriority" 
                @handlePriority="handlePriority"
            />
            
        </v-col>
    </v-card>
</template>
<script setup>
import Priority from './_WidgetPriority.vue';
const props = defineProps({
    academyTypes: {
        type: String,
        default: 'school'
    },
    showCase: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'low',
    }
})
const emit = defineEmits("leaderData",'widgetPriority', 'deleteWidget');
const provices = ref([]);
const academy = ref([]);
const leaders = ref([]);
const levels = ref([]);
const selectedProvince = ref(null);
const selectedAcademy = ref(null);
const selectedLeader = ref(null);
const selectedLevel = ref(null);
const selectedPriority = ref(props.priority);
const types = ref([
    { name: "โรงเรียน", key:true ,value: "school" },
    { name: "มหาวิทยาลัย", key:false ,value: "university" },
]);
function handlePriority() {
    // console.log('ส่งค่า widget Priority:', selectedPriority.value)
    emit('widgetPriority',selectedPriority.value)
};
function removeWidget() {
    emit('deleteWidget')
};
function exportLeaderData() {
    let data = {
        province: selectedProvince.value,
        academy: selectedAcademy.value,
        leader: selectedLeader.value,
        level : selectedLevel.value
    }
    console.log("leaderData === ",data);
    emit("leaderData", data);
};
async function getProvicesSelector() {
    provices.value = await getProvinces()
};
async function getAcademyName() {
    if (selectedProvince.value)  {
        selectedAcademy.value = null
        selectedLeader.value = null
        let school = types.value.find(academy => academy.value === props.academyTypes).key
        console.log("academyKey === ", school);
        let id = selectedProvince.value 
        academy.value = await getAcademyNames(id, school)
        console.log("Academy === ", academy.value);
    } else {
        selectedAcademy.value = null
        selectedLeader.value = null
        academy.value = []
    }
};
async function getLeaderName() {
    if (selectedAcademy.value)  {
        selectedLeader.value = null
        // let id = selectedAcademy.value 
        leaders.value = await getLeaderNames(selectedAcademy.value)
        console.log("Leaders === ", leaders.value);
    } else {
        selectedLeader.value = null
        leaders.value = []
    }
};
onMounted(async () => {
    await getProvicesSelector();
    levels.value = await getLevels();
    console.log("levels === ",levels.value );
    
    // provices.value = await getProvinces()
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
