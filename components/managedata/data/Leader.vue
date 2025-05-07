<template>
  <div class="text-end pb-10">
    <div v-if="!isMobile">
      <v-row class="justify-end">
        <div class="pa-1">
          <v-btn
            color="#AEE0E8"
            outlined
            rounded="lg"
            @click="triggerFileInput"
          >
            <v-icon class="px-3">mdi-tray-arrow-down</v-icon
            ><span>Import CSV</span>
          </v-btn>

          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
            c
          />
        </div>
        <div class="pa-1">
          <v-btn color="#529B41" rounded="lg" @click="openMainstayModal"
            ><v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">เพิ่มแกนนำ</span>
          </v-btn>
        </div>
      </v-row>
    </div>
    <div v-else>
      <!-- <v-btn color="#FFA72F" rounded="lg"
          ><v-icon  color="white">mdi-plus</v-icon>
        </v-btn> -->
      <v-row class="justify-end">
        <div class="pa-1">
          <v-btn
            color="#AEE0E8"
            size="large"
            density="comfortable"
            icon="mdi-tray-arrow-down"
            @click="triggerFileInput"
          ></v-btn>

          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileUpload"
            style="display: none"
          />
        </div>
        <div class="pa-1">
          <v-btn
            color="#529B41"
            size="large"
            density="comfortable"
            icon="mdi-plus"
            @click="addMainstay = true"
          ></v-btn>
        </div>
      </v-row>
    </div>
  </div>

  <div class="pb-8">
    <v-text-field
      v-model="search"
      placeholder="ค้นหาชื่อแกนนำ"
      prepend-inner-icon="mdi-magnify"
      hide-details
      rounded="lg"
      variant="solo"
    >
      <template v-slot:append>
        <v-btn @click="fetchSchool()" rounded="lg" size="large" color="#000000">
          <span>ค้นหา</span>
        </v-btn>
      </template>
    </v-text-field>
  </div>

  <!-- <v-row> -->
  <!-- <v-col cols="12" md="3" class="py-0">
 
      <v-autocomplete
        v-model="selectedZoneId"
        :items="zoneItems"
        item-title="name"
        item-value="id"
        density="compact"
        placeholder="เลือกภาค"
        variant="solo"
        closable-chips
        @update:modelValue="updateProvinces"
        dense
        hide-no-data
      />
    </v-col>
    <v-col cols="12" md="3" class="py-0">
      <v-autocomplete
        v-model="selectedProvinceId"
        :items="ProvinceItems"
        item-title="name_th"
        item-value="id"
        density="compact"
        placeholder="เลือกจังหวัด"
        variant="solo"
        closable-chips
        @update:modelValue="updateDistrict"
        dense
        hide-no-data
      />
    </v-col>
    <v-col cols="12" md="3" class="py-0">
      <v-autocomplete
        v-model="selectedDistrictId"
        :items="districtItems"
        item-title="name_th"
        item-value="id"
        density="compact"
        placeholder="เลือกอำเภอ"
        variant="solo"
        closable-chips
        @update:modelValue="updateSubDistrict"
        dense
        hide-no-data
      />
    </v-col> -->
  <!-- <v-col cols="12" md="2" class="py-0">
      <v-autocomplete
        v-model="filterLevel"
        :items="StatusOptions"
        density="compact"
        variant="solo"
        placeholder="สถานะแกนนำ"
      ></v-autocomplete>
    </v-col>
    

    <v-col cols="12" md="1" class="py-0">
      <v-btn block @click="clearFilter()" variant="text"> ล้างทิ้ง </v-btn>
    </v-col>
  </v-row> -->

  <div class="pt-5">
    <v-data-table
      :headers="headers"
      :items="school_value"
      :mobile="isMobile"
      :hide-default-header="isMobile"
      hide-default-footer
      :loading="isLoading"
      loading-text="กำลังโหลดข้อมูล..."
    >
      <template v-slot:item.ลำดับ="{ index }">
        {{ calindexFunction(index + 1) }}
      </template>

      <template v-slot:item.coordinators="{ item }">
        <div
          :style="
            isMobile ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0px;'
          "
        >
          <template
            v-if="
              item.coordinators_info &&
              Array.isArray(item.coordinators_info) &&
              item.coordinators_info.length > 0
            "
          >
            <!-- หากมีมากกว่าหนึ่ง stakeholder ให้แสดงวงกลมที่สอง -->
            <template v-if="item.coordinators_info.length > 1">
              <div class="d-flex justify-center">
                <div style="position: relative; width: 60px; height: 40px">
                  <!-- วงกลมแรก -->

                  <v-avatar
                    size="40"
                    style="position: absolute; top: 0; left: 0; z-index: 2"
                  >
                    <v-img
                      v-if="item.coordinators_info[0].photo"
                      :src="item.coordinators_info[0].photo"
                      alt="Stakeholder Image"
                    />
                    <v-avatar
                      v-else
                      size="40"
                      style="background-color: #616161"
                    >
                      <span
                        style="
                          font-size: 1.5em;
                          color: white;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        {{
                          item.coordinators_info[0].name
                            ? item.coordinators_info[0].name
                                .charAt(0)
                                .toUpperCase()
                            : "?"
                        }}
                      </span>
                    </v-avatar>
                  </v-avatar>

                  <!-- วงกลมที่สอง (ตัวเลข) -->
                  <v-avatar
                    size="30"
                    color="grey"
                    style="position: absolute; top: 5px; left: 35px; z-index: 1"
                  >
                    <span
                      style="
                        font-size: 0.8em;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                      "
                    >
                      +{{ item.coordinators_info.length - 1 }}
                    </span>
                  </v-avatar>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- แสดงภาพของ coordinators_info ตัวแรก -->
              <div
                v-if="item.coordinators_info[0].photo"
                class="d-flex justify-center"
              >
                <v-avatar size="40">
                  <v-img
                    :src="item.coordinators_info[0].photo"
                    alt="coordinators_info Image"
                  ></v-img>
                </v-avatar>
              </div>
              <v-avatar v-else size="35" style="background-color: #616161">
                <span
                  style="
                    font-size: 1.2em;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  {{
                    item.coordinators_info[0].name
                      ? item.coordinators_info[0].name.charAt(0).toUpperCase()
                      : "?"
                  }}
                </span>
              </v-avatar>
            </template>
          </template>
          <template v-else>
            <v-avatar size="40">
              <v-icon style="font-size: 45px">mdi-account-circle</v-icon>
            </v-avatar>
          </template>
        </div>
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
  </div>

  <div class="text-center pt-16">
    <v-pagination
      v-model="page"
      :length="pagination.totalPages"
      rounded="circle"
      class="my-4"
    ></v-pagination>
  </div>

  <v-dialog v-model="addMainstay" max-width="1200">
    <v-card class="pa-2" rounded="lg">
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="text-h6">เพิ่มแกนนำ</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="addMainstay = false"
        ></v-btn>
      </v-card-title>
      <div class="pt-1 pb-1">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
      </div>

      <v-card-text class="pt-4">
        <v-row class="pt-0 pb-0">
          <v-col cols="12" sm="7" class="pt-0 pb-0">
            <span class="text-h6">ชื่อ-สกุล</span>
            <v-text-field
              v-model="name_leader"
              placeholder="กรอกชื่อ-สกุล"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" class="pt-0 pb-0">
            <span class="text-h6">เบอร์โทร</span>
            <v-text-field
              v-model="phone_leader"
              variant="outlined"
              density="compact"
              rounded="lg"
              :rules="[isNumber, minLength(10)]"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" sm="6" class="pt-4 pb-0">
              <span class="text-h6">สถานศึกษา</span>
              <v-autocomplete
                v-model="selectedAcademy"
                :items="academyName"
                item-title="name"
                item-value="id"
                placeholder="เลือกสถานศึกษา"
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="pt-4 pb-0">
              <span class="text-h6">การศึกษา</span>
              <v-autocomplete
                v-model="selectedEducation"
                :items="educationOptions"
                placeholder="เลือกระดับการศึกษา"
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="pt-4 pb-0">
              <span class="text-h6">สถานะแกนนำ</span>
              <v-autocomplete
                v-model="selectedStatus"
                :items="StatusOptions"
                placeholder="เลือกสถานะแกนนำ"
                variant="outlined"
                density="compact"
                rounded="lg"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </div>
        <div class="pt-4 pb-0">
          <span class="text-h6">ผู้ประสาน</span>
          <v-autocomplete
            class="w-100"
            v-model="selectedCoordinators"
            :items="CoordinatorName"
            item-title="name"
            item-value="id"
            multiple
            chips
            closable-chips
            placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
            variant="outlined"
            density="compact"
            rounded="lg"
          />
        </div>
        <!-- <div class="justify-end d-flex pt-5">
          <v-btn
            @click="addDropzone"
            color="#AEE0E8"
            elevation="2"
            rounded
            class="mx-2"
            style="font-size: 16px"
          >
            <v-icon left>mdi-account-plus</v-icon> เพิ่มผู้ประสาน
          </v-btn>
        </div>
        <div v-for="(dropzone, index) in dropzones" :key="index" class="pt-5">
          <div class="pt-0 pb-0">
            <span class="text-h6">ผู้ประสาน ({{ index + 1 }})</span>
   
            <v-autocomplete
              class="w-100"
              :id="'imageName-' + index"
              v-model="selectedCoordinators[index]"
              :items="CoordinatorName"
              item-title="name"
              item-value="id"
              placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
              variant="outlined"
              density="compact"
              rounded="lg"
            />
          </div>
        </div> -->
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
    <v-card class="pa-2" rounded="lg">
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="text-h6">แก้ไข</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="EditOverlay = false"
        ></v-btn>
      </v-card-title>
      <EditLeader
        :academyData="itemToAction"
        v-model:dialog="EditOverlay"
        @saved="fetchSchool()"
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
</template>

