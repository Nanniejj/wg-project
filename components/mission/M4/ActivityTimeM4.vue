<template>
    <v-container>
        <div class="text-h6 font-weight-bold">กิจกรรมในห้วงเวลา</div>

        <!-- Category Selection -->
        <v-chip-group v-model="selectedCategory" filter mandatory color="#ED4A9A">
            <v-chip v-for="category in categories" :key="category">{{ category }}</v-chip>
        </v-chip-group>
        <v-card class="pa-8 card-stat-shadow mb-5">
        <v-row>
            <v-col v-for="(image, index) in images" :key="index" class="image-wrapper">
                <v-img :src="image.imageUrl" @click="openImageModal(image)" cover height="230">
                    <v-container
                        style="backgroundColor: rgba(0, 0, 0, 0.7);"
                        class="overlay position-absolute fill-height d-flex align-center justify-center text-overlay"
                    >
                        <v-icon color="white" class="ml-4" size="72"> mdi-download-circle</v-icon>
                    </v-container>
                </v-img>
            </v-col>
        </v-row>
        <div class="text-right mt-2"> <v-btn color="cyan-darken-2" variant="text"> ดูเพิ่มเติม</v-btn> </div>
</v-card>
        <!-- Event List -->
        <v-row>
            <v-col v-for="(event, index) in events" :key="index" cols="12" md="4">
                <v-card class="pa-4 card-stat-shadow">
                    <v-card-title class="text-h6">{{ event.title }}</v-card-title>
                  
                    <v-card-text>
                        <strong>ผลที่ได้จากการทำกิจกรรม:</strong>
                        <ul>
                            <li v-for="result in event.results" :key="result">{{ result }}</li>
                        </ul>
                        <hr class="my-2">
                        <strong>ข้อเสนอ:</strong>
                        <ul>
                            <li v-for="suggestion in event.suggestions" :key="suggestion">{{ suggestion }}</li>
                        </ul>
                    </v-card-text>
                    <div class="text-body-2">
                        <v-icon class="mr-2" color="#F3882A">mdi-map-marker</v-icon>{{ event.location }} 
                         <br>
                        <v-icon class="mr-2" color="#ED4A9A">mdi-calendar</v-icon>{{ event.date }}
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <ImageModal 
            :image="imageData" 
            :dialog="isOpenModal" 
            @close="closeImageModal()"
            @increment-downloads="incrementDownloads"
        />
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const selectedCategory = ref('กิจกรรมมหาเสียง');
const categories = ref(['กิจกรรมมหาเสียง', 'กิจกรรมชุมชน', 'กิจกรรมจิบกาแฟ']);
const images = ref([
      { imageUrl: "./M4(1).png", view: 32, download: 12},
      { imageUrl: "./M4(2).png", view: 32, download: 12},
      { imageUrl: "./M4(3).png", view: 32, download: 12},
      { imageUrl: "./M4(4).png", view: 32, download: 12},
]);
const events = ref([
    {
        title: 'กิจกรรมมหาเสียง',
        results: ['ได้ข้อมูลส่วนตัวมาเพิ่มเติม', 'ได้ข้อมูลรายละเอียดดวาระ: 5 วาระ'],
        suggestions: ['นำข้อมูลครั้งนี้ไปรวมกลั่นกรองก่อนเพื่อการวิเคราะห์ข้อมูลทั้งหมด', 'ต้องเทียบกับกิจกรรมมหาเสียงอื่นๆ'],
        location: 'หอประชุมมาตานิติ',
        date: '4 มิ.ย. 2024'
    },
    {
        title: 'กิจกรรมมหาเสียง',
        results: ['ได้ข้อมูลส่วนตัวมาเพิ่มเติม', 'ได้ข้อมูลรายละเอียดดวาระ: 5 วาระ'],
        suggestions: ['นำข้อมูลครั้งนี้ไปรวมกลั่นกรองก่อนเพื่อการวิเคราะห์ข้อมูลทั้งหมด', 'ต้องเทียบกับกิจกรรมมหาเสียงอื่นๆ'],
        location: 'หอประชุมมาตานิติ',
        date: '4 มิ.ย. 2024'
    },
    {
        title: 'กิจกรรมมหาเสียง',
        results: ['ได้ข้อมูลส่วนตัวมาเพิ่มเติม', 'ได้ข้อมูลรายละเอียดดวาระ: 5 วาระ'],
        suggestions: ['นำข้อมูลครั้งนี้ไปรวมกลั่นกรองก่อนเพื่อการวิเคราะห์ข้อมูลทั้งหมด', 'ต้องเทียบกับกิจกรรมมหาเสียงอื่นๆ'],
        location: 'หอประชุมมาตานิติ',
        date: '4 มิ.ย. 2024'
    }
]);
</script>
<script>
  import ImageModal from "../../modal/imageModal.vue";
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

<style>
.v-chip-group {
    margin-bottom: 16px;
}
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