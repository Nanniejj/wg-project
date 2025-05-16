<template>
    <div>
        <div class="d-flex align-items-center justify-end mb-3">
            <!-- <date-picker v-model:value="DateRange" range
                class="custom-combobox date-picker date-picker-setting mb-5 mr-3" style="max-width: 270px"
                :disabled-date="disabledBeforeTodayAndAfterMonth" /> -->
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn color="#2a3547" v-bind="props"> <v-icon class="mr-1">mdi-export-variant</v-icon>
                        Export</v-btn>
                </template>
                <v-list>
                    <v-list-item @click="exportPDF">PDF</v-list-item>
                    <v-list-item @click="exportHTML">HTML</v-list-item>
                    <v-list-item @click="exportCSV">CSV</v-list-item>
                    <v-list-item @click="exportExcel">Excel</v-list-item>
                    <v-list-item @click="exportXML">XML</v-list-item>
                    <v-list-item @click="exportJSON">JSON</v-list-item>
                </v-list>
            </v-menu>
        </div>


        <v-card class="py-8 px-5 mb-5 card-stat-shadow">
            <v-row class="d-flex align-end justify-center">
                <v-col cols="12" sm="6" lg="3">
                    <!-- <div style="font-size: 16px">เลือกเดือน</div> -->
                    <date-picker
                        placeholder="Select Month"
                        v-model:value="selectedMonth"
                        class="w-100 custom-height"
                        type="month"
                    />
                        <!-- style="height: 48px;" -->
                        <!-- :disabled-date="disabledBeforeTodayAndAfterMonth" -->
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                    <!-- Mission Selector -->
                    <v-autocomplete v-model="selectedMission" 
                        label="Select Mission" item-title="label"
                        item-value="value"
                        :items="formattedItems" variant="outlined"
                        hide-details
                        density="comfortable"
                    >
                    </v-autocomplete>
                </v-col>
    
                <v-col cols="12" sm="6" lg="3">
                    <!-- Subject Selector -->
                    <v-select 
                        v-model="selectedSubjects" 
                        :items="filteredSubjects" 
                        label="Select Subject" multiple
                        item-title="label" item-value="value" 
                        variant="outlined"
                        hide-details
                        density="comfortable"
                    >
                        <template v-slot:prepend-item>
                            <v-list-item title="Select All" @click="toggleSelectAll">
                                <template v-slot:prepend>
                                    <v-checkbox-btn :model-value="isAllSelected" :indeterminate="isPartiallySelected"
                                        @click.stop="toggleSelectAll">
                                    </v-checkbox-btn>
                                </template>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
        </v-card>
        <hr v-if="selectedMission" class="my-8" />
        <!-- <div class="text-right">
            <ButtonExport />
        </div> -->
        <MissionM1 v-if="selectedMission == 'M1'" :subjectIndex="selectedSubjects" />
        <MissionM2 v-if="selectedMission == 'M2'" :subjectIndex="selectedSubjects" />
        <MissionM3 v-if="selectedMission == 'M3'" :subjectIndex="selectedSubjects" />
        <MissionM4 v-if="selectedMission == 'M4'" :subjectIndex="selectedSubjects" />
        <MissionM5 v-if="selectedMission == 'M5'" :subjectIndex="selectedSubjects" />
        <MissionM6 v-if="selectedMission == 'M6'" :subjectIndex="selectedSubjects" />
        <MissionM7 v-if="selectedMission == 'M7'" :subjectIndex="selectedSubjects" />
        <MissionM8 v-if="selectedMission == 'M8'" :subjectIndex="selectedSubjects" />
        <MissionR1 v-if="selectedMission == 'R1'" :subjectIndex="selectedSubjects" />
        <MissionR2 v-if="selectedMission == 'R2'" :subjectIndex="selectedSubjects" />
        <MissionR3 v-if="selectedMission == 'R3'" :subjectIndex="selectedSubjects" />
        <MissionR4 v-if="selectedMission == 'R4'" :subjectIndex="selectedSubjects" />
        <MissionR5 v-if="selectedMission == 'R5'" :subjectIndex="selectedSubjects" />
        <MissionR6 v-if="selectedMission == 'R6'" :subjectIndex="selectedSubjects" />
        <MissionR7 v-if="selectedMission == 'R7'" :subjectIndex="selectedSubjects" />
        <MissionR8 v-if="selectedMission == 'R8'" :subjectIndex="selectedSubjects" />
        <MissionR9 v-if="selectedMission == 'R9'" :subjectIndex="selectedSubjects" />
        <MissionR10 v-if="selectedMission == 'R10'" :subjectIndex="selectedSubjects" />
        <MissionR11 v-if="selectedMission == 'R11'" :subjectIndex="selectedSubjects" />
        <MissionR12 v-if="selectedMission == 'R12'" :subjectIndex="selectedSubjects" />

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import dayjs from "dayjs";
import ButtonExport from "./ButtonExport.vue";
import subject from "/public/mission/dataMockup.json"
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const selectedMission = ref(null);
const selectedSubjects = ref([]);
const selectedMonth = ref(new Date().toISOString().substr(0, 7));
const items = [
    "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8",
    "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", 
    "R9", "R10", "R11", "R12"
];

