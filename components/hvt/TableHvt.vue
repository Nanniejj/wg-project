<template>
    <v-container>
        <v-row>
            <v-col class="text-right">
                <v-btn color="#529B41" prepend-icon="mdi-plus" @click="openDialog()">เพิ่มรายชื่อ</v-btn>
                <v-btn color="#AEE0E8" class="ml-2 base-color" prepend-icon="mdi-file-import">Import CSV</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="search" label="ค้นหารายชื่อ" variant="outlined"
                    prepend-inner-icon="mdi-magnify"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-select v-model="searchGroup" :items="groups" label="กรองตามกลุ่ม" clearable
                    variant="outlined"></v-select>
            </v-col>
            <v-col cols="12" md="4">
                <v-select v-model="searchTeam" :items="teams" label="กรองตามทีม" clearable
                    variant="outlined"></v-select>
            </v-col>
        </v-row>
        <v-data-table :items="users" :headers="headers" :search="search || searchGroup || searchTeam">
            <template v-slot:item.name="{ item }">
                <div>
                    <v-avatar icon="mdi-account" size="45" color="secondary" class="mr-2 my-2"
                        :image="URL_HOST + item.photo" v-if="item.photo"></v-avatar>
                    {{ item.name }}
                </div>
            </template>
            <template v-slot:item.team="{ item }">
                <v-chip class="mr-1 my-1" variant="flat" :color="getTeamColorSoft(item.team)">
                    Team {{ item.team }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil-outline" size="small" variant="text" color="#4DA3D9"
                    @click="openDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" size="small" variant="text" color="#404040"
                    @click="confirmDelete(item)"></v-btn>
                <v-btn variant="outlined" size="small">View</v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="85%">
            <v-card class="pa-5">
                <v-card-title>ข้อมูลบุคคล</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col align="center" md="6">
                            <div class="text-center pa-2 mb-2">
                                <v-file-input v-model="newUser.photo" label="อัปโหลดรูป" accept="image/*"
                                    variant="outlined" @change="previewImage"></v-file-input>
                                <div v-if="imagePreview" class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="imagePreview" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                                <div v-else-if="newUser.photo && typeof newUser.photo === 'string'"
                                    class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="URL_HOST + newUser.photo" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                            </div>
                        </v-col>
                        <v-col md="6">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field label="ชื่อ" v-model="newUser.first_name"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="สกุล" v-model="newUser.last_name"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="ชื่อเล่น" v-model="newUser.name"
                                        variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-select label="กลุ่ม" :items="groups" v-model="newUser.group"
                                variant="outlined"></v-select>

                            <div v-for="(social, index) in newUser.social" :key="index">
                                <v-text-field label="Social URL" v-model="social.url" variant="outlined"></v-text-field>
                                <!-- <v-select label="แพลตฟอร์ม" :items="['twitter', 'instagram']" v-model="social.source"
                                    variant="outlined"></v-select> -->
                            </div>

                            <div class="text-right mb-3">
                                <v-btn color="#46AFC7" @click="addSocialField" class="mr-1">
                                    <v-icon icon="mdi-plus"></v-icon>
                                </v-btn>
                                <v-btn color="red" @click="removeSocialField(newUser.social.length - 1)">
                                    <v-icon icon="mdi-minus"></v-icon>
                                </v-btn>
                            </div>

                            <v-select label="Team" :items="teams" v-model="newUser.team" variant="outlined"></v-select>
                            <v-combobox v-model="newUser.keyword" label="Keyword" multiple chips clearable
                                variant="outlined" hint="กรอกคำแล้วกด Enter เพื่อเพิ่ม" persistent-hint
                                class="mb-3"></v-combobox>

                            <v-textarea label="รายละเอียด" v-model="newUser.description"
                                variant="outlined"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" @click="confirmOk">บันทึก</v-btn>
                    <v-btn color="red" @click="dialog = false">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { fetchUserHvt, createUserHvt, updateUserHvt } from "@/api";
const { getTeamColorSoft } = useColors();
const { $swal } = useNuxtApp();
const search = ref('');
const searchGroup = ref('');
const searchTeam = ref('');
const users = ref([]);
const dialog = ref(false);
const imagePreview = ref(null);
const groups = ["กลุ่มทุนต่างชาติ", "กลุ่มจุดประเด็น", "กลุ่มแพร่กระจาย", 'สร้างกระแสชี้นำเยาวชน'];
const teams = ["C", "D", "F", "G", "E"];
const headers = [
    { title: 'users', key: 'name' },
    { title: 'ชื่อ', key: 'first_name' },
    { title: 'นามสกุล', key: 'last_name' },
    { title: 'กลุ่ม/เครือข่าย', key: 'group' },
    { title: 'Team', key: 'team' },
    { title: 'Action', key: 'actions', sortable: false }
]

const newUser = ref({});

const openDialog = (user = null) => {
    if (user) {
        newUser.value = {
            ...user,
            keyword: Array.isArray(user.keyword) ? user.keyword : [],
            social: Array.isArray(user.social)
                ? user.social.map(s => (typeof s === "string" ? { url: s } : s))
                : [{ url: "" }]
        };
        imagePreview.value = null;
    } else {
        newUser.value = {
            first_name: "",
            last_name: "",
            name: "",
            group: "",
            keyword: [],
            social: [{ url: "" }],
            team: "C",
            description: "",
            photo: null
        };
        imagePreview.value = null;
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
            saveUser();
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
const addSocialField = () => {
    console.log('users', newUser.value._id);

    if (newUser && newUser.value._id) {
        newUser.value.social.push({ url: "", source: "" });

    } else {
        newUser.value.social.push({ url: "", source: "" });
    }
};

const removeSocialField = (index) => {
    console.log('index', index);

    if (newUser.value.social.length > 1) {
        newUser.value.social.splice(index, 1);
    }
};
const saveUser = async () => {
    // confirmDelete()
    const formData = new FormData();
    Object.keys(newUser.value).forEach(key => {
        if (['social', 'keyword', 'darkside'].includes(key)) {
            formData.append(key, JSON.stringify(newUser.value[key]));
        } else {
            formData.append(key, newUser.value[key]);
        }
    });
    if (newUser.value._id) {
        await updateUserHvt(formData);
    } else {
        await createUserHvt(formData);
    }
    $swal.fire({
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
        icon: "success",
        timer: 2000, // ปิดอัตโนมัติใน 2 วินาที (2000 มิลลิวินาที)
        showConfirmButton: false // ซ่อนปุ่ม OK
    });
    users.value = await fetchUserHvt();

    dialog.value = false;
};
const deleteUser = async (item) => {
    console.log('newUser._id', item._id);

    try {
        await deleteUserHvt({ _id: item._id });
        $swal.fire({
            title: "ลบข้อมูลสำเร็จ!",
            text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
            icon: "success",
            timer: 2000, // ปิดอัตโนมัติใน 2 วินาที (2000 มิลลิวินาที)
            showConfirmButton: false // ซ่อนปุ่ม OK
        });
        users.value = await fetchUserHvt();

    } catch (error) {
        $swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง",
            icon: "error",
            timer: 2000, // ปิดอัตโนมัติใน 2 วินาที (2000 มิลลิวินาที)
            showConfirmButton: false // ซ่อนปุ่ม OK
        });
    }
}
onMounted(async () => {
    try {
        users.value = await fetchUserHvt();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});
</script>
<style>
.v-messages__message {
    line-height: 9px;
    font-size: 13px !important;
}
</style>