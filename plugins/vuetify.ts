import { createVuetify } from 'vuetify';
import { defineNuxtPlugin } from '#app';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components'; // Import labs components
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents, // Add labs components
    },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light',
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
