<template>
    <div :id="dir">
        <Nav :path="$route.path" />
        <Nuxt :class="{ 'mt-4': $route.path !== '/' }" />
        <Footer />
        <notifications group="foo" :position="notPlace" />
        <button
            class="btn btn-outline-danger position-fixed toTop"
            v-scroll-to="'#body'"
        >
            <i class="fas fa-chevron-up"></i>
        </button>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

@Component({
    components: { Nav, Footer },
})
export default class Default extends Vue {
    public notPlace: string = 'bottom right'
    public dir: string = ''

    createLinkTag(href: string) {
        // this.$nuxt.$loading.start()
        var headID = document.getElementsByTagName('head')[0]
        var link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'

        headID.appendChild(link)

        link.href = href

        link.onload = () => {
            // this.$nuxt.$loading.finish()
        }
    }

    created() {
        let dir: string = 'ltr'
        let lang: string = 'en-US'

        if (this.$i18n.locale === 'ar') {
            this.notPlace = 'bottom left'
            dir = 'rtl'
            lang = 'ar-EG'
        }
        document.documentElement.dir = dir
        document.documentElement.lang = lang
        this.dir = dir
    }

    @Watch('$i18n.locale')
    onLocaleChanged(val: string) {
        let dir: string = 'ltr'
        let lang: string = 'en-US'

        if (this.$i18n.locale === 'ar') {
            this.notPlace = 'bottom left'
            dir = 'rtl'
            lang = 'ar-EG'
        }
        document.documentElement.dir = dir
        document.documentElement.lang = lang
        this.dir = dir
    }

    mounted() {
        try {
            // @ts-ignore
            if (BSN) {
                // @ts-ignore
                BSN.initCallback(document.getElementById('__layout'))
            } else {
                setTimeout((_) => {
                    // @ts-ignore
                    if (BSN) {
                        // @ts-ignore
                        BSN.initCallback(document.getElementById('__layout'))
                    }
                }, 700)
            }
        } catch (e) {}

        let href = '/css/bootstrap.min.css'
        if (this.dir === 'rtl') {
            href = '/css/bootstrap-rtl.min.css'
        }
        this.createLinkTag(href)
        this.createLinkTag('/css/fontawesome.min.css')
    }
}
</script>
<style></style>
