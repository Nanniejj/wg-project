<template>
  <v-row>
    <!-- <v-col cols="2">
      <v-row>
        <v-col cols="12" class="justify-center align-center d-flex pa-1">
          <v-card-title style="font-size: 30px">Create Mission</v-card-title>
        </v-col>

        <v-col cols="12" class="d-flex pa-1">
          <v-btn
            rounded="xl"
            size="large"
            block
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
          >
            <span style="font-size: 16px">Create new</span>
          </v-btn>
          <v-divider
            vertical
            :thickness="2"
            style="margin-top: -55px"
            class="px-1 border-opacity-50"
            color="#707070"
          ></v-divider>
        </v-col>
      </v-row>
    </v-col> -->

    <v-col cols="12">
      <v-row>
        <!-- <v-col
            class="justify-center align-center d-flex pa-0"
            cols="1"
            style="
              border-right: 2px solid #707070;
              height: 800px;
              margin-top: 30px;
            "
          >
          </v-col> -->

        <v-col cols="3">
          <v-container
            :style="{
              width: '100%',
              maxWidth: '270px',
              height: '270px',
              maxHeight: '300px',
              border: '2px dashed #707070',
              backgroundColor: getMissionColor('R1'),
              borderRadius: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }"
          >
            <span style="font-size: 100px; color: white">R1</span>
          </v-container>
        </v-col>

        <v-col cols="8">
          <v-card-text>
            <v-form ref="formRef" v-model="valid">
              <span style="font-size: 16px">Mission name</span>
              <v-text-field
                density="compact"
                variant="outlined"
                rounded="lg"
                v-model="selectedMission"
                readonly
                style="margin-top: 5px"
              ></v-text-field>
              <!-- ช่องกรอกรายละเอียด -->
              <span style="font-size: 16px">Description</span>
              <v-text-field
                label="Add description"
                v-model="newMessage"
                variant="outlined"
                rounded="lg"
                clearable
              ></v-text-field>

              <span style="font-size: 16px">Assign</span>
              <v-select
                density="compact"
                label="assign team"
                variant="outlined"
                rounded="lg"
                multiple 
                chips
                :items="team"
                v-model="selectedTeam"
                style="margin-top: 5px"
              ></v-select>

              <span style="font-size: 16px">Link URL</span>
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    density="compact"
                    label="Link URL"
                    v-model="newMessage"
                    placeholder="พิมพ์ข้อความแล้วกดปุ่มเพิ่ม"
                    variant="outlined"
                    rounded="lg"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="ma-0">
                  <v-btn
                    rounded="lg"
                    color="#46AFC7"
                    @click="addMessage"
                    height="60%"
                  >
                    <v-icon style="color: white; font-size: 30px"
                      >mdi-plus</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-row>
              <!-- แสดงข้อความในรูปแบบ Chip -->
              <v-row class="mt-4">
                <v-col cols="12">
                  <div>
                    <v-chip
                      v-for="(message, index) in formData.messages"
                      :key="index"
                      class="ma-1"
                      close
                      @click:close="removeMessage(index)"
                    >
                      {{ message }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-col>

        <!-- <v-col
          class="justify-start align-start d-flex"
          cols="12"
          style="border-top: 2px dashed #707070; width: 100%; margin-top: 30px"
        >
        </v-col> -->
        <v-divider
          :thickness="2"
          inset
          class="border-opacity-100 custom-divider"
          style="border-style: dashed; color: #707070"
        ></v-divider>

        <v-col cols="12" class="justify-end d-flex mt-8">
          <v-btn
            rounded="lg"
            size="x-large"
            color="#2A3547"
            :disabled="!valid"
            @click="submitForm"
            ><span style="font-size: 18px">Create mission</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from "vue";
  const { getTeamColor, getMissionColor } = useColors();
  const formRef = ref(null);
  const valid = ref(false);

  const formData = ref({
    name: "",
    details: "",
    image: null,
  });

  const team = ref([
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",

    // เพิ่มตัวเลือกอื่น ๆ ที่ต้องการ
  ]);

  const selectedTeam = ref(null);

  const selectedMission = ref("R1");

  // ฟังก์ชันเพิ่มข้อความ
  const addMessage = () => {
    if (newMessage.value.trim()) {
      formData.value.messages.push(newMessage.value.trim());
      newMessage.value = ""; // ล้างข้อความในช่อง
    }
  };

  // ฟังก์ชันลบข้อความ
  const removeMessage = (index) => {
    formData.value.messages.splice(index, 1);
  };

  const rules = {
    required: (value) => !!value || "จำเป็นต้องกรอกข้อมูล",
  };

  const submitForm = () => {
    console.log("Form submitted with mission:", selectedMission.value);
    selectedMission.value = null; // รีเซ็ต selectedMission เป็น null
  };
</script>
<style scoped>
  .v-divider {
  height: 1000px; /* กำหนดความสูงที่ต้องการ */
}

.custom-divider {
  margin-left: 25px; /* กำหนดมาร์จินซ้าย */
  max-width: 100%;

}
</style>
