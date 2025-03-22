const directus_url = process.env.DIRECTUS_URL || 'http://127.0.0.1:8055';
const nuxt_url = process.env.NUXT_URL || 'http://localhost:3000';

// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    experimental: {
        defaults: {
            useAsyncData: {
                deep: false
            }
        }
    },
    devtools: {enabled: true},

    modules: [
        '@nuxt/image',
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@vee-validate/nuxt',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt'
    ],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    css: ['~/assets/css/tailwind.css'],

    site: {indexable: process.env.NUXT_PUBLIC_NOINDEX},

    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'page', mode: 'out-in'},
    },

    components: [
        '~/components',
        {path: '~/components/Layout', prefix: 'Layout'},
        {path: '~/components/Card', prefix: 'Card'},
        {path: '~/components/Input', prefix: 'Input'},
    ],

    runtimeConfig: {
        public: {
            verifyEmailUrl: `${nuxt_url}/verification-adresse-mail`,
            resetUrl: process.env.PASSWORD_RESET_URL,
            assetsUrl: process.env.ASSETS_URL,
            nuxtUrl: process.env.NUXT_URL,
            directus: {
                url: process.env.DIRECTUS_URL,
            }
        },
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    googleFonts: {
        families: {
            Montserrat: {
                wght: [400, 500]
            },
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