<template>
  <v-container>
    <!-- {{ props.taskData }} -->
    <v-row class="justify-end">
      <div class="pa-1">
        <v-btn color="#529B41" size="large" rounded="lg" @click="addCard">
          <v-icon size="large" icon="mdi-plus"> </v-icon>
          <span class="text-h6">เพิ่มแกนนำ</span>
        </v-btn>
      </div>
      <div class="pa-1">
        <v-btn
          color="#AEE0E8"
          outlined
          rounded="lg"
          size="large"
          @click="triggerFileInput"
        >
          <v-icon class="px-5" size="large">mdi-tray-arrow-down</v-icon
          ><span class="text-h6">Import CSV</span>
        </v-btn>

        <input
          ref="fileInput"
          type="file"
          accept=".csv"
          @change="handleFileUpload"
          style="display: none"
        />
      </div>
    </v-row>
    <div class="pt-10">
      <span class="text-h5">ผลปฏิบัติการ</span>
    </div>
    <div class="pt-10">
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="#2AB6EA" grow>
          <v-tab :value="1">กลุ่มทุนต่างชาติ</v-tab>
          <v-tab :value="2">กลุ่มจุดประเด็น</v-tab>
          <v-tab :value="3">กลุ่มสร้างกระแสชี้นำเยาชน</v-tab>
          <v-tab :value="4">กลุ่มแพร่กระจาย</v-tab>
          <v-tab :value="5">กลุ่มนักวิชาการ</v-tab>
          <v-tab :value="6">กลุ่ม NGos</v-tab>
          <v-tab :value="7">กลุ่มส.ส.</v-tab>
        </v-tabs>
      </v-card>
    </div>
    <div class="pt-10">
      <v-card>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
            <v-container fluid>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-start">Name</th>
                    <th class="text-left">รายละเอียด</th>
                    <th class="text-left">วันที่</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>
                      <div class="d-flex align-items-center">
                        <!-- v-avatar for profile picture -->
                        <v-avatar size="40">
                          <v-img :src="item.image"></v-img>
                        </v-avatar>
                        <!-- Name next to avatar -->
                        <div class="px-4">{{ item.name }}</div>
                      </div>
                    </td>
                    <td>{{ item.calories }}</td>
                    <td>{{ item.date }}</td>
                    <td>
                      <div class="align-items-center">
                        <v-btn @click="openEditUserModal()" variant="text">
                          <v-icon size="20"> mdi-pencil</v-icon>
                          <!-- <span style="font-size: 12px">view</span> -->
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </div>

    <v-row v-if="status != 'PP'" class="justify-end pt-16 pb-16">
      <div class="px-3">
        <v-btn
          variant="outlined"
          style="background-color: #faf1cd"
          size="large"
          rounded="lg"
          @click="addCard"
          class="custom-btn"
        >
          <span class="text-h6">บันทึกร่าง</span>
        </v-btn>
      </div>
      <div class="px-3">
        <v-btn
          variant="outlined"
          size="large"
          rounded="lg"
          @click="addCard"
          class="custom-btn"
        >
          <span class="text-h6">บันทึก</span>
        </v-btn>
      </div>
    </v-row>
    <EditUserM3ModalVue
        :dialog="isOpenModal" 
        :userData="taskData"
        @close="closeEditUserModal()"
    />
  </v-container>
</template>

<script setup>
import EditUserM3ModalVue from "../../modal/editUserM3Modal.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  taskData: Object,
});
const route = useRoute();
const isOpenModal = ref(false);
// รับ title จาก query
const title = route.query.title;
const status = route.query.status;

const desserts = ref([
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Frozen Yogurt",
    calories: 159,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Ice cream sandwich",
    calories: 237,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Eclair",
    calories: 262,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Cupcake",
    calories: 305,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Gingerbread",
    calories: 356,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Jelly bean",
    calories: 375,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Lollipop",
    calories: 392,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Honeycomb",
    calories: 408,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "Donut",
    calories: 452,
    date: "10 Jan 2568",
  },
  {
    image:
      "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_IMG_0575_Pita_Limjaroenrat_a204bc0752.jpg",
    name: "KitKat",
    calories: 518,
    date: "10 Jan 2568",
  },
]);

const tab = ref(null);
function openEditUserModal() {
    isOpenModal.value = true;
}
function closeEditUserModal() {
    isOpenModal.value = false;
}
</script>
<style scoped>
.v-divider {
    height: 1000px; /* กำหนดความสูงที่ต้องการ */
}

.custom-divider {
    margin-left: 30px; /* กำหนดมาร์จินซ้าย */
    margin-right: 30px; /* กำหนดมาร์จินซ้าย */
    max-width: 100%;

}

.custom-btn:hover{
    background-color: #202B3E !important; /* สีพื้นหลังเมื่อเมาส์อยู่เหนือปุ่ม */
    color: white !important;
}
</style>
