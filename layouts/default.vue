<template>
  <div v-if="role === 'USER'">
    <AppHeaderUser />
    <slot />
  </div>
  <div v-else-if="role">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

import AppHeaderUser from "../components/AppHeaderUser.vue"
import AppHeader from "../components/AppHeader.vue"

import { ref, onMounted } from "vue"

const role = ref(null)

onMounted(() => {
  role.value = localStorage.getItem("role")
})
</script>

