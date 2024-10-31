import { defineStore } from "pinia";
import {
  useErrorHandler,
  noError,
  useSuccessHandler,
} from "~/utils/handle-errors";
import { HTTP_METHODS } from "~/utils/constants";
import { useLoadingStore } from "~/stores/loading";
import { useToastStore } from "~/stores/toast";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      email: "",
      token: null,
      isLoggedIn: false,
      user: null,
      verification: null,
      sysmesage: "",
    };
  },
  getters: {
    isAuthenticated() {
      console.log;
      const isLoggedIn = this.token !== null;
      console.log("IsLoggedIn:", isLoggedIn, 5);
      return isLoggedIn;
    },
  },
  actions: {
    async register(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/auth/register",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    setEmail(email_address) {
      this.email = email_address;
    },
    async resendOTP(payload) {
      console.log(payload, 3);
      const { error, data } = await useHttpRequest(
        "/auth/resend_otp",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler("An OTP has been sent to your email address.");
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async verifyOTP(payload) {
      console.log(payload, 3);
      const { error, data } = await useHttpRequest(
        "/auth/verify_otp",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler("verification successful");
        this.isLoggedIn = true;
        this.token = response.data;
        const accessToken = useCookie("accessToken");
        accessToken.value = this.token.access;
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async login(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/auth/login",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        useSuccessHandler("Logging in...");
        const response = data._rawValue;
        this.isLoggedIn = true;
        this.token = response.data;
        const accessToken = useCookie("accessToken");
        accessToken.value = this.token.access;
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async forgotPassword(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/auth/forgot_password",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler(response.data.message);
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async resetPassword(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/auth/reset_password",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler(response.data.message);
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async getUser() {
      const loadingStore = useLoadingStore();
      loadingStore.showLoading();
      const { error, data } = await useHttpRequest("profile/info");
      loadingStore.closeLoading();
      if (noError(error)) {
        const response = data._rawValue;
        this.user = response.data;
      } else {
        const errMessage = useErrorHandler(error);
      }
    },
    async updateProfile(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/profile/info",
        HTTP_METHODS.PUT,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async updatePassword(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/profile/password",
        HTTP_METHODS.PUT,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler("Password changed successfully.");
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async editUser(payload) {
      console.log(payload, 3);
      const { error, data } = await useHttpRequest(
        "/auth/profile/info/change",
        HTTP_METHODS.PUT,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler("Country changed succesfully");
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async changePassword(payload) {
      console.log(payload, 3);
      const { error, data } = await useHttpRequest(
        "/auth/profile/password/change",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue;
        useSuccessHandler("Password changed succesfully");
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async getVerifications() {
      const loadingStore = useLoadingStore();
      loadingStore.showLoading();
      const { error, data } = await useHttpRequest("profile/verification");
      loadingStore.closeLoading();
      if (noError(error)) {
        const response = data._rawValue;
        this.verification = response.data;
      } else {
        const errMessage = useErrorHandler(error);
      }
    },
    async getSystemStatus() {
      const toastStore = useToastStore();
      const loadingStore = useLoadingStore();
      loadingStore.showLoading();
      const { error, data } = await useHttpRequest(
        "/profile/sys-verification-settings"
      );
      loadingStore.closeLoading();
      if (noError(error)) {
        const response = data._rawValue;
        if (response.data[0].status === false) {
          console.log(response.data[0].message);
          this.sysmesage = response.data[0].message;
        }
      } else {
        const errMessage = useErrorHandler(error);
      }
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.user = "";
      localStorage.clear();
      const accessToken = useCookie("accessToken");
      accessToken.value = null;
    },
  },
  persist: true,
});
