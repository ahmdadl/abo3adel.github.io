import { Vue } from 'vue-property-decorator'
import VueLazyload from 'vue-lazyload'
import { Plugin } from '@nuxt/types'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/img/error.svg',
    loading: '/img/rings.svg',
    attempt: 1,
})
