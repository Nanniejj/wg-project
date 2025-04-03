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

  import mytasks from "./mytasks.vue";
  const role = localStorage.getItem("role");
</script>
