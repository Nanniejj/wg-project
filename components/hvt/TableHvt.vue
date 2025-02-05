<template>
    <v-container>
        <v-row>
            <v-col class="text-right">
                <v-btn color="#529B41" prepend-icon="mdi-plus" @click="dialog = true">เพิ่มรายชื่อ</v-btn>
                <v-btn color="#AEE0E8" class="ml-2 base-color" prepend-icon="mdi-file-import">Import CSV</v-btn>
            </v-col>
        </v-row>

        <v-data-table :items="users" :headers="[
            { title: 'Users', key: 'name' },
            { title: 'กลุ่ม/เครือข่าย', key: 'group' },
            { title: 'Date', key: 'date' },
            { title: 'Team', key: 'team' },
            { title: 'Action', key: 'actions', sortable: false }
        ]">
         <template v-slot:item.name="{ item }">
                <div> <v-avatar icon="mdi-account" color="secondary" class="mr-2"></v-avatar> {{ item.name }}</div>
            </template>
            <template v-slot:item.team="{ item }">
                <v-chip class="mr-1 my-1" variant="flat" :color="getTeamColorSoft(item.team)">Team {{
                    item.team }}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil-outline" size="small" variant="text" color="#4DA3D9"></v-btn>
                <v-btn icon="mdi-delete" size="small" variant="text" color="#404040"></v-btn>
                <v-btn variant="outlined" size="small">View</v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="80%">
            <v-card>
                <v-card-title>ข้อมูลบุคคล</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <div class="text-center pa-2 mb-2">
                                <v-file-upload density="comfortable" clearable ></v-file-upload>
                            </div>
                        </v-col>
                        <v-col>
                            <v-text-field label="ชื่อ - สกุล" v-model="newUser.name" variant="outlined"
                                density="compact"></v-text-field>
                            <v-select label="กลุ่ม" :items="['กลุ่มทุนต่างชาติ', 'กลุ่มจุดประเด็น', 'กลุ่มแพร่กระจาย']"
                                density="compact" v-model="newUser.group" variant="outlined"></v-select>
                            <!-- <v-text-field label="Social" v-model="newUser.social" variant="outlined"></v-text-field> -->
                            <div v-for="(social, index) in newUser.social" :key="index" class="">
                                <v-text-field label="Social" v-model="newUser.social[index]" class="mr-2 my-2"
                                    variant="outlined" density="compact"         hide-details
                                    ></v-text-field>

                            </div>
                            <div class="text-right mb-3">
                                <v-btn color="#46AFC7" @click="addSocialField" class="mr-1" density="compact" height="30"> <v-icon
                                        icon="mdi-plus"></v-icon></v-btn>
                                <v-btn color="#46AFC7" @click="removeSocialField" density="compact" height="30"> <v-icon
                                        icon="mdi-minus" color="white"></v-icon></v-btn>
                            </div>
                            <v-select label="Team" :items="['C', 'D', 'F', 'G', 'E']"
                                v-model="newUser.team" variant="outlined" density="compact"   ></v-select>
                            <v-textarea label="รายละเอียด" v-model="newUser.description"
                                variant="outlined"></v-textarea>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" @click="addUser" >บันทึก</v-btn>
                    <v-btn color="red" @click="dialog = false">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
const { getTeamColorSoft } = useColors();
import { shallowRef } from 'vue'

const users = ref([
    { id: 1, name: 'Users01', group: 'กลุ่มทุนต่างชาติ', date: '04 ก.พ. 2568', team: 'C' },
    { id: 2, name: 'Users02', group: 'กลุ่มจุดประเด็น', date: '04 ก.พ. 2568', team: 'D' },
    { id: 3, name: 'Users03', group: 'กลุ่มสร้างกระแสสั่นยายาวชน', date: '04 ก.พ. 2568', team: 'F' },
    { id: 4, name: 'Users04', group: 'กลุ่มจุดประกาย', date: '04 ก.พ. 2568', team: 'G' },
    { id: 5, name: 'Users05', group: 'กลุ่มแพร่กระจาย', date: '04 ก.พ. 2568', team: 'E' },
    { id: 6, name: 'Users06', group: 'กลุ่มทุนต่างชาติ', date: '04 ก.พ. 2568', team: 'C' },
    { id: 7, name: 'Users07', group: 'กลุ่มจุดประเด็น', date: '04 ก.พ. 2568', team: 'D' },
    { id: 8, name: 'Users08', group: 'กลุ่มสร้างกระแสสั่นยายาวชน', date: '04 ก.พ. 2568', team: 'F' },
    { id: 9, name: 'Users09', group: 'กลุ่มจุดประกาย', date: '04 ก.พ. 2568', team: 'G' },
    { id: 10, name: 'Users10', group: 'กลุ่มแพร่กระจาย', date: '04 ก.พ. 2568', team: 'E' }
]);
const dialog = ref(false);
const newUser = ref({ name: '', group: '', social: [''], team: 'C', description: '' });

const addSocialField = () => {
    newUser.value.social.push('');
};
const removeSocialField = (index) => {
  if (newUser.value.social.length > 1) {
    newUser.value.social.splice(index, 1);
  }
};
const addUser = () => {
  users.value.push({
    id: users.value.length + 1,
    name: newUser.value.name,
    group: newUser.value.group,
    date: new Date().toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' }),
    team: newUser.value.team,
  });
  dialog.value = false;
  newUser.value = { name: '', group: '', social: [''], team: 'Team C', description: '' };
};
</script>
<style>
.v-file-upload-title {
    font-size: 15px;
    font-weight: 500;
    color: rgb(105, 105, 105);
}</style>