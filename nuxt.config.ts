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
        // allowed for stripe webhook
        server: {
            allowedHosts: ['centrally-becoming-frog.ngrok-free.app'],
        }
    },

    css: ['~/assets/css/tailwind.css'],

    site: {indexable: process.env.NUXT_PUBLIC_NOINDEX},

    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'page', mode: 'out-in'},

        head: {
            htmlAttrs: {
                lang: 'fr'
            }
        }
    },

    components: [
        '~/components',
        {path: '~/components/Layout', prefix: 'Layout'},
        {path: '~/components/Card', prefix: 'Card'},
        {path: '~/components/Input', prefix: 'Input'},
        {path: '~/components/Basket', prefix: 'Basket'},
        {path: '~/components/Form', prefix: 'Form'},
        {path: '~/components/Popup', prefix: 'Popup'},
    ],

    runtimeConfig: {
        public: {
            verifyEmailUrl: `${nuxt_url}/verification-adresse-mail`,
            resetUrl: process.env.PASSWORD_RESET_URL,
            assetsUrl: process.env.ASSETS_URL,
            nuxtUrl: process.env.NUXT_URL,
            delete_request_id: process.env.DELETE_REQUEST,
            directus: {
                url: process.env.DIRECTUS_URL,
            }
        },

        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        stripe_secret_key: process.env.STRIPE_SECRET_KEY,
        refund_mail_id: process.env.REFUND_MAIL,
        contact_mail_id: process.env.CONTACT_MAIL,
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    googleFonts: {
        preload: true,
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
    },
})