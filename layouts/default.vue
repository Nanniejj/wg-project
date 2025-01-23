<template>
  <div v-if="role == 'USER'">
    <AppHeaderUser />
    <slot />
    <!-- <AppFooter /> -->
  </div>
  <div v-else>
    <AppHeader />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
<script setup>
  import AppHeaderUser from "../components/AppHeaderUser.vue";

  // import AppHeader  from "@/components/AppHeader";
  //   import AppFooter  from "@/components/AppFooter";
  const role = localStorage.getItem("role");

  if (role) {
    console.log("Role retrieved from localStorage:", role);
  } else {
    console.log("No role found in localStorage.");
  }
</script>
