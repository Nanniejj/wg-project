<template>
  <v-dialog persistent v-model="localDialog" fullscreen>
    <v-card>
      <v-card-title>
        <div class="d-flex justify-space-between align-center">
          <div class="headline">รูปภาพ</div>
          <v-btn icon variant="text" color="#F44336" @click="closeModal" class="">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-img 
        :src="image.imageUrl" 
        alt="Image in Modal"
        class="fill-height h-50"
      />
      <v-card-actions class="justify-space-between ">
        <div class="d-flex align-center">
          <v-chip
            class="ma-2"
            color="indigo"
            prepend-icon="mdi-eye-outline"
          >
            {{image.view}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="orange"
            prepend-icon="mdi-account-arrow-down"
          >
            {{image.download}}
          </v-chip>
        </div>
          <v-btn 
            icon variant="text" 
            v-tooltip:start="'click to download'"
            @click="downloadThisImage(image.imageUrl)">
            <v-icon>mdi-download</v-icon>
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean, // รับค่า prop สำหรับการควบคุมการแสดงผลของ modal
    image: Object,
  },
  computed: {
    // ใช้ computed property เพื่อสร้างตัวแปร local สำหรับ v-model
    localDialog: {
      get() {
        return this.dialog; // คืนค่า prop
      },
      set(value) {
        this.$emit('close'); // ส่งค่าไปยัง Parent ผ่าน event
      },
    },
  },
  methods: {
    closeModal() {
      this.localDialog = false; // ปิด modal
    },
    downloadThisImage(image){
      this.$emit('increment-downloads')
      downloadImage(image, 'donwload.jpg')
    }
  },
  mounted() {
  }
};
</script>
