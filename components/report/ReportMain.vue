<template>
    <div>
        <v-row>
            <v-col>
                <!-- Mission Selector -->
                <v-autocomplete v-model="selectedMission" label="Select Mission" item-title="label" item-value="value"
                    :items="formattedItems" variant="outlined">
                </v-autocomplete>
            </v-col>

            <v-col>
                <!-- Subject Selector -->
                <!-- {{ selectedSubjects }} -->
                <v-combobox v-model="selectedSubjects" :items="filteredSubjects" label="Select Subject"
                    :disabled="!selectedMission" multiple variant="outlined" @change:selectedSubjects="selectSubject">
                </v-combobox>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedMission: null, // Default to no mission selected
            selectedSubjects: [], // Selected subjects
            items: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
            subject: [
                { mission: 'M1', item: ['ชป.ไซเบอร์', 'จำนวนครั้งที่ดำเนินการ', 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', 'จำนวน Social Bot', 'ผลการเพิ่มยอด Like'] },
                { mission: 'M2', item: ['ตัวอย่าง Mission 2 - 1', 'ตัวอย่าง Mission 2 - 2'] },
                { mission: 'M3', item: ['ตัวอย่าง Mission 3 - 1', 'ตัวอย่าง Mission 3 - 2'] },
                { mission: 'ALL', item: ['ชป.ไซเบอร์', 'จำนวนครั้งที่ดำเนินการ', 'จำนวนเป้าหมาย/บัญชี ที่ดำเนินการ', 'จำนวน Social Bot', 'ผลการเพิ่มยอด Like', 'ตัวอย่าง Mission 2 - 1', 'ตัวอย่าง Mission 2 - 2', 'ตัวอย่าง Mission 3 - 1', 'ตัวอย่าง Mission 3 - 2'] }
                // Add more missions and subjects as needed
            ]
        };
    },
    watch: {
        selectedSubjects(val) {

            if (val.includes("all")) {
                console.log('เข้า');

                const missionData = this.subject.find((s) => s.mission === this.selectedMission);
                this.selectedSubjects = ['all', ...missionData.item]
            } else {
                console.log("'all' not found in the array.");
            }
        }
    },
    computed: {
        // Format items for the mission dropdown
        formattedItems() {
            return this.items.map((item) => ({
                label: `Mission ${item}`, // Display text
                value: item, // Actual value for selection
            }));
        },
        // Filter subjects based on selected mission
        filteredSubjects() {
            if (!this.selectedMission) return []; // Disable combobox if no mission is selected
            const missionData = this.subject.find((s) => s.mission === this.selectedMission);
            return missionData ? ['all', ...missionData.item] : []; // Return matching subjects or an empty array
        }
    }, methods: {
        // selectSubject() {
        //     console.log('valllll', val);

        //     if (val.includes("all")) {
        //         console.log('เข้า');

        //         const missionData = this.subject.find((s) => s.mission === this.selectedMission);
        //         this.selectedSubjects = ['all', ...missionData.item]
        //     } else {
        //         console.log("'all' not found in the array.");
        //     }

        // }
    },
};
</script>

<style>
/* Add any necessary styling here */
</style>
