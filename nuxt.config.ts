// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},

    modules: [
        '@nuxt/image',
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@vee-validate/nuxt',
    ],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    css: ['~/assets/css/tailwind.css'],

    // components: [
    //     '~/components',
    //     {path: '~components/navigation', prefix: 'Navigation'},
    // ],

    // runtimeConfig: {
    //     public: {
    //         verifyEmailUrl: process.env.VERIFICATION_EMAIL_URL,
    //         resetUrl: process.env.PASSWORD_RESET_URL,
    //         directus: {
    //             url: process.env.DIRECTUS_URL
    //         }
    //     },
    // },

    routeRules: {
        "/directus/**":
            {
                proxy: process.env.NUXT_PUBLIC_DIRECTUS_URL
            }
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    googleFonts: {
        families: {
            Montserrat: [400, 500],
            PlayfairDisplay: true,
        },
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
