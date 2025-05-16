<template>
    <v-container>
        {{ dataImport }}
        <v-row>
            <v-col class="text-right">
                <v-btn color="#529B41" prepend-icon="mdi-plus" @click="openDialog()">เพิ่มกลุ่ม</v-btn>
                <v-btn 
                    color="#AEE0E8" 
                    class="ml-2 base-color" 
                    prepend-icon="mdi-file-import"
                    @click="triggerFileInput"
                >Import CSV</v-btn>
                <input
                    ref="fileInput"
                    type="file"
                    accept=".csv, .xlsx"
                    @change="handleFileUpload"
                    style="display: none"
                />
            </v-col>
        </v-row>
    
        <!-- table -->
        <v-data-table :items="groups" :headers="headers"  :search="search||searchGroup||searchTeam">
            <template v-slot:item.index="{ index }">
                <span>{{ index + 1 }}</span>
            </template>
            <template v-slot:item.photo ="{ item }">
                <div>
                    <v-avatar icon="mdi-account" size="45" color="secondary" class="mr-2 my-2"
                        :image="URL_HOST + item.photo" v-if="item.photo">
                    </v-avatar>
                </div>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil-outline" size="small" variant="text" color="#4DA3D9"
                    @click="openDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" size="small" variant="text" color="#404040" @click="confirmDelete(item)"></v-btn>
            </template>
        </v-data-table>

        <!-- add new group or update group pop up -->
        <v-dialog v-model="dialog" max-width="85%" min-height="500px" persistent>
            <v-card class="pa-5">
                <v-card-title class="px-0">ข้อมูลกลุ่ม</v-card-title>
                <v-divider class="border-opacity-75"></v-divider>
                <v-card-text>
                    <v-row>
                        <!-- {{ newGroup }} -->
                        <v-col align="center" md="6">
                            <v-col cols="12">
                                <v-file-input v-model="newGroup.personPhotos" label="อัปโหลดรูป" accept="image/*"
                                    variant="outlined" @change="previewImage"></v-file-input>
                                <div v-if="imagePreview" class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="imagePreview" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                                <div v-else-if="newGroup.photo && typeof newGroup.photo === 'string'"
                                    class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="URL_HOST + newGroup.photo" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                            </v-col>
                        </v-col>
                        <v-col md="6">
                            <v-col cols="12">
                                <v-text-field label="ชื่อกลุ่ม/เครือข่าย" v-model="newGroup.name"
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" @click="confirmOk()">บันทึก</v-btn>
                    <v-btn color="red" @click="dialog = false">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- add new group modal -->
        <!-- <AddNewGroupsModal /> -->
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createGroup, deleteGroup, getGroups, updateGroup } from "../../composables/useApi";
// import AddNewGroupsModal from "../modal/AddNewGroupsModal.vue";
// import { fetchUserHvt, createUserHvt, updateUserHvt } from "@/api";
// const { getTeamColorSoft } = useColors();
const { $swal } = useNuxtApp();
const search = ref('');
const searchGroup = ref('');
const searchTeam = ref('');
// const users = ref([]);
const groups = ref([]);
const dialog = ref(false);
const imagePreview = ref(null);
const option = ref('');
// const groups = ["กลุ่มทุนต่างชาติ", "กลุ่มจุดประเด็น", "กลุ่มแพร่กระจาย", 'สร้างกระแสชี้นำเยาวชน'];
// const teams = ["C", "D", "F", "G", "E"];
const headers = [
    { title: 'ลำดับ', key: 'index', align: 'center' },
    { title: 'ภาพปก', key: 'photo' },
    { title: 'กลุ่ม/เครือข่าย', key: 'name', align: 'center'  },
    { title: 'Action', key: 'actions', sortable: false }
    // { title: 'นามสกุล', key: 'last_name' },
    // { title: 'Team', key: 'team' },
]
const fileInput = ref(null);
const dataImport = ref([]);
const newGroup = ref({});
const URL_HOST = "192.168.1.114:3002";
const openDialog = (group = null) => {
    if (group) {
        newGroup.value = { ...group };
        imagePreview.value = null;
        option.value = "update";
    } else {
        newGroup.value = { name: "", personPhotos: null };
        imagePreview.value = null;
        option.value = "create";
    }
    dialog.value = true;
};

