import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log("middleware/auth");
  // const authStore = useAuthStore();

  // if (authStore.isAuthenticated) {
  //   if (to.path.startsWith("/auth/")) {
  //     return navigateTo("/");
  //   } else {
  //     return;
  //   }
  // } else {
  //   if (to.path.startsWith("/auth/")) {
  //     return;
  //   } else {
  //     return navigateTo("/auth/login");
  //   }
  // }
});
