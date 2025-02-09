// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/image',
      '@nuxtjs/google-fonts',
      '@pinia/nuxt',
      'pinia-plugin-persistedstate/nuxt',
      '@vee-validate/nuxt',
      'shadcn-nuxt'
  ],

    // components: [
    //     '~/components',
    //     {path: '~components/navigation', prefix: 'Navigation'},
    // ],

    runtimeConfig: {
        public: {
            verifyEmailUrl: process.env.VERIFICATION_EMAIL_URL,
            resetUrl: process.env.PASSWORD_RESET_URL,
            directus: {
                url: process.env.DIRECTUS_URL
            }
        },
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    googleFonts: {
        families: {
            Montserrat: true,
            PlayfairDisplay: true,
        },
    },

    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui',
    },

    vue: {
        compilerOptions: {
            isCustomElement: (tag: string) => tag.startsWith('swiper'),
        },
    },

    build: {
        transpile: ['@vuepic/vue-datepicker']
    }
})
