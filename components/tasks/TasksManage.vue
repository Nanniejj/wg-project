<template>
    <div>
        <div class="font-title font-weight-bold base-color">Tasks Management</div>
        <div class="px-md-10">
            <div class="mt-3 text-topic">แผนงานทั้งหมด</div>
            <v-data-table :headers="headers" :items="items" :mobile="isMobile" class="elevation-1">
                <template #item.mission="{ item }">
                    <div class="font-weight-medium text-topic">{{ item.mission }}</div>
                </template>

                <template #item.name="{ item }">
                    <div>{{ item.name }}</div>
                </template>

                <template #item.datail="{ item }">
                    <div>-</div>
                </template>

                <template #item.team="{ item }">
                    <v-chip v-for="(team, i) in item.check" :key="i" class="mr-1 my-1" variant="flat"
                        :color="getTeamColorSoft(team.team)">
                        
                            <v-tooltip text="ส่งแล้ว" v-if="team.send" location="top">
                           
                                <template v-slot:activator="{ props }">     <span class="text-black" v-bind="props">Team {{ team.team }} </span>
                                    <v-icon color="green" v-bind="props" size="15">mdi-check</v-icon> </template>
                            </v-tooltip>

                            <v-tooltip v-else text="ยังไม่ส่ง" location="top">
                                <template v-slot:activator="{ props }">
                                    <span class="text-black" v-bind="props">Team {{ team.team }} </span>
                                    <v-icon color="red" v-bind="props" size="15">mdi-close</v-icon>
                                </template>
                            </v-tooltip>
                    </v-chip>
                </template>

                <template #item.date="{ item }">
                    <div>{{ item.date }}</div>
                </template>

                <template #item.ps="{ item }">
                    <div>-</div>
                </template>

                <template #item.manage="{ item }">
                    <v-btn icon variant="text">
                        <v-icon size="20" color="#2A3547">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="text">
                        <v-icon size="20" color="#2A3547">mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const { getTeamColorSoft } = useColors();
const headers = ref([
    { title: "Mission", value: "mission", align: "start", },
    { title: "ชื่อแผนงาน", value: "name", align: "start" },
    { title: "รายละเอียด", value: "datail", align: "start", },
    { title: "หน่วยงานที่รับผิดชอบ", value: "team", align: "start" },
    { title: "วันที่สร้าง", value: "date", align: "start", },
    { title: "หมายเหตุ", value: "ps", align: "start", },
    { title: "จัดการ", value: "manage", align: "end", },
]);



const items = ref([
    {
        name: "ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย",
        datail: "",
        date: "12/10/67",
        mission: "R1",
        team: ["C", "D", "E", "F", "G"],
        ps: "",
        manage: "",
        check: [
            { team: 'C', send: true },
            { team: 'D', send: true },
            { team: 'E', send: false },
            { team: 'F', send: true },
            { team: 'G', send: true },
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
            { team: 'C', send: true },
            { team: 'D', send: true },
            { team: 'E', send: false },
            { team: 'F', send: true },
            { team: 'G', send: true },
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
            { team: 'C', send: false },
            { team: 'D', send: true },
            { team: 'E', send: false },
            { team: 'F', send: true },
            { team: 'G', send: true },
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
            { team: 'C', send: true },
            { team: 'D', send: true },
            { team: 'E', send: false },

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
            { team: 'C', send: true },

        ]
    },
]);
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