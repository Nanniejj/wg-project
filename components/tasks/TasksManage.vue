<template>
    <div>
        <div class="font-title font-weight-bold base-color">Tasks Management</div>
        <div v-if="!editTask" class="px-md-10">
            <div class="mt-3 text-topic">แผนงานทั้งหมด</div>
            <v-data-table 
                v-model:items-per-page="itemsPerPage"
                :headers="headers" 
                :items="tasks" 
                :mobile="isMobile" 
                class="elevation-1"
            >
                <template #item.mission="{ item }">
                    <div class="font-weight-medium text-topic">{{ item.mission }}</div>
                </template>

                <template #item.name="{ item }">
                    <div>{{ item.name }}</div>
                </template>

                <template #item.description="{ item }">
                    <div>{{ item.description }}</div>
                </template>

                <template #item.assign_team="{ item }">
                    <!-- <div>{{item.assign_team}}</div> -->
                    <v-chip v-for="(team, i) in item.assign_team" :key="i" class="mr-1 my-1" variant="flat"
                        :color="getTeamColorSoft(team.replace('Team ', ''))">
                        
                            <v-tooltip text="ส่งแล้ว" v-if="team.send" location="top">
                           
                                <template v-slot:activator="{ props }">     <span class="text-black" v-bind="props">Team {{ team }} </span>
                                    <v-icon color="green" v-bind="props" size="15">mdi-check</v-icon> </template>
                            </v-tooltip>

                            <v-tooltip v-else text="ยังไม่ส่ง" location="top">
                                <template v-slot:activator="{ props }">
                                    <span class="text-black" v-bind="props">Team {{ team }} </span>
                                    <v-icon color="red" v-bind="props" size="15">mdi-close</v-icon>
                                </template>
                            </v-tooltip>
                    </v-chip>
                </template>

                <template #item.create_date="{ item }">
                    <div>{{ formatDate(item.create_date)  }} {{ }}</div>
                </template>

                <template #item.ps="{ item }">
                    <div>-</div>
                </template>

                <template #item.manage="{ item }">
                    <v-btn icon variant="text" @click="openEditTask(item)">
                        <v-icon size="20" color="#2A3547">mdi-pencil</v-icon>
                    </v-btn>
                    
                    <!-- <v-btn icon variant="text">
                        <v-icon size="20" color="#2A3547">mdi-delete</v-icon>
                    </v-btn> -->
                </template>
            </v-data-table>
        </div>
        <UpdateTask v-else 
            :selectedTask="selectedTask"
            :hvtTargets="hvtTargets"
            @closeEdit = "closeEditTask"
        />
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import UpdateTask from "./UpdateTask.vue";
const { getTeamColorSoft } = useColors();
const headers = ref([
    { title: "Mission", value: "mission", align: "start", },
    { title: "ชื่อแผนงาน", value: "name", align: "start" },
    { title: "รายละเอียด", value: "description", align: "start", },
    { title: "หน่วยงานที่รับผิดชอบ", value: "assign_team", align: "start" },
    { title: "วันที่สร้าง", value: "create_date", align: "start", },
    { title: "หมายเหตุ", value: "ps", align: "start", },
    { title: "จัดการ", value: "manage", align: "end", },
]);

const headersMockup = ref([
    { title: "Mission", value: "mission", align: "start", },
    { title: "ชื่อแผนงาน", value: "name", align: "start" },
    { title: "รายละเอียด", value: "datail", align: "start", },
    { title: "หน่วยงานที่รับผิดชอบ", value: "team", align: "start" },
    { title: "วันที่สร้าง", value: "date", align: "start", },
    { title: "หมายเหตุ", value: "ps", align: "start", },
    { title: "จัดการ", value: "manage", align: "end", },
]);

