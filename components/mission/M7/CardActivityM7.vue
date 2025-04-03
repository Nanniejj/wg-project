<template>
    <div>
        <!-- ข้อมูลรวม -->
        <v-row>
            <v-col cols="12" md="4" class="text-h6">
                <v-card class="pa-6 card-stat-shadow h-100 ">
                    <div class="my-auto">
                        <v-card-title>ทั้งหมด <strong>{{ total }}</strong></v-card-title>
                        <hr class="border border-e-xl mb-2" :style="{ backgroundColor: getTeamColor('all') }"
                            style="height: 4px;border: 0px;">
                        <div>
                            <div class="text-h6">จัดตั้ง<span class="float-right text-h6"> {{ established }}</span>
                            </div>
                            <div class="text-h6">สนับสนุน<span class="float-right text-h6"> {{ supported }}</span></div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <!-- คะแนนของแต่ละทีม -->
            <v-col cols="12" md="8">
                <v-card class="pa-6 h-100  card-stat-shadow font-title mb-2">
                    <v-row class="my-auto my-5">
                        <v-col v-for="team in teams" :key="team.name">
                            <div class="text-h6">{{ team.name }}<span class="float-right text-h6"> {{ team.total
                                    }}</span>
                            </div>
                            <!-- {{getTeamColor(team.short)}} -->
                            <hr class="border border-e-xl" :style="{ backgroundColor: getTeamColor(team.short) }"
                                style="height: 4px;">
                            <div class="text-right mt-2 text-h6"> {{ team.established }}</div>
                            <div class="text-right text-h6"> {{ team.supported }}</div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- บัตรรายละเอียด -->
        <v-row>
            <v-col v-for="team in teams" :key="team.name" cols="12" md="4">
                <v-card class="pa-4 base-color card-stat-shadow" :style="{ backgroundColor: team.bgColor }">

                    <v-row>
                        <v-col class="px-10">
                            <v-card-title>
                                <v-chip density="compact" size="x-large" color="white" variant="flat"> <span
                                        class="font-weight-bold base-color">ชื่อเครือข่าย</span></v-chip>
                                <v-chip :color="getTeamColor(team.short)" dark class="ml-2" variant="flat">{{ team.short
                                    }}</v-chip>
                            </v-card-title>
                            <div class="base-color">
                                <p class="base-color">แทนนำเครือข่าย: นาย A</p>
                                <p class="base-color">จำนวนสมาชิก: 52</p>
                            </div>
                            <!-- <v-chip color="yellow darken-2" variant="flat">รักษาราชย์</v-chip> -->
                            <v-chip v-if="team.action === 'support'" color="#FFF8E6" class="ml-2"
                                variant="flat">สนับสนุน</v-chip>
                            <v-chip v-else color="#FFF8E6" class="ml-2" variant="flat">จัดตั้ง</v-chip>
                        </v-col>
                        <v-col class="text-center my-auto">

                            <v-avatar size="60" icon="mdi-account">
                                <v-img :lazy-src="`./Mask Group 87.png`" :src="`./Mask Group 87.png`"
                                    class="bg-grey-lighten-2 w-100" cover></v-img>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from "vue";
const { getTeamColor, getMissionColor } = useColors();

// ข้อมูลหลัก
const total = ref(40);
const established = ref(26);
const supported = ref(26);

const teams = ref([
    { name: "Team C", short: "C", total: 30, established: 10, supported: 20, color: "purple", bgColor: "#EDE7F6", action: "support" },
    { name: "Team D", short: "D", total: 4, established: 3, supported: 1, color: "green", bgColor: "#E8F5E9", action: "establish" },
    { name: "Team E", short: "E", total: 2, established: 1, supported: 1, color: "orange", bgColor: "#FFF3E0", action: "support" },
    { name: "Team F", short: "F", total: 2, established: 0, supported: 2, color: "blue", bgColor: "#E3F2FD", action: "support" },
    { name: "Team G", short: "G", total: 2, established: 1, supported: 1, color: "red", bgColor: "#FFEBEE", action: "support" },
]);
</script>
