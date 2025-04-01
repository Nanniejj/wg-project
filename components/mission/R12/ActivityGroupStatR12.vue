<template>
    <v-container>
        <v-row>
            <v-col cols="12"  md="2" class="">
                <v-card class="py-5 px-2 card-stat-shadow h-100">
                    <!-- <v-row> -->
                        <v-col cols="12" class="py-md-13 px-0">
                            <div class="d-flex align-center justify-space-between">
                                <span class="text-subtitle-1 truncate-text-2 font-weight-medium">กิจกรรมที่สนับสนุนทั้งหมด</span>
                            </div>
                            <v-divider class="custom-divider border-opacity-100" :thickness="3"></v-divider>
                            <div class="text-h5 font-weight-bold pt-1">
                               35
                                <span class="text-body-2">กิจกรรม</span>
                                <!-- index {{index}} {{isLastThree(index)}} -->
                            </div>
                                
                        </v-col>
                    <!-- </v-row> -->
                    <!-- <div class="text-body-2 font-weight-bold pb-1">
                        กิจกรรมที่สนับสนุนทั้งหมด
                    </div>
                    <v-divider class="" :thickness="4"></v-divider>
                    <div class="text-h5 font-weight-bold pt-1">
                        35
                        <span class="text-body-2">กิจกรรม</span>
                    </div> -->
                </v-card>
            </v-col>
            <v-col cols="12" md="10" class="">
                <v-card class="pa-5 card-stat-shadow">
                    <v-row class="">
                        <v-col cols="12" sm="6" md="4"  class="d-none d-md-block custom-divider"
                            v-for="(item, index) in stats" :key="index"
                            :class="{
                                'border-b-md': !isLastThree(index),
                                'border-e-md' : !isright(index)
                            }"
                        >
                                <v-chip :color="item.color" block variant="flat">
                                    {{item.label}}
                                </v-chip>
                                <div class="d-flex align-center justify-space-between">
                                    <span class="text-subtitle-1 truncate-text-1 font-weight-medium">{{item.title}}</span>
                                </div>
                                <div class="text-h5 font-weight-bold pt-1">
                                    {{ item.count }}
                                    <span class="text-body-2">กิจกรรม</span>
                                </div>
                        </v-col>
                        <v-col cols="12" md="4"  class="d-md-none custom-divider"
                            v-for="(item, index) in stats" :key="index"
                            :class="{
                                'border-b-md': !isLastItem(index),
                            }"
                        >
                                <v-chip :color="item.color" block variant="flat">
                                    {{item.label}}
                                </v-chip>
                                <div class="d-flex align-center justify-space-between">
                                    <span class="text-subtitle-1 truncate-text-1 font-weight-medium">{{item.title}}</span>
                                </div>
                                <div class="text-h5 font-weight-bold pt-1">
                                    {{ item.count }}
                                    <span class="text-body-2">กิจกรรม</span>
                                    <!-- <v-divider vertical :thickness="6"></v-divider>
                                    <v-divider vertical class=""></v-divider> -->
                                    <!-- index {{index}} {{isLastThree(index)}} -->
                                </div>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-end py-1">
                        <v-btn variant="text" color="primary"> แสดงเพิ่มเติม </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const stats = [
        { label: "กลุ่มที่ 4", count: 5, title:"ผู้ป่วยในพระบรมราชานุเคราะห์", color:"#6CB5DE" },
        { label: "กลุ่มที่ 5", count: 5, title:"หน่วยงาน/องค์กรที่ได้รับพระมหากรุณาธิคุณ", color:"#BDDBA5" },
        { label: "กลุ่มที่ 8", count: 5, title:"ครอบครัว/ญาติของผู้ป่วยในพระบรมราชานุเคราะห์", color:"#F4D885" },
        { label: "กลุ่มที่ 9", count: 5, title:"ผู้ที่ขอรับพระราชทานความช่วยเหลือและ ขอเป็นคนไข้ในพระบรมราชานุเคราะห์", color:"#EEA8AB" },
        { label: "กลุ่มที่ 11", count: 10, title:"นักเรียนทุนพระราชทานม.ท.ศ., นักเรียน โรงเรียนไกลกังวลและโรงเรียนในพระราชานุเคราะห์", color:"#FAAE67" },
        { label: "กลุ่มที่ 12", count: 5, title:"บุคคลที่เป็นที่สนใจของสาธารณะชนและ เฝ้าติดตามรับเสด็จต่อเนื่อง", color:"#C6373D" },
    ];
    function isLastThree(index) {
        return index >= this.stats.length - 3;
    };
    function isLastItem(index) {
        return index >= this.stats.length - 1;
    };
    function isright(index){
        return (index + 1) % 3 === 0;
    }
</script>

<style scoped>
    .v-divider {
        height: auto;
    }
    .custom-divider {
        border-color:  #262525 !important;
    }
</style>
