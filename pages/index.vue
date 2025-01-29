<template>
  <Home />
</template>

<script setup>
import Home from "./dashboard.vue";
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>
