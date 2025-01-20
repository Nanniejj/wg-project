<template>
  <v-row v-if="!selectedMission">
    <v-col cols="2">
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
    </v-col>

    <v-col cols="10">
      <v-row>
        <v-col cols="3">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            class="custom-dropzone"
          />
        </v-col>

        <v-col cols="8">
          <v-card-text>
            <v-form ref="formRef" v-model="valid">
              <span style="font-size: 16px">Mission name</span>
              <v-select
                label="Select mission"
                variant="outlined"
                rounded="lg"
                style="margin-top: 5px"
                :items="missions"
                v-model="selectedMission"
              ></v-select>

              <!-- <span style="font-size: 16px">Link URL</span>
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    label="Link URL"
                    v-model="newMessage"
                    placeholder="พิมพ์ข้อความแล้วกดปุ่มเพิ่ม"
                    variant="outlined"
                    rounded="lg"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="ma-0">
                  <v-btn
                    rounded="lg"
                    color="blue"
                    @click="addMessage"
                    height="70%"
                  >
                    <v-icon style="color: white; font-size: 30px"
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
          </v-card-text>
        </v-col>

        <v-divider
          :thickness="2"
          inset
          class="border-opacity-100 custom-divider"
          style="border-style: dashed; color: #707070"
        ></v-divider>
      </v-row>
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col cols="2">
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
    </v-col>
    <v-col cols="10">
      <component :is="getMissionComponent(selectedMission)" />
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  import R1 from "./components/create/mission/R1.vue";
  import M1 from "./components/create/mission/M1.vue";
  import M2 from "./components/create/mission/M2.vue";
  import M3 from "./components/create/mission/M3.vue";
  import M4 from "./components/create/mission/M4.vue";
  import M5 from "./components/create/mission/M5.vue";
  import M6 from "./components/create/mission/M6.vue";
  import M7 from "./components/create/mission/M7.vue";
  import M8 from "./components/create/mission/M8.vue";

  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
  });
  const missions = ref([
    "Mission R1",
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

  const selectedMission = ref(null);

  // Method to map mission name to component
  const getMissionComponent = (missionName) => {
    const missionComponents = {
      "Mission M1": M1,
      "Mission M2": M2,
      "Mission M3": M3,
      "Mission M4": M4,
      "Mission M5": M5,
      "Mission M6": M6,
      "Mission M7": M7,
      "Mission M8": M8,
      "Mission R1": R1,
    };

    return missionComponents[missionName] || null;
  };
  const { getTeamColor, getMissionColor } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });

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
    margin-left: 25px; /* กำหนดมาร์จินซ้าย */
    max-width: 100%;
  
  }

  .custom-dropzone {

  height: 300px; /* กำหนดความสูง */
  border: 2px dashed #ccc; /* กำหนดขอบ */
  border-radius: 10px; /* กำหนดมุมโค้ง */
}
</style>
