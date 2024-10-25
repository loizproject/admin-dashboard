import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import ProgressSpinner from "primevue/progressspinner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });

  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
});
