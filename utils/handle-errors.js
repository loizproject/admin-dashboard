import { useToastStore } from "~/stores/toast";
import { useAuthStore } from "~/stores/auth";

export const useErrorHandler = (error) => {
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  const router = useRouter();

  if (error) {
    console.log(error, 7);

    // Check for unauthorized (token not valid)
    if (error.value?.data?.code === "token_not_valid") {
      authStore.logout();
      router.push("/auth/login");
      toastStore.setMessage({
        text: "You have been logged out due to unauthorized access.",
        type: "error",
      });
    } 
    // Check for internal server error (500)
    else if (error.value?.response?.status === 500 || error.value?.error === "Internal Server Error") {
      toastStore.setMessage({
        text: "Something went wrong on our end. Please try again later.",
        type: "error",
      });
    } 
    // Handle other types of errors
    else {
      const errorMessage =
        error.value?.data?.data?.message ||
        error.value.message ||
        error.value ||
        error.value.error ||
        "An error occurred";
      toastStore.setMessage({ text: errorMessage, type: "error" });
    }
  }
};

export const noError = (error) => {
  return error.value == null;
};

export const useSuccessHandler = (successMessage) => {
  const toastStore = useToastStore();
  toastStore.setMessage({ text: successMessage, type: "success" });
};
