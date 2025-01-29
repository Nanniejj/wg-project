<template>
  <div
    fluid
    style="
      height: 100vh;
      background-image: url('/logo/EllipseYellow.png'),
        url('/logo/EllipseBlack.png');
      background-size: 60%, 55%; /* กำหนดขนาดภาพแต่ละรูป */
      background-position: -300px -400px, 1100px 450px; /* กำหนดตำแหน่งของแต่ละภาพ */
      background-repeat: no-repeat, no-repeat; /* ไม่ให้ภาพซ้ำ */
    "
  >
    <v-col cols="12">
      <v-form style="max-width: 400px; margin: 0 auto">
        <v-col class="d-flex justify-center pb-16">
          <img
            src="/logo/IconProject.png"
            alt="tab-icon"
            style="height: 160px"
          />
        </v-col>
        <v-col class="d-flex align-center justify-center pb-8">
          <span style="font-size: 60px">Sign In</span>
        </v-col>

        <v-text-field
          label="Username/E-mail"
          variant="solo"
          v-model="credentials.usernameOrEmail"
          style="max-width: 100%"
        >
          <template #append-inner>
            <v-icon> mdi-account-outline </v-icon>
          </template>
        </v-text-field>

        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          variant="solo"
          v-model="credentials.password"
          style="max-width: 100%"
        >
          <template #append-inner>
            <v-icon @click="showPassword = !showPassword">
              {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
            </v-icon>
          </template>
        </v-text-field>

        <v-row class="d-flex align-start" style="margin-top: -35px">
          <!-- <v-col class="align-center" style="margin-left: -8px">
          <v-checkbox v-model="rememberMe">
            <template v-slot:label>
              <span style="font-size: 14px">Remember me</span>
            </template>
          </v-checkbox>
        </v-col> -->
          <v-col class="align-center py-6" style="margin-left: -15px">
            <v-btn color="#3786B7" variant="text" @click="SignUp">
              <span style="font-size: 14px">sign up</span>
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end py-6" style="margin-right: -15px">
            <v-btn color="#3786B7" variant="text" @click="forgotPassword">
              <span style="font-size: 14px">forget password</span>
            </v-btn>
          </v-col>
        </v-row>

        <!-- ข้อความ Error -->
        <v-alert
          v-if="errorMessage"
          class="d-flex justify-center custom-alert"
          type="error"
          style="height: 60px; font-size: 15px; margin-top: -30px"
          variant="outlined"
          prominent
        >
          Username/Email or Password is correct
        </v-alert>

        <v-row justify="center py-3">
          <v-col cols="auto">
            <v-btn
              elevation="3"
              class="my-2"
              rounded="lg"
              block
              color="#ED7178"
              style="height: 60px; font-size: 15px; width: 430px"
              @click="loginUser"
              :loading="loading"
            >
              Sign in
            </v-btn>
          </v-col>
        </v-row>
        <!-- <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            color="blue"
            variant="text"
            @click="navigateWithDelay"
            style="
              height: 40px;
              width: 250px;
              font-size: 15px;
              margin-top: -20px;
            "
          >
            Register
          </v-btn>
        </v-col>
      </v-row> -->
      </v-form>
    </v-col>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useRuntimeConfig } from "#app";

  definePageMeta({ layout: "false" });

  const router = useRouter();

  const credentials = ref({
    usernameOrEmail: "",
    password: "",
  });
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_BASE_URL;
  const rememberMe = ref(false);
  const loading = ref(false);
  const errorMessage = ref(""); // ย้าย errorMessage มาที่นี่
  const showPassword = ref(false);

  const loginUser = async () => {
    loading.value = true;
    errorMessage.value = ""; // รีเซ็ตข้อความ error ก่อนที่จะเริ่มเข้าสู่ระบบ
    console.log(apiUrl);
    try {
      const { data, error } = await useFetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username: credentials.value.usernameOrEmail,
          password: credentials.value.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (error.value) {
        throw new Error(
          error.value.data.message || "An error occurred while logging in."
        );
      }
      console.log("value login", data.value);
      const token = data.value.token;
      const refresh_token = data.value.refresh_token;
      const role = data.value.role;
      console.log("role", role,);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      console.log("login auth", localStorage, "refreshToken", refresh_token);

      if (role == null) {
        alert("กรุณาแจ้ง admin อนุญาตสิทธิ์การเข้าถึง account ของคุณ");
        localStorage.removeItem("authToken");
        // ใช้ router.push เพื่อทำการ redirect ไปที่หน้า login
        router.push("/login"); // ปรับ URL ตามที่ต้องการ
      } else {
        // นำไปยังหน้าindexหลังจากเข้าสู่ระบบสำเร็จ
        router.push("/");
      }
    } catch (error) {
      console.error(error.message);
      errorMessage.value = error.message; // แสดงข้อความ error
    } finally {
      loading.value = false;
    }
  };

  const SignUp = () => {
    setTimeout(() => {
      router.push("/signup");
    }, 300); // Delay 2 วิก่อนที่จะเปลี่ยนหน้า
  };

  const forgotPassword = () => {
    console.log("Forgot Password clicked");
    // เพิ่มโค้ดเพื่อจัดการลืมรหัสผ่านที่นี่
  };
</script>

<style scoped>
  .custom-alert .v-alert__icon {
    font-size: 10px; /* ปรับขนาดของไอคอน */
  }
</style>
