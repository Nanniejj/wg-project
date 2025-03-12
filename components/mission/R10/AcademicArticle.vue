<template>
  <v-container class="px-md-16">
    <v-card class="pa-5 mt-5" border="opacity-50 sm" rounded="xl">
      <div class="d-flex justify-space-between">
        <v-col cols="auto" class="px-0">
          <h2 class="font-title mb-5">บทความวิชาการ</h2>
        </v-col>
        <v-col cols="1" class="d-flex justify-end pa-0">
          <div
            class="text-h4 text-uppercase font-title2"
            :style="'color:' + getTeamColor(article.team.toUpperCase())"
          >
            {{ article.team }}
          </div>
        </v-col>
      </div>
      <v-row>
        <v-col
          v-for="(topic, index) in article.topics"
          :key="index"
          cols="12"
          class="py-0"
        >
          <v-card-title class="text-h6 py-0"
            >{{ index + 1 }}. {{ topic }}</v-card-title
          >
        </v-col>
      </v-row>
      <v-row class="h-200">
        <v-col
          v-for="(image, index) in article.previweImages"
          :key="index"
          cols="12"
          md="4"
          class="image-wrapper"
        >
            <v-img
                cover
                height="200"
                :src="image.imageUrl"
                @click="openImageModal(image)"
                class="cursor-pointer h-sm-100 w-sm-100"
            >
            <v-container
                style="backgroundColor: rgba(0, 0, 0, 0.7);"
                class="overlay position-absolute fill-height d-flex align-center justify-center text-overlay"
            >
                <v-icon color="white" class="ml-4" size="72"> mdi-download-circle</v-icon>
            </v-container>
            </v-img>
        </v-col>
      </v-row>
    </v-card>
    <ImageModal 
        :image="imageData" 
        :dialog="isOpenModal" 
        @close="closeImageModal()"
        @increment-downloads="incrementDownloads"
    />
        <!-- @increment-views="incrementViews" -->
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import Swal from "sweetalert2";
  const { getTeamColor, getMissionColor } = useColors();
  const article = ref({
    team: "C",
    color: "purple",
    topics: [
      "บทคามมูลนิธิจุฬาภรณ์ ช่วยเหลือ...เพื่อปวงประชา",
      "ถุง(ยังชีพ) พระราชทาน...พระราชทานกำลังใจ",
      "”ทหาร” เป็นที่พึ่งของประชาชน",
    ],
    previweImages: [
      { imageUrl: "/R10(4).png", view: 32, download: 12},
      { imageUrl: "/R10(5).png", view: 2, download: 1},
      { imageUrl: "/R10(5).png", view: 3, download: 2},
    ],
  });
</script>
<script>
  import Swal from "sweetalert2";
  import ImageModal from "../../modal/imageModal.vue";

// import imageModalVue from 'components/modal/imageModal.vue';
  export default {
    components:{
        ImageModal
    },
    data() {
        return {
            isOpenModal: false,
            isHover: false,
            imageData:""
        }
    },
    methods: {
        // downloadImageAlert(image) {
        //     Swal.fire({
        //         imageUrl: `${image}`,
        //         imageWidth: 400,
        //         imageHeight: 250,
        //         allowOutsideClick: false,
        //         allowEscapeKey: false,
        //         showCloseButton: true,
        //         closeButtonAriaLabel: 'Close this window',
        //         confirmButtonText: '<i class="mdi mdi-download"></i> Download',
        //         confirmButtonClass: "custom-confirm-btn", // Custom class for the confirm button
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             downloadImage(image, "donwload.jpg");
        //         }
        //     });
        // },
        openImageModal(image){
            this.imageData = image
            this.isOpenModal = true
            this.incrementViews()
        },
        closeImageModal(){
            this.isOpenModal = false
            this.imageData = {}
        },
        incrementViews() {
            this.imageData.view += 1; // เพิ่มจำนวนผู้เข้าชมเมื่อเปิด Modal
        },
        incrementDownloads() {
            this.imageData.download += 1; // เพิ่มจำนวนครั้งที่ดาวน์โหลด
        }
    },
  };
</script>

<style scoped>
.image-wrapper {
  position: relative;
  overflow: hidden;
}
.overlay {
  opacity: 0; 
}
.image-wrapper:hover .overlay {
  opacity: 1;
}

</style>
