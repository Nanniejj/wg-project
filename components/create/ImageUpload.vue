<template>
    <v-container>
      <!-- กล่องอัปโหลด -->
      <v-card class="pa-4">
        <v-card-title>Upload File</v-card-title>
        <v-card-text>
          <vue-dropzone
            ref="dropzone"
            id="dropzone"
            class="custom-dropzone"
            :options="dropzoneOptions"
            @vdropzone-success="onUploadSuccess"
          >
            <div class="dz-message">
              <p>Drag and drop an image file here or click</p>
              <v-icon size="40" color="grey">mdi-cloud-upload</v-icon>
            </div>
          </vue-dropzone>
        </v-card-text>
      </v-card>
  
      <!-- พรีวิวไฟล์ที่อัปโหลด -->
      <v-card v-if="uploadedFiles.length" class="mt-4 pa-4">
        <v-card-title>Preview:</v-card-title>
        <v-row>
          <v-col
            v-for="(file, index) in uploadedFiles"
            :key="index"
            cols="4"
          >
            <v-img
              :src="file.dataUrl"
              class="preview-image"
              aspect-ratio="1"
              cover
            />
            <!-- ปุ่มลบ -->
            <v-btn
              icon
              small
              @click="removeFile(index)"
              class="delete-btn"
            >
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from "vue";
  import VueDropzone from "dropzone-vue3";
  
  export default {
    components: { VueDropzone },
    setup() {
      const dropzoneOptions = ref({
        url: "https://httpbin.org/post", // URL สำหรับอัปโหลดไฟล์
        maxFilesize: 5, // ขนาดสูงสุด 5MB
        acceptedFiles: "image/*", // อัปโหลดเฉพาะรูปภาพ
        addRemoveLinks: true, // แสดงปุ่มลบ
        // dictRemoveFile: '<v-icon color="red">mdi-delete</v-icon>', // ใช้ไอคอนลบของ Vuetify
        thumbnailWidth: 120,
        thumbnailHeight: 90,
        // previewTemplate: `<div></div>`, // ซ่อน preview เริ่มต้นของ Dropzone
      });
  
      const uploadedFiles = ref([]);
  
      const onUploadSuccess = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFiles.value.push({ dataUrl: e.target.result });
        };
        reader.readAsDataURL(file);
      };
  
      // ฟังก์ชันลบไฟล์
      const removeFile = (index) => {
        uploadedFiles.value.splice(index, 1);
      };
  
      return { dropzoneOptions, uploadedFiles, onUploadSuccess, removeFile };
    },
  };
  </script>
  
  <style>
  /* ปรับแต่ง Dropzone */
  .custom-dropzone {
    border: 2px dashed #ccc;
    background: white;
    padding: 30px;
    border-radius: 6px;
    text-align: center;
  }
  
  /* ปรับแต่งตัวอย่างไฟล์ */
  .preview-image {
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    width: 100%;
  }
  
  /* ปุ่มลบ */
  .delete-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.7);
  }
  </style>
  