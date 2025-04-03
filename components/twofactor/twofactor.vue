<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-card rounded="lg" elevation="10" class="pa-5" width="500">
      <div class="text-center">
        <!-- ไอคอนล็อก -->
        <v-icon size="48" color="primary">mdi-lock</v-icon>

        <!-- หัวข้อ -->
        <h2 class="mt-2 mb-1 font-weight-medium">Two-Factor Authentication</h2>
        <p class="text-grey-darken-1 text-body-2">
          กรุณากรอกรหัส OTP เพื่อดำเนินการต่อ
        </p>

        <v-otp-input
          v-model="otp"
          length="6"
          :disabled="loading"
          class="my-4"
          :class="{ 'error-shake': error }"
          :error="!!error"
        ></v-otp-input>

        <!-- แสดง Error Message ถ้ามีข้อผิดพลาด
        <v-alert v-if="error" type="error" density="compact" class="mt-1 px-16">
          OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง
        </v-alert> -->

        <v-btn
          :disabled="otp.length < 6 || loading"
          :color="success ? 'green' : 'primary'"
          size="large"
          block
          variant="elevated"
          class="mt-2 confirm-btn"
          :class="{ 'animate-success': success }"
          @click="onClick"
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="24"
            color="white"
          />
          <v-icon start v-else-if="success">mdi-check-circle</v-icon>

          {{ success ? "สำเร็จ!" : "ยืนยันรหัส OTP" }}
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  const { $apiClient } = useNuxtApp();
  const success = ref(false);
  const router = useRouter();

  const otp = ref("");
  const loading = ref(false);
  const error = ref(false); // สถานะข้อผิดพลาด
  const fetchData = async () => {
    error.value = "";
    try {
      const response = await $apiClient.post("/api/verify-otp", {
        token: otp.value,
      });

      if (response.data.success) {
        success.value = true; // เปลี่ยนปุ่มเป็นสีเขียว

        setTimeout(() => {
          localStorage.setItem("2fa", "true");
          const localData = localStorage.getItem("role");
          if (localData && localData === "USER") {
            router.push("/mytasks");
          } else {
            router.push("/");
          }
        }, 500); // หน่วงเวลาก่อนเปลี่ยนหน้า (0.5 วินาที)
      } else {
        error.value = "OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง";
      }
    } catch (err) {
      error.value = "เกิดข้อผิดพลาดในการตรวจสอบ OTP";
    }
    loading.value = false; // หยุดโหลดหลัง 0.5 วิ
  };

  const onClick = () => {
    loading.value = true; // เริ่มโหลด

    setTimeout(() => {
      fetchData();
    }, 300);
  };
</script>
<style scoped>
  .error-shake {
  animation: shake 0.15s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px); }
  50% { transform: translateX(7px); }
  75% { transform: translateX(-7px); }
}

.confirm-btn {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.animate-success {
  background-color: #4caf50 !important;

}
</style>
