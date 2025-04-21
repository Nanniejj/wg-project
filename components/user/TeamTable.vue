<template>
  <div>
    <v-row>
      <!-- File Upload Section -->
      <v-col
        cols="12"
        md="3"
        :style="{ '--dropzone-bg-color': selectedColor }"
        class="justify-center d-flex pt-8"
      >
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          class="custom-dropzone"
          v-model:files="selectedFiles"
        />
      </v-col>

      <!-- Form Inputs -->
      <v-col cols="12" md="9" class="pt-2">
        <div>
          <div>ชื่อทีม</div>
          <v-text-field
            density="compact"
            placeholder="ใส่ชื่อทีมที่ต้องการสร้าง"
            variant="outlined"
            v-model="teamName"
          >
          </v-text-field>
          <!-- <v-select density="compact" label="เลือกทีม" :items="teamItems" variant="outlined"
                        v-model="selectTeam" class="mb-4"></v-select> -->
        </div>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <div>
              <div>เลือกสีประจำทีม</div>
              <v-color-picker
                v-model="selectedColor"
                class="mt-2 mb-4 w-100"
              ></v-color-picker>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="9">
            <div>
              <div>รายละเอียด</div>
              <v-textarea
                v-model="Description"
                placeholder="เพิ่มรายละเอียด"
                row-height="25"
                rows="12"
                variant="outlined"
                auto-grow
                shaped
                class="mb-4 mt-2"
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
        <!-- <div>
                    <div>Assign</div>
                    <v-row align="center" justify="center" class="my-auto">
                        <v-col cols="12" class="my-auto">
                            <div v-for="(field, index) in assignFields" :key="index" class="d-flex align-center mb-2">
                                <v-text-field placeholder="เพิ่มรายชื่อ" variant="outlined" hide-details
                                    density="compact" v-model="assignFields[index]"
                                    class="flex-grow-1 mr-2"></v-text-field>
                                <v-btn variant="text" color="#a51f16" @click="removeAssignField(index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="3" class="my-auto">
                            <v-btn color="#46AFC7" @click="addAssignField">
                                <v-icon left>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div> -->
      </v-col>
    </v-row>

    <div class="text-right pt-8">
      <v-btn
        color="#2A3547"
        style="width: 250px; min-width: 50px"
        size="x-large"
        rounded="lg"
        @click="saveItem"
        ><span class="text-h6">บันทึก</span></v-btn
      >
    </div>
  </div>
</template>
<script setup>
  import vueDropzone from "dropzone-vue3";
  const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    autoProcessQueue: false, 
    thumbnailWidth: 320,
    thumbnailHeight: 320,
    maxFilesize: 2,
    maxFiles: 1,
    acceptedFiles: "image/jpeg,image/png",
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
      <div style="text-align: center;">
        <i class="mdi mdi-upload-circle" style="font-size: 48px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
      </div>
    `,
  });
  const selectedFiles = ref([]);
  const myVueDropzone = ref(null);
  const { $apiClient } = useNuxtApp();
  const teamName = ref(null);
  const selectedColor = ref(null);
  const Description = ref(null);
  const { getTeamColorSoft, getTeamColor } = useColors();
  const isLoading = ref(true);

  // Function to handle saving the item (or deleting)
  const saveItem = async () => {
    // You can handle the save logic here

    //   // เพิ่มไฟล์ที่อัปโหลดเข้าไปใน formData
    //   myVueDropzone.value.files.forEach(file => {
    //     formData.append('image', file);
    //   });

    const formData = new FormData();
    formData.append("name", teamName.value);
    formData.append("color_code", selectedColor.value);
    formData.append("description", Description.value);

    const files = getSelectedFiles();
    files.forEach((file) => {
      formData.append("image", file);
    });

    console.log("Item saved:", teamName.value, selectedColor.value);
    let response;
    try {
      response = await $apiClient.post("/api/createTeam", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response status:", response.status);

      if (response.status == 201) {
        alert(`สร้างทีมสำเร็จ`);
      } else {
        alert(`ไม่สามารถสร้างทีมได้`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
      //   alert(`Error: ${error.response.data.message}`);
    }
  };

  const getSelectedFiles = () => {
    return myVueDropzone.value.getAcceptedFiles();
  };
</script>

<style scoped>
  .v-sheet {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 350px; /* ตั้งค่าความสูง */
  width: 350px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #707070;
  background-color: var(--dropzone-bg-color, #E9E9E9); /* ใช้ CSS Variable */
  border-radius: 20px; 
}
</style>
