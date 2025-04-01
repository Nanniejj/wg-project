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
              @vdropzone-success="handleSuccess"
              v-model:files="selectedFiles"
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
              placeholder="Add a title"
              density="compact"
              v-model="title"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Description</span>
            <v-text-field
              placeholder="Add description"
              v-model="description"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Link</span>
            <v-text-field
              placeholder="Add a link"
              density="compact"
              v-model="NameMessage"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>

            <span style="font-size: 16px">Type</span>
            <v-select
              placeholder="Choose a type"
              density="compact"
              :items="mediaType"
              v-model="selectMediaType"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-select>
            <span style="font-size: 16px">Hastag</span>
            <v-text-field
              placeholder="Search for a hastag"
              density="compact"
              v-model="hastag"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
            <span style="font-size: 16px">Tagged topic(0)</span>
            <v-text-field
              placeholder="Search for a tag"
              density="compact"
              v-model="topic"
              variant="outlined"
              rounded="lg"
              clearable
            ></v-text-field>
            <v-col cols="12" class="pa-4 d-flex align-center justify-center">
              <v-divider
                :thickness="2"
                class="border-opacity-100"
                style="border-style: dashed; color: #707070"
              ></v-divider>
            </v-col>
          </v-card-item>
          <v-col cols="12" class="justify-end d-flex pb-10">
            <v-btn rounded="lg" size="x-large" color="#2A3547" @click="saveItem"
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
  import { ref, inject } from "vue";
  const { getTeamColor, getMissionColor } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const createNew = inject("createNew", "false");
  const { $apiClient } = useNuxtApp();
  const formData = ref({
    name: "",
    details: "",
    image: null,
  });
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 150,
    maxFilesize: 5,
    maxFiles: 1,
    acceptedFiles:
      "image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/mov", // รองรับไฟล์ GIF, JPG, JPEG, PNG, MOV, MP4
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
      <p style="font-size: 14px;">Drag files here or click to upload</p>
    </div>
     <p style="position: absolute; bottom: 0; left: 30%; transform: translateX(-20%); font-size: 12px;">
      Recommend using high quality.jpg files less than 2MB .mp4 file less than 5MB
    </p>
  `,
  });
  const myVueDropzone = ref(null);
  const selectedFiles = ref([]);
  const title = ref([]);
  const hastag = ref([]);
  const topic = ref([]);
  const description = ref([]);
  const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const mediaType = ref([
    ".png",
    ".jpeg",
    ".jpg",
    ".mp4",
    ".mov",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);
  const selectMediaType = ref(null);

  const getSelectedFiles = () => {
    return myVueDropzone.value.getAcceptedFiles();
  };

  const handleSuccess = (file) => {
    const files = getSelectedFiles();

    const extension = "." + files[0].type.split("/").pop();
    selectMediaType.value = extension;
    console.log("files", extension);
  };

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
  // Function to handle saving the item (or deleting)
  const saveItem = async () => {
    // You can handle the save logic here

    //   // เพิ่มไฟล์ที่อัปโหลดเข้าไปใน formData
    //   myVueDropzone.value.files.forEach(file => {
    //     formData.append('image', file);
    //   });

    const formData = new FormData();
    formData.append("type", selectMediaType.value);
    formData.append("title", title.value);
    formData.append("hastag", hastag.value);
    formData.append("tagged_topic", topic.value);
    formData.append("description", description.value);

    const files = getSelectedFiles();
    files.forEach((file) => {
      formData.append("file", file);
    });

    console.log("formData", formData);
    let response;
    try {
      response = await $apiClient.post("/api/createArchive", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response status:", response.status);

      if (response.status == 201) {
        alert(`เพิ่ม achive สำเร็จ`);
      } else {
        alert(`ไม่สามารถสร้างทีมได้`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
      //   alert(`Error: ${error.response.data.message}`);
    }
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
