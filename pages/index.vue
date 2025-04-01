<template>
  <div v-if="role == 'USER'">
    <mytasks />
  </div>
  <div v-else>
    <Home />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
  import Home from "./dashboard.vue";
  definePageMeta({
    middleware: ["auth"],
    // or middleware: 'auth'
  });
  import mytasks from "./mytasks.vue";
  const role = localStorage.getItem("role");

  if (role) {
    console.log("Role retrieved from localStorage:", role);
  } else {
    console.log("No role found in localStorage.");
  }
</script>
