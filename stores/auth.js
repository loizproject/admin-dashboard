import { defineStore } from "pinia";
import {
  useErrorHandler,
  noError,
  useSuccessHandler,
} from "~/utils/handle-errors";
import { HTTP_METHODS } from "~/utils/constants";
import { useLoadingStore } from "~/stores/loading";
import { useToastStore } from "~/stores/toast";
import { useServicesStore } from "~/stores/services";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      token: null,
      isLoggedIn: false,
      user: null,
      role: null,
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
    async login(payload) {
      console.log(payload);
      const { error, data } = await useHttpRequest(
        "/login",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        useSuccessHandler("Logging in...");
        const response = data._rawValue;
        this.isLoggedIn = true;
        this.token = response.authorization;
        this.role = response.role;
        const accessToken = useCookie("accessToken");
        accessToken.value = this.token.token;
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
    async getUser() {
      const loadingStore = useLoadingStore();
      loadingStore.showLoading();
      const { error, data } = await useHttpRequest("/user");
      loadingStore.closeLoading();
      if (noError(error)) {
        const response = data._rawValue;
        this.user = response.data;
      } else {
        const errMessage = useErrorHandler(error);
      }
    },
    logout() {
      const servicesStore = useServicesStore();
      this.token = null;
      this.isLoggedIn = false;
      this.user = "";
      localStorage.clear();
      const accessToken = useCookie("accessToken");
      accessToken.value = null;
      servicesStore.$reset();
    },
  },
  persist: true,
});
