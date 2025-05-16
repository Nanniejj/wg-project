<template lang="">
    <div>
        <v-dialog v-model="dialog" max-width="85%" min-height="500px" persistent>
            <v-card class="pa-5">
                <v-card-title class="px-0">ข้อมูลกลุ่ม</v-card-title>
                <v-divider class="border-opacity-75"></v-divider>
                <v-card-text>
                    <v-row>
                        <!-- {{ newGroup }} -->
                        <v-col align="center" md="6">
                            <v-col cols="12">
                                <v-file-input v-model="newGroup.personPhotos" label="อัปโหลดรูป" accept="image/*"
                                    variant="outlined" @change="previewImage"></v-file-input>
                                <div v-if="imagePreview" class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="imagePreview" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                                <div v-else-if="newGroup.photo && typeof newGroup.photo === 'string'"
                                    class="mt-3 mx-auto d-flex justify-center">
                                    <v-img :src="URL_HOST + newGroup.photo" width="300" height="300" contain
                                        aspect-ratio="1"></v-img>
                                </div>
                            </v-col>
                        </v-col>
                        <v-col md="6">
                            <v-col cols="12">
                                <v-text-field label="ชื่อกลุ่ม/เครือข่าย" v-model="newGroup.name"
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" @click="confirmOk()">บันทึก</v-btn>
                    <v-btn color="red" @click="dialog = false">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    newGroup: {
        name: null,
        personPhotos: null,
        photo: null,
    },
    dialog: false,
    imagePreview: null,
}
</script>
<style lang="">
    
</style>