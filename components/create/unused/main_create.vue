<template>
  <v-row v-if="!selectedMission">
    <v-col 
      v-if="!isMobile" 
      cols="12" sm="12" md="4" lg="2" 
      style="border-right: 2px solid #707070;">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title class="text-h5" style="font-weight: bold"
            >Create Mission</v-card-title
          >
        </v-col>

        <v-col cols="12" class="justify-center d-flex pa-1 px-4">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            @click="submitForm"
          >
          <span style="text-transform: none" class="text-h6">Create new</span>
          </v-btn>
          <!-- <v-divider
            vertical
            :thickness="2"
            style="margin-top: -55px"
            class="px-1 border-opacity-50"
            color="#707070"
          ></v-divider> -->
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else cols="12" sm="12" md="4" lg="2" style="border-right: 2px solid #707070;">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title class="text-h5" style="font-weight: bold"
            >Create Mission</v-card-title
          >
        </v-col>

        <v-col cols="12" class="justify-center d-flex pa-1 px-4">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            @click="submitForm"
          >
            <span style="font-size: 16px; text-transform: none"
              >Create new</span
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="8" lg="10">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="5"
          lg="4"
          class="pa-4 align-center justify-center"
        >
          <v-col cols="12" class="d-flex justify-center">
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              class="custom-dropzone"
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <span style="font-size: 16px">Logo cover mission</span>
          </v-col>
        </v-col>

        <v-col cols="12" sm="12" md="7" lg="8">
          <v-card-text>
            <v-form ref="formRef" v-model="valid">
              <span style="font-size: 16px">Mission name</span>
              <!-- <v-select
                density="compact"
                label="Select mission"
                variant="outlined"
                rounded="lg"
                style="margin-top: 5px"
                :items="missions"
                v-model="selectedMission"
              ></v-select> -->
              <v-select
                density="compact"
                label="Select mission"
                variant="outlined"
                rounded="lg"
                style="margin-top: 5px"
                :items="missions"
                item-value="mission"
                v-model="selectedMission"
              >
                <template v-slot:item="{ props, item, index }">
                  <v-list-item :key="index">
                    <v-list-item-title v-bind="props" class="cursor-pointer">
                      Mission {{ item.raw.mission }} {{ item.raw.name }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-select>

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
    <v-col v-if="!isMobile" cols="12" sm="12" md="4" lg="2" style="border-right: 2px solid #707070;">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title class="text-h5" style="font-weight: bold"
            >Create Mission</v-card-title
          >
        </v-col>

        <v-col cols="12" class="justify-center d-flex pa-1 px-4">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            @click="submitForm"
          >
            <span style="font-size: 16px; text-transform: none"
              >Create new</span
            >
          </v-btn>
          <!-- <v-divider
            vertical
            :thickness="2"
            style="margin-top: -55px"
            class="px-1 border-opacity-50"
            color="#707070"
          ></v-divider> -->
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else cols="12" sm="12" md="4" lg="2">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title class="text-h5" style="font-weight: bold"
            >Create Mission</v-card-title
          >
        </v-col>

        <v-col cols="12" class="justify-center d-flex pa-1 px-4">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            @click="submitForm"
          >
            <span style="font-size: 16px; text-transform: none"
              >Create new</span
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="8" lg="10">
      <component 
        :is="getMissionComponent(selectedMission)"
        :teams="teams"
        :selectedMission ="selectedMission"
        @taskData="handleCreateTaskData"
        @taskDataM5="handleCreateSpecialTask"
        @taskDataM6="handleCreateSpecialTask"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  import { useDisplay } from "vuetify";
  import { computed } from "vue";
  import vueDropzone from "dropzone-vue3";
  import RMission from "./components/create/mission/Rmission.vue";
  // import R1 from "./components/create/mission/R1.vue";
  // import R2 from "./components/create/mission/R2.vue";
  // import R3 from "./components/create/mission/R3.vue";
  // import R4 from "./components/create/mission/R4.vue";
  // import R5 from "./components/create/mission/R5.vue";
  // import R6 from "./components/create/mission/R6.vue";
  // import R7 from "./components/create/mission/R7.vue";
  // import R8 from "./components/create/mission/R8.vue";
  // import R9 from "./components/create/mission/R9.vue";
  // import R10 from "./components/create/mission/R10.vue";
  // import R11 from "./components/create/mission/R11.vue";
  // import R12 from "./components/create/mission/R12.vue";
  import M1 from "./components/create/mission/M1.vue";
  // import M2 from "./components/create/mission/M2.vue";
  // import M3 from "./components/create/mission/M3.vue";
  // import M4 from "./components/create/mission/M4.vue";
  import M5 from "./components/create/mission/M5.vue";
  import M6 from "./components/create/mission/M6.vue";
  // import M7 from "./components/create/mission/M7.vue";
  // import M8 from "./components/create/mission/M8.vue";
  import Coordinate from "../mission/Coordinate.vue";
  import Swal from "sweetalert2";
  const display = useDisplay();
  const isMobile = computed(() => display.smAndDown.value);
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
  `,
  });

    const missions = ref([])
    const teams = ref([])
    // const topics = ref([])
  // const missions = ref([
  //   "Mission M1",
  //   "Mission M2",
  //   "Mission M3",
  //   "Mission M4",
  //   "Mission M5",
  //   "Mission M6",
  //   "Mission M7",
  //   "Mission M8",
  //   "Mission R1",
  //   "Mission R2",
  //   "Mission R3",
  //   "Mission R4",
  //   "Mission R5",
  //   "Mission R6",
  //   "Mission R7",
  //   "Mission R8",
  //   "Mission R9",
  //   "Mission R10",
  //   "Mission R11",
  //   "Mission R12",
  //   "หัวข้อประสาน"
  //   // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  // ]);
  const selectedMission = ref("");

  // Method to map mission name to component
  const getMissionComponent = (missionName) => {
    const missionComponents = {
      "M1": M1,
      "M2": RMission,
      "M3": RMission,
      "M4": RMission,
      "M5": M5,
      "M6": M6,
      "M7": RMission,
      "M8": RMission,
      "R1": RMission,
      "R2": RMission,
      "R3": RMission,
      "R4": RMission,
      "R5": RMission,
      "R6": RMission,
      "R7": RMission,
      "R8": RMission,
      "R9": RMission,
      "R10": RMission,
      "R11": RMission,
      "R12": RMission,
      "หัวข้อประสาน": Coordinate,
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
  const confirmedAlert = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };
  const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
  };

  const submitForm = () => {
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
  };
  const handleCreateTaskData = async(data) => {
    let mission = missions.value.find(item => item.mission == selectedMission.value)
    data.name =  mission.name
    console.log("Task data :", data);
    await createTask(data);
    submitForm()
};
async function handleCreateSpecialTask(data){
  let mission = missions.value.find(item => item.mission === selectedMission.value);
  data.name = mission.name;

  const formData = new FormData();

  // ใส่ค่าธรรมดา (string, number)
  for (let key in data) {
    const value = data[key];

    // ถ้าเป็น array หรือ object ให้ stringify
    if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }

  // หาก backend ต้องการแยกไฟล์ออกจาก base64 แนะนำให้แปลง base64 เป็น File หรือ Blob:
  formData.delete('contentsPhoto');
  // แปลง contentsPhoto (base64 image) เป็น File แล้วแนบใหม่
    if (Array.isArray(data.contentsPhoto)) {
        let newContentsPhoto = []; // สร้าง array ใหม่เพื่อเก็บไฟล์
        data.contentsPhoto.forEach((photo, index) => {
            if (photo.dataUrl) {
                let file = convertBase64ToFile(photo.dataUrl, `photo_${index}.png`);
                // newContentsPhoto.push(file); // เพิ่มไฟล์ใหม่ใน array
                formData.append('contentsPhoto', file);
            }
        });
        // console.log("newContentsPhoto", newContentsPhoto);
        
        // formData.append('contentsPhoto', JSON.stringify(newContentsPhoto)); // แปลงเป็น JSON string ก่อนส่งไปยัง backend
        // newContentsPhoto.forEach(element => {
            // formData.append('contentsPhoto', element);
        // });
        
    }

  // ตรวจสอบสิ่งที่แนบ
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
        
    //     }

    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // ดูว่าแนบถูกหรือยัง
    }

  // ส่ง formData ไปยัง backend
  await createTaskMoreDetails(formData);
  submitForm()
};
function convertBase64ToFile(base64, filename){
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
onMounted(async () => {
    let accessMission = localStorage.getItem("mission");
    try {
        missions.value = await getTaskCategories();
        teams.value = await getTeams();
        if(accessMission){
            missions.value = missions.value.filter(item => accessMission.includes(item.mission))
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
console.log(localStorage.getItem("mission"));
});
</script>
<style scoped>
  .v-divider {
    height: 800px; /* กำหนดความสูงที่ต้องการ */
  }
  
  .custom-divider {
    margin-left: 25px; /* กำหนดมาร์จินซ้าย */
    max-width: 100%;
  
  }

  .custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 270px; /* ตั้งค่าความสูง */
  width: 270px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: #E9E9E9;
  border-radius: 20px; 
}
/* .custom-dropzone::before {
  content: '\2191';
  font-size: 48px;
  color: #29A0AF;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
} */
</style>
