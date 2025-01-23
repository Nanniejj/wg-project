<template>
    <div>
        <v-row>
            <!-- File Upload Section -->
            <v-col cols="12" md="4">
                <!-- {{ getTeamColorSoft(selectTeam) }} -->
                <v-card elevation="1" class="d-flex flex-column align-center justify-center"
                    :color="getTeamColor(selectTeam)"
                    style="border: 1px dashed #ccc; height: 200px; border-radius: 8px;">
                    <span class="text-h2 font-weight-bold text-white" v-if="selectTeam"> {{ selectTeam }} </span>
                    <span class="text-h2 font-weight-bold text-white" v-else > Team</span>
                    <!-- <v-icon size="48" color="blue">mdi-upload</v-icon>
                    <span>Choose a file or drag and drop it here.</span>
                    <span class="text-subtitle-2 mt-2">Logo cover mission</span> -->
                </v-card>
            </v-col>

            <!-- Form Inputs -->
            <v-col cols="12" md="8">
                <div>
                    <div>Team name</div>
                    <v-select density="compact" label="เลือกทีม" :items="teamItems" variant="outlined"
                        v-model="selectTeam" class="mb-4"></v-select>
                </div>

                <div>
                    <div>Detail</div>
                    <v-textarea label="เพิ่มรายละเอียด" row-height="25" rows="3" variant="outlined" auto-grow shaped
                        class="mb-4"></v-textarea>
                </div>
                <!-- <div>
                    <div>Color Picker</div>
                    <v-color-picker mode="hexa" canvas-height="150" hide-input flat class="mt-2 mb-4"></v-color-picker>
                </div> -->
                <div>
                    <div>Assign</div>
                    <v-row align="center" justify="center" class="my-auto">
                        <v-col cols="12" class="my-auto">
                            <div v-for="(field, index) in assignFields" :key="index" class="d-flex align-center mb-2">
                                <v-text-field placeholder="เพิ่มรายชื่อ" variant="outlined" hide-details
                                    density="compact" v-model="assignFields[index]"
                                    class="flex-grow-1 mr-2"></v-text-field>
                                <v-btn variant="text" color="#a51f16" @click="removeAssignField(index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="3" class="my-auto">
                            <v-btn color="#46AFC7" @click="addAssignField">
                                <v-icon left>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
        <div class="text-right"> <v-btn color="#2A3547">บันทึก</v-btn></div>
    </div>
</template>
<script setup>
const { getTeamColorSoft, getTeamColor } = useColors();
</script>
<script>

export default {
    data() {
        return {
            selectTeam: null,
            teamItems: ["C", "D", "E", "F", "G"],
            assignFields: [""] // เริ่มต้นด้วย 1 ช่องว่าง
        };
    },
    methods: {
        addAssignField() {
            this.assignFields.push(""); // เพิ่มช่องใหม่ใน array
        },
        removeAssignField(index) {
            this.assignFields.splice(index, 1); // ลบช่องที่ตำแหน่ง index
        }
    }
};
</script>

<style scoped>
.v-sheet {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
