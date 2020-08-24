<template>
    <div>
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

        <!-- container -->
        <div class="container-fluid p-0 m-0">
            <!-- about section -->
            <section
                id="about"
                class="about bg-dark text-light text-center pt-3 col-12"
            >
                <span v-html="h2($t('home.title.about'))"></span>
                <div class="row">
                    <div
                        class="pros col-6 col-md-4 p-0"
                        v-for="p in myProps"
                        :key="p.title"
                    >
                        <div
                            class="card card-body bg-transparent text-center border-0 mb-2"
                        >
                            <div
                                class="wyg pointer btn btn-outline-primary btn-lg fa-3x rounded w-50 mx-auto"
                            >
                                <i :class="'fas fa-' + p.icon"></i>
                            </div>
                            <h3 class="d-block mt-3">
                                {{ p.title }}
                            </h3>
                            <span class="text-muted">
                                {{ p.txt }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- skills -->
            <section
                id="skills"
                class="skills bg-transparent text-light text-center pt-2 col-12"
            >
                <span v-html="h2($t('home.title.skills'))"></span>
                <div class="row text-center">
                    <div class="col-12 col-md-6 mt-3 mb-5">
                        <img
                            src="~assets/img/meLarge.jpg"
                            class="img w-75 p-1 border border-secondary rounded"
                        />
                        <p class="text-secondary mt-2 text-capitalize">
                            {{ $t('home.skill_info') }}
                            <!-- <a
                            href="#projects"
                            v-scroll-to="'#projects'"
                            class="btn btn-outline-primary btn-sm"
                        >
                            {{ $t('home.my_projects') }}
                        </a> -->
                        </p>
                        <!-- <a
                        href="#contact"
                        v-scroll-to="{ el: '#contact', duration: 2500 }"
                        class="btn btn-primary"
                    >
                        {{ $t('home.hire') }}
                    </a> -->
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                        <progress-skill
                            v-for="sk in skills"
                            :key="sk.title"
                            :txt="sk.title"
                            :val="sk.value"
                        ></progress-skill>
                    </div>
                </div>
            </section>

            <!-- projects -->
            <section
                id="projects"
                class="skills bg-dark text-light text-center mt-5 col-12"
            >
                <span v-html="h2($t('home.title.project'))"></span>
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            {{ $t('home.pills.all') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            {{ $t('home.pills.laravel') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            {{ $t('home.pills.spa') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            {{ $t('home.pills.android') }}
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AnimatedDots from '~/components/animatedDots.vue'
import AnimateText from '~/components/animate-text.vue'
import ProgressSkill from '~/components/progress.vue'

@Component({
    components: { AnimatedDots, AnimateText, ProgressSkill },
})
export default class Home extends Vue {
    public readonly myProps: Array<{
        title: any
        icon: string
        txt: any
    }> = [
        {
            title: this.$i18n.t('home.Responsive'),
            icon: 'tablet-alt',
            txt: this.$i18n.t('home.ResponsiveTxt'),
        },
        {
            title: this.$i18n.t('home.Dynamic'),
            icon: 'rocket',
            txt: this.$i18n.t('home.DynamicTxt'),
        },
        {
            title: this.$i18n.t('home.Tested'),
            icon: 'cog',
            txt: this.$i18n.t('home.TestedTxt'),
        },
        {
            title: this.$i18n.t('home.Organized'),
            icon: 'code',
            txt: this.$i18n.t('home.OrganizedTxt'),
        },
        {
            title: this.$i18n.t('home.Up_To_Date'),
            icon: 'laptop-code',
            txt: this.$i18n.t('home.Up_To_DateTxt'),
        },
        {
            title: this.$i18n.t('home.Multi_Language'),
            icon: 'language',
            txt: this.$i18n.t('home.Multi_LanguageTxt'),
        },
    ]

    public readonly skills: Array<{
        title: string
        value: number
    }> = [
        { title: 'php', value: 85 },
        { title: 'oop', value: 80 },
        { title: 'mysql', value: 80 },
        { title: 'laravel', value: 85 },
        { title: 'lumen', value: 85 },
        { title: 'unit_Testing', value: 85 },
        { title: 'html', value: 85 },
        { title: 'css', value: 80 },
        { title: 'bootstrap', value: 85 },
        { title: 'javascipt', value: 85 },
        { title: 'jquery', value: 70 },
        { title: 'vue', value: 85 },
        { title: 'angular', value: 70 },
    ]

    public h2(str: any): string {
        return `<h2>${str}<hr class='mx-auto bg-secondary pt-1 rounded w-25 px-5' /></h2>`
    }

    mounted() {
        // console.log(this.$route.path)
    }
}
</script>

<style lang="scss" scoped>
section {
    // width: 100vw;
    // height: 100vh;
    #about {
        word-break: break-all;
    }
}
</style>
