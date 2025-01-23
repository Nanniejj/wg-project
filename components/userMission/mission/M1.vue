<template>
  <v-container fluid>
    <v-col cols="12">
      <span style="font-weight: 500;; font-size: 24px">{{
        getMissionName("M1")
      }}</span>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" rounded="lg" elevation="3" hover>
        <v-row>
          <v-col cols="12" class="pa-8">
            <v-row>
              <v-col cols="3">
                <v-container
                  :style="{
                    width: '100%',
                    maxWidth: '270px',
                    height: '270px',
                    maxHeight: '300px',
                    border: '2px dashed #707070',
                    backgroundColor: getMissionColor('M1'),
                    borderRadius: '30px',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }"
                >
                  <span style="font-size: 100px; color: white">M1</span>
                </v-container>
              </v-col>

              <v-col cols="8">
                <v-card-text>
                  <v-form ref="formRef" v-model="valid">
                    <span style="font-size: 16px">Assign</span>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      rounded="lg"
                      v-model="selectedMission"
                      readonly
                      style="margin-top: 5px"
                    ></v-text-field>

                    <!-- ช่องกรอกรายละเอียด -->
                    <span style="font-size: 16px">Description</span>
                    <v-text-field
                      label="Add description"
                      v-model="MainDescriptionMessage"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    ></v-text-field>
                  </v-form>
                </v-card-text>
              </v-col>

              <v-col
                class="justify-start align-start d-flex pt-8 pb-16"
                cols="12"
              >
                <v-divider
                  :thickness="2"
                  inset
                  class="border-opacity-100 custom-divider"
                  style="border-style: dashed; color: #707070"
                ></v-divider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <span style="font-weight: 500; font-size: 24px">ผลปฏิบัติการ</span>
    </v-col>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });

  const DescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
  const MainDescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
  const IssueMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
  const NameMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field

  const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedTeam = ref(null);

  // const missions = ref([
  //   "Mission R",
  //   "Mission M1",
  //   "Mission M2",
  //   "Mission M3",
  //   "Mission M4",
  //   "Mission M5",
  //   "Mission M6",
  //   "Mission M7",
  //   "Mission M8",
  //   // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  // ]);

  const selectedMission = ref("M1");

  // ฟังก์ชันเพิ่มข้อความ
  const addMessage = () => {
    if (newMessage.value.trim()) {
      formData.value.messages.push(newMessage.value.trim());
      newMessage.value = ""; // ล้างข้อความในช่อง
    }
  };

  // ฟังก์ชันลบข้อความ
  const removeMessage = (index) => {
    formData.value.messages.splice(index, 1);
  };

  const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
  };

  const submitForm = () => {
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
  };
</script>
<style scoped>
  .v-divider {
      height: 1000px; /* กำหนดความสูงที่ต้องการ */
    }
    
    .custom-divider {
      margin-left: 30px; /* กำหนดมาร์จินซ้าย */
      margin-right: 30px; /* กำหนดมาร์จินซ้าย */
      max-width: 100%;
    
    }
</style>
