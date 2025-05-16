<template>
    <div>
        <v-table>
            <thead>
                <tr>
                    <th class="text-start">Name</th>
                    <th class="text-left">รายละเอียด</th>
                    <th class="text-left">วันที่</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="item in mockupData" :key="item.name">
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
        <EditUserM3Modal
            :dialog="isOpenModal" 
            :userData="taskData"
            @close="closeEditUserModal()"
        />
    </div>
</template>
<script setup>
import EditUserM3Modal from '../modal/editUserM3Modal.vue';
const isOpenModal = ref(false);
const mockupData = ref([
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

function openEditUserModal() {
    isOpenModal.value = true;
}
function closeEditUserModal() {
    isOpenModal.value = false;
}
</script>
<style>
    
</style>