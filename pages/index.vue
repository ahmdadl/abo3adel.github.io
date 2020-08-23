<template>
    <div class="container-fluid p-0 m-0">
        <header
            id="canvasHeader"
            class="masthead bg-dark text-light bg-transparent"
        >
            <animated-dots :full-height="true"></animated-dots>
            <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                    <h1 class="mx-auto my-0 text-capitalize">
                        {{ $t('home.hello') }}
                        <span class="text-danger">
                            {{ $t('home.name') }}
                        </span>
                    </h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">
                        {{ $t('home.and') }}
                    </h2>
                    <h1 id="">
                        <span id="job-title">
                            <animate-text
                                :arr="[
                                    'A will not rendered',
                                    'A Back End Web Developer',
                                    'A Laravel Developer',
                                    'A Full Stack Web Developer',
                                ]"
                            ></animate-text>
                        </span>
                        <span id="blink" class="blink">|</span>
                    </h1>
                    <!-- <a
                        href="#about"
                        v-scroll-to="'#about'"
                        class="btn btn-primary js-scroll-trigger"
                    >
                        {{ $t('home.getStart') }}
                    </a> -->
                </div>
            </div>
        </header>

        <!-- about section -->
        <section
            id="about"
            class="about bg-light text-dark text-center mt-5 pt-2"
        >
            <span v-html="h2($t('home.about'))"></span>
            <div class="row">
                <div
                    class="pros col-6 col-md-4 shadow mt-4"
                    v-for="p in myProps"
                    :key="p.title"
                >
                    <div class="content p-1">
                        <div
                            class="wyg pointer btn btn-outline-primary btn-lg fa-3x rounded"
                        >
                            <i :class="'fas fa-' + p.icon"></i>
                        </div>
                        <h3 class="d-block mt-3">
                            {{ p.title }}
                        </h3>
                        <span class="text-muted">
                            {{ p.title }}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AnimatedDots from '~/components/animatedDots.vue'
import AnimateText from '~/components/animate-text.vue'

@Component({
    components: { AnimatedDots, AnimateText },
})
export default class Home extends Vue {
    public myProps: Array<{
        title: any
        icon: string
    }> = [
        { title: this.$i18n.t('home.Responsive'), icon: 'tablet-alt' },
        { title: this.$i18n.t('home.Dynamic'), icon: 'rocket' },
        { title: this.$i18n.t('home.Tested'), icon: 'cog' },
        { title: this.$i18n.t('home.Organized'), icon: 'code' },
        { title: this.$i18n.t('home.Up_To_Date'), icon: 'laptop-code' },
        { title: this.$i18n.t('home.Multi_Language'), icon: 'language' },
    ]

    public h2(str: any): string {
        return `<h2>${str}<hr class='mx-auto bg-dark pt-1 rounded w-25 px-5' /></h2>`
    }

    mounted() {
        console.log(this.$route.path)
    }
}
</script>

<style lang="scss"></style>
