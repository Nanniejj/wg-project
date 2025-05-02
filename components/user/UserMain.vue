<template>
  <div>
    <div class="font-title font-weight-bold base-color">User Management</div>
    <hr class="my-5" />
    <v-tabs
      v-model="tab"
      align-tabs="left"
      color="#2A3547"
      slider-color="#3CB0CC"
    >
      <v-tab :value="1"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >Lobby</span
        ></v-tab
      >
      <v-tab :value="2"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >User Management</span
        ></v-tab
      >
      <v-tab :value="3" v-if="role != 'USER'"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >Team</span
        ></v-tab
      >
      <v-tab :value="4" v-if="role != 'USER'"
        ><span class="text-capitalize font-subtitle font-weight-medium"
          >History</span
        ></v-tab
      >
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <v-container v-if="role === 'USER'" fluid>
          <LobbyUser />
        </v-container>
        <v-container v-else fluid>
          <LobbyTable />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <v-container fluid>
          <UserTable />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="3">
        <v-container fluid>
          <TeamTable />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<script setup>
  // import LobbyTable from "./LobbyTable.vue";
  import LobbyUser from "./LobbyUser.vue";
  import LobbyTable from "./LobbyTable.vue";
  import TeamTable from "./TeamTable.vue";
  import { ref } from "vue";
  const tab = ref(null);
  const role = localStorage.getItem("role");
  console.log(role);
</script>
<style></style>
