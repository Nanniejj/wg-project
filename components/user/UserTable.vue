<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="lobbyItems"
        :items-per-page="10"
        class="elevation-1"
  
        v-model="selected"
      >
        <template #item.name="{ item }">
          <span>{{ item.name }}</span>
        </template>
  
        <template #item.section="{ item }">
          <span>ศูนย์ไซเบอร์ ทบ.</span>
        </template>
  
        <template #item.email="{ item }">
          <span>{{ item.email }}</span>
        </template>
  
        <template #item.permissionSystem="{ item }">
          <span>ผู้ปฏิบัติงาน</span>
        </template>
  
        <template #item.permissionData="{ item }">
          <span>ส่วนบุคคล</span>
        </template>
  
        <template #item.history="{ item }">
          <a href="#" style="color: #29A0AF;">ประวัติการเข้าใช้งาน</a>
        </template>
  
        <template #item.actions="{ item }">
          <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const selected = ref([]);
  const headers = [
    { text: "Name Lastname", value: "name" },
    { text: "Section", value: "section" },
    { text: "E-mail", value: "email" },
    { text: "Permission (System)", value: "permissionSystem" },
    { text: "Permission (Data)", value: "permissionData" },
    { text: "History", value: "history" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  const lobbyItems = ref([
    { name: "Name A", email: "AAA@gmail.com" },
    { name: "Name B", email: "bababar@gmail.com" },
    { name: "Name C", email: "cesher_cc@gmail.com" },
    { name: "Name D", email: "ddd.dan@gmail.com" },
    { name: "Name E", email: "Emma-sha@gmail.com" },
    { name: "Name F", email: "Fx@gmail.com" },
    { name: "Name G", email: "girlmate@gmail.com" },
    { name: "Name H", email: "henhen_h@gmail.com" },
  ]);
  
  function editItem(item) {
    console.log("Edit:", item);
  }
  
  function deleteItem(item) {
    console.log("Delete:", item);
  }
  </script>
  
  <style scoped>
  .v-data-table {
    font-size: 14px;
  }
  .v-icon {
    cursor: pointer;
  }
  </style>
  