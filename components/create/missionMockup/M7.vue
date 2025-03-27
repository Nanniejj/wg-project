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
              backgroundColor: getMissionColor('M7'),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <span style="font-size: 100px; color: white">M7</span>
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
                  v-model="selectedPriority"
                  :style="{
                    marginTop: '5px',
                  }"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" class="py-0">
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
              v-model="newMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">เลือกทีมปฏิบัติการ</span>
            <v-combobox
              :items="team"
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
          <v-card class="mx-auto" rounded="xl" elevation="3" hover>
            <v-card-item>
              <v-col cols="12" class="pt-8 px-8">
                <v-card-title> กิจกรรม </v-card-title>
                <v-divider
                  :thickness="2"
                  inset
                  class="border-opacity-100 custom-divider"
                  style="border-style: dashed; color: #707070"
                ></v-divider>
              </v-col>

              <v-form v-model="valid">
                <v-container>
                  <v-col cols="12">
                    <span style="font-size: 16px">ชื่อกิจกรรม</span>
                    <v-text-field
                      density="compact"
                      placeholder="ชื่อกิจกรรม"
                      v-model="NameMessage"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    ></v-text-field>
                  </v-col>

                  <v-row class="px-3">
                    <v-col cols="12" md="6">
                      <span style="font-size: 16px">สถานที่</span>
                      <v-select
                        density="compact"
                        placeholder="ประเภทเครือข่าย"
                        variant="outlined"
                        rounded="lg"
                        :items="location"
                        v-model="selectedlocation"
                        style="margin-top: 5px"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                      <span style="font-size: 16px">สถานที่</span>
                      <v-text-field
                        density="compact"
                        v-model="lastname"
                        rounded="lg"
                        variant="outlined"
                        :counter="10"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="px-3">
                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">แขวง/ตำบล</span>
                      <v-text-field
                        density="compact"
                        v-model="firstname"
                        rounded="lg"
                        variant="outlined"
                        :counter="10"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">เขต/อำเภอ</span>
                      <v-text-field
                        density="compact"
                        v-model="firstname"
                        rounded="lg"
                        variant="outlined"
                        :counter="10"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">จังหวัด</span>
                      <v-text-field
                        density="compact"
                        v-model="lastname"
                        rounded="lg"
                        variant="outlined"
                        :counter="10"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">รหัสไปรษณีย์</span>
                      <v-text-field
                        density="compact"
                        v-model="email"
                        rounded="lg"
                        variant="outlined"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="px-3">
                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">จำนวนผู้เข้าร่วม</span>
                      <v-number-input
                        density="compact"
                        :reverse="false"
                        min="0"
                        controlVariant="default"
                        placeholder=""
                        :hideInput="false"
                        inset
                        variant="outlined"
                      ></v-number-input>
                    </v-col>

                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">วันจัดกิจกรรม</span>
                      <v-text-field
                        density="compact"
                        v-model="firstname"
                        rounded="lg"
                        variant="outlined"
                        :counter="10"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-col cols="12">
                    <span style="font-size: 16px">Description</span>
                    <v-text-field
                      placeholder="Add description"
                      v-model="MainDescriptionMessage"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <span style="font-size: 16px">Link URL</span>
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
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <span style="font-size: 16px">ชื่อเครือข่าย</span>
                    <v-select
                      density="compact"
                      placeholder="ประเภทเครือข่าย"
                      variant="outlined"
                      rounded="lg"
                      :items="location"
                      v-model="selectedlocation"
                      style="margin-top: 5px"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <span style="font-size: 16px">Image</span>
                    <vue-dropzone
                      ref="myVueDropzone"
                      id="dropzone"
                      :options="dropzoneOptions"
                      class="custom-dropzone"
                    />
                  </v-col>

                  <span class="px-3" style="font-size: 16px"
                    >Tagged topic (2)</span
                  >

                  <v-col cols="12">
                    <v-text-field
                      density="compact"
                      placeholder="Search for a tag"
                      v-model="newMessage"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    ></v-text-field>
                    <div class="d-flex justify-start ga-2">
                      <v-chip
                        closable
                        style="background-color: #aee0e8; color: white"
                        variant="tonal"
                      >
                        <span style="color: black">Tag 1</span>
                      </v-chip>
                      <v-chip
                        closable
                        style="background-color: #c9d85b; color: white"
                        variant="tonal"
                      >
                        <span style="color: black">Tag 2</span>
                      </v-chip>
                    </div>
                  </v-col>
                </v-container>
              </v-form>
            </v-card-item>
          </v-card>
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
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  const today = new Date(); // วันที่ปัจจุบัน
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);
  const DateRange = ref([lastWeek, today]);

  const priority = ref([
    "ต่ำ",
    "กลาง",
    "สูง",
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);
  const selectedPriority = ref("ต่ำ");

  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
  });
  const { getTeamColor, getMissionColor } = useColors();
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

  const location = ref([
    "จัดตั้ง",
    "สนับสนุน",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedlocation = ref(null);

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

  const selectedMission = ref("M7");

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
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
  };
</script>
<style scoped>
  .v-divider {
      height: 2000px; /* กำหนดความสูงที่ต้องการ */
  }
          
          
  .custom-dropzone {
      background-color: #E9E9E9;
      height: 150px; /* กำหนดความสูง */
      border: 2px dashed #707070; /* กำหนดขอบ */
      border-radius: 10px; /* กำหนดมุมโค้ง */
  }
  
  .custom-divider {
      margin-left: 10px; /* กำหนดมาร์จินซ้าย */
      max-width: 100%;
          
  }
  ::v-deep(.mx-input) {
  height: 40px;
  border-radius: 8px;

}
</style>