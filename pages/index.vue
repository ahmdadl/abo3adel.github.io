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
                class="about bg-dark text-light text-center pt-4 col-12"
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
                class="skills bg-transparent text-light text-center pt-4 col-12"
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
                class="skills bg-dark text-light text-center pt-4 col-12"
            >
                <span v-html="h2($t('home.title.project'))"></span>
                <ul class="nav nav-pills">
                    <li
                        class="nav-item"
                        v-for="type in projectsTypes"
                        :key="type.txt"
                    >
                        <a
                            class="nav-link"
                            href="#"
                            :class="{ active: activeType === type.val }"
                            @click.stop.prevent="filterProjects(type.val)"
                        >
                            {{ type.txt }}
                        </a>
                    </li>
                </ul>
                <div class="row mt-3">
                    <div
                        class="col-12 col-sm-6 col-md-4 col-xl-4 mb-3"
                        v-for="inp in projectsLoad"
                        :key="inp * Math.random()"
                    >
                        <content-loader
                            class="card card-body bg-transparent border-light p-0 m-0"
                            :width="240"
                            :height="130"
                            primaryColor="#dbdbdb"
                            secondaryColor="#6b6b6b"
                        >
                            <rect
                                x="9"
                                y="25"
                                rx="4"
                                ry="4"
                                width="225"
                                height="15"
                            />
                            <rect
                                x="9"
                                y="65"
                                rx="4"
                                ry="4"
                                width="90"
                                height="18"
                            />
                            <rect
                                x="115"
                                y="65"
                                rx="4"
                                ry="4"
                                width="120"
                                height="18"
                            />
                            <rect
                                x="15"
                                y="105"
                                rx="4"
                                ry="4"
                                width="63"
                                height="19"
                            />
                            <rect
                                x="90"
                                y="105"
                                rx="4"
                                ry="4"
                                width="63"
                                height="19"
                            />
                            <rect
                                x="165"
                                y="105"
                                rx="4"
                                ry="4"
                                width="63"
                                height="19"
                            />
                        </content-loader>
                    </div>
                    <!-- TODO animate projects array -->
                    <div
                        class="col-12 col-sm-6 col-md-4 mb-3 project-card"
                        v-for="project in projects"
                        :key="project.id + project.title"
                    >
                        <card :overlay="true" cls="text-left">
                            <template slot="img">
                                <span
                                    class="projectType badge badge-danger text-uppercase position-absolute"
                                    style="top: 0; left: 0;"
                                >
                                    {{ project.type }}
                                </span>
                                <img
                                    :src="'/img/' + project.img[0]"
                                    class="card-img"
                                />
                            </template>
                            <h5 class="card-title">
                                <a
                                    :href="project.link"
                                    target="_blank"
                                    class="text-light"
                                >
                                    {{ project.title }}
                                </a>
                            </h5>
                            <p class="card-text">
                                <strong class="text-capitalize"
                                    >{{ $t('home.project.client') }}:</strong
                                >
                                <span class="text-capitalize">
                                    {{ project.client }}
                                </span>
                            </p>
                            <p class="card-text text-center">
                                <a
                                    :href="project.link"
                                    class="btn btn-primary btn-sm mb-2"
                                    target="_blank"
                                >
                                    <i class="fas fa-link"></i>
                                    {{ $t('home.project.visit') }}
                                </a>
                                <button
                                    class="btn btn-info btn-sm mb-2"
                                    @click.prevent="openModal(project.id)"
                                >
                                    <span
                                        :id="'spinnerView' + project.id"
                                        class="spinner-border spinner-border-sm d-none"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <i class="fas fa-info"></i>
                                    {{ $t('home.project.more_info') }}
                                </button>
                            </p>

                            <template slot="footer">
                                <div class="text-center">
                                    <span
                                        class="badge badge-primary p-1 mx-1"
                                        v-for="t in project.tags"
                                        :key="
                                            t.id + project.title + Math.random()
                                        "
                                    >
                                        {{ t.title }}
                                    </span>
                                </div>
                            </template>
                        </card>
                    </div>
                </div>
            </section>

            <!-- blog posts -->
            <section id="blog" class="skills text-center col-12 pt-4">
                <span v-html="h2($t('home.title.blog'))"></span>
                <all-posts
                    :title="$t('home.title.index')"
                    path="post"
                    :limit="6"
                ></all-posts>
            </section>

            <!-- contact -->
            <section id="contact" class="skills col-12 pt-4 bg-dark">
                <span
                    class="text-center"
                    v-html="h2($t('home.title.contact'))"
                ></span>
                <div class="row mt-3">
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
                            <ul class="list-group list-group-flush">
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
                                    Abu Hammad,<br />
                                    Sharkia, Egypt
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
                            <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item bg-transparent border-bottom border-secondary"
                                >
                                    <a
                                        href="https://github.com/abo3adel"
                                        class="text-light"
                                        target="_blank"
                                    >
                                        <i class="fab fa-github-alt text-warning"></i>
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
                                <li
                                    class="list-group-item bg-transparent"
                                >
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

        <!-- Project Modal -->
        <div
            class="modal fade"
            id="modalProject"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalProjectLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header bg-primary">
                        <h5 class="modal-title" id="modalProjectLabel">
                            {{ mp.title }}
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- product image carsoul -->
                        <div
                            id="project-carousel"
                            class="carousel slide"
                            data-ride="carousel"
                        >
                            <div class="carousel-inner">
                                <div
                                    ref="slide"
                                    class="carousel-item"
                                    v-for="(i, index) in mp.img"
                                    :key="i + Math.random()"
                                    :class="{ active: index === 0 }"
                                    data-interval="5000"
                                >
                                    <img
                                        :src="'/img/' + i"
                                        class="d-block w-100"
                                        :alt="mp.title"
                                    />
                                </div>
                            </div>
                            <a
                                class="carousel-control-prev"
                                href="#project-carousel"
                                role="button"
                                data-slide="prev"
                                @click.prevent="prev"
                            >
                                <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a
                                class="carousel-control-next"
                                href="#project-carousel"
                                role="button"
                                data-slide="next"
                                @click.prevent="next"
                            >
                                <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        {{ mp.info }}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                        >
                            {{ $t('home.modal.close') }}
                        </button>
                    </div>
                </div>
            </div>
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

