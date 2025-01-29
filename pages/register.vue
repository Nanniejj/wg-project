<template>
    <v-row>
      <v-col
        cols="4"
        class="d-flex flex-column justify-center align-center"
        style="background-color: #2a3547; min-height: 120px"
      >
        <!-- ห่อข้อความแต่ละส่วนด้วย div -->
        <div
          style="
            font-size: 55px;
            color: #2a3547;
            text-align: center;
            background-color: white;
            width: 170px;
            height: 170px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          127
        </div>
      </v-col>
  
      <v-col cols="8" class="justify-center align-center">
        <v-col col="12" class="pa-4">
          <div
            style="
              font-size: 150px;
              font-weight: bold;
              color: #2a3547;
              text-align: start;
              margin-left: -65px;
            "
          >
            Sign up
          </div>
        </v-col>
        <v-col col="12" class="d-flex justify-center align-center">
          <v-form
            v-model="valid"
            @submit.prevent="submitForm"
            style="width: 100%; max-width: 600px"
          >
            <!-- ชื่อผู้ใช้ -->
            <span style="font-size: 22px">Username</span>
            <v-text-field
              variant="solo-inverted"
              v-model="form.username"
              label="Username"
              :rules="[rules.required, rules.minLength]"
              required
            ></v-text-field>
  
            <span style="font-size: 22px">Affiliation</span>
            <v-select
              label="select Affiliation"
              variant="solo-inverted"
              rounded="lg"
              :items="team"
              v-model="selectedTeam"
              style="margin-top: 5px"
            ></v-select>
  
            <!-- อีเมล์ -->
            <span style="font-size: 22px">Email</span>
            <v-text-field
              variant="solo-inverted"
              v-model="form.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
              type="email"
            ></v-text-field>
  
            <!-- รหัสผ่าน -->
            <span style="font-size: 22px">Password</span>
            <v-text-field
              variant="solo-inverted"
              v-model="form.password"
              label="Password"
              :rules="[rules.required, rules.passwordLength]"
              required
              :type="passwordVisibility ? 'text' : 'password'"
              :append-inner-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="togglePasswordVisibility"
              dense
            ></v-text-field>
  
            <!-- ยืนยันรหัสผ่าน -->
            <span style="font-size: 22px">Comfirm Password</span>
            <v-text-field
              variant="solo-inverted"
              v-model="form.confirmPassword"
              label="Confirm Password"
              :rules="[rules.required, rules.matchPassword]"
              required
              :type="confirmPasswordVisibility ? 'text' : 'password'"
              :append-inner-icon="
                confirmPasswordVisibility ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append-inner="toggleConfirmPasswordVisibility"
              dense
            ></v-text-field>
  
            <span style="font-size: 22px">Description</span>
            <v-text-field
              label="Add description"
              v-model="newMessage"
              variant="solo-inverted"
              rounded="lg"
              clearable
            ></v-text-field>
  
            <!-- ปุ่มลงทะเบียน -->
            <v-btn
              color="#FFDF5C"
              rounded="lg"
              @click="submitForm"
              height="60px"
              class="mt-2"
              block
            >
              <v-progress-circular
                v-if="isSubmitting"
                indeterminate
                color="black"
                size="24"
                class="mr-2"
              ></v-progress-circular>
              <span
                v-if="!isSubmitting"
                style="font-size: 24px; text-transform: none"
                >Sign up</span
              >
            </v-btn>
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useRuntimeConfig } from "#app";
    definePageMeta({ layout: "false" });
    const valid = ref(false);
    const form = ref({
      usernameOrEmail: "",
      email: "",
      password: "",
    });
    const isSubmitting = ref(false);
    const passwordVisibility = ref(false); // ใช้ควบคุมการแสดงรหัสผ่าน
    const confirmPasswordVisibility = ref(false); // ใช้ควบคุมการแสดงรหัสผ่านยืนยัน
  
    const rules = {
      required: (v) => !!v || "This field is required",
      email: (v) => /.+@.+\..+/.test(v) || "Please enter a valid email address",
      minLength: (v) =>
        v.length >= 6 || "Username must be at least 6 characters long",
      passwordLength: (v) =>
        v.length >= 8 || "Password must be at least 8 characters long",
      matchPassword: (v) => v === form.value.password || "Passwords must match",
      mobile: (v) =>
        /^(\+?[0-9]{1,4})?([0-9]{10})$/.test(v) ||
        "Please enter a valid mobile number", // ตัวอย่างการตรวจสอบเบอร์โทรศัพท์
    };
  
    const togglePasswordVisibility = () => {
      passwordVisibility.value = !passwordVisibility.value;
    };
  
    const toggleConfirmPasswordVisibility = () => {
      confirmPasswordVisibility.value = !confirmPasswordVisibility.value;
    };
  
    const { $apiClient } = useNuxtApp();
    const router = useRouter();
    const submitForm = async () => {
      isSubmitting.value = true;
      try {
        const response = await $apiClient.post("/api/auth/signup", {
          username: form.value.usernameOrEmail || form.value.username,
          email: form.value.email,
          name: form.value.firstName,
          surname: form.value.lastName,
          phone: form.value.mobile,
          password: form.value.password,
        });
        console.log(form.value);
        // ดูข้อมูลที่ได้รับจาก server
        console.log("Response data:", response.data); // ค่าผลลัพธ์จากการเรียก API
  
        if (response.data.message == "Signup success") {
          console.log("loop success:", response.data);
          isSubmitting.value = false;
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          // ถ้า API ตอบกลับว่า error หรือข้อมูลผิดพลาด
          console.log("Error:", response.data);
        }
      } catch (error) {
        console.log("ErrorAAAAAAAAAAAAAA:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
        isSubmitting.value = false;
      }
    };
  </script>
  
  <style scoped>
    /* ปรับแต่ง CSS ที่เกี่ยวข้อง */
    @media (min-width: 960px) {
      .pa-md-15 {
          
          padding: 0px!important; /* เอา !important ออก */
      }
  
  }
  </style>
  