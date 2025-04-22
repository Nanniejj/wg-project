export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // ป้องกัน error บน server-side

  // ตรวจสอบว่า localStorage ใช้งานได้
  if (process.client) {
    const authToken = localStorage.getItem('authToken');
    // const twofactor = localStorage.getItem('2fa');

    
    if (!authToken) {
      return navigateTo('/login');
    }


    // if (!authToken || (twofactor == null)) {
    //   return navigateTo('/login');
    // }
  }
});
