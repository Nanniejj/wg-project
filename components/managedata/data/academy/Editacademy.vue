<template>
  <div class="pt-1 pb-1">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div>

  <v-card-text class="pt-4">
    <v-row>
      <v-col cols="12" sm="8" class="pt-0 pb-0">
        <span class="text-h6">{{
          initialStatusValue === "school" ? "ชื่อโรงเรียน" : "ชื่อสถานศึกษา"
        }}</span>
        <v-text-field
          v-model="schoolValue"
          placeholder="เพิ่มชื่อโรงเรียน"
          variant="outlined"
          density="compact"
          rounded="lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" class="pt-0 pb-0">
        <span class="text-h6">ภูมิภาค</span>
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

    <!-- ส่วนจังหวัด -->
    <v-row>
      <v-col cols="12" sm="6" class="pt-0 pb-0">
        <span class="text-h6">จังหวัด</span>
        <v-autocomplete
          v-model="selectedProvinceId"
          :items="provinceItems"
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

    <!-- ส่วนตำบลและรหัสไปรษณีย์ -->
    <v-row>
      <v-col cols="12" sm="8" class="pt-0 pb-0">
        <span class="text-h6">แขวง/ตำบล</span>
        <v-autocomplete
          v-model="selectedSubDistrictId"
          :items="subDistrictItems"
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
          v-model="zipCode"
          placeholder="รหัสไปรษณีย์"
          variant="outlined"
          density="compact"
          rounded="lg"
          :rules="[isNumber]"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- ส่วนจำนวนนักเรียนและแกนนำ -->
    <v-row>
      <v-col cols="12" md="4" class="py-0">
        <span class="text-h6">จำนวนนักเรียน</span>
        <v-number-input
          density="compact"
          v-model="numStudent"
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
          v-model="numLead"
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

    <div class="justify-end d-flex pt-5 pb-5">
      <v-btn
        @click="addDropzone"
        color="#AEE0E8"
        elevation="2"
        rounded
        class="mx-2"
        style="font-size: 16px"
      >
        <v-icon left>mdi-account-plus</v-icon> เพิ่มชื่อผู้เกี่ยวข้อง
      </v-btn>
    </div>

    <!-- ส่วนไฟล์ -->
    <v-row v-if="copersonValue.length > 0">
      <v-col
        v-for="(person, index) in copersonValue"
        :key="index"
        cols="12"
        md="12"
      >
        <v-row>
          <v-col cols="12" md="3">
            <div
              class="pa-4 d-flex"
              :class="{
                'flex-column justify-center align-center': person.image === '',
              }"
            >
              <!-- แสดงรูปภาพถ้ามี image -->
              <v-img
                v-if="person.image && person.image !== ''"
                :aspect-ratio="1"
                class="bg-white hover-image"
                rounded="xl"
                cover
                :src="person.image"
                style="width: 170px; height: 170px"
                @contextmenu.prevent
                @copy.prevent
              >
                <template v-slot:error>
                  <v-icon size="80" color="grey">mdi-image-broken</v-icon>
                </template>
              </v-img>

              <!-- ไม่แสดงอะไรเลยถ้าไม่มีรูป -->
              <div
                v-else
                class="d-flex align-center justify-center"
                :style="{
                  width: '230px',
                  height: '200px',
                  aspectRatio: '16 / 9',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '0.5rem',
                  fontSize: '80px',
                  fontWeight: 'bold',
                  color: '#555',
                }"
              >
                {{
                  person.person ? person.person.charAt(0).toUpperCase() : "?"
                }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="9">
            <span class="text-h6">ผู้ที่เกี่ยวข้อง</span>

            <div class="d-flex align-center">
              <v-text-field
                v-model="person.person"
                placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
                variant="outlined"
                density="compact"
                rounded="lg"
                class="flex-grow-1 mr-2"
                disabled
              ></v-text-field>

              <v-icon
                v-tooltip="'Delete'"
                style="margin-top: -20px"
                icon="mdi-trash-can"
                size="large"
                @click="confirmIndex = index"
              ></v-icon>
            </div>
          </v-col>
          <div v-if="confirmIndex === index" class="mt-2 w-100">
            <v-alert
              type="warning"
              density="compact"
              border="start"
              border-color="red"
            >
              <v-row class="d-flex justify-space-between align-center">
                <v-col cols="12" md="9">
                  <span>คุณต้องการลบผู้ที่เกี่ยวข้องใช่หรือไม่?</span>
                </v-col>
                <v-col cols="12" md="3" class="text-end">
                  <div>
                    <v-btn
                      size="small"
                      color="red"
                      class="mr-2"
                      @click="confirmDelete(index)"
                      >ยืนยัน</v-btn
                    >
                    <v-btn size="small" @click="confirmIndex = null"
                      >ยกเลิก</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-alert>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <div
      v-for="(dropzone, index) in dropzones"
      :key="index"
      class="dropzone-container pt-10"
    >
      <v-row>
        <v-col cols="12" md="3" class="justify-center d-flex">
          <!-- Dropzone Component -->
          <vue-dropzone
            :id="'dropzone-' + index"
            :options="dropzoneOptions"
            class="custom-dropzone"
            @vdropzone-success="handleSuccess(index)"
            @vdropzone-file-added="handleFileAdded(index, $event)"
            v-model:files="dropzone.files"
        /></v-col>
        <v-col cols="12" md="9">
          <span class="text-h6">เพิ่มชื่อผู้เกี่ยวข้อง ({{ index + 1 }})</span>
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
    <v-alert
      v-if="showAlert"
      :type="alertType"
      class="mt-8"
      border="start"
      variant="tonal"
      closable
      @click:close="showAlert = false"
    >
      {{ alertMessage }}
    </v-alert>
  </v-card-text>

  <!-- ปุ่มบันทึก -->
  <div class="d-flex justify-end pb-6 px-6">
    <v-btn
      color="#2A3547"
      rounded="lg"
      size="large"
      @click="handleSave"
      class="text-white"
      min-width="200"
    >
      บันทึก
    </v-btn>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { defineProps } from "vue";

  import vueDropzone from "dropzone-vue3";
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

  // รับ props จาก parent component
  const props = defineProps({
    academyData: {
      type: Object,
      required: true,
    },
  });
  // console.log(props.academyData);
  const alertMessage = ref("");
  const alertType = ref("warning"); // หรือ "success"
  const showAlert = ref(false);
  // ค่าต่างๆ ที่ใช้ในแบบฟอร์ม
  //   const schoolValue = props.academyData.name;
  //   const selectedZoneId = getGeographyName(props.academyData.geography_name);
  //   const selectedProvinceId = props.academyData.province_name;
  //   const selectedDistrictId = props.academyData.amphure_name;
  //   const selectedSubDistrictId = props.academyData.tambon_name;
  //   const initialZipCode = props.academyData.zipcode;
  //   const numStudent = props.academyData.student_count;
  //   const numLead = props.academyData.leader_count;
  //   const selectedLevel = props.academyData.level;
  //   const img = props.academyData.photo || "";
  //   const copersonValue = props.academyData.stakeholder;
  const selectedFiles = ref([]);
  const showConfirm = ref(false);

  // Refs สำหรับเก็บค่าเริ่มต้น
  const initialSchoolValue = ref("");
  const initialSelectedZoneId = ref({});
  const initialSelectedProvinceId = ref({});
  const initialSelectedDistrictId = ref({});
  const initialSelectedSubDistrictId = ref({});
  const initialZipCode = ref("");
  const initialNumStudent = ref(0);
  const initialNumLead = ref(0);
  const initialSelectedLevel = ref(null);
  const initialImg = ref("");
  const initialCopersonValue = ref([]);
  const initialStatusValue = ref("");
  const { $apiClient } = useNuxtApp();
  const dropzones = ref([]);
  const emit = defineEmits(["update:dialog", "saved"]); // event ที่จะส่งออก
  // ตัวเลือกต่างๆ
  const zoneItems = ref([]);
  const provinceItems = ref([]);
  const districtItems = ref([]);
  const subDistrictItems = ref([]);
  const level = ref([
    { text: "ระดับ 0 ยังไม่ได้เข้าไปติดต่อ", value: 1 },
    { text: "ระดับ 1 เข้าไปติดกับ รร. และมีการวางแผนทำกิจกรรม", value: 2 },
    { text: "ระดับ 2 ชป.กร. เข้าทำกิจกรรมและเก็งตัวนร.", value: 3 },
    { text: "ระดับ 3 นร. ทำกิจกรรมเองจึงถือเป็นแกนนำ", value: 4 },
  ]);
  const confirmIndex = ref(null);

  function confirmDelete(index) {
    copersonValue.value.splice(index, 1); // ลบคนที่เกี่ยวข้องออก
    confirmIndex.value = null;
  }

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
  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateProvinces() {
    selectedSubDistrictId.value = "";
    selectedDistrictId.value = "";
    selectedProvinceId.value = "";
    zipCode.value = "";
    try {
      // const response = await $apiClient.get(
      //   `/api/getProvince?id=${selectedZoneId.value}`
      // );
      const response = await $apiClient.get(
        `/api/queryProvince?geography_id=${selectedZoneId.value}`
      );

      const data_province = response.data;

      // สร้าง array ของ province objects และชื่อ province
      provinceItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));
    } catch (error) {
    } finally {
    }
  }

  // ฟังก์ชันที่ใช้ในการเพิ่ม Dropzone ใหม่
  const addDropzone = () => {
    // เพิ่มออบเจ็กต์ใหม่ใน dropzones
    dropzones.value.push({ files: [], imageName: "" });
  };

  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateDistrict() {
    // console.log(selectedProvinceId.value);

    selectedSubDistrictId.value = "";
    selectedDistrictId.value = "";
    zipCode.value = "";

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
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
    }
  }

  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateSubDistrict() {
    // console.log(selectedDistrictId.value);

    selectedSubDistrictId.value = "";
    zipCode.value = "";

    try {
      const response = await $apiClient.get(
        `/api/tambons/${selectedDistrictId.value}`
      );
      const data_province = response.data;

      // สร้าง array ของ province objects และชื่อ province
      subDistrictItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
        zip_code: item.zip_code,
      }));
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
    }
  }
  async function fetchGeographies() {
    try {
      const response_zone = await $apiClient.get("/api/getGeography");
      const data_zone = response_zone.data;

      // names_zone.value = data_zone.map((item) => item.name);
      zoneItems.value = data_zone.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    } catch (error) {
      console.log("error");
    } finally {
    }
  }
  async function fetchProvinces() {
    try {
      const response_zone = await $apiClient.get(
        `/api/queryProvince?geography_id=${initialSelectedZoneId.value.id}`
      );

      const data_zone = response_zone.data;

      // names_zone.value = data_zone.map((item) => item.name);
      provinceItems.value = data_zone.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));
    } catch (error) {
      console.log("error");
    } finally {
    }
  }
  async function fetchDistricts() {
    try {
      const response_zone = await $apiClient.get(
        `/api/amphures/${initialSelectedProvinceId.value.id}`
      );

      const data_zone = response_zone.data;

      // names_zone.value = data_zone.map((item) => item.name);
      districtItems.value = data_zone.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));
    } catch (error) {
      console.log("error");
    } finally {
    }
  }

  async function fetchSubDistricts() {
    try {
      const response_zone = await $apiClient.get(
        `/api/tambons/${initialSelectedDistrictId.value.id}`
      );

      const data_zone = response_zone.data;

      // names_zone.value = data_zone.map((item) => item.name);
      subDistrictItems.value = data_zone.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));
    } catch (error) {
      console.log("error");
    } finally {
    }
  }

  function setInitialValues(data = props.academyData) {
    initialSchoolValue.value = data.name;
    // initialSelectedZoneId.value = getGeographyName(data.geography_name);
    initialSelectedZoneId.value = {
      name: getGeographyName(data.geography_name),
      id: data.geography_id,
    };
    initialSelectedProvinceId.value = {
      name_th: data.province_name,
      id: data.province_id,
    };
    initialSelectedDistrictId.value = {
      name_th: data.amphure_name,
      id: data.amphure_id,
    };
    initialSelectedSubDistrictId.value = {
      name_th: data.tambon_name,
      id: data.tambon_id,
    };
    initialZipCode.value = data.zipcode;
    initialNumStudent.value = data.student_count;
    initialNumLead.value = data.leader_count;
    initialSelectedLevel.value = data.level;
    initialImg.value = data.photo || "";
    initialCopersonValue.value = Array.isArray(data.stakeholder)
      ? data.stakeholder
      : [data.stakeholder];
    initialStatusValue.value = data.status;
  }

  // Refs สำหรับเก็บค่าปัจจุบันของฟอร์ม (ผูกกับ v-model ใน template)
  const id = ref(props.academyData._id);
  const schoolValue = ref(props.academyData.name);
  const selectedZoneId = ref({
    name: getGeographyName(props.academyData.geography_name),
    id: getGeographyID(props.academyData.geography_id),
  });
  const selectedProvinceId = ref({
    name_th: props.academyData.province_name,
    id: props.academyData.province_id,
  });
  const selectedDistrictId = ref({
    name_th: props.academyData.amphure_name,
    id: props.academyData.amphure_id,
  });
  const selectedSubDistrictId = ref({
    name_th: props.academyData.tambon_name,
    id: props.academyData.tambon_id,
  });
  const zipCode = ref(props.academyData.zipcode);
  const numStudent = ref(props.academyData.student_count);
  const numLead = ref(props.academyData.leader_count);
  const selectedLevel = ref(props.academyData.level.name);
  const selectedLevelId = ref(props.academyData.level.level);
  const img = ref(props.academyData.photo || "");
  const copersonValue = ref(props.academyData.stakeholder);
  const stakeholder_num = props.academyData.stakeholder.length;

  // ฟังก์ชันตรวจสอบค่าที่เปลี่ยนแปลง
  function getChangedFields() {
    const changedFields = {};
    const formData = new FormData(); // สร้าง FormData ที่นี่

    if (schoolValue.value !== initialSchoolValue.value) {
      changedFields.name = schoolValue.value;
      formData.append("name", schoolValue.value);
    }

    if (
      selectedSubDistrictId.value.id !== initialSelectedSubDistrictId.value.id
    ) {
      changedFields.geocode = selectedSubDistrictId.value.id;
      formData.append("geocode", selectedSubDistrictId.value.id);
    }

    if (numStudent.value !== initialNumStudent.value) {
      changedFields.student_count = numStudent.value;
      formData.append("student_count", numStudent.value);
    }

    if (numLead.value !== initialNumLead.value) {
      changedFields.leader_count = numLead.value;
      formData.append("leader_count", numLead.value);
    }

    if (copersonValue.value.length !== stakeholder_num) {
      changedFields.stakeholder = copersonValue.value;
      // กรณีคุณต้องการส่ง stakeholder เป็น JSON
      formData.append("stakeholder", JSON.stringify(copersonValue.value));
    }

    if (
      !isNaN(selectedLevel.value) &&
      selectedLevel.value - 1 !== selectedLevelId.value
    ) {
      changedFields.level = selectedLevel.value - 1;
      formData.append("level", selectedLevel.value - 1);
    }

    // เพิ่มไฟล์และชื่อจาก dropzones
    dropzones.value.forEach((dropzone, index) => {
      const file = dropzone.files?.[0]; // ใช้ไฟล์แรก
      const name = dropzone.imageName || "";

      formData.append(`addperson[${index}][person]`, name);

      if (file) {
        formData.append(`addperson[${index}][image]`, file);
      }
    });

    return formData; // เปลี่ยนจาก returning changedFields เป็น formData
  }

  const isNumber = (value) => {
    if (!value) {
      return true; // อนุญาตให้ว่างได้ (ถ้าต้องการ)
    }
    return /^[0-9]+$/.test(value) || "กรุณาใส่ตัวเลขเท่านั้น";
  };

  // ฟังก์ชันที่จะเรียกเมื่อกดปุ่มบันทึก
  async function handleSave() {
    const changedData = getChangedFields();
    console.log("ข้อมูลที่เปลี่ยนแปลง:", changedData);
    // for (let pair of changedData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      console.log(id.value);
      const response = await $apiClient.put(
        `/api/updateAcademy/${id.value}`,
        changedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;

      if (response.status === 200) {
        alertType.value = "success";
        alertMessage.value = "บันทึกข้อมูลสำเร็จ";
        showAlert.value = true;
        emit("update:dialog", false);
        emit("saved"); // แจ้งว่าได้บันทึกแล้ว
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
      //   isLoading.value = false;
    }
  }

  // ฟังก์ชันสำหรับเช็คค่า geography_name
  function getGeographyName(geographyName) {
    return geographyName === "กรุงเทพและปริมณฑล" ? "ภาคกลาง" : geographyName;
  }
  // ฟังก์ชันสำหรับเช็คค่า geography_name
  function getGeographyID(id) {
    return id === 7 ? 2 : id;
  }

  // เก็บค่าเริ่มต้นเมื่อ Component Mount แล้ว (หรือเมื่อ props เปลี่ยนแปลง)
  onMounted(async () => {
    setInitialValues();
    await fetchGeographies();
    await fetchProvinces();
    await fetchDistricts();
    await fetchSubDistricts();
  });

  watch(selectedSubDistrictId, (newSubDistrictId) => {
    if (newSubDistrictId) {
      const selectedSubDistrict = subDistrictItems.value.find(
        (item) => item.id === newSubDistrictId
      );
      if (selectedSubDistrict) {
        zipCode.value = selectedSubDistrict.zip_code.toString();
      } else {
        zipCode.value = ""; // เคลียร์ค่าหากไม่พบตำบล
      }
    } else {
      zipCode.value = ""; // เคลียร์ค่าหากไม่มีการเลือกตำบล
    }
  });

  watch(
    () => props.academyData,
    (newAcademyData) => {
      setInitialValues(newAcademyData);
    }
  );
</script>

<style scoped>
  .custom-dropzone {
    border: 2px dashed #ccc;
    padding: 20px;
    border-radius: 10px;
  }
</style>
