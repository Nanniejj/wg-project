<template>
  <Home />
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});
import Home from "./dashboard.vue";
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>
