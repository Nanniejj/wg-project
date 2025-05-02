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
          <v-btn color="#FFA72F" rounded="lg" @click="dialogSchool()"
            ><v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">เพิ่มข้อมูลสถานศึกษา</span>
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
            color="#FFA72F"
            size="large"
            density="comfortable"
            icon="mdi-plus"
            @click="addSchool = true"
          ></v-btn>
        </div>
      </v-row>
    </div>
  </div>

  <div class="pb-8">
    <v-text-field
      v-model="search"
      placeholder="ค้นหาชื่อสถานศึกษา"
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

  <v-row>
    <v-col cols="12" md="3" class="py-0">
      <!-- Dropdown สำหรับเลือกภาค -->
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
    </v-col>
    <v-col cols="12" md="2" class="py-0">
      <v-autocomplete
        v-model="filterLevel"
        :items="level"
        item-title="text"
        item-value="value"
        density="compact"
        variant="solo"
        placeholder="ระดับปฏิบัติการ"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" md="1" class="py-0">
      <v-btn block @click="clearFilter()" variant="text"> ล้างทิ้ง </v-btn>
    </v-col>
  </v-row>

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
      <template v-slot:item.geography_name="{ item }">
        {{
          item.geography_name === "กรุงเทพและปริมณฑล"
            ? "ภาคกลาง"
            : item.geography_name
        }}
      </template>
      <template v-slot:item.POC="{ item }">
        <div
          :style="
            isMobile ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0px;'
          "
        >
          <template
            v-if="
              item.stakeholder &&
              Array.isArray(item.stakeholder) &&
              item.stakeholder.length > 0
            "
          >
            <!-- หากมีมากกว่าหนึ่ง stakeholder ให้แสดงวงกลมที่สอง -->
            <template v-if="item.stakeholder.length > 1">
              <div class="d-flex justify-center">
                <div style="position: relative; width: 60px; height: 40px">
                  <!-- วงกลมแรก -->
                  <v-avatar
                    size="40"
                    style="position: absolute; top: 0; left: 0; z-index: 2"
                  >
                    <v-img
                      :src="item.stakeholder[0].image"
                      alt="Stakeholder Image"
                    />
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
                      +{{ item.stakeholder.length - 1 }}
                    </span>
                  </v-avatar>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- แสดงภาพของ stakeholder ตัวแรก -->
              <div class="d-flex justify-center">
              <v-avatar size="40">
                <v-img
                  :src="item.stakeholder[0].image"
                  alt="Stakeholder Image"
                ></v-img>
              </v-avatar>
            </div>
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

  <v-dialog v-model="addSchool" max-width="1200">
    <v-card class="pa-2" rounded="lg">
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="text-h6">เพิ่มข้อมูลโรงเรียน</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="addSchool = false"
        ></v-btn>
      </v-card-title>
      <div class="pt-1 pb-1">
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
      </div>

      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12" sm="8" class="pt-0 pb-0">
            <span class="text-h6">ชื่อโรงเรียน</span>
            <v-text-field
              v-model="SchoolValue"
              placeholder="เพิ่มชื่อโรงเรียน"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pt-0 pb-0">
            <span class="text-h6">ภูมิภาค</span>

            <!-- Dropdown สำหรับเลือกภาค -->
            <v-autocomplete
              v-model="selectedZoneId"
              :items="zoneItems"
              item-title="name"
              item-value="id"
              density="compact"
              placeholder="ภาค"
              variant="outlined"
              closable-chips
              @update:modelValue="updateProvinces"
              dense
              hide-no-data
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <span class="text-h6">จังหวัด</span>
            <!-- Dropdown สำหรับเลือกภาค -->
            <v-autocomplete
              v-model="selectedProvinceId"
              :items="ProvinceItems"
              item-title="name_th"
              item-value="id"
              density="compact"
              placeholder="จังหวัด"
              variant="outlined"
              closable-chips
              @update:modelValue="updateDistrict"
              dense
              hide-no-data
            />
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <span class="text-h6">เขต/อำเภอ</span>
            <!-- Dropdown สำหรับเลือกภาค -->
            <v-autocomplete
              v-model="selectedDistrictId"
              :items="districtItems"
              item-title="name_th"
              item-value="id"
              density="compact"
              placeholder="เขต/อำเภอ"
              variant="outlined"
              closable-chips
              @update:modelValue="updateSubDistrict"
              dense
              hide-no-data
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" class="pt-0 pb-0">
            <span class="text-h6">แขวง/ตำบล</span>
            <!-- Dropdown สำหรับเลือกภาค -->
            <v-autocomplete
              v-model="selectedSubDistrictId"
              :items="SubDistrictItems"
              item-title="name_th"
              item-value="id"
              density="compact"
              placeholder="แขวง/ตำบล"
              variant="outlined"
              closable-chips
              dense
              hide-no-data
            />
          </v-col>
          <v-col cols="12" sm="4" class="pt-0 pb-0">
            <span class="text-h6">ไปรษณีย์</span>
            <v-text-field
              :items="SubDistrictItems"
              item-title="zip_code"
              item-value="zip_code"
              return-object
              density="compact"
              variant="outlined"
              placeholder="รหัสไปรษณีย์"
              :rules="[isNumber]"
              :model-value="initialZipCode"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">จำนวนนักเรียน</span>
            <v-number-input
              density="compact"
              v-model="NumStudent"
              :min="0"
              control-variant="split"
              inset
              variant="outlined"
            ></v-number-input>
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">จำนวนแกนนำ</span>
            <v-number-input
              density="compact"
              v-model="NumLead"
              :min="0"
              control-variant="split"
              inset
              variant="outlined"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <span class="text-h6">เลือกระดับปฏิบัติการ</span>
            <v-autocomplete
              v-model="selectedLevel"
              :items="level"
              item-title="text"
              item-value="value"
              density="compact"
              variant="outlined"
              label="เลือกระดับ"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12" md="4">
            <div class="pa-4 d-flex align-center justify-start">
              <vue-dropzone
                ref="myVueDropzone"
                id="dropzone"
                :options="dropzoneOptions"
                class="custom-dropzone"
                @vdropzone-success="handleSuccess"
                v-model:files="selectedFiles"
              />
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <span class="text-h6">ผู้ที่เกี่ยวข้อง</span>
            <v-text-field
              v-model="CopersonValue"
              placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
              variant="outlined"
              density="compact"
              rounded="lg"
            ></v-text-field>
          </v-col>
        </v-row> -->

        <!-- สร้างหลายๆ Dropzone -->
        <!-- ปุ่มสำหรับเพิ่ม Dropzone ใหม่ -->
        <div class="justify-end d-flex pt-10">
          <v-btn
            @click="addDropzone"
            color="#AEE0E8"
            elevation="2"
            rounded
            class="mx-2"
            style="font-size: 16px"
          >
            <v-icon left>mdi-account-plus</v-icon> เพิ่ม POC
          </v-btn>
        </div>
        <div
          v-for="(dropzone, index) in dropzones"
          :key="index"
          class="dropzone-container pt-10"
        >
          <v-row>
            <v-col cols="12" md="2" class="justify-center d-flex">
              <!-- Dropzone Component -->
              <vue-dropzone
                :id="'dropzone-' + index"
                :options="dropzoneOptions"
                class="custom-dropzone"
                @vdropzone-success="handleSuccess(index)"
                @vdropzone-file-added="handleFileAdded(index, $event)"
                v-model:files="dropzone.files"
            /></v-col>
            <v-col cols="12" md="10">
              <span class="text-h6">POC ({{ index + 1 }})</span>
              <!-- Input สำหรับกรอกชื่อภาพ -->
              <v-text-field
                type="text"
                class="w-100"
                :id="'imageName-' + index"
                v-model="dropzone.imageName"
                placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
                variant="outlined"
                density="compact"
                rounded="lg"
              />
            </v-col>
          </v-row>
        </div>
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
      <Editacademy :academyData="itemToAction" />
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
  import Editacademy from "./academy/Editacademy.vue";
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
  const dropzones = ref([{ files: [], imageName: "" }]);
  const selectedFiles = ref([]);
  const search = ref("");
  const { getTeamColor, getMissionColor, getMissionName } = useColors();
  const isLoading = ref(true);
  const EditOverlay = ref(false);
  const addSchool = ref(false);
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
  const successMessage = ref("");
  const errorMessage = ref("");
  const initialZipCode = ref("");
  const SchoolValue = ref("");
  const CopersonValue = ref("");
  const myVueDropzone = ref(null);
  const page = ref(1);
  const headers = ref([
    { title: "ลำดับ", value: "ลำดับ", align: "center" },
    { title: "ชื่อสถานศึกษา", value: "name", align: "center" },
    { title: "จำนวนนักเรียน", value: "student_count", align: "center" },
    { title: "ภาค", value: "geography_name", align: "center" },
    { title: "จังหวัด", value: "province_name", align: "center" },
    { title: "อำเภอ", value: "amphure_name", align: "center" },
    { title: "ระดับปฏิบัติการ", value: "level", align: "center" },
    { title: "แกนนำ", value: "leader_count", align: "center" },
    { title: "กิจกรรม", value: "activity_count", align: "center" },
    { title: "POC", value: "POC", align: "center" },
    { title: "", value: "actions", sortable: false },
  ]);

  const selectedLevel = ref(null); // ใช้เก็บค่าที่ถูกเลือก
  const filterLevel = ref(null); // ใช้เก็บค่าที่ถูกเลือก

  const level = ref([
    { text: "ระดับ 0 ยังไม่ได้เข้าไปติดต่อ", value: 1 },
    { text: "ระดับ 1 เข้าไปติดกับ รร. และมีการวางแผนทำกิจกรรม", value: 2 },
    { text: "ระดับ 2 ชป.กร. เข้าทำกิจกรรมและเก็งตัวนร.", value: 3 },
    { text: "ระดับ 3 นร. ทำกิจกรรมเองจึงถือเป็นแกนนำ", value: 4 },
  ]);
  const NumStudent = ref(0);
  const NumLead = ref(0);
  const isMobile = ref(false);

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
  // ฟังก์ชันที่ใช้ในการเพิ่ม Dropzone ใหม่
  const addDropzone = () => {
    // เพิ่มออบเจ็กต์ใหม่ใน dropzones
    dropzones.value.push({ files: [], imageName: "" });
  };

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

      // console.log(data_zone);
      // names_zone.value = data_zone.map((item) => item.name);
      zoneItems.value = data_zone.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      // console.log("get zone:", zoneItems.value);

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
      const params = {
        status: "university", // กำหนดค่า default ของ status เป็น "school"
      };
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
        params.level = filterLevel.value - 1;
      }
      params.page = page.value;

      const response = await $apiClient.get("/api/getAcademy", {
        params: params,
      });

      school_value.value = response.data.data;
      pagination.value = response.data.pagination;

      successMessage.value = "Data fetched successfully!";
    } catch (error) {
      console.error("There was an error!", error);
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred.";
    } finally {
      isLoading.value = false;
    }
  }

  const isNumber = (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return /^[0-9]+$/.test(value) || "กรุณาใส่ตัวเลขเท่านั้น";
  };

  watch(page, fetchSchool);

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchSchool();
    await fetchGeographies();
  });
  const dialogSchool = async () => {
    addSchool.value = true;
  };

  const onClick = async () => {
    const formData = new FormData();
    formData.append("level", selectedLevel.value);
    formData.append("name", SchoolValue.value);
    formData.append("geocode", selectedSubDistrictId.value);
    formData.append("leader_count", NumLead.value);
    formData.append("student_count", NumStudent.value);
    formData.append("stakeholder", CopersonValue.value);
    formData.append("status", "university");
    dropzones.value.forEach((dropzone, index) => {
      const file = dropzone.files?.[0]; // ใช้แค่ไฟล์แรก
      const name = dropzone.imageName || "";

      console.log(`Dropzone ${index} ชื่อ:`, name);
      console.log(`Dropzone ${index} ไฟล์:`, file);

      formData.append(`stakeholder[${index}][person]`, name);

      if (file) {
        formData.append(`stakeholder[${index}][image]`, file);
      }
    });

    try {
      const response = await $apiClient.post("/api/createAcademy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Response status:", response.status);

      if (response.status == 201) {
        addSchool.value = false;
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
