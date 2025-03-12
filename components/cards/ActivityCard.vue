<template>
  <v-card class="card-stat-shadow pa-4 rounded-lg">
    <v-col>
      <v-avatar
        size="45"
        :color="getTeamColor(activity.team)"
        class="white--text text-h6 my-2"
      >
        {{ activity.team }}
      </v-avatar>

      <v-carousel hide-delimiters height="200">
        <v-carousel-item
          v-for="(image, i) in activity.images"
          :key="i"
          :src="image"
        ></v-carousel-item>
      </v-carousel>
    </v-col>

    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ activity.title }}
    </v-card-title>
    <v-card-text class="text-body-2 truncate-text-2 pb-0">
      รายละเอียด: {{ activity.description }}
    </v-card-text>

    <v-row class="pa-4 mb-2 justify-space-between">
      <v-col md="6" lg="8" class="d-flex align-center">
        <v-icon color="red" class="mr-1">mdi-map-marker</v-icon>
        <span class="text-caption truncate-text-1">{{
          activity.location
        }}</span>
      </v-col>
      <v-col cols="auto" class="d-flex align-center justify-end">
        <v-icon color="red" class="mr-1">mdi-calendar</v-icon>
        <span class="text-caption">{{ activity.date }}</span>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-chip v-if="buttonOption.textColor"
       :color="buttonOption.color" 
       class="custom-chip"
       :style="{ color: buttonOption.textColor}" block variant="flat">
        <div class="d-flex flex-column align-center justify-center ">
            <span class="chip-text text-sm font-weight-bold">{{ buttonOption.text }} {{ activity.group }}</span>
            <span v-if="buttonOption.subText" class="chip-subtext truncate-text-1 px-2">{{ buttonOption.subText }}</span>
        </div>
      </v-chip>
      <v-chip v-else :color="buttonOption.color" block variant="flat">
        {{ buttonOption.text }} {{ activity.group }}
      </v-chip>

      <v-row justify="end">
        <v-btn class="text-right"> <v-icon end>mdi-arrow-right</v-icon></v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script setup>
  const { getTeamColor, getMissionColor } = useColors();
</script>
<script>
  export default {
    props: {
      buttonOption: Object,
      count: Number,
      activity: Object,
    },
  };
</script>
<style scoped>
.custom-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px; 
  /* font-size: 14px; */
  /* padding: 0px; */
  max-width: 200px;
}
.chip-text{
    font-size: 12px;
    line-height: 1; /* ลดความสูงของบรรทัด */
}
.chip-subtext {
  font-size: 10px;
  /* opacity: 0.8; */
}
</style>
