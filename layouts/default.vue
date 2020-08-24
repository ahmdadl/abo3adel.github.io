<template>
    <div>
        <Nav />
        <Nuxt :class="{'mt-4': $route.path !== '/'}" />
        <Footer />
        <notifications group="foo" :position="notPlace" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

@Component({
    components: { Nav, Footer },
})
export default class Default extends Vue {
    public notPlace: string = 'bottom right'

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
    }
}
</script>
<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