const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        imagePreview.value = URL.createObjectURL(file);
    }
};

const confirmOk = () => {
    $swal.fire({
        title: "คุณต้องการบันทึกข้อมูล ?",
        text: "ยืนยันบันทึกข้อมูล",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#46afc7",
        cancelButtonColor: "#d33",
        //   confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        console.log('result', result, result.isConfirmed);

        if (result.isConfirmed) {
            saveGroup();
        }
    });
}

const confirmDelete = (item) => {
    $swal
        .fire({
            title: "ยืนยันการลบ?",
            text: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#46afc7",
            cancelButtonColor: "#d33",
            // confirmButtonText: "ใช่, ลบเลย!",
            // cancelButtonText: "ยกเลิก",
        })
        .then((result) => {
            if (result.isConfirmed) {
                // ลบข้อมูล
                deleteUser(item)
                // $swal.fire("บันทึกสำเร็จ!", "", "success");
            }
        });
};

const saveGroup = async () => {
    console.log("newGroup.value === ", newGroup.value);
    const formData = new FormData();
    Object.keys(newGroup.value).forEach(key => {
        formData.append(key, newGroup.value[key]);
    });
    if (option.value === "create") {
        console.log("createGroup === ");
        
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); // ดูว่าแนบถูกหรือยัง
        }
        
        await createGroup(formData);
        option.value = null
    } else if (option.value === "update") {
        
        let updateGroupData = {
            name: newGroup.value.name,
            personPhotos: newGroup.value.photo || newGroup.value.personPhotos
        }
        const formUpdateData = new FormData();
        Object.keys(updateGroupData).forEach(key => {
            formUpdateData.append(key, updateGroupData[key]);
        });
        console.log("updateGroup === ");
        await updateGroup(newGroup.value._id, formUpdateData);
        option.value = null
    } else {
        console.error("Invalid option value:", option.value);
        return;
    }
    await fetchGroupsData();
    $swal.fire({
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
        icon: "success",
        timer: 2000, // ปิดอัตโนมัติใน 2 วินาที (2000 มิลลิวินาที)
        showConfirmButton: false // ซ่อนปุ่ม OK
    });
    // users.value = await fetchUserHvt();
    dialog.value = false;
};
const deleteUser = async (item) => {
    console.log('newGroup._id',item._id);
    await deleteGroup(item._id);
    await fetchGroupsData();
}

const triggerFileInput = () => {
  fileInput.value?.click()
}
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
        // 👉 ประมวลผล CSV
        const reader = new FileReader()
        reader.onload = (e) => {
            const csvText = e.target.result
            const parsed = parseCSV(csvText)
            dataImport.value = parsed // เก็บข้อมูลที่แปลงแล้วใน importTopics
            console.log('Parsed CSV:', parsed)
        }
        reader.readAsText(file)

    } else if (fileName.endsWith('.xlsx')) {
        // 👉 ประมวลผล XLSX ด้วย xlsx library (จำเป็นต้องใช้)
        import('xlsx').then(XLSX => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = XLSX.utils.sheet_to_json(worksheet)
                console.log('Parsed XLSX:', json)
                dataImport.value = json // เก็บข้อมูลที่แปลงแล้วใน importTopics
            }
            reader.readAsArrayBuffer(file)
        })
    }else {
        alert('รองรับเฉพาะไฟล์ .csv และ .xlsx เท่านั้น')
    }
    console.log("dataImport.value === ", dataImport.value);
    
    // checkTopicsImport()
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
onMounted(async () => {
    await fetchGroupsData();
});
</script>
<style scoped>
th {
  text-align: center;
}
</style>