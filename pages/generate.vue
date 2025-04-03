<template>
  <qr />
</template>

<script setup>
  import { onMounted } from "vue";
  import { useRouter } from "vue-router"; // ใช้ Vue Router ในการเปลี่ยนเส้นทาง
  import qr from "./components/twofactor/qr.vue";

  definePageMeta({ layout: "false" });

  const router = useRouter();

  onMounted(() => {
    // เช็ค localStorage สำหรับค่า twofac
    const twofac = localStorage.getItem("twofac");

    // ถ้าไม่มีค่า หรือค่าเป็น "true" ให้เปลี่ยนเส้นทางไปหน้า login
    if (!twofac || twofac === "true") {
      router.push("/login");
    }
  });
</script>

<style scoped>
  /* สไตล์ที่ต้องการ */
</style>
