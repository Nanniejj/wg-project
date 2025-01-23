export default defineNuxtRouteMiddleware((to, from) => {
  // const authToken = process.client ? localStorage.getItem("authToken") : null;

  const authToken = localStorage.getItem('authToken');
  console.log("chckt auth",authToken)
  if (!authToken) {
    return navigateTo('/login');
  } 
});
