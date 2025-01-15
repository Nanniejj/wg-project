// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["@mdi/font/css/materialdesignicons.min.css", "vuetify/styles"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
    define: {
      "process.env.DEBUG": false, // Fix for potential Vuetify warnings
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  app: {
    head: {
      title: "WG",
      link: [
        { rel: "icon", href: "/logo3.png", type: "image/png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Marcellus&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css",
        },
      ],
      script: [],
    },
  },
  plugins: ['~/plugins/moment.js'],
  // plugins: ["~/plugins/mitt.client.js", "~/plugins/vue-social-sharing.ts"],
});
