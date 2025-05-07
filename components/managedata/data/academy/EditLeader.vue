<template>
  <div class="pt-1 pb-1 px-3">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div>

  <v-card-text class="pt-4">
    <v-row class="pt-0 pb-0">
      <v-col cols="12" sm="7" class="pt-0 pb-0">
        <span class="text-h6">ชื่อ-สกุล</span>
        <v-text-field
          v-model="NameValue"
          placeholder="กรอกชื่อ-สกุล"
          variant="outlined"
          density="compact"
          rounded="lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5" class="pt-0 pb-0">
        <span class="text-h6">เบอร์โทร</span>
        <v-text-field
          v-model="PhoneValue"
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
            v-model="AcademyValue"
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
            v-model="EducationValue"
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
            v-model="StatusValue"
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
        v-model="CoordinatorValue"
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
    dialog: Boolean,
  });
  const emit = defineEmits(["update:dialog", "saved"]); // event ที่จะส่งออก
  console.log(props.academyData);
  const id = ref(props.academyData._id);
  const NameValue = ref(props.academyData.name);
  const PhoneValue = ref(props.academyData.phone_number);
  const AcademyValue = ref(props.academyData.academy_name);
  const EducationValue = ref(props.academyData.education);
  const StatusValue = ref(props.academyData.status);
  const CoordinatorValue = ref(props.academyData.coordinators_info);
  const TeamItems = ref([]);
  const selectedFiles = ref([]);
  const CoordinatorName = ref([]);
  const academyName = ref("");

  const educationOptions = [
    "ต่ำกว่าปริญญาตรี",
    "ปริญญาตรี",
    "ปริญญาโท",
    "ปริญญาเอก",
  ];

  const StatusOptions = ["แกนนำ", "เก็งตัว"];

  // Refs สำหรับเก็บค่าเริ่มต้น
  const initialNameValue = ref("");
  const initialAcademyValue = ref("");
  const initialEducationValue = ref("");
  const initialPhoneNumber = ref("");
  const initialStatusValue = ref("");
  const initialCoordinatorValue = ref("");

  const alertMessage = ref("");
  const alertType = ref("warning"); // หรือ "success"
  const showAlert = ref(false);

  const { $apiClient } = useNuxtApp();
  // ตัวเลือกต่างๆ
  const Name = ref([]);
  const Phone_number = ref([]);
  const TeamId = ref([]);
  const TeamName = ref([]);

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

  function setInitialValues(data = props.academyData) {
    initialNameValue.value = data.name;
    initialPhoneNumber.value = data.phone_number;
    initialAcademyValue.value = data.academy_name;
    initialEducationValue.value = data.education;
    initialStatusValue.value = data.status;
    initialCoordinatorValue.value = data.coordinators_info;
  }

  // ฟังก์ชันตรวจสอบค่าที่เปลี่ยนแปลง
  function getChangedFields() {
    const changedFields = {};

    if (NameValue.value !== initialNameValue.value) {
      changedFields.name = NameValue.value;
    }

    if (PhoneValue.value !== initialPhoneNumber.value) {
      changedFields.phone_number = PhoneValue.value;
    }
    if (StatusValue.value !== initialStatusValue.value) {
      changedFields.status = StatusValue.value;
    }
    if (EducationValue.value !== initialEducationValue.value) {
      changedFields.education = EducationValue.value;
    }
    if (CoordinatorValue.value !== initialCoordinatorValue.value) {
      changedFields.coordinator_name = CoordinatorValue.value;
    }

    if (AcademyValue.value !== initialAcademyValue.value) {
      changedFields.academy = AcademyValue.value;
    }

    return changedFields;
  }

  //   async function fetchTeams() {
  //     try {
  //       const response_zone = await $apiClient.get("/api/getTeam");
  //       const data_zone = response_zone.data;

  //       console.log(data_zone);
  //       // names_zone.value = data_zone.map((item) => item.name);
  //       TeamItems.value = data_zone
  //         .sort((a, b) => a.name.localeCompare(b.name)) // เรียงตามชื่อ
  //         .map((item) => ({
  //           id: item._id,
  //           name: item.name,
  //         }));

  //       //   console.log("TeamItems:", TeamItems.value);
  //     } catch (error) {
  //       console.log("error");
  //     } finally {
  //     }
  //   }

  async function fetchCoordinator() {
    const response = await $apiClient.get("/api/getAcademyNames");
    academyName.value = response.data;

    const response_coor = await $apiClient.get("/api/getCoordinator");

    CoordinatorName.value = response_coor.data.data.map((item) => ({
      id: item._id,
      name: item.name,
    }));
  }

  // ฟังก์ชันที่จะเรียกเมื่อกดปุ่มบันทึก
  async function handleSave() {
    const changedData = getChangedFields();
    console.log("ข้อมูลที่เปลี่ยนแปลง:", changedData);

    try {
      console.log(id.value);
      const response = await $apiClient.put(
        `/api/updateLeader/${id.value}`,
        changedData
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

  // dropzone options
  const dropzoneOptions = ref({
    url: "/upload",
    autoProcessQueue: false,
  });

  const handleSuccess = () => {
    // handle success เมื่ออัปโหลดไฟล์สำเร็จ
  };

  // เก็บค่าเริ่มต้นเมื่อ Component Mount แล้ว (หรือเมื่อ props เปลี่ยนแปลง)
  onMounted(async () => {
    setInitialValues();
    await fetchCoordinator();
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
