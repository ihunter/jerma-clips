import { createVuetify } from 'vuetify'

// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#0AFC9E',
            secondary: '#1D4435',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