<script setup>
  import { ref } from "vue";
  import vueDropzone from "dropzone-vue3";
  import EditLeader from "./academy/EditLeader.vue";
  const dropzoneOptions = ref({
    url: "#",
    addRemoveLinks: true, // เพิ่มปุ่มลบ (ถ้าต้องการ)
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
  const selectedFiles = ref([]);
  const search = ref("");
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const dropzones = ref([{ files: [], imageName: "", phoneNumber: "" }]);
  const isLoading = ref(true);
  const EditOverlay = ref(false);
  const addMainstay = ref(false);
  const deleteOverlay = ref(false);
  const itemToAction = ref(null);
  const { $apiClient } = useNuxtApp();
  // const names_zone = ref([]);
  const zoneItems = ref([]);
  const ProvinceItems = ref([]);
  const SubDistrictItems = ref([]);

  const districtItems = ref([]);
  const selectedZoneId = ref(null);
  const selectedSubDistrictId = ref(null);
  const selectedDistrictId = ref(null);
  const selectedProvinceId = ref(null);
  const selectedAcademy = ref(null);
  const successMessage = ref("");
  const errorMessage = ref("");
  const initialZipCode = ref("");
  const SchoolValue = ref("");
  const academyName = ref("");
  const CoordinatorName = ref([]);
  const selectedCoordinators = ref([]);
  const phone_leader = ref("");
  const name_leader = ref("");
  const CopersonValue = ref("");
  const myVueDropzone = ref(null);
  const page = ref(1);
  const headers = ref([
    { title: "ลำดับ", value: "ลำดับ", align: "center" },
    { title: "ชื่อ-สกุล", value: "name", align: "center" },
    { title: "โรงเรียน", value: "academy_name", align: "center" },
    { title: "จำนวนกิจกรรม", value: "activity_count", align: "center" },
    { title: "เบอร์โทร", value: "phone_number", align: "center" },
    { title: "สถานะแกนนำ", value: "status", align: "center" },
    { title: "ผู้ประสาน", value: "coordinators", align: "center" },

    { title: "", value: "actions", sortable: false },
  ]);

  const selectedLevel = ref(null); // ใช้เก็บค่าที่ถูกเลือก
  const filterLevel = ref(null); // ใช้เก็บค่าที่ถูกเลือก

  const educationOptions = [
    "ต่ำกว่าปริญญาตรี",
    "ปริญญาตรี",
    "ปริญญาโท",
    "ปริญญาเอก",
  ];

  const selectedEducation = ref(""); // หรือให้มี default

  const StatusOptions = ["แกนนำ", "เก็งตัว"];

  const selectedStatus = ref(""); // หรือให้มี default

  const level = ref([
    { text: "ระดับ 0 ยังไม่ได้เข้าไปติดต่อ", value: 1 },
    { text: "ระดับ 1 เข้าไปติดกับ รร. และมีการวางแผนทำกิจกรรม", value: 2 },
    { text: "ระดับ 2 ชป.กร. เข้าทำกิจกรรมและเก็งตัวนร.", value: 3 },
    { text: "ระดับ 3 นร. ทำกิจกรรมเองจึงถือเป็นแกนนำ", value: 4 },
  ]);
  const NumStudent = ref(0);
  const NumLead = ref(0);
  const isMobile = ref(false);

  // ฟังก์ชันที่ใช้ในการเพิ่ม Dropzone ใหม่
  const addDropzone = () => {
    // เพิ่มออบเจ็กต์ใหม่ใน dropzones
    dropzones.value.push({ files: [], imageName: "", phoneNumber: "" });
  };

  const handleSuccess = (index) => {
    console.log(`อัปโหลดสำเร็จสำหรับ dropzone ที่ ${index}`);
    console.log(dropzones.value[index].files);
  };

  const handleFileAdded = (index, file) => {
    // เมื่อมีการเพิ่มไฟล์ใหม่ลงใน dropzone
    console.log(`ไฟล์ถูกเพิ่มใน dropzone ที่ ${index}:`, file);
    // คุณสามารถทำสิ่งต่าง ๆ เช่น เก็บไฟล์ลงใน dropzone
    dropzones.value[index].files.push(file);
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

  const school_value = ref([]);
  const pagination = ref({});
  const getSelectedFiles = () => {
    return myVueDropzone.value.getAcceptedFiles();
  };

  const clearFilter = async () => {
    search.value = null;
    selectedDistrictId.value = null;
    selectedProvinceId.value = null;
    selectedZoneId.value = null;
    filterLevel.value = null;
  };

  async function openMainstayModal() {
    addMainstay.value = true;
    const response = await $apiClient.get("/api/getAcademyNames");
    academyName.value = response.data;
    console.log(response.data);
    const response_coor = await $apiClient.get("/api/getCoordinator");
    console.log(response_coor.data.data);
    CoordinatorName.value = response_coor.data.data.map((item) => ({
      id: item._id,
      name: item.name,
    }));
  }

  // async function SubmitAdd() {
  //   const formData = new FormData();
  //   formData.append("education", selectedEducation.value);
  //   formData.append("name", name_leader.value);
  //   formData.append("status", selectedStatus.value);
  //   formData.append("academy", selectedAcademy.value);
  //   // formData.append("stakeholder", coordinate_name.value);
  //   formData.append("phone_number", phone_leader.value);
  //   // const files = getSelectedFiles();
  //   // files.forEach((file) => {
  //   //   formData.append("personPhotos", file);
  //   // });
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }
  //   try {
  //     const response = await $apiClient.post("/api/createLeader", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Response status:", response.status);

  //     if (response.status == 201) {
  //       addMainstay.value = false;
  //       await fetchSchool();
  //     } else {
  //       alert(`ไม่สามารถนำเข้าขอมูลได้ กรุณาลองใหม่อีกครั้ง`);
  //     }
  //   } catch (error) {
  //     alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
  //     //   alert(`Error: ${error.response.data.message}`);
  //   }
  // }

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

  const calindexFunction = (value) => {
    return value + (page.value - 1) * 10;
  };
  // const searchData = async () => {
  //   try {
  //     const params = {};
  //     // ตรวจสอบค่าของ search
  //     if (search.value && search.value.trim() !== "") {
  //       params.name = search.value; // ถ้ามีค่าของ search ส่งไป
  //     }
  //     // กำหนดเงื่อนไขการส่ง parameters ตามลำดับความสำคัญ
  //     if (selectedDistrictId.value) {
  //       params.amphure_id = selectedDistrictId.value;
  //     } else if (selectedProvinceId.value) {
  //       params.province_id = selectedProvinceId.value;
  //     } else if (selectedZoneId.value) {
  //       params.geography_id = selectedZoneId.value;
  //     }
  //     if (filterLevel.value) {
  //       params.level = filterLevel.value - 1;
  //     }
  //     console.log(params);

  //     // เรียก API ที่มีฟังก์ชันค้นหาข้อมูล
  //     const response = await $apiClient.get("api/getAcademy", {
  //       params: params,
  //     });
  //     school_value.value = response.data.data;
  //     pagination.value = response.data.pagination;

  //     // ทำสิ่งที่ต้องการกับข้อมูลที่ได้จาก API (response.data)
  //     console.log(response.data);

  //     // อาจจะต้องจัดการกับการแสดงผลหรือ pagination ที่ได้รับมา
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //   }
  // };

  async function navigateToDelete(value) {
    console.log("กำลังลบ item:", value._id);
    try {
      const response_delete = await $apiClient.delete(
        `/api/deleteAcademy/${value._id}`
      );

      console.log(response_delete.data);
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      deleteOverlay.value = false;
      await fetchSchool();
    }
  }

  async function fetchGeographies() {
    try {
      const response_zone = await $apiClient.get("/api/getGeography");
      const data_zone = response_zone.data;

      console.log(data_zone);
      // names_zone.value = data_zone.map((item) => item.name);
      zoneItems.value = data_zone.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      console.log("get zone:", zoneItems.value);

      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateProvinces() {
    // console.log(selectedZoneId.value);

    selectedSubDistrictId.value = "";
    selectedDistrictId.value = "";
    selectedProvinceId.value = "";
    try {
      // const response = await $apiClient.get(
      //   `/api/getProvince?id=${selectedZoneId.value}`
      // );
      const response = await $apiClient.get(
        `/api/queryProvince?geography_id=${selectedZoneId.value}`
      );

      const data_province = response.data;
      // console.log("data_province:", data_province);

      // สร้าง array ของ province objects และชื่อ province
      ProvinceItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));

      console.log("get province:", ProvinceItems.value);
      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data_province?.message ||
        "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateDistrict() {
    // console.log(selectedProvinceId.value);

    selectedSubDistrictId.value = "";
    selectedDistrictId.value = "";

    try {
      const response = await $apiClient.get(
        `/api/amphures/${selectedProvinceId.value}`
      );
      const data_province = response.data;

      // สร้าง array ของ province objects และชื่อ province
      districtItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));

      // console.log("get province:", districtItems.value);
      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data_province?.message ||
        "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateSubDistrict() {
    // console.log(selectedDistrictId.value);

    selectedSubDistrictId.value = "";

    try {
      const response = await $apiClient.get(
        `/api/tambons/${selectedDistrictId.value}`
      );
      const data_province = response.data;

      // สร้าง array ของ province objects และชื่อ province
      SubDistrictItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
        zip_code: item.zip_code,
      }));

      // console.log("get province:", SubDistrictItems.value);
      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data_province?.message ||
        "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  watch(selectedSubDistrictId, (newSubDistrictId) => {
    if (newSubDistrictId) {
      const selectedSubDistrict = SubDistrictItems.value.find(
        (item) => item.id === newSubDistrictId
      );
      if (selectedSubDistrict) {
        initialZipCode.value = selectedSubDistrict.zip_code.toString();
      } else {
        initialZipCode.value = ""; // เคลียร์ค่าหากไม่พบตำบล
      }
    } else {
      initialZipCode.value = ""; // เคลียร์ค่าหากไม่มีการเลือกตำบล
    }
  });

  async function fetchSchool() {
    try {
      const params = {};
      // ตรวจสอบค่าของ search
      if (search.value && search.value.trim() !== "") {
        params.name = search.value; // ถ้ามีค่าของ search ส่งไป
      }
      // กำหนดเงื่อนไขการส่ง parameters ตามลำดับความสำคัญ
      if (selectedDistrictId.value) {
        params.amphure_id = selectedDistrictId.value;
      } else if (selectedProvinceId.value) {
        params.province_id = selectedProvinceId.value;
      } else if (selectedZoneId.value) {
        params.geography_id = selectedZoneId.value;
      }
      if (filterLevel.value) {
        params.status = filterLevel.value;
      }
      params.page = page.value;
      const response = await $apiClient.get("/api/getLeader", {
        params: params,
      });

      console.log(response.data);

      school_value.value = response.data.data;
      pagination.value = response.data.totalPages;

      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  watch(page, fetchSchool);

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchSchool();
    await fetchGeographies();
  });

  const onClick = async () => {
    const formData = new FormData();
    formData.append("education", selectedEducation.value);
    formData.append("name", name_leader.value);
    formData.append("status", selectedStatus.value);
    formData.append("academy", selectedAcademy.value);
    formData.append("phone_number", phone_leader.value);
    formData.append("stakeholder", selectedCoordinators.value);

    try {
      const response = await $apiClient.post("/api/createLeader", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response status:", response);

      if (response.status == 201) {
        addMainstay.value = false;
        await fetchSchool();
      } else {
        alert(`ไม่สามารถนำเข้าขอมูลได้ กรุณาลองใหม่อีกครั้ง`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
      //   alert(`Error: ${error.response.data.message}`);
    }
    isLoading.value = false; // หยุดโหลดหลัง 0.5 วิ
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
  height: 140px; /* ตั้งค่าความสูง */
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
</style>
