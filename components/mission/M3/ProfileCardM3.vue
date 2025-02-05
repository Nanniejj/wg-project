<template>
    <div class="card-stat-shadow py-1">

        <v-row class="ma-10">
            <v-col cols="12" md="5" class="px-md-10">
                <v-card class="pa-5 text-topic h-100" border="opacity-50 sm " width="">
                    <div class="text-center mx-auto">
                        <v-avatar color="primary" class="my-2" size="55">U</v-avatar>
                    </div>
                    <div class="text-center font-subtitle">UserName</div>
                    <div class="text-topic position-relative">Profile
                        <v-btn class="position-absolute right-0" style="top:0px" variant="tonal" color="primary"
                            rounded>Follow</v-btn>
                    </div>
                    <div>Username</div>
                    <hr class="my-2">
                    <div class="my-1">ผู้ติดตาม 12.5k</div>
                    <div class="my-1">กำลังติดตาม 500</div>
                    <div class="my-1">จำนวนโพสต์ 10.9 k</div>
                    <hr class="my-2">
                    <div class="my-1">รายละเอียด -</div>
                </v-card>
            </v-col>
            <v-col cols="12"  md="7">
                <v-card border="opacity-50 sm" class="h-100">
                    <v-img src="/Wordcloud.png" class="pa-5  mx-auto bottom-0"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>