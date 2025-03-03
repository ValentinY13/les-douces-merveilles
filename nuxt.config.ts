const directus_url = process.env.DIRECTUS_URL || 'http://127.0.0.1:8055';

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

    components: [
        '~/components',
        {path: '~/components/Layout', prefix: 'Layout'},
        {path: '~/components/Card', prefix: 'Card'},
    ],

    runtimeConfig: {
        public: {
            verifyEmailUrl: process.env.VERIFICATION_EMAIL_URL,
            resetUrl: process.env.PASSWORD_RESET_URL,
            assetsUrl: process.env.ASSETS_URL,
            nuxtUrl: process.env.NUXT_URL,
            directus: {
                url: process.env.DIRECTUS_URL,
            }
        },
    },

    routeRules: {
        "/directus/**":
            {
                proxy: process.env.PROXY_DIRECTUS_URL
            }
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    googleFonts: {
        families: {
            Montserrat: [400, 500],
            'Playfair Display': {
                wght: [400, 500, 600, 700, 800, 900],
                ital: [700],
            },
        },
    },

    vue: {
        compilerOptions: {
            isCustomElement: (tag: string) => tag.startsWith('swiper'),
        },
    },

    build: {
        transpile: ['@vuepic/vue-datepicker']
    },

    image: {
        directus: {
            baseURL: `${directus_url}/assets/`,
        }
    }
})
