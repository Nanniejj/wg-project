<template>
  <v-container>
    <div class="pb-5 px-8">
      <v-text-field
        v-model="search"
        placeholder="SEARCH"
        prepend-inner-icon="mdi-magnify"
        hide-details
        rounded="lg"
        variant="solo"
      >
        <template v-slot:append>
          <v-btn
            @click="fetchCoordinator()"
            rounded="lg"
            size="large"
            color="#000000"
          >
            <span>ค้นหา</span>
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="pt-5 pb-5">
      <v-divider :thickness="2"></v-divider>
    </div>
    <div class="text-end pb-5">
      <div v-if="!isMobile">
        <v-btn color="#95D51E" rounded="lg" @click="AddPoc()"
          ><v-icon color="white">mdi-plus</v-icon>
          <span style="color: white">เพิ่มผู้ประสาน</span>
        </v-btn>
      </div>
      <div v-else>
        <!-- <v-btn color="#FFA72F" rounded="lg"
          ><v-icon  color="white">mdi-plus</v-icon>
        </v-btn> -->
        <v-btn
          color="#95D51E"
          size="large"
          density="comfortable"
          icon="mdi-plus"
        ></v-btn>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="POC"
      :mobile="isMobile"
      :hide-default-header="isMobile"
      hide-default-footer
      :loading="isLoading"
      loading-text="กำลังโหลดข้อมูล..."
    >
      <template v-slot:item.ลำดับ="{ index }">
        {{ calindexFunction(index + 1) }}
      </template>
      <template #item.photo="{ item }">
        <v-avatar size="40" color="grey" class="text-white font-weight-bold">
          <template v-if="item.photo">
            <v-img :src="item.photo" alt="photo" />
          </template>
          <template v-else>
            {{ item.name ? item.name.charAt(0).toUpperCase() : "?" }}
          </template>
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="!isMobile" class="align-items-center d-flex">
          <v-icon
            v-tooltip="'Edit'"
            icon="mdi-pencil"
            @click="
              itemToAction = item;
              EditOverlay = true;
            "
          ></v-icon>
          <v-icon
            v-tooltip="'Delete'"
            icon="mdi-trash-can"
            @click="
              itemToAction = item;
              deleteOverlay = true;
            "
          ></v-icon>
        </div>
        <div v-else class="align-items-center">
          <span
            style="color: #29a0af"
            @click="
              itemToAction = item;
              EditOverlay = true;
            "
            >แก้ไข</span
          >
          <span
            style="color: red; margin-left: 35px"
            @click="
              itemToAction = item;
              deleteOverlay = true;
            "
            >ลบ</span
          >
        </div>
      </template>
    </v-data-table>

    <div class="text-center pt-16">
      <v-pagination
        v-model="page"
        :length="pagination.totalPages"
        rounded="circle"
        class="my-4"
      ></v-pagination>
    </div>

    <v-dialog v-model="addNetwork" max-width="1200">
      <v-card class="pa-2" rounded="xl">
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          <span class="text-h6"> เพิ่มผู้ประสาน</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="large"
            @click="addNetwork = false"
          ></v-btn>
        </v-card-title>
        <div class="pt-1 pb-1">
          <v-divider class="border-opacity-75 dashed-divider"></v-divider>
        </div>

        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" sm="4" class="pt-4 pb-0">
              <div class="pa-4 d-flex align-center justify-start">
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  class="custom-dropzone"
                  v-model:files="selectedFiles"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="8" class="pb-0">
              <div class="pt-4 pb-0">
                <span class="text-h6">ชื่อ-สกุล</span>
                <v-text-field
                  v-model="nameCoordinator"
                  placeholder="กรอกชื่อ-สกุล"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                ></v-text-field>
              </div>

              <v-row>
                <v-col cols="12" sm="8" class="pt-4 pb-0">
                  <span class="text-h6">เบอร์โทร</span>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    rounded="lg"
                    v-model="phone_number"
                    placeholder="กรอกเบอร์"
                    :rules="[isNumber, minLength(10)]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="pt-4 pb-0">
                  <span class="text-h6">ทีม</span>
                  <v-select
                    placeholder="Select Team"
                    variant="outlined"
                    rounded="lg"
                    density="compact"
                    v-model="selectedAffiliation"
                    :items="affiliations_data"
                    item-title="name"
                    item-value="id"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-alert
            v-if="showAlert"
            :type="alertType"
            class="mt-4"
            border="start"
            variant="tonal"
            closable
            @click:close="showAlert = false"
          >
            {{ alertMessage }}
          </v-alert>
        </v-card-text>

        <div class="d-flex justify-end pb-6 px-6">
          <v-btn
            color="#2A3547"
            rounded="lg"
            size="large"
            @click="onClick()"
            class="text-white"
            min-width="200"
          >
            บันทึก
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="EditOverlay" max-width="1200">
      <v-card class="pa-2" rounded="xl">
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          <span class="text-h6">แก้ไข</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="large"
            @click="EditOverlay = false"
          ></v-btn>
        </v-card-title>
        <EditCoordinator
          :academyData="itemToAction"
          v-model:dialog="EditOverlay"
          @saved="fetchCoordinator()"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteOverlay" max-width="400">
      <v-card rounded="xl" elevation="7">
        <v-card-title class="text-center">
          <span class="headline">คำเตือน</span>
        </v-card-title>
        <v-card-subtitle class="text-center">
          <v-icon color="error" size="50">mdi-trash-can-outline</v-icon>
          <div class="text-h7 pt-5 font-weight-bold">
            ท่านต้องการลบข้อมูลนี้ใช่หรือไม่?
          </div>
        </v-card-subtitle>
        <v-card-actions class="justify-center pt-5">
          <v-btn color="green" @click="navigateToDelete(itemToAction)" large
            >ยืนยัน</v-btn
          >
          <v-btn color="red" @click="deleteOverlay = false" large>ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import EditCoordinator from "./academy/EditCoordinator.vue";
  import vueDropzone from "dropzone-vue3";
  const dropzoneOptions = ref({
    url: "#",
    thumbnailWidth: 110,
    thumbnailHeight: 150,
    maxFilesize: 5,
    maxFiles: 1,
    acceptedFiles:
      "image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/mov", // รองรับไฟล์ GIF, JPG, JPEG, PNG, MOV, MP4
    headers: { "My-Awesome-Header": "header value" },
    //   dictDefaultMessage: `
    //   <div style="text-align: center;">
    //     <i class="mdi mdi-upload-circle" style="font-size: 30px; color: #29A0AF;"></i>
    //     <p style="font-size: 12px;">Drag files here or click to upload</p>
    //   </div>
    //    <p style="position: absolute; bottom: 0; left: 30%; transform: translateX(-20%); font-size: 10px;">
    //     Recommend using high quality.jpg files less than 2MB .mp4 file less than 5MB
    //   </p>
    // `,
    dictDefaultMessage: `
    <div style="text-align: center;">
      <i class="mdi mdi-upload-circle" style="font-size: 30px; color: #29A0AF;"></i>
      <p style="font-size: 12px;">Drag files here or click to upload</p>
    </div>
  
  `,
  });
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const { $apiClient } = useNuxtApp();
  const isLoading = ref(true);
  const affiliations_data = ref([]);
  const selectedAffiliation = ref(null);
  const addNetwork = ref(false);
  const isMobile = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");
  const myVueDropzone = ref(null);
  const phone_number = ref("");
  const nameCoordinator = ref("");
  const POC = ref([]);
  const page = ref(1);
  const pagination = ref({});

  const search = ref("");
  const itemToAction = ref(null);
  const deleteOverlay = ref(false);
  const EditOverlay = ref(false);
  const alertMessage = ref("");
  const alertType = ref("warning"); // หรือ "success"
  const showAlert = ref(false);

  const headers = ref([
    { title: "ลำดับ", value: "ลำดับ", align: "center" },
    { title: "รูปภาพ", value: "photo", sortable: false, align: "center" },
    { title: "ชื่อ-สกุล", value: "name", align: "center" },
    { title: "เบอร์โทร", value: "phone_number", align: "center" },
    { title: "สังกัด", value: "team_name", align: "center" },
    // { title: "ทัพภาค", value: "army_region" },
    // { title: "ผู้เกี่ยวข้อง", value: "stakeholder" },
    { title: "", value: "actions", sortable: false, align: "center" },
  ]);

  const calindexFunction = (value) => {
    return value + (page.value - 1) * 10;
  };

  const item = ref([]);

  const isNumber = (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return /^[0-9]+$/.test(value) || "กรุณาใส่ตัวเลขเท่านั้น";
  };

  const minLength = (min) => (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return value.length >= min || `ต้องมีอย่างน้อย ${min} หลัก`;
  };

  // Only run this logic in the client environment
  if (process.client) {
    isMobile.value = window.innerWidth < 860;

    // Function to update `isMobile` on window resize
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 960;
    };

    // Watch for window resize events
    watchEffect(() => {
      window.addEventListener("resize", updateIsMobile);
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });
  }

  async function AddPoc() {
    addNetwork.value = true;
    try {
      const response = await $apiClient.get("/api/getTeam");
      const data_team = response.data;

      affiliations_data.value = data_team
        .sort((a, b) => a.name.localeCompare(b.name)) // เรียงตามชื่อ
        .map((item) => ({
          id: item._id,
          name: item.name,
        }));
      // console.log(affiliations_data.value);
    } finally {
      // loading.value = false;
    }
  }

  async function fetchCoordinator() {
    try {
      const params = {
        page: page.value, // กำหนดค่า default ของ status เป็น "school"
      };
      // ตรวจสอบค่าของ search
      if (search.value && search.value.trim() !== "") {
        params.name = search.value; // ถ้ามีค่าของ search ส่งไป
      }
      const response = await $apiClient.get("/api/getCoordinator", {
        params: params,
      });

      POC.value = response.data.data;
      pagination.value = response.data.pagination;
      // console.log(POC.value);

      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  async function navigateToDelete(value) {
    try {
      const response_delete = await $apiClient.delete(
        `/api/deleteCoordinator/${value._id}`
      );

      // console.log(response_delete.data);
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      await fetchCoordinator();
      deleteOverlay.value = false;
    }
  }

  const getSelectedFiles = () => {
    return myVueDropzone.value.getAcceptedFiles();
  };

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchCoordinator();
  });

  watch(page, fetchCoordinator);

  const onClick = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append("phone_number", phone_number.value);
    formData.append("name", nameCoordinator.value);
    formData.append("team", selectedAffiliation.value);

    const files = getSelectedFiles();
    files.forEach((file) => {
      formData.append("photo", file);
    });

    try {
      const response = await $apiClient.post(
        "/api/createCoordinator",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alertType.value = "success";
        alertMessage.value = "บันทึกข้อมูลสำเร็จ";
        showAlert.value = true;
        await fetchCoordinator();
        addNetwork.value = false;
      } else {
        alertType.value = "warning";
        alertMessage.value = "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง";
        showAlert.value = true;
      }
    } catch (error) {
      alertType.value = "warning";
      if (error.response) {
        alertMessage.value =
          error.response.data?.error || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
      } else if (error.request) {
        alertMessage.value = "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้";
      } else {
        alertMessage.value = "เกิดข้อผิดพลาดไม่ทราบสาเหตุ กรุณาลองใหม่";
      }
      showAlert.value = true;
      console.error("Upload error:", error);
    } finally {
      isLoading.value = false;
    }
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
  
          ::v-deep(.v-input__append){
      margin-inline-start: -95px !important; 
    }

    .custom-dropzone {
  position: relative;
  border: 2px dashed #ccc;
  height: 250px; /* ตั้งค่าความสูง */
  width: 250px;
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
