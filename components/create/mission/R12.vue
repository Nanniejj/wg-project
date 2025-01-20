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
        <v-col cols="12" class="text-end pa-1">
          <v-btn
            color="#AEE0E8"
            outlined
            rounded="lg"
            @click="triggerFileInput"
          >
            <v-icon class="pa-4">mdi-tray-arrow-down</v-icon>Import CSV
          </v-btn>
          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
          />
        </v-col>

        <v-col cols="3">
          <v-container
            :style="{
              width: '100%',
              maxWidth: '300px',
              height: '300px',
              maxHeight: '300px',
              border: '2px dashed #707070',
              backgroundColor: getMissionColor('R12'),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <span style="font-size: 100px; color: white">R12</span>
          </v-container>
        </v-col>

        <v-col cols="8">
          <v-card-text>
            <v-form ref="formRef" v-model="valid">
              <span style="font-size: 16px">Mission name</span>
              <v-text-field
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

              <span style="font-size: 16px">Assign</span>
              <v-select
                density="compact"
                label="assign team"
                variant="outlined"
                rounded="lg"
                :items="team"
                v-model="selectedTeam"
                style="margin-top: 5px"
              ></v-select>
            </v-form>
          </v-card-text>
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

        <v-row>
          <v-col cols="6" class="justify-start d-flex mt-4 mx-10">
            <span style="font-size: 30px; font-weight: bold">กิจกรรม</span>
          </v-col>
          <v-col cols="5" class="justify-end d-flex mt-4">
            <v-btn
              color="#F49525"
              @click="addMessage"
              class="d-flex"
              style="aspect-ratio: 1; width: 60px"
            >
              <v-icon style="color: white; font-size: 30px">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-col cols="12" class="pa-8 ma-0">
          <v-divider
            :thickness="2"
            inset
            class="border-opacity-100 custom-divider"
            style="border-style: dashed; color: #707070"
          ></v-divider>
        </v-col>
        <v-col cols="12" class="pa-8 ma-0">
          <v-card class="mx-auto" rounded="xl" elevation="3" hover>
            <v-card-item>
              <v-form v-model="valid">
                <v-container>
                  <v-col cols="12">
                    <span style="font-size: 16px">ชื่อกิจกรรม</span>
                    <v-text-field
                      density="compact"
                      label="ชื่อกิจกรรม"
                      v-model="NameMessage"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    ></v-text-field>
                  </v-col>

                  <v-row class="px-3">
                    <v-col cols="12" md="9">
                      <span style="font-size: 16px">สถานที่</span>
                      <v-select
                        density="compact"
                        label="ประเภทเครือข่าย"
                        variant="outlined"
                        rounded="lg"
                        :items="location"
                        v-model="selectedlocation"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                      <span style="font-size: 16px">จำนวนผู้เข้าร่วม</span>
                      <v-number-input
                        density="compact"
                        :reverse="false"
                        min="0"
                        controlVariant="default"
                        label=""
                        :hideInput="false"
                        inset
                        variant="outlined"
                      ></v-number-input>
                    </v-col>
                  </v-row>

                  <v-row class="px-3">
                    <v-col cols="12" md="9">
                      <span style="font-size: 16px">Description</span>
                      <v-text-field
                        density="compact"
                        label="Add description"
                        v-model="MainDescriptionMessage"
                        variant="outlined"
                        rounded="lg"
                        clearable
                      ></v-text-field>
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

                  <v-col cols="12" md="12">
                    <span style="font-size: 16px">สนับสนุน</span>
                    <v-select
                      density="compact"
                      label="เลือกกลุ่มสนับสนุน"
                      variant="outlined"
                      rounded="lg"
                      :items="support"
                      v-model="selectedSupport"
                      style="margin-top: 5px"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <span style="font-size: 16px">ผู้ประสานงานของหน่วย</span>
                    <v-select
                      density="compact"
                      label="Add target"
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

  const support = ref([
    "กลุ่มที่ 4 ผู้ป่วยในพระบรมราชานุเคราะห์",
    "กลุ่มที่ 5 หน่วยงาน/องค์กรที่ได้รับพระมหากรุณาธิคุณ",
    "กลุ่มที่ 8 ครอบครัว/ญาติของผู้ป่วยในพระบรมราชานุเคราะห์",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedSupport = ref(null);

  const form = ref([
    "เพจ",
    "บทความ",
    "เสวนา",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedForm = ref(null);
  const person = ref([
    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedPerson = ref("-ไม่มี-");

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

  const selectedMission = ref("R12");

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
</style>
