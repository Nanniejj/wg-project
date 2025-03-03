<template>
  <v-col cols="12" class="pa-10 ma-0">
    <v-card class="mx-auto pa-2" rounded="xl" elevation="3" hover>
      <v-row>
        <v-col cols="6" class="pa-8 d-flex align-start justify-start">
          <span style="font-weight: bold" class="text-h4">Create</span>
        </v-col>
        <v-col cols="6" class="pa-8 d-flex align-start justify-end">
          <v-btn variant="text" @click="createNew = false"
            ><v-icon class="text-h4">mdi-close</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-col cols="12" class="pa-4 d-flex align-center justify-center">
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              class="custom-dropzone"
            />
          </v-col>
          <v-col cols="12" class="pa-2 d-flex align-center justify-center">
            <v-divider
              :thickness="2"
              inset
              class="border-opacity-100"
              style="border-style: dashed; color: #707070"
            ></v-divider>
          </v-col>
          <v-col cols="12" class="justify-center d-flex pa-4">
            <v-btn
              rounded="xl"
              block
              size="x-large"
              style="color: #00000029"
              :disabled="!valid"
              @click="submitForm"
              ><span style="font-size: 18px; color: black">Save from URL</span>
            </v-btn>
          </v-col>
        </v-col>

        <v-divider
          :thickness="1"
          vertical
          class="border-opacity-100"
          style="border-style: dashed; color: #707070"
        ></v-divider>
        <v-col cols="8" class="pa-4">
          <v-card-item>
            <span style="font-size: 16px">Title</span>
            <v-text-field
              label="Add a title"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Description</span>
            <v-text-field
              label="Add description"
              v-model="MainDescriptionMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Link</span>
            <v-text-field
              label="Add a link"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Type</span>
            <v-select
              label="Choose a type"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-select>
            <span style="font-size: 16px">Hastag</span>
            <v-text-field
              label="Search for a hastag"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
            <span style="font-size: 16px">Tagged topic(0)</span>
            <v-text-field
              label="Search for a tag"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
            <v-col cols="12" class="pa-4 d-flex align-center justify-center">
              <v-divider
                :thickness="2"
                inset
                class="border-opacity-100"
                style="border-style: dashed; color: #707070"
              ></v-divider>
            </v-col>
          </v-card-item>
          <v-col cols="12" class="justify-end d-flex pb-10">
            <v-btn
              rounded="lg"
              size="x-large"
              color="#2A3547"
              @click="submitForm"
              ><span style="font-size: 18px">Create</span>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script setup>
  import vueDropzone from "dropzone-vue3";
  import { ref,inject  } from "vue";
  const { getTeamColor, getMissionColor } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const createNew = inject('createNew', 'false');

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
      <p style="font-size: 14px;">Drag files here or click to upload</p>
    </div>
     <p style="position: absolute; bottom: 0; left: 30%; transform: translateX(-20%); font-size: 12px;">
      Recommend using high quality.jpg files less than 20MB .mp4 file less than 200MB
    </p>
  `,
  });
  const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedTeam = ref(null);

  const selectedMission = ref("R2");

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
    height: auto; /* กำหนดความสูงที่ต้องการ */
  }
  
  .custom-divider {
    margin-left: 25px; /* กำหนดมาร์จินซ้าย */
    max-width: 100%;
  
  }

  .v-divider--inset:not(.v-divider--vertical) {
    /* max-width: calc(100%-72px);  ปรับความกว้างของ v-divider */
    margin-inline-start: 0px; /* กำหนดระยะห่างทางซ้ายจากขอบ */
}

  .custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 450px; /* ตั้งค่าความสูง */
  width: 350px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: #E9E9E9;
  border-radius: 20px; 
}
</style>