// const subject = [
//     { mission: 'M1', item: [{ label: 'ชป.ไซเบอร์', value: 1 }, { label: 'จำนวนครั้งที่ดำเนินการ', value: 2 }, { label: 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', value: 3 }, { label: 'จำนวน Social Bot', value: 4 }, { label: 'ผลการเพิ่มยอด Like', value: 5 }] },
//     { mission: 'M2', item: [{ label: 'จำนวนเพจเป้าหมาย', value: 1 }, { label: 'จำนวน Content', value: 2 }, { label: 'จำนวนโพสต์', value: 3 }, { label: 'จำนวนการเข้าถึง', value: 4 }, { label: 'จำนวน Content (Platform)', value: 5 }] },
//     { mission: 'M3', item: [{ label: 'ติดตามความเคลื่อนไหวทางกายภาพ', value: 1 }, { label: 'ข้อมูล Dark side', value: 2 }, { label: 'Timeline', value: 3 }, { label: 'Map', value: 4 }, { label: 'Top 5 (Engagement)', value: 5 }] },
//     { mission: 'R1', item: [{ label: 'ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย', value: 1 }, { label: 'ประชาสัมพันธ์ผ่านเพจ', value: 2 }, { label: 'Influencer ของหน่วย', value: 3 }, { label: 'จำนวนโพสต์ Influencer', value: 4 }, { label: 'ประชาสัมพันธ์ผ่านแฟนด้อม', value: 5 }, { label: 'แฟนด้อม Line Open chat', value: 6 }, { label: 'จำนวนสมาชิก', value: 7 }, { label: 'จำนวนโพสต์', value: 8 }] },
//     { mission: 'R9', item: [{ label: 'สถิติสนับสนุนเครือข่ายโรงเรียนและอุดมศึกษา', value: 1 }, { label: 'กิจกรรมสนับสนุนเครือข่ายโรงเรียนและอุดมศึกษา', value: 2 }, ] },
//     {
//         mission: 'R10', 
//         item: [
//             { label: 'สถิติสนับสนุนเครือข่ายสื่อ/Influencer/นักวิชาการ', value: 1 }, 
//             { label: 'กิจกรรมสนับสนุนเครือข่ายสื่อ/Influencer/นักวิชาการ', value: 2 }, 
//             { label: 'เพจสนับสนุนวิชาการ', value: 3 }, 
//         ] 
//     },
//     {
//         mission: 'R11', 
//         item: [
//             { label: 'แผนที่แสดงการสนับสนุนเครือข่ายภาคประชาสังคม', value: 1 }, 
//             { label: 'กิจกรรมสนับสนุนเครือข่ายภาคประชาสังคม', value: 2 }, 
//         ] 
//     },
//     {
//         mission: 'R12', 
//         item: [
//             { label: 'สถิติสนับสนุนเครือข่ายกลุ่มโอกาส', value: 1 }, 
//             { label: 'แผนที่แสดงการสนับสนุนเครือข่ายกลุ่มโอกาส', value: 2 }, 
//             { label: 'กิจกรรมสนับสนุนเครือข่ายกลุ่มโอกาส', value: 3 }, 
//         ] 
//     },

// ];

watch(selectedMission, () => {
    selectedSubjects.value = []; // เคลียร์ค่าเมื่อ selectedMission เปลี่ยน
});

const formattedItems = computed(() => {
    return items.map((item) => ({
        label: `Mission ${item}`,
        value: item,
    }));
});

const filteredSubjects = computed(() => {
    if (!selectedMission.value) return [];
    const missionData = subject.find((s) => s.mission === selectedMission.value);
    return missionData ? [...missionData.item] : [];
});

const isAllSelected = computed(() => {
    return filteredSubjects.value.length && selectedSubjects.value.length === filteredSubjects.value.length;
});

const isPartiallySelected = computed(() => {
    return selectedSubjects.value.length > 0 && selectedSubjects.value.length < filteredSubjects.value.length;
});

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedSubjects.value = [];
    } else {
        selectedSubjects.value = [...filteredSubjects.value.map((x) => x.value)];
    }
};
</script>
<style scoped>
/* ปรับให้ input มีขนาดเท่ากัน */
.custom-autocomplete .v-input__control {
  min-height: 40px; /* ปรับตามต้องการ เช่น 42px หรือ 48px */
}

::v-deep(.mx-input) {
    height: 48px !important;
}
</style>