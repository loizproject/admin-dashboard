import { defineStore } from "pinia";
import {
  useErrorHandler,
  noError,
  useSuccessHandler,
} from "~/utils/handle-errors";
import { HTTP_METHODS } from "~/utils/constants";
import { useLoadingStore } from "~/stores/loading";

export const useSettingsStore = defineStore("store", {
  state: () => ({
    services: [],
    totalServices: 0,
  }),

  actions: {
    async getServices() {
      const loadingStore = useLoadingStore();
      loadingStore.showLoading();
      const { error, data } = await useHttpRequest("/services");
      loadingStore.closeLoading();
      if (noError(error)) {
        const response = data._rawValue.data;
        this.services = response.services;
      } else {
        const errMessage = useErrorHandler(error);
      }
    },
    async addService(payload) {
      const { error, data } = await useHttpRequest(
        "/admin/services",
        HTTP_METHODS.POST,
        payload
      );
      if (noError(error)) {
        const response = data._rawValue.data;
        useSuccessHandler("Store added");
        return true;
      }
      const showError = useErrorHandler(error);
      console.error("error:", showError);
      return false;
    },
  },
  persist: true,
});
