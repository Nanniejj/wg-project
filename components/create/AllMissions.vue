<template>
    <v-row>
        <v-col v-if="!openCreateNewMission" cols="12">
            <!-- header -->
            <v-row>
                <v-col class="font-title2">
                    ภารกิจทั้งหมด
                </v-col>
                <v-col cols="auto">
                    <v-btn
                        class="text-none text-subtitle-1"
                        rounded
                        color="#2A3547"
                        size="small"
                        variant="flat"
                        @click="openCreateMission"
                    >
                        สร้างภารกิจ
                    </v-btn>
                </v-col>
            </v-row>
    
            <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>
            
            <!-- mission cards -->
            <v-row v-if="missions.length !== 0">
                <v-col v-for="(mission,index) in missions" :key="'mission- ' + index" cols="12">
                  <v-card class="pa-3 card-stat-shadow" border="sm" rounded="lg">
                    <v-row class="d-flex align-center justify-space-between">
                        <v-col class="d-flex align-center">
                            <v-avatar
                                v-if="getMissionImage(mission.code)" 
                                rounded="lg"
                                size="80"
                            >
                                <v-img :src="getMissionImage(mission.code)"></v-img>
                            </v-avatar>
                            <v-avatar
                                v-else
                                rounded="lg"
                                size="80"
                                :color="getMissionColor(mission.code)"
                            >
                                <span style="font-size: 26px; font-weight: 800;">{{ mission.code }}</span>
                            </v-avatar>
                            <v-col class="pa-0">
                                <v-card-title class="truncate-text-1">
                                    <span class="text-black pe-2">{{ mission.code }}</span>
                                    <span>{{ mission.name }}</span>
                                </v-card-title>
    
                                <!-- admin mission -->
                                <!-- <v-card-subtitle class="d-flex ga-2">
                                    <span class="text-capitalize">Assign (Admin mission) : </span>
                                    <span class="avatar-group px-2">
                                        <v-avatar v-for="(admin, index) in mission.admin_mission" :key="index" size="25" :style="{ zIndex: mission.admin_mission.length - index, backgroundColor: admin.color_code  }">
                                            <span class="avatar-text">{{ admin.name }}</span>
                                        </v-avatar>
                                    </span>
                                </v-card-subtitle> -->
    
                                <!-- teams -->
                                <v-card-subtitle>
                                    <span class="text-capitalize">Assign : </span>
                                    <span class="avatar-group px-2">
                                        <v-avatar v-for="(team, index) in mission.assigned_team" :key="index" size="25" :style="{ zIndex: mission.assigned_team.length - index, backgroundColor: team.color_code  }">
                                            <span class="avatar-text">{{ team.name }}</span>
                                        </v-avatar>
                                    </span>
                                </v-card-subtitle>
                                
                            </v-col>
                        </v-col>
                        <v-col cols="auto" class="">
                            <v-chip size="small" :color="getColorPriority(mission.priority)">
                                {{ mission.priority }}
                            </v-chip>
                        </v-col>
                    </v-row>
                  </v-card>
                </v-col>
            </v-row>
            <v-row v-else class="justify-center py-5 text-grey-lighten-1">
                - ยังไม่มีข้อมูลภารกิจ กดปุ่ม "สร้างภารกิจ" เพื่อสร้างภารกิจ -
            </v-row>
        </v-col>
        <v-col v-else cols="12">
            <CreateNewMission  @close="closeCreateMission"/>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref } from "vue";
import CreateNewMission from "./CreateNewMission.vue";
const { getTeamColor, getMissionColor, getColorPriority, getMissionImage } = useColors();
const missions = ref([
    {
        code: 'M1',
        name: 'การปฏิบัติทางไซเบอร์',
        priority:'medium',
        assigned_team: [
            { name: 'C', color_code: '#c8e6c9' },
        ],
        admin_mission: [
            { name: 'Si', color_code: '#f8bbd0' },
            { name: 'Ad', color_code: '#b0bec5' },
        ]
    },
    {
        code: 'R1',
        name: 'ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย',
        priority:'high',
        assigned_team: [
            { name: 'C', color_code: '#c8e6c9' },
            { name: 'D', color_code: '#d1c4e9' },
            { name: 'E', color_code: '#fff9c4' },
        ],
        admin_mission: [
            { name: 'Si', color_code: '#f8bbd0' },
            { name: 'Ad', color_code: '#b0bec5' },
        ]
    },
    {
        code: 'R2',
        name: 'เพจ ISOC ประจำจังหวัด',
        priority:'low',
        assigned_team: [
            { name: 'C', color_code: '#c8e6c9' },
            { name: 'D', color_code: '#d1c4e9' },
        ],
        admin_mission: [
            { name: 'Ad', color_code: '#b0bec5' },
        ]
    }
]);
const users = ref([
    { initial: 'Ad', color: '#b0bec5' },
    { initial: 'C', color: '#c8e6c9' },
    { initial: 'D', color: '#d1c4e9' },
    { initial: 'E', color: '#fff9c4' },
    { initial: 'F', color: '#b3e5fc' },
    { initial: 'G', color: '#f8bbd0' },
]);
const openCreateNewMission = ref(false);

function openCreateMission() {
    openCreateNewMission.value = true;
}
function closeCreateMission() {
    openCreateNewMission.value = false;
}
</script>
<style scoped>
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group .v-avatar {
  margin-left: -10px;
  /* border: 2px solid white; */
  background-color: #ccc;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* เพิ่มเงา */
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-text{
    color: black;
    font-size: 12px;
}
/* ปรับ background แต่ละ avatar ถ้าคุณใช้สีจาก data */
/* .avatar-group .v-avatar:nth-child(1) { background-color: #b0bec5; }
.avatar-group .v-avatar:nth-child(2) { background-color: #c8e6c9; }
.avatar-group .v-avatar:nth-child(3) { background-color: #d1c4e9; }
.avatar-group .v-avatar:nth-child(4) { background-color: #fff9c4; }
.avatar-group .v-avatar:nth-child(5) { background-color: #b3e5fc; }
.avatar-group .v-avatar:nth-child(6) { background-color: #f8bbd0; } */
</style>