<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="font-title my-5">กิจกรรม</h2>
      </v-col>
    </v-row>

    <v-row>
        <v-col
            v-for="(activity, index) in activities"
            :key="index"
            cols="12"
            md="4"
        >
           <ActivityCard :buttonOption="activity.buttonOption" :activity="activity"/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
    import { ref } from "vue";
    import ActivityCard from '../../cards/ActivityCard.vue'
    const { getTeamColor, getMissionColor } = useColors();
    const activities = ref([
    {
      team: "C",
      color: "purple",
      title: "โครงการหลอดไฟนำทาง แสงสว่างน้ำใจ”",
      description:
        "พระบามสมเด็จพระวชิรเกล้าเจ้าอยู่หัว กลุ่มอาชีวะราชภักดี ได้นำหลอดไฟ จำนวน 10,000 หลอด",
      location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
      date: "12 ก.ค. 67",
      images: ["./R10(1).png", "./R10(2).png", "./R10(3).png"],
      buttonColor: "#FFD7D5",
      buttonOption:{
        text:"ชื่อนักวิชาการ",
        subText:null,
        color:"#FFD7D5",
        textColor:null
      }
    },
    {
      team: "C",
      color: "purple",
      title: "พิธีถวายราชสดุดี ทบทวนคำปฏิญาณ และการสวนสนาม “วันลูกเสืออากาศ””",
      description:
        "พลอากาศเอก วิศรุต สุวรรณเนตร ผู้ช่วยผู้บัยชาการ ทหารอากาศ เป็นประธานพิธีถวายสดุดีทบทวน",
      location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
      date: "12 ก.ค. 67",
      images: ["./R10(2).png", "./R10(3).png", "./R10(1).png"],
      buttonColor: "#EDE67B",
      buttonOption:{
        text:"ชื่อนักวิชาการ",
        subText:null,
        color:"#EDE67B",
        textColor:null
      }
    },
    {
      team: "D",
      color: "green",
      title: "แจ้งความเพิ่มถวายฎีกาเท็จ",
      description:
        "พลอากาศเอก วิศรุต สุวรรณเนตร ผู้ช่วยผู้บัยชาการ ทหารอากาศ เป็นประธานพิธีถวายสดุดีทบทวน",
      location: "ห้องประชุมสัมมนา โรงแรมเอเชีย",
      date: "12 ก.ค. 67",
      images: ["./R10(3).png", "./R10(2).png", "./R10(1).png"],
      buttonColor: "#61A8D0",
      buttonOption:{
        text:"ชื่อนักวิชาการ",
        subText:null,
        color:"#61A8D0",
        textColor:null
      }
    },
  ]);
</script>

<style scoped>
  .v-card {
    border-radius: 12px;
}
.v-chip{
    padding-left: 25px;
    padding-right: 25px;
}
:deep(.v-carousel__controls) {
  justify-content: flex-end !important;
  /* position: relative; */
}

:deep(.v-carousel__controls .v-btn--icon .v-btn__content .v-icon ) {
  /* width: 50px;  /* ปรับความกว้าง
  height: 50px; ปรับความสูง */
  font-size: 14px; /* ปรับขนาดไอคอน */
  opacity: 1;
  margin: 0%;
}

:deep(.v-responsive) {
  justify-content: end;
}
:deeep(.v-responsive .v-img__img){
  width: unset;
}
.cut-text-multi{
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
</style>
