<template>
    <div>
        <div class="d-flex align-items-center justify-end">
            <date-picker v-model:value="DateRange" range
                class="custom-combobox date-picker date-picker-setting mb-5 mr-3" style="max-width: 270px"
                :disabled-date="disabledBeforeTodayAndAfterMonth" />
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



        <v-row>
            <v-col cols="12" md="6">
                <!-- Mission Selector -->
                <v-autocomplete v-model="selectedMission" label="Select Mission" item-title="label" item-value="value"
                    :items="formattedItems" variant="outlined">
                </v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
                <!-- Subject Selector -->
                <v-select v-model="selectedSubjects" :items="filteredSubjects" label="Select Subject" multiple
                    item-title="label" item-value="value" variant="outlined">

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
        <!-- <div class="text-right">
            <ButtonExport />
        </div> -->
        <MissionM1 v-if="selectedMission == 'M1'" :subjectIndex="selectedSubjects" />
        <MissionR1 v-if="selectedMission == 'R1'" :subjectIndex="selectedSubjects" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import dayjs from "dayjs";
import ButtonExport from "./ButtonExport.vue";
const today = new Date(); // วันที่ปัจจุบัน
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 6);
const DateRange = ref([lastWeek, today]);
const selectedMission = ref(null);
const selectedSubjects = ref([]);

const items = [
    "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8",
    "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"
];

const subject = [
    { mission: 'M1', item: [{ label: 'ชป.ไซเบอร์', value: 1 }, { label: 'จำนวนครั้งที่ดำเนินการ', value: 2 }, { label: 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', value: 3 }, { label: 'จำนวน Social Bot', value: 4 }, { label: 'ผลการเพิ่มยอด Like', value: 5 }] },
    { mission: 'R1', item: [{ label: 'ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย', value: 1 }, { label: 'ประชาสัมพันธ์ผ่านเพจ', value: 2 }, { label: 'Influencer ของหน่วย', value: 3 }, { label: 'จำนวนโพสต์ Influencer', value: 4 }, { label: 'ประชาสัมพันธ์ผ่านแฟนด้อม', value: 5 }, { label: 'แฟนด้อม Line Open chat', value: 6 }, { label: 'จำนวนสมาชิก', value: 7 }, { label: 'จำนวนโพสต์', value: 8 }] },

    { mission: 'M2', item: ['ตัวอย่าง Mission 2 - 1', 'ตัวอย่าง Mission 2 - 2'] },
    { mission: 'M3', item: ['ตัวอย่าง Mission 3 - 1', 'ตัวอย่าง Mission 3 - 2'] },
];

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
