import { defineStore } from "pinia";
import {
  useErrorHandler,
  noError,
  useSuccessHandler,
} from "~/utils/handle-errors";
import { HTTP_METHODS } from "~/utils/constants";
import { useLoadingStore } from "~/stores/loading";
import { useServicesStore } from "~/stores/services";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    isLoggedIn: false,
    user: null,
    role: null,
    tokenExpiryTime: null,
    refreshInterval: null,
  }),
  getters: {
    isAuthenticated() {
      return this.token !== null;
    },
  },
  actions: {
    async login(payload) {
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
        this.tokenExpiryTime = Date.now() + 300 * 1000;
        this.startRefreshTimer();

        return true;
      }
      useErrorHandler(error);
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
    async getRefreshToken() {
      const { error, data } = await useHttpRequest("/refresh");
      if (noError(error)) {
        const response = data._rawValue;
        this.role = response.original.role;
        this.token = response.original.authorization;
        const accessToken = useCookie("accessToken");
        accessToken.value = this.token.token;
        this.tokenExpiryTime = Date.now() + 5 * 60 * 1000;
        this.startRefreshTimer();
        console.log(
          `Token refreshed. New expiry time: ${new Date(this.tokenExpiryTime)}`
        );
      } else {
        useErrorHandler(error);
      }
    },

    startRefreshTimer() {
      if (this.refreshInterval) clearInterval(this.refreshInterval);
      this.refreshInterval = setInterval(() => {
        const timeRemaining = this.tokenExpiryTime - Date.now();
        console.log(`Time remaining: ${timeRemaining / 1000} seconds`);
        if (timeRemaining <= 15 * 1000 && timeRemaining > 0) {
          this.getRefreshToken();
        }
        if (!this.token) {
          clearInterval(this.refreshInterval);
        }
      }, 5000);
    },

    checkRefreshOnLoad() {
      if (this.token && this.tokenExpiryTime) {
        const timeRemaining = this.tokenExpiryTime - Date.now();
        if (timeRemaining > 0) {
          this.startRefreshTimer();
        } else {
          this.logout();
        }
      }
    },
    async logout(payload) {
      const { error, data } = await useHttpRequest(
        "/logout",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const router = useRouter();
        const servicesStore = useServicesStore();
        this.token = null;
        this.isLoggedIn = false;
        this.user = null;
        localStorage.clear();
        const accessToken = useCookie("accessToken");
        accessToken.value = null;
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        servicesStore.$reset();
        router.push("/auth/login");

        return true;
      }
      useErrorHandler(error);
      return false;
    },
  },
  persist: true,
});
