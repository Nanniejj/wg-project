// plugins/vuetify.ts

import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: {
      VFileUpload,
      VNumberInput,
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
  })

  nuxtApp.vueApp.use(vuetify)
})
