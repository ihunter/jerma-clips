import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/seo',
    'nuxt-gtag',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  build: {
    transpile: ['vuetify'],
  },

  gtag: {
    id: 'G-4WX9B5T3EK',
  },

  runtimeConfig: {
    mongodbUri: '',
    public: {
      limit: 24,
    },
  },

  site: {
    url: 'https://clips.jerma.io/',
    name: 'Jerma Clip Search',
    description: 'Search for twitch clips of Jerma985 by title, game, and date.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },

  robots: {
    disallow: ['/searches'],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Jerma Clip Search',
      meta: [
        { name: 'description', content: 'Search for twitch clips of Jerma985 by title, game, and date.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],

    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 400,
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    },
    storage: 'cookies',
  },

  typescript: {
    strict: false,
  },

  compatibilityDate: '2024-08-08',
})
