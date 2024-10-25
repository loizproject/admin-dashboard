// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vee-validate/nuxt",
  ],
  css: [
    "@/assets/css/fonts.css",
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
  ],
  build: {
    transpile: ["primevue"],
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      ENVIRONMENT: process.env.ENVIRONMENT,
    },
  },
  devtools: { enabled: true },
  ssr: false,
});