const itemsPerPage = ref(100)
const items = ref([
    {
        name: "ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย",
        datail: "",
        date: "12/10/67",
        mission: "R1",
        ps: "",
        manage: "",
        check: [
            {
                team: 'Team C',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย A",
                        editable: false,
                        url: ['https://www.youtube.com/', 'https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/']
                    },
                ]
            },
            {
                team: 'Team D',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/styles/display/#visibility']
                    }
                ]
            },
            {
                team: 'Team E',
                send: false,
                contents: [
                    {
                        hvt: "เป้าหมาย D",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/']
                    },

                ]
            },
                
            {
                team: 'Team F',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย B",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/styles/display/#visibility']
                    },

                ]
                
            },
            {
                team: 'Team G',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/longbeach_chaam/', 'https://www.youtube.com/']
                    }
                ]
            },
        ]
    },
    {
        name: "เพจ ISOC ประจำจังหวัด",
        date: "12/10/67",
        datail: "",
        mission: "R2",
        team: ["C", "D"],
        ps: "",
        manage: "",
        check: [
            {
                team: 'Team C',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย A",
                        editable: false,
                        url: ['https://www.youtube.com/', 'https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/']
                    },
                ]
            },
            {
                team: 'Team D',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/styles/display/#visibility']
                    }
                ]
            },
            {
                team: 'Team E',
                send: false,
                contents: [
                    {
                        hvt: "เป้าหมาย D",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/']
                    },

                ]
            },
                
            {
                team: 'Team F',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย B",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/styles/display/#visibility']
                    },

                ]
                
            },
            {
                team: 'Team G',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/longbeach_chaam/', 'https://www.youtube.com/']
                    }
                ]
            },
        ]
    },
    {
        name: "สนับสนุนเครือข่าย ภาคประชาสังคม",
        datail: "",
        date: "12/10/67",
        mission: "R11",
        team: ["C", "D", "E", "F", "G"],
        ps: "",
        manage: "",
        check: [
            {
                team: 'Team C',
                send: false,
                contents: [
                    {
                        hvt:"เป้าหมาย A",
                        editable: false,
                        url: ['https://www.youtube.com/', 'https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/']
                    },
                ]
            },
            {
                team: 'Team D',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/styles/display/#visibility']
                    }
                ]
            },
            {
                team: 'Team E',
                send: false,
                contents: [
                    {
                        hvt: "เป้าหมาย D",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/']
                    },

                ]
            },
                
            {
                team: 'Team F',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย B",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/styles/display/#visibility']
                    },

                ]
                
            },
            {
                team: 'Team G',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/longbeach_chaam/', 'https://www.youtube.com/']
                    }
                ]
            },
        ]
    },
    {
        name: "สนับสนุนเครือข่าย กลุ่มโอกาส",
        datail: "",
        date: "12/10/67",
        mission: "R12",
        team: ["C", "D", "E"],
        ps: "",
        manage: "",
        check: [
            {
                team: 'Team C',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย A",
                        editable: false,
                        url: ['https://www.youtube.com/', 'https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/']
                    },
                ]
            },
            {
                team: 'Team D',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย C",
                        editable: false,
                        url: ['https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/styles/display/#visibility']
                    }
                ]
            },
            {
                team: 'Team E',
                send: false,
                contents: [
                    {
                        hvt: "เป้าหมาย D",
                        editable: false,
                        url: ['https://vuetifyjs.com/en/']
                    },

                ]
            },

        ]
    },
    {
        name: "ตอบโต้ประเด็นประจำวัน",
        datail: "",
        date: "12/10/67",
        mission: "R13",
        team: ["C"],
        ps: "",
        manage: "",
        check: [
            {
                team: 'Team C',
                send: true,
                contents: [
                    {
                        hvt:"เป้าหมาย A",
                        editable: false,
                        url: ['https://www.youtube.com/', 'https://www.instagram.com/p/DHd1foVpYNO/', 'https://vuetifyjs.com/en/']
                    },
                ]
            },
        ]
    },
]);
const hvtTargets = ref([])
const editTask = ref(false);
const selectedTask = ref();
const openEditTask = (task) =>{
    console.log("task === ",task.taskDetail);
    selectedTask.value = task
    editTask.value = true
};
const closeEditTask = () =>{
    selectedTask.value = null
    editTask.value = false
};
// function formatDate(isoString) {
//     const date = new Date(isoString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนใน JavaScript เริ่มที่ 0
//     const year = String(date.getFullYear() + 543).slice(-2); // แปลงเป็น พ.ศ.

//     return `${day}/${month}/${year}`;
// }
function formatTeams(item){
    return item.map(team => team.name);
}
const tasks = ref([]);
const teams = ref([]);
function sortedData(data) {
    return [...data].sort((a, b) =>
        a.mission.localeCompare(b.mission, undefined, { numeric: true })
    );
};
onMounted(async () => {
    try {
        tasks.value = await getAllTasks();
        tasks.value.forEach(task => {
            if (task.assigned_teams.length !== 0) {
                task.assign_team = formatTeams(task.assigned_teams)
            }else{
                // task.assigned_teams = task.assign_team
            }
        });
        tasks.value = sortedData(tasks.value)
        hvtTargets.value = await fetchUserHvt();
    } catch (error) {
        tasks.value = items.value;
        headers.value = headersMockup.value;
    }
});

const isMobile = ref(false);
if (process.client) {
    isMobile.value = window.innerWidth < 860;

    const updateIsMobile = () => {
        isMobile.value = window.innerWidth < 960;
    };

    watchEffect(() => {
        window.addEventListener("resize", updateIsMobile);
        return () => {
            window.removeEventListener("resize", updateIsMobile);
        };
    });
}
</script>

<style></style>