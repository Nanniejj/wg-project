<template>
  <div>
    <div class="font-title font-weight-bold base-color">Data Management</div>
    <hr class="my-5" />
    <v-tabs
      v-model="tab"
      align-tabs="left"
      color="#2A3547"
      slider-color="#3CB0CC"
    >
      <v-tab :value="1"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >HVT</span
        ></v-tab
      >
      <v-tab :value="2"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >ข้อมูลกลุ่ม</span
        ></v-tab
      >
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <v-container fluid>
            <TableHvt />
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item :value="2">
        <v-container fluid>
            <TableGroups />
        </v-container>
      </v-tabs-window-item>
      
    </v-tabs-window>
  </div>
</template>
<script setup>
import TableHvt from "./TableHvt.vue";
import TableGroups from "./TableGroups.vue"; 
import { ref } from "vue";
const tab = ref(2);
</script>
<style></style>
