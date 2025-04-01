<template>
    <v-container class="px-md-16">
        <v-row>
            <v-col cols="12">
                <h2 class="font-title my-5">เพจสนับสนุนวิชาการ</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(page,index) in pages" :key="index" cols="12" md="4">
                <v-card 
                    border="opacity-50 sm" 
                    rounded="lg" 
                    class="py-2 text-center card-stat-shadow"
                >
                    <v-avatar size="177" class="mb-2">
                        <v-img
                            cover
                            :src="page.profile_image"
                        ></v-img>
                    </v-avatar>
                    <div class="text-h5 font-weight-bold">{{ page.name }}</div>
                    <div class="text-h5 font-weight-bold">{{ formatNumber(page.follower) }}</div>
                    <div>
                        Follower
                    </div>
                    <v-col class="text-left my-5 truncate-text-1">
                        URL : {{page.url}}
                    </v-col>
                   <v-divider class="my-2" :thickness="11" :color="page.color" :opacity="1"></v-divider>
                </v-card>
                <v-img
                    height="200"
                    cover
                    rounded-lg
                    class="image-wrapper px-0 cursor-pointer mt-2 w-100"
                    :src="page.perviwe_image.imageUrl"
                    @click="openImageModal(page.perviwe_image)"
                >
                    <v-container
                        style="backgroundColor: rgba(0, 0, 0, 0.7);"
                        class="overlay position-absolute fill-height d-flex align-center justify-center rounded-lg"
                    >
                        <v-icon color="white" class="ml-4" size="72"> mdi-download-circle</v-icon>
                        <!-- <h2 class="text-white text-body-1">Click to download</h2> -->
                    </v-container>
                </v-img>
            </v-col>
        </v-row>
        <PageStatLineChartR10/>
        <ImageModal 
            :image="imageData" 
            :dialog="isOpenModal" 
            @close="closeImageModal()"
            @increment-downloads="incrementDownloads"
        />
    </v-container>
</template>
<script setup>
import { ref } from 'vue'
import PageStatLineChartR10 from './PageStatLineChartR10.vue'

const pages = ref([
    { 
        name: 'ราชสีห์...เล่าเรื่อง', 
        follower: 469, 
        color: '#96CCD5', 
        url:'www.facebook.com/profile.php?id =61557091101016',
        profile_image:'/66.png',
        perviwe_image:{ 
            imageUrl: "/R10(6).png", 
            view: 4, 
            download: 1
        },
    },
    { 
        name: 'นาวิกาธิปัตย์สาร', 
        follower: 1200, 
        color: '#462929', 
        profile_image:'/77.png',
        perviwe_image:{ 
            imageUrl: "/R10(7).png", 
            view: 32, 
            download: 8
        },
        url:'www.facebook.com/profile.php?id =61557091101016', 
    },
    { 
        name: 'ต.ตุลยากร', 
        follower: 952, 
        color: '#F1884D', 
        profile_image:'/88.png',
        perviwe_image:{ 
            imageUrl: "/R10(8).png", 
            view: 9, 
            download: 4
        },
        url:'www.facebook.com/profile.php?id =61557091101016', 
    },
])
</script>
<script>
  import Swal from "sweetalert2";
  import ImageModal from "../../modal/imageModal.vue";
  export default {
    components:{
        ImageModal
    },
    data() {
        return {
            isOpenModal: false,
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