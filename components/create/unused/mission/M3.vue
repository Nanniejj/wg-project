<template>
  <v-row>
    <!-- <v-col cols="2">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title style="font-size: 30px">Create Mission</v-card-title>
        </v-col>

        <v-col cols="12" class="d-flex pa-1">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
          >
            <span style="font-size: 16px">Create new</span>
          </v-btn>
          <v-divider
            vertical
            :thickness="2"
            style="margin-top: -55px"
            class="px-1 border-opacity-50"
            color="#707070"
          ></v-divider>
        </v-col>
      </v-row>
    </v-col> -->

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

        <!-- <v-col cols="12" class="text-end pa-4">
          <v-btn
            color="#AEE0E8"
            outlined
            rounded="lg"
            @click="triggerFileInput"
          >
            <v-icon class="pa-4">mdi-tray-arrow-down</v-icon>Import CSV
          </v-btn>
    
          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
          />
        </v-col> -->

        <v-col cols="12" sm="12" md="3">
          <v-container
            :style="{
              width: '100%',
              maxWidth: '270px',
              height: '270px',
              maxHeight: '300px',
              border: '2px dashed #707070',
              backgroundColor: getMissionColor('M3'),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <span style="font-size: 100px; color: white">M3</span>
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
              <v-col cols="12" sm="8">
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
              <v-col cols="12" sm="4">
                <span style="font-size: 16px">วันที่กำหนด</span>
                <!-- <v-col cols="12" class="px-0 pt-1"> -->
                <date-picker
                  style="margin-top: 5px"
                  v-model:value="DateRange"
                  range
                  :editable="false"
                  :clearable="false"
                  class="w-100"
                ></date-picker>
                <!-- </v-col> -->
              </v-col>
            </v-row>

            <!-- ช่องกรอกรายละเอียด -->
            <span style="font-size: 16px">รายละเอียด</span>
            <v-text-field
              placeholder="รายละเอียด"
              v-model="DescriptionMessage"
              variant="outlined"
              rounded="lg"
              clearable
              :rules="[rules.required]"
            ></v-text-field>

            <span style="font-size: 16px">เลือกทีมปฏิบัติการ</span>
            <v-combobox
              :items="props.teams.map(team => team.name)"
              v-model="selectedTeam"
              density="compact"
              placeholder="เลือกทีมปฏิบัติการ"
              multiple
              variant="outlined"
              rounded="lg"
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

            <!-- <span style="font-size: 16px">Link URL</span>
            <v-row>
              <v-col cols="9" sm="11">
                <v-text-field
                  density="compact"
                  placeholder="Link URL"
                  v-model="newMessage"
                  variant="outlined"
                  rounded="lg"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="1" class="ma-0 d-flex justify-center">
                <v-btn
                  density="compact"
                  rounded="md"
                  color="#46AFC7"
                  @click="addMessage"
                  height="63%"
                  min-width="40"
                  size="small"
                >
                  <v-icon style="color: white; font-size: 20px"
                    >mdi-plus</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row> -->
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
        <v-col cols="12" class="pa-8 ma-0 d-none">
          <v-card rounded="lg">
            <v-tabs
              class="justify-start align-start d-flex"
              v-model="tab"
              align-tabs="start"
              color="#29A0AF"
            >
              <v-tab value="one">สือสร้างกระแส</v-tab>
              <v-tab value="two">เครือข่ายสื่อใหม่</v-tab>
              <v-tab value="three">เครือข่าย Influencer</v-tab>
              <v-tab value="four">เครือข่ายนักวิชาการ</v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one"></v-tabs-window-item>

                <v-tabs-window-item value="two"></v-tabs-window-item>

                <v-tabs-window-item value="three"></v-tabs-window-item>

                <v-tabs-window-item value="four"></v-tabs-window-item>
              </v-tabs-window>

              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Social</th>
                    <th class="text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>
                      <div class="d-flex align-center">
                        <v-checkbox></v-checkbox>
                        <span style="margin-top: -20px">{{ item.name }}</span>
                      </div>
                    </td>
                    <td>{{ item.description }}</td>

                    <td>
                      <span class="d-flex align-center" style="color: #29a0af"
                        ><v-icon> mdi-link-variant</v-icon>link</span
                      >
                    </td>
                    <td>{{ item.Date }}</td>
                    <td>
                      <v-icon style="font-size: 24px"
                        >mdi-arrow-right-circle</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
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
</template>

<script setup>
  import { ref } from "vue";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
    const props = defineProps({
    teams: Object
  });
  const emit = defineEmits(["taskData"]);
  const today = new Date(); // วันที่ปัจจุบัน
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);
  const DateRange = ref([lastWeek, today]);

  const priority = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);
  const selectedPriority = ref("low");
  const { getTeamColor, getMissionColor } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });

  const tab = ref("one");
  const desserts = ref([
    { name: "User01", description: "Description", Date: "10 Jan 2568" },
    {
      name: "User02",
      description: "Description",
      Date: "10 Jan 2568",
    },
    { name: "User03", description: "Description", Date: "10 Jan 2568" },
    { name: "User04", description: "Description", Date: "10 Jan 2568" },
    { name: "User05", description: "Description", Date: "10 Jan 2568" },
    { name: "User06", description: "Description", Date: "10 Jan 2568" },
    { name: "User07", description: "Description", Date: "10 Jan 2568" },
    { name: "User08", description: "Description", Date: "10 Jan 2568" },
    { name: "User09", description: "Description", Date: "10 Jan 2568" },
    { name: "User10", description: "Description", Date: "10 Jan 2568" },
  ]);

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

  const missions = ref([
    "Mission R",
    "Mission M1",
    "Mission M2",
    "Mission M3",
    "Mission M4",
    "Mission M5",
    "Mission M6",
    "Mission M7",
    "Mission M8",
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedMission = ref("M3");

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

  const removeSelection = (item) => {
    const index = selectedTeam.value.indexOf(item);
    if (index !== -1) {
      selectedTeam.value.splice(index, 1); // ลบทีมออกจาก selectedTeam
    }
  };

  const submitForm = () => {
    setTaskData()
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
  };

  const setTaskData = () => {
    const taskData = {
      "mission": selectedMission.value,
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
