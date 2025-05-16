<template>
  <div
    class="d-flex justify-center align-center"
    style="background-color: #454545;width: 100%;"
  >
    <v-card rounded="xl" class="ma-4" style="min-width: 100px; width: 1500px">
      <v-row>
        <v-col
          cols="6"
          class="d-flex flex-column justify-center align-center"
          style="background-color: #2a3547; border-radius: 40px"
        >
          <img
            src="/logo/signup.png"
            alt="tab-icon"
            style="max-width: 50%; height: auto"
          />

          <!-- <div
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
          </div> -->
        </v-col>

        <v-col cols="6" class="justify-start align-start pa-8">
          <v-col cols="12" md="12" class="d-flex justify-center align-center">
            <v-btn
              icon
              color="white"
              variant="text"
              :to="{ path: '/login' }"
              class="position-absolute"
              style="top: 20px; left: 20px"
            >
              <v-icon style="font-size: 40px">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col col="12" class="pa-4">
            <div
              style="
                font-size: 60px;
                font-weight: bold;
                color: #2a3547;
                text-align: start;
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
              <span style="font-size: 18px">Username</span>
              <v-text-field
                variant="underlined"
                v-model="form.username"
                placeholder="Username"
                :rules="[rules.required, rules.minLength]"
                required
              ></v-text-field>

              <span style="font-size: 18px">Team</span>
              <v-select
                placeholder="Select Team"
                variant="underlined"
                rounded="lg"
                v-model="selectedAffiliation"
                :items="affiliations_data"
                style="margin-top: 5px"
              ></v-select>

              <!-- อีเมล์ -->
              <span style="font-size: 18px">E-mail</span>
              <v-text-field
                variant="underlined"
                v-model="form.email"
                placeholder="E-mail"
                :rules="[rules.required, rules.email]"
                required
                type="email"
              ></v-text-field>

              <!-- รหัสผ่าน -->
              <span style="font-size: 18px">Password</span>
              <v-text-field
                variant="underlined"
                v-model="form.password"
                placeholder="Password"
                :rules="[rules.required, rules.passwordLength]"
                required
                :type="passwordVisibility ? 'text' : 'password'"
                :append-inner-icon="
                  passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="togglePasswordVisibility"
                dense
              ></v-text-field>

              <!-- ยืนยันรหัสผ่าน -->
              <span style="font-size: 18px">Comfirm Password</span>
              <v-text-field
                variant="underlined"
                v-model="form.confirmPassword"
                placeholder="Confirm Password"
                :rules="[rules.required, rules.matchPassword]"
                required
                :type="confirmPasswordVisibility ? 'text' : 'password'"
                :append-inner-icon="
                  confirmPasswordVisibility ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="toggleConfirmPasswordVisibility"
                dense
              ></v-text-field>

              <span style="font-size: 18px">Detail</span>
              <v-text-field
                placeholder="Add your detail"
                v-model="Message"
                variant="underlined"
                rounded="lg"
                clearable
              ></v-text-field>

              <!-- ปุ่มลงทะเบียน -->
              <v-btn
                color="#FFDF5C"
                rounded="lg"
                @click="submitForm"
                height="60px"
                class="mt-8 mb-8"
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
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useRuntimeConfig } from "#app";
  definePageMeta({ layout: "false" });
  const valid = ref(false);
  const Message = ref("");
  const affiliations_data = ref([]);
  const selectedAffiliation = ref(null);
  const form = ref({
    usernameOrEmail: "",
    email: "",
    password: "",
  });
  const isSubmitting = ref(false);
  const passwordVisibility = ref(false); // ใช้ควบคุมการแสดงรหัสผ่าน
  const confirmPasswordVisibility = ref(false); // ใช้ควบคุมการแสดงรหัสผ่านยืนยันf

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
    let response;
    // console.log("this zone",selectedAffiliation.value,Message.value)
    // console.log(form.value);
    try {
      response = await $apiClient.post("/auth/register", {
        username: form.value.usernameOrEmail || form.value.username,
        email: form.value.email,
        affiliation: selectedAffiliation.value,
        password: form.value.password,
        description: Message.value,
      });
      console.log(form.value);
      // ดูข้อมูลที่ได้รับจาก server
      console.log("Response data:", response.data); // ค่าผลลัพธ์จากการเรียก API

      if (response.data.message == "success") {
        console.log("loop success:", response.data);
        alert(`SignUp: ${response.data.message}`);
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

  const fetchData = async () => {
    try {
      const response = await $apiClient.get("/auth/getAllTeam");
      // console.log(response);
      // affiliations_data.value = response.data;
      affiliations_data.value = response.data.map((team) => team.name);
      // console.log(affiliations_data.value);
    } finally {
      // loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style >
/* #__nuxt{
  background-color: aqua;
} */
</style>
