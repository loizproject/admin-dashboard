import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("middleware/auth");
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    if (
      to.path.startsWith("/auth/") &&
      (authStore.role === "super admin" ||
        authStore.role === "admin" ||
        authStore.role === "support")
    ) {
      return navigateTo("/admin");
    } else if (to.path.startsWith("/auth/") && authStore.role === "customer") {
      return navigateTo("/user");
    } else {
      return;
    }
  } else {
    if (to.path.startsWith("/auth/")) {
      return;
    } else {
      return navigateTo("/auth/login");
    }
  }
});
