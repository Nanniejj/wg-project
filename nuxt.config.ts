// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // ✅ ใช้ SSR เพื่อให้โหลดหน้าเร็วขึ้น
  ssr: true,

  // ✅ เปิด DevTools ใน dev mode เท่านั้น
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  // ✅ รองรับ CSS ของ Vuetify, Leaflet, Dropzone, Icon
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/styles',
    'leaflet/dist/leaflet.css',
    'dropzone/dist/dropzone.css',
  ],

  // ✅ transpile Vuetify และ Leaflet ให้ทำงานได้กับ Vite
  build: {
    transpile: ['vuetify', '@vue-leaflet/vue-leaflet'],
  },

  // ✅ Vite config
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  // ✅ เปิดให้เข้าผ่าน LAN (ใช้ได้กับเครื่องอื่น)
  devServer: {
    host: '0.0.0.0',
    port: 3003,
  },

  // ✅ ปรับเส้นทาง SSR เฉพาะหน้า (hybrid mode)
  routeRules: {
    // บางหน้าที่หนัก เช่น ใช้ chart หรือ drag-drop
    '/create': { ssr: false },
    '/report': { ssr: false },
  },

  // ✅ Runtime config ใช้ .env
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      MEDIA_BASE_URL: 'http://192.168.1.128:3001'
    },
  },

  // ✅ SEO & font preload
  app: {
    head: {
      title: '127',
      link: [
        { rel: 'icon', href: '/logo3.png', type: 'image/png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css',
        },
      ],
    },
  },

  // ✅ ใช้ plugin ต่าง ๆ
  plugins: [
   // '~/plugins/event-bus.ts',
    '~/plugins/vuetify.ts',     // Vuetify ที่กำหนดเอง
    '~/plugins/moment.js',      // Moment สำหรับวันที่
    // '~/plugins/vue-social-sharing.ts',
     '~/plugins/mitt.client.js',
  ],

  compatibilityDate: '2025-04-21',
});