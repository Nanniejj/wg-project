<template>
    <div class="px-md-10">
        {{ selectedTask.assigned_team }}
        <div class="d-flex">
            <v-btn icon variant="text" @click="closeEditTask">
                <v-icon size="20" color="#2A3547">mdi-chevron-double-left</v-icon>
            </v-btn>
            <div class="mt-3 text-topic">{{selectedTask.mission}} {{selectedTask.name}}</div>
        </div>

        <!-- content cards -->
         <v-row class="ga-5">
            <v-col cols="12" v-for="team in selectedTask.assign_team" :key="team" >
                <v-card class="card-stat-shadow pa-4" :color="getTeamColorSoft(team.replace('Team ', ''))" rounded="lg">
                <!-- Header: Team Name + Add Button -->
                    <v-row align="center" justify="space-between">
                        <v-col>
                        <div class="text-h6 font-weight-bold" style="color: #2A3547">{{ team }}</div>
                        </v-col>
                        <v-col cols="auto">
                        <v-btn color="orange" icon size="small" rounded="xs">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        </v-col>
                    </v-row>
        
                    <v-divider class="my-4 dashed-hr"></v-divider>
        
                    <!-- Contents Section -->
                    <h4 class="text-subtitle-1 font-weight-bold">Contents</h4>
        
                    <v-card class="pa-4" elevation="2">
                        <!-- เป้าหมาย (HVT) -->
                        <v-select
                            v-model="selectedTarget"
                            :items="targets"
                            label="เป้าหมาย (HVT)"
                            variant="outlined"
                            density="compact"
                            ></v-select>
        
                        <!-- Link URL -->
                        <div v-for="(link, index) in links" :key="index" class="link-row">
                            <v-row align="center">
                                <v-col>
                                    <v-text-field
                                        v-model="links[index]"
                                        label="Link URL (ที่ปฏิบัติงาน)"
                                        variant="outlined"
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn color="red" icon size="small" variant="text" @click="removeLink(index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
                        <!-- ปุ่มเพิ่ม Link -->
                        <v-btn color="blue" size="small" @click="addLink">
                            <v-icon left>mdi-plus</v-icon> เพิ่ม Link
                        </v-btn>
                    </v-card>
                </v-card>

            </v-col>
         </v-row>
    </div>
</template>
<script setup>
import { ref } from "vue";
const { getTeamColorSoft } = useColors();
const selectedTarget = ref(null);
const targets = ref([
  "เป้าหมาย A",
  "เป้าหมาย B",
  "เป้าหมาย C",
  "เป้าหมาย D",
]);
// ตัวแปรเก็บ Link URL
const links = ref([""]); // เริ่มต้นมี 1 ช่อง

// ฟังก์ชันเพิ่มช่องกรอกลิงก์ใหม่
const addLink = () => {
  links.value.push("");
};

// ฟังก์ชันลบลิงก์
const removeLink = (index) => {
  links.value.splice(index, 1);
};
// const sortedTeams = computed(() => {
//   return [...selectedTask.assigned_team.value].sort(); // เรียงตามตัวอักษร
// });
</script>
<script>
export default {
    props:{
        selectedTask:{
            type: Object,
            default:{}
        }
    },
    methods:{
        closeEditTask(){
            this.$emit("closeEdit")
        },
        sortedTeams() {
            let data = this.selectedTask.assigned_team;
            data.sort(); // เรียงตามตัวอักษร
        }
    },
    // mounted(){
    //     this.sortedTeams()
    // }
}
</script>
<style scoped>
/* ปรับแต่งเส้น <hr> ให้เป็นเส้นปะ */
.dashed-hr {
  border-top: 2px dashed ;/* สีเทา */
}

/* ปรับแต่งระยะห่างของแต่ละลิงก์ */
/* .link-row {
  margin-bottom: 8px;
} */
</style>