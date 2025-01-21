<template>
    <div>
        <div class="text-right">
            <!-- {{ model }} -->
            <!-- <v-date-input v-model="model" label="Select range" max-width="368" multiple="range" hide-actions autofocus
                prepend-icon="" prepend-inner-icon="$calendar" variant="solo" :close-on-content-click="false"
                @update:modelValue="onDateRangeChange"></v-date-input> -->
        </div>
        <v-row>
            <v-col>
                <!-- Mission Selector -->
                <v-autocomplete v-model="selectedMission" label="Select Mission" item-title="label" item-value="value"
                    :items="formattedItems" variant="outlined">
                </v-autocomplete>
            </v-col>

            <v-col>
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
        <MissionM1 v-if="selectedMission == 'M1'" :subjectIndex="selectedSubjects" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            model: null,
            selectedMission: null, // Default to no mission selected
            selectedSubjects: [], // Selected subjects
            items: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
            subject: [
                { mission: 'M1', item: [{ label: 'ชป.ไซเบอร์', value: 1 }, { label: 'จำนวนครั้งที่ดำเนินการ', value: 2 }, { label: 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', value: 3 }, { label: 'จำนวน Social Bot', value: 4 }, { label: 'ผลการเพิ่มยอด Like', value: 5 }] },
                { mission: 'M2', item: ['ตัวอย่าง Mission 2 - 1', 'ตัวอย่าง Mission 2 - 2'] },
                { mission: 'M3', item: ['ตัวอย่าง Mission 3 - 1', 'ตัวอย่าง Mission 3 - 2'] },
                //{ mission: 'ALL', item: ['ชป.ไซเบอร์', 'จำนวนครั้งที่ดำเนินการ', 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', 'จำนวน Social Bot', 'ผลการเพิ่มยอด Like', 'ตัวอย่าง Mission 2 - 1', 'ตัวอย่าง Mission 2 - 2', 'ตัวอย่าง Mission 3 - 1', 'ตัวอย่าง Mission 3 - 2'] }
            ]
        }
    },
    watch: {

        selectedMission(val) {
            this.selectedSubjects = [];
        }
    },
    computed: {
        formattedItems() {
            return this.items.map((item) => ({
                label: `Mission ${item}`,
                value: item,
            }));
        },
        filteredSubjects() {
            if (!this.selectedMission) return [];
            const missionData = this.subject.find((s) => s.mission === this.selectedMission);
            return missionData ? [...missionData.item] : [];
        },
        isAllSelected() {
            return this.filteredSubjects.length && this.selectedSubjects.length === this.filteredSubjects.length;
        },
        isPartiallySelected() {
            return this.selectedSubjects.length > 0 && this.selectedSubjects.length < this.filteredSubjects.length;
        }
    },
    methods: {
        onDateRangeChange(value) {
            console.log('value', value);

            if (value.length >= 2) {
                this.menu = false;
            }
        },
        toggleSelectAll() {
            if (this.isAllSelected) {
                this.selectedSubjects = [];
            } else {
                this.selectedSubjects = [...this.filteredSubjects.map((x) => x.value)];
            }
        }
    },
};
</script>