const defaultProject: ProjectInterface = {
    id: 0,
    title: '',
    client: '',
    img: [],
    link: '',
    info: '',
    updated_at: '',
    type: '',
    tags: [],
}

@Component({
    components: {
        AnimatedDots,
        AnimateText,
        ProgressSkill,
        Card,
        ContentLoader,
        AllPosts,
    },
})
export default class Home extends Vue {
    @Ref('slide') readonly slides!: HTMLDivElement[]

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
    public projects: ProjectInterface[] = []
    public allProjects: ProjectInterface[] = []
    public projectsLoad: number[] = Array(5).fill(3)
    public mp: ProjectInterface = defaultProject
    public carousel = {
        current: 1,
        amount: this.mp.img.length,
        interval: {},
    }
    public activeType: string = 'all'
    public projectsTypes: {
        txt: any
        val: string
    }[] = [
        {
            txt: this.$i18n.t('home.pills.all'),
            val: 'all',
        },
        {
            txt: this.$i18n.t('home.pills.laravel'),
            val: 'laravel',
        },
        {
            txt: this.$i18n.t('home.pills.spa'),
            val: 'spa',
        },
        {
            txt: this.$i18n.t('home.pills.mobile'),
            val: 'mobile',
        },
    ]

    public h2(str: any, tag: string = 'h2'): string {
        return `<${tag}>${str}<hr class='mx-auto bg-secondary pt-1 rounded w-25 px-5' /></${tag}>`
    }

    public async loadProjects() {
        const res = await this.$axios.get('projects')

        if (!res || !res.data) {
            this.projectsLoad.splice(0)
            this.$nf.error()
            return
        }

        this.allProjects = res.data
        this.projects = [...res.data]
        this.projectsLoad.splice(0)
    }

    /**
     * open project modal
     */
    public openModal(id: number = 0) {
        const project = this.projects.filter((x) => x.id === id)
        Object.assign(this.mp, project[0])

        this.carousel.amount = project[0].img.length

        // @ts-ignore
        new Modal(document.querySelector(`#modalProject`)).show()

        this.carousel.current = 1
        this.carousel.interval = setInterval(() => {
            this.next()
        }, 5000)
    }

    /**
     * carousel move slide
     */
    public move(inx: number) {
        this.slides.forEach((x, index) => {
            x.classList.remove('active')

            if (index === inx) {
                x.classList.add('active')
            }
        })
    }

    /**
     * show next carousel slide
     */
    public next() {
        if (this.carousel.current >= this.carousel.amount) {
            this.carousel.current = 0
        }

        this.move(this.carousel.current++)
    }

    /**
     * show previous carousel slide
     */
    public prev() {
        if (this.carousel.current <= 1) {
            this.carousel.current = this.carousel.amount + 1
        }
        this.move(this.carousel.current--)
    }

    /**
     * filter projects based on selected tap
     *
     * 0 => all
     * 1 => laravel
     * 2 => spa
     * 3 => mobile
     */
    public filterProjects(type: string = '') {
        if (!this.allProjects.length) return

        this.projects.splice(0)
        this.projectsLoad = Array(5).fill(3)

        this.activeType = type
        if (type === 'all') {
            this.projects = [...this.allProjects]
            this.projectsLoad.splice(0)
            return
        }

        const filterd = this.allProjects.filter((x) => x.type === type)
        this.projects = [...filterd]
        this.projectsLoad.splice(0)
    }

    public removeClass(id: string, cls: string = 'd-none') {
        const el = document.querySelector(`#${id}`) as HTMLDivElement
        el?.classList.remove(cls)
    }

    mounted() {
        this.loadProjects()
        ;(document.getElementById(
            'modalProject'
        ) as HTMLDivElement).addEventListener('hidden.bs.modal', () => {
            // @ts-ignore
            clearInterval(this.carousel.interval)
        })
    }

    destroyed() {
        // @ts-ignore
        clearInterval(this.carousel.interval)
        ;(document.getElementById(
            'modalProject'
        ) as HTMLDivElement).removeEventListener('hidden.bs.modal', () => {})
    }
}
</script>

<style lang="scss" scoped>
// width: 100vw;
// height: 100vh;
#about {
    word-break: break-all;
}
</style>
<style lang="scss">
.project-card {
    .card-img-overlay {
        background: rgba($color: #000000, $alpha: 0.6);
    }
    .projectType {
        border-end-end-radius: 0;
    }
}
.card > .list-group {
    border: none;
}
</style>
