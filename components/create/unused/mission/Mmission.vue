<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- <v-col
            class="justify-center align-center d-flex pa-0"
            cols="1"
            style="
              border-right: 2px solid #707070;
              height: 800px;
              margin-top: 30px;
            "
          >
          </v-col> -->

        <v-col cols="12" sm="12" md="3">
          <v-container
            :style="{
              width: '100%',
              maxWidth: '270px',
              height: '270px',
              maxHeight: '300px',
              border: '2px dashed #707070',
              backgroundColor: getMissionColor(selectedMission),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <span style="font-size: 100px; color: white">{{ selectedMission }}</span>
          </v-container>
          <v-col cols="12" class="d-flex justify-center">
            <span style="font-size: 16px">Logo cover mission</span>
          </v-col>
        </v-col>

        <v-col cols="12" sm="12" md="8">
          <v-form ref="formRef" v-model="valid">
            <!-- <span style="font-size: 16px">Mission name</span>
            <v-text-field
              density="compact"
              variant="outlined"
              rounded="lg"
              v-model="selectedMission"
              disabled
            ></v-text-field> -->

            <v-row>
              <v-col cols="12" sm="8" class="py-0">
                <span style="font-size: 16px">ระดับความสำคัญ</span>
                <v-select
                  density="compact"
                  variant="outlined"
                  rounded="lg"
                  :items="priority"
                  item-title="title"
                  item-value="value"
                  v-model="selectedPriority"
                  :style="{
                    marginTop: '5px',
                  }"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" class="py-md-0">
                <span style="font-size: 16px">วันที่กำหนด</span>
                <date-picker
                  style="margin-top: 5px"
                  v-model:value="DateRange"
                  range
                  :editable="false"
                  :clearable="false"
                  class="w-100"
                ></date-picker>
              </v-col>
              <!-- ช่องกรอกรายละเอียด -->
               <v-col cols="12">
                  <span style="font-size: 16px">รายละเอียด</span>
                  <v-text-field
                    placeholder="รายละเอียด"
                    v-model="DescriptionMessage"
                    variant="outlined"
                    rounded="lg"
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
  
               </v-col>

               <!-- เลือกทีมปฏิบัติการ -->
               <v-col col="12">
                   <span style="font-size: 16px">เลือกทีมปฏิบัติการ</span>
                   <v-combobox
                     :items="props.teams.map(team => team.name)"
                     v-model="selectedTeam"
                     density="compact"
                     placeholder="เลือกทีมปฏิบัติการ"
                     multiple
                     variant="outlined"
                     rounded="lg"
                     :rules="[rules.required]"
                   >
                     <template v-slot:selection="data">
                       <v-chip
                         closable
                         :key="JSON.stringify(data.item)"
                         v-bind="data.attrs"
                         :disabled="data.disabled"
                         :model-value="data.selected"
                         size="small"
                         :color="getTeamColor(data.item.title.replace('Team ', ''))"
                         @click:close="removeSelection(data.item.title)"
                       >
                         <span style="color: black"> {{ data.item.title }} </span>
                       </v-chip>
                     </template>
                   </v-combobox>
       
                   <!-- แสดงข้อความในรูปแบบ Chip -->
                   <v-row class="mt-4">
                     <v-col cols="12">
                       <div>
                         <v-chip
                           v-for="(message, index) in formData.messages"
                           :key="index"
                           class="ma-1"
                           close
                           @click:close="removeMessage(index)"
                         >
                           {{ message }}
                         </v-chip>
                       </div>
                     </v-col>
                   </v-row>
               </v-col>
            </v-row>


          </v-form>
        </v-col>

        <!-- <v-col
          class="justify-start align-start d-flex"
          cols="12"
          style="border-top: 2px dashed #707070; width: 100%; margin-top: 30px"
        >
        </v-col> -->
        <v-divider
          :thickness="2"
          inset
          class="border-opacity-100 custom-divider"
          style="border-style: dashed; color: #707070"
        ></v-divider>

        <v-col cols="12" class="justify-end d-flex mt-8">
          <v-btn
            rounded="lg"
            size="x-large"
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
            ><span style="font-size: 18px">Create mission</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  const { getTeamColor, getMissionColor, getPriorityColor } = useColors();
  const props = defineProps({
    teams: Object,
    selectedMission: String
  });
  const emit = defineEmits(["taskData"]);
  const formRef = ref(null);
  const valid = ref(false);
  const today = new Date(); // วันที่ปัจจุบัน
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);
  const DateRange = ref([lastWeek, today]);
  const formData = ref({
    name: "",
    details: "",
    image: null,
  });
  const DescriptionMessage = ref(""); // ตัวแปรที่เก็บค่าจาก v-text-field
  const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedTeam = ref(null);

  const priority = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);
  
  const selectedPriority = ref("low");
  // const selectedMission = ref("R1");

  // ฟังก์ชันเพิ่มข้อความ
  const addMessage = () => {
    if (newMessage.value.trim()) {
      formData.value.messages.push(newMessage.value.trim());
      newMessage.value = ""; // ล้างข้อความในช่อง
    }
  };

  const removeSelection = (item) => {
    const index = selectedTeam.value.indexOf(item);
    if (index !== -1) {
      selectedTeam.value.splice(index, 1); // ลบทีมออกจาก selectedTeam
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
    setTaskData()
    console.log("Form submitted with mission:", props.selectedMission);
    props.selectedMission = null; // รีเซ็ต selectedMission เป็น null
  };

  const setTaskData = () => {
    const taskData = {
      "mission": props.selectedMission,
      "description": DescriptionMessage.value,
      "priority":  selectedPriority.value,
      "assign_team": selectedTeam.value,
      "start_date": DateRange.value[0].toISOString().split("T")[0],
      "end_date": DateRange.value[1].toISOString().split("T")[0]
    };
    emit("taskData", taskData);
  };
</script>
<style scoped>
  .v-divider {
  height: 1000px; /* กำหนดความสูงที่ต้องการ */
}

.custom-divider {
  margin-left: 25px; /* กำหนดมาร์จินซ้าย */
  max-width: 100%;

}

::v-deep(.mx-input) {
  height: 40px;
  border-radius: 8px;

}
</style>
