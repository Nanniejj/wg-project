<template>
  <div class="pt-1 pb-1 px-3">
    <v-divider class="border-opacity-75 dashed-divider"></v-divider>
  </div>

  <v-card-text class="pt-4">
    <v-row>
      <v-col cols="12" sm="3" class="pb-0">
        <v-img
          v-if="PhotoValue"
          :width="250"
          aspect-ratio="16/9"
          rounded="lg"
          cover
          :src="PhotoValue"
        ></v-img>

        <div
          v-else
          class="d-flex align-center justify-center"
          :style="{
            width: '250px',
            height: '250px',
            aspectRatio: '16 / 9',
            backgroundColor: '#e0e0e0',
            borderRadius: '0.5rem',
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#555',
          }"
        >
          {{ NameValue ? NameValue.charAt(0).toUpperCase() : "?" }}
        </div>
      </v-col>

      <v-col cols="12" sm="9" class="pb-0">
        <div class="pt-2">
          <span class="text-h6">ชื่อ-สกุล</span>
          <v-text-field
            v-model="NameValue"
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
              v-model="PhoneValue"
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
              v-model="TeamValue"
              :items="TeamItems"
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

  // รับ props จาก parent component
  const props = defineProps({
    academyData: {
      type: Object,
      required: true,
    },
    dialog: Boolean,
  });
  const emit = defineEmits(["update:dialog", "saved"]); // event ที่จะส่งออก

  const id = ref(props.academyData._id);
  const NameValue = ref(props.academyData.name);
  const TeamValue = ref(props.academyData.team_name);
  const PhoneValue = ref(props.academyData.phone_number);
  const TeamIdValue = ref(props.academyData.team);
  const PhotoValue = ref(props.academyData.photo);
  const TeamItems = ref([]);
  const selectedFiles = ref([]);

  // Refs สำหรับเก็บค่าเริ่มต้น
  const initialNameValue = ref("");
  const initialPhoneNumber = ref("");
  const initialTeamId = ref({});
  const initialTeamName = ref({});

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
    initialTeamId.value = data.team;
    initialPhoneNumber.value = data.phone_number;
    initialTeamName.value = data.team_name;
  }

  // ฟังก์ชันตรวจสอบค่าที่เปลี่ยนแปลง
  function getChangedFields() {
    const changedFields = {};

    if (NameValue.value !== initialNameValue.value) {
      changedFields.name = NameValue.value;
    }
    if (
      TeamValue.value !== initialTeamId.value &&
      TeamValue.value.length === initialTeamId.value.length
    ) {
      changedFields.team = TeamValue.value;
    }

    if (PhoneValue.value !== initialPhoneNumber.value) {
      changedFields.phone_number = PhoneValue.value;
    }

    return changedFields;
  }

  async function fetchTeams() {
    try {
      const response_zone = await $apiClient.get("/api/getTeam");
      const data_zone = response_zone.data;

      console.log(data_zone);
      // names_zone.value = data_zone.map((item) => item.name);
      TeamItems.value = data_zone
        .sort((a, b) => a.name.localeCompare(b.name)) // เรียงตามชื่อ
        .map((item) => ({
          id: item._id,
          name: item.name,
        }));

      //   console.log("TeamItems:", TeamItems.value);
    } catch (error) {
      console.log("error");
    } finally {
    }
  }

  // ฟังก์ชันที่จะเรียกเมื่อกดปุ่มบันทึก
  async function handleSave() {
    const changedData = getChangedFields();
    console.log("ข้อมูลที่เปลี่ยนแปลง:", changedData);

    try {
      console.log(id.value);
      const response = await $apiClient.put(
        `/api/updateCoordinator/${id.value}`,
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
    await fetchTeams();
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
