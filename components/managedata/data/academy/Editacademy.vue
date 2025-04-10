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
          item-value="amphure_id"
          density="compact"
          placeholder="อำเภอ"
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
          item-value="tambon_id"
          density="compact"
          placeholder="ตำบล"
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

    <!-- ส่วนไฟล์ -->
    <v-row v-if="copersonValue != ''">
      <v-col cols="12" md="4">
        <div
          class="pa-4 d-flex"
          :class="{ 'flex-column justify-center align-center': img === '' }"
        >
          <v-img
            v-if="img !== '' || img === null"
            :aspect-ratio="1"
            class="bg-white hover-image"
            rounded="xl"
            :src="img"
            style="width: 200px; height: 200px"
            @contextmenu.prevent
            @copy.prevent
          >
            <template v-slot:error>
              <v-icon size="80" color="grey">mdi-image-broken</v-icon>
            </template>
          </v-img>
          <v-icon v-else size="150" color="grey">
            mdi-image-off-outline
          </v-icon>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <span class="text-h6">ผู้ที่เกี่ยวข้อง</span>
        <v-text-field
          v-model="copersonValue"
          placeholder="เพิ่มชื่อผู้ที่เกี่ยวข้อง"
          variant="outlined"
          density="compact"
          rounded="lg"
        ></v-text-field>
      </v-col>
    </v-row>
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

  // รับ props จาก parent component
  const props = defineProps({
    academyData: {
      type: Object,
      required: true,
    },
  });
  console.log(props.academyData);

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

  // Refs สำหรับเก็บค่าเริ่มต้น
  const initialSchoolValue = ref("");
  const initialSelectedZoneId = ref("");
  const initialSelectedProvinceId = ref({});
  const initialSelectedDistrictId = ref("");
  const initialSelectedSubDistrictId = ref("");
  const initialZipCode = ref("");
  const initialNumStudent = ref(0);
  const initialNumLead = ref(0);
  const initialSelectedLevel = ref(null);
  const initialImg = ref("");
  const initialCopersonValue = ref("");
  const initialStatusValue = ref("");
  const { $apiClient } = useNuxtApp();
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
  // ฟังก์ชัน updateProvinces (แบบ async)
  async function updateProvinces() {
    console.log(selectedZoneId.value);

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
      //   console.log("data_province:", data_province);

      // สร้าง array ของ province objects และชื่อ province
      ProvinceItems.value = data_province.map((item) => ({
        id: item.id,
        name_th: item.name_th,
      }));

      console.log("get province:", ProvinceItems.value);
    } catch (error) {
    } finally {
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
      loading.value = false;
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
      loading.value = false;
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
    } catch (error) {
      console.log("error");
    } finally {
    }
  }

  // เก็บค่าเริ่มต้นเมื่อ Component Mount แล้ว (หรือเมื่อ props เปลี่ยนแปลง)
  onMounted(async () => {
    setInitialValues();
    await fetchGeographies();
    await updateProvinces();
  });

  watch(
    () => props.academyData,
    (newAcademyData) => {
      setInitialValues(newAcademyData);
    }
  );

  function setInitialValues(data = props.academyData) {
    initialSchoolValue.value = data.name;
    initialSelectedZoneId.value = getGeographyName(data.geography_name);
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
    initialCopersonValue.value = data.stakeholder;
    initialStatusValue.value = data.status;
  }

  // Refs สำหรับเก็บค่าปัจจุบันของฟอร์ม (ผูกกับ v-model ใน template)
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
  const selectedLevel = ref(props.academyData.level);
  const img = ref(props.academyData.photo || "");
  const copersonValue = ref(props.academyData.stakeholder);

  // ฟังก์ชันตรวจสอบค่าที่เปลี่ยนแปลง
  function getChangedFields() {
    const changedFields = {};

    if (schoolValue.value !== initialSchoolValue.value) {
      changedFields.name = schoolValue.value;
    }
    if (selectedZoneId.value !== initialSelectedZoneId.value) {
      changedFields.geography_name = selectedZoneId.value; // หรือ ID ที่คุณใช้จริง
    }
    if (selectedProvinceId.value !== initialSelectedProvinceId.value) {
      changedFields.province_name = selectedProvinceId.value;
    }
    if (selectedDistrictId.value !== initialSelectedDistrictId.value) {
      changedFields.amphure_name = selectedDistrictId.value;
    }
    if (selectedSubDistrictId.value !== initialSelectedSubDistrictId.value) {
      changedFields.tambon_name = selectedSubDistrictId.value;
    }
    if (zipCode.value !== initialZipCode.value) {
      changedFields.zipcode = zipCode.value;
    }
    if (numStudent.value !== initialNumStudent.value) {
      changedFields.student_count = numStudent.value;
    }
    if (numLead.value !== initialNumLead.value) {
      changedFields.leader_count = numLead.value;
    }
    if (selectedLevel.value !== initialSelectedLevel.value) {
      changedFields.level = selectedLevel.value;
    }
    if (img.value !== initialImg.value) {
      changedFields.photo = img.value;
    }
    if (copersonValue.value !== initialCopersonValue.value) {
      changedFields.stakeholder = copersonValue.value;
    }

    return changedFields;
  }

  // ฟังก์ชันที่จะเรียกเมื่อกดปุ่มบันทึก
  function handleSave() {
    const changedData = getChangedFields();
    console.log("ข้อมูลที่เปลี่ยนแปลง:", changedData);

    // ส่งเฉพาะ changedData ไปยัง Backend เพื่อบันทึก
    // ... logic การเรียก API ของคุณ ...
  }

  // dropzone options
  const dropzoneOptions = ref({
    url: "/upload",
    autoProcessQueue: false,
  });

  const handleSuccess = () => {
    // handle success เมื่ออัปโหลดไฟล์สำเร็จ
  };

  // ฟังก์ชันสำหรับเช็คค่า geography_name
  function getGeographyName(geographyName) {
    return geographyName === "กรุงเทพและปริมณฑล" ? "ภาคกลาง" : geographyName;
  }
  // ฟังก์ชันสำหรับเช็คค่า geography_name
  function getGeographyID(id) {
    return id === 7 ? 2 : id;
  }
</script>

<style scoped>
  .custom-dropzone {
    border: 2px dashed #ccc;
    padding: 20px;
    border-radius: 10px;
  }
</style>
