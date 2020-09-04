<template>
    <div :class="dir" class="home">
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
                class="about bg-dark text-light text-center py-4 col-12"
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
                                <i :class="'fas fa-2x fa-' + p.icon"></i>
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
                class="skills bg-transparent text-light text-center py-4 col-12"
            >
                <span v-html="h2($t('home.title.skills'))"></span>
                <div class="row text-center">
                    <div class="col-12 col-md-6 mt-3 mb-5">
                        <img
                            v-lazy="'/meLarge.png'"
                            class="img w-75 p-1 border border-secondary rounded"
                        />
                        <p class="text-secondary mt-2 text-capitalize">
                            {{ $t('home.skill_info') }}
                        </p>
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
                class="skills bg-dark text-light text-center py-4 col-12"
            >
                <span v-html="h2($t('home.title.project'))"></span>
                <ProjectList />
            </section>

            <!-- blog posts -->
            <section id="blog" class="skills text-center col-12 py-4">
                <span v-html="h2($t('home.title.blog'))"></span>
                <all-posts
                    :title="$t('home.title.index')"
                    path="post"
                    :limit="6"
                ></all-posts>
            </section>

            <!-- contact -->
            <section id="contact" class="skills col-12 py-4 bg-dark">
                <span
                    class="text-center"
                    v-html="h2($t('home.title.contact'))"
                ></span>
                <div class="row mt-3" dir="ltr">
                    <div class="col-sm-12 col-md-4">
                        <div
                            class="card card-body bg-transparent border-secondary m-1"
                        >
                            <p class="pb-2 border-bottom border-light mx-auto">
                                <i class="fas fa-certificate"></i>
                                {{ $t('home.contact.edu') }}
                            </p>
                            <ul class="nav nav-pills nav-fill">
                                <li class="nav-item text-info">
                                    Bachelor Degree
                                </li>
                                <li class="nav-item text-info">
                                    Very Good
                                </li>
                                <li class="nav-item text-info">
                                    2016 – 2020
                                </li>
                            </ul>
                            <strong class="text-left">
                                Dairy Science and Technology, Faculty of
                                Agriculture,<br />Al-Azhar University
                            </strong>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div
                            class="card card-body bg-transparent border-secondary m-1"
                        >
                            <p class="pb-2 border-bottom border-light mx-auto">
                                <i class="fas fa-user-tie"></i>
                                {{ $t('home.contact.personal') }}
                            </p>
                            <ul class="list-group list-group-flush" dir="ltr">
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="tel:201143647417"
                                        class="text-light"
                                    >
                                        <i class="fas fa-phone-alt"></i>
                                        +201143647417
                                    </a>
                                </li>
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="mailto:abo3adel35@gmail.com"
                                        class="text-light"
                                    >
                                        <i class="fas fa-envelope"></i>
                                        abo3adel35@gmail.com
                                    </a>
                                </li>
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="http://ninjacoder.rf.gd/"
                                        class="text-light"
                                    >
                                        <i class="fas fa-link"></i>
                                        ninjacoder.rf.gd/
                                    </a>
                                </li>
                                <li class="list-group-item bg-transparent">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Abu Hammad, Sharkia, Egypt
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div
                            class="card card-body bg-transparent border-secondary m-1"
                        >
                            <p class="pb-2 border-bottom border-light mx-auto">
                                <i class="fas fa-address-card"></i>
                                {{ $t('home.contact.social') }}
                            </p>
                            <ul class="list-group list-group-flush" dir="ltr">
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="https://github.com/abo3adel"
                                        class="text-light"
                                        target="_blank"
                                    >
                                        <i
                                            class="fab fa-github-alt text-warning"
                                        ></i>
                                        GitHub
                                    </a>
                                </li>
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="https://wa.me/201143647417"
                                        class="text-light"
                                        target="_blank"
                                    >
                                        <i
                                            class="fab fa-whatsapp text-success"
                                        ></i>
                                        WhatsApp
                                    </a>
                                </li>
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="https://www.linkedin.com/in/ahmed-adel-30a932119/"
                                        class="text-light"
                                        target="_blank"
                                    >
                                        <i
                                            class="fab fa-linkedin text-info"
                                        ></i>
                                        LinkedIn
                                    </a>
                                </li>
                                <li class="list-group-item bg-transparent">
                                    <a
                                        href="https://fb.com/a7md200"
                                        class="text-light"
                                        target="_blank"
                                    >
                                        <i
                                            class="fab fa-facebook-square text-info"
                                        ></i>
                                        FaceBook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- centered menu -->
        <div class="menu position-fixed bg-dark">
            <ul class="list-group list-group-flush">
                <li
                    class="list-group-item"
                    v-for="(id, inx) in menuArr"
                    :key="id + inx"
                    v-scroll-to="{
                        el: `#${id}`,
                        offset: -50,
                        onDone,
                    }"
                    :class="{ active: id === activeId }"
                >
                    <span class="">
                        &#9679;
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Ref } from 'vue-property-decorator'
import AnimatedDots from '~/components/animatedDots.vue'
import AnimateText from '~/components/animate-text.vue'
import ProgressSkill from '~/components/progress.vue'
import ProjectInterface from '~/interfaces/project-interface'
import Card from '~/components/card.vue'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import AllPosts from '~/components/all-posts.vue'
import ProjectList from '~/components/project-list.vue'

@Component({
    components: {
        AnimatedDots,
        AnimateText,
        ProgressSkill,
        Card,
        ContentLoader,
        AllPosts,
        ProjectList,
    },
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
    public menuArr: string[] = [
        'canvasHeader',
        'about',
        'skills',
        'projects',
        'blog',
        'contact',
    ]
    public dir: string = document.documentElement.dir
    public activeId: string = 'top'

    public h2(str: any, tag: string = 'h2'): string {
        return `<${tag}>${str}<hr class='mx-auto bg-secondary pt-1 rounded w-25 px-5' /></${tag}>`
    }

    public removeClass(id: string, cls: string = 'd-none') {
        const el = document.querySelector(`#${id}`) as HTMLDivElement
        el?.classList.remove(cls)
    }

    public onDone(el: HTMLDivElement) {
        this.activeId = el.id
    }
}
</script>

<style lang="scss" scoped>
// width: 100vw;
// height: 100vh;
#about {
    word-break: break-all;
}
.bg-dark {
    background: rgba($color: #0c1423, $alpha: 0.6) !important;
}
// .container-fluid section{
//     z-index: 2;
// }
</style>
<style lang="scss">
.project-card {
    .card-img-overlay {
        background: rgba($color: #0c1423, $alpha: 0.6);
    }
}
.card > .list-group {
    border: none;
}
.menu {
    top: 50%;
    // left: ;
    transform: translate(-50%, -50%);
    border-radius: 1.25rem;
}
.home {
    .list-group {
        line-height: 0.25rem;
    }
    .list-group-item {
        padding: 0.7rem 0.5rem;
        transition: all ease 0.5s;
        font-size: 1.25rem;
        &:first-of-type {
            border-radius: 0.5rem 0.5rem 0 0;
        }
        &:last-of-type {
            border-radius: 0 0 0.5rem 0.5rem;
            padding-bottom: 0.75rem;
        }
        &:hover {
            color: var(--primary);
            cursor: pointer;
        }
        &.active {
            background-color: var(--primary);
            &:hover {
                color: var(--light);
            }
        }
    }
}
.ltr {
    .menu {
        left: 1.25rem;
    }
}
.rtl {
    .menu {
        // right: 1.25rem;
        left: 100%;
    }
}
</style>
