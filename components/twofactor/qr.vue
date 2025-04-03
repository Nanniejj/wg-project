<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-card rounded="xl" elevation="12" class="pa-6 text-center" width="430">
      <!-- ไอคอนล็อก -->
      <v-icon size="50" color="primary">mdi-lock</v-icon>

      <!-- หัวข้อ -->
      <h2 class="mt-2 font-weight-bold">ตั้งค่าการยืนยันตัวตน 2 ขั้นตอน</h2>
      <p class="text-grey-darken-1 text-body-2">
        สแกน QR Code ด้วย Google Authenticator หรือแอปที่รองรับ
      </p>

      <div v-if="loading" class="pt-16 pb-16">
        <v-progress-circular
          indeterminate
          color="grey"
          size="50"
          width="3"
        ></v-progress-circular>
      </div>

      <div v-else>
        <img
          :src="qr"
          alt="QR Code"
          width="180"
          height="180"
          class="rounded-lg"
        />
      </div>

      <!-- ปุ่มถัดไป -->
      <v-btn
        class="mt-3"
        color="primary"
        size="large"
        block
        variant="elevated"
        @click="onClick"
      >
        ถัดไป
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  const { $apiClient } = useNuxtApp();

  const router = useRouter();

  const onClick = () => {
    router.push("/authen");
  };

  let qr = ref("");

  const loading = ref(true);

  const fetchData = async () => {
    try {
      const response = await $apiClient.get("/api/generate-otp");

      qr.value = response.data.qrCode;

      loading.value = false;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  // รอให้ fetchData ทำงานเสร็จ ก่อนดำเนินการอื่นๆ
  onMounted(async () => {
    await fetchData();
  });
</script>
<style scoped>
  /* คุณสามารถกำหนดสไตล์สำหรับ QR Code ได้ที่นี่ */
  img {
    margin-top: 20px;
    width: 300px;
    height: 300px;
  }
</style>
