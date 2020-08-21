export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'spa',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        titleTemplate: '%s - ' + process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    /*
     ** Global CSS
     */
    css: ['@/assets/css/app.scss'],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/notify.ts',
        '~/plugins/axios.js',
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxt/typescript-build'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-i18n',
        '@nuxtjs/auth',
    ],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'https://nx.test/server/public/api/'
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {},

    /**
     * Vue config
     */
    vue: {
        config: {
            productionTip: false,
            devtools: true,
        }
    },

    /**
     * I18n configuration
     * See https://i18n.nuxtjs.org/options-reference.html
     */
    i18n: {
        vueI18nLoader: false,
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.js' },
            { code: 'ar', iso: 'ar-EG', file: 'ar.js' },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            silentTranslationWarn: true
        },
    },

    /**
     * auth config
     */
    auth: {
        strategies: {
            'laravel.passport': {
                url: '...',
                client_id: '...',
                client_secret: '...',
            },
        },
    },
}
