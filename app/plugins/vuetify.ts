import { createVuetify } from 'vuetify'

// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
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
  app.vueApp.use(vuetify)
})
