import { useToastStore } from "~/stores/toast";
import { useAuthStore } from "~/stores/auth";

export const useErrorHandler = (error) => {
  const toastStore = useToastStore();
  const authStore = useAuthStore();

  if (error.value.data) {
    const errorDetails = error.value.data.error;

    // Check for error code and specific message for unauthorized access
    if (
      errorDetails?.code === 401 &&
      (errorDetails?.message === "Invalid credentials. Please try again" ||
        errorDetails.message ===
          "You must be logged in to perform this action, please login and try again")
    ) {
      authStore.logout();
      toastStore.setMessage({
        text: errorDetails?.message,
        type: "error",
      });
      return errorDetails.message;
    } else {
      const errorMessage =
        errorDetails?.message ||
        error.value.data.message ||
        "An error occurred.";
      toastStore.setMessage({ text: errorMessage, type: "error" });
      return errorMessage;
    }
  } else {
    const errorMessage = error.value.message || "An unexpected error occurred.";
    toastStore.setMessage({ text: errorMessage, type: "error" });
    return errorMessage;
  }
};

export const noError = (error) => {
  return error.value == null;
};

export const useSuccessHandler = (successMessage) => {
  const toastStore = useToastStore();
  toastStore.setMessage({ text: successMessage, type: "success" });
};
