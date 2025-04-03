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
definePageMeta({
  middleware: 'auth',
});
  import AppHeaderUser from "../components/AppHeaderUser.vue";

  // import AppHeader  from "@/components/AppHeader";
  //   import AppFooter  from "@/components/AppFooter";
  const role = localStorage.getItem("role");

</script>
