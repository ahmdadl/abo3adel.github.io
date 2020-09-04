<template>
    <div>
        <template v-if="loading">
            <div class="row">
                <div
                    class="col-sm-6 col-md-4 mb-3"
                    v-for="load in loadingArr"
                    :key="load * Math.random()"
                >
                    <content-loader
                        :width="240"
                        :height="300"
                        primaryColor="#dbdbdb"
                        secondaryColor="#6b6b6b"
                    >
                        <rect
                            x="9"
                            y="0"
                            rx="0"
                            ry="0"
                            width="232"
                            height="114"
                        />
                        <rect
                            x="9"
                            y="131"
                            rx="0"
                            ry="0"
                            width="212"
                            height="15"
                        />
                        <rect
                            x="9"
                            y="164"
                            rx="0"
                            ry="0"
                            width="110"
                            height="18"
                        />
                        <rect
                            x="168"
                            y="164"
                            rx="0"
                            ry="0"
                            width="49"
                            height="18"
                        />
                        <rect
                            x="15"
                            y="206"
                            rx="0"
                            ry="0"
                            width="63"
                            height="19"
                        />
                        <rect
                            x="90"
                            y="206"
                            rx="0"
                            ry="0"
                            width="63"
                            height="19"
                        />
                        <rect
                            x="165"
                            y="206"
                            rx="0"
                            ry="0"
                            width="63"
                            height="19"
                        />
                    </content-loader>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="alert alert-danger" v-if="!posts.length">
                {{ $t('post_list.no_posts') }}
            </div>
            <div>
                <transition-group name="posts" tag="div" class="row">
                    <div
                        class="col-sm-6 col-md-4 mb-3 post-card"
                        v-for="p in posts"
                        :key="p.id"
                    >
                        <card class="p-0">
                            <template v-slot:img>
                                <img
                                    class="card-img-top"
                                    v-lazy="'/img/posts/' + p.img"
                                    :alt="p.title"
                                />
                            </template>
                            <nuxt-link :to="localePath('/blog/' + p.slug)">
                                {{ p.title }}
                            </nuxt-link>
                            <p class="mt-1">
                                <span
                                    class="badge badge-info p-1 float-left"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    :title="$t('post_list.last_update')"
                                >
                                    <i class="fas fa-clock"></i>
                                    {{ p.updated }}
                                </span>
                                <nuxt-link
                                    :to="
                                        localePath(
                                            '/blog/' + p.slug + '/#comments'
                                        )
                                    "
                                    class="float-right badge badge-info p-1 text-light"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    :title="$t('post_list.comments_count')"
                                >
                                    <i class="fas fa-comment-alt"></i>
                                    {{ p.comments_count || 0 }}
                                </nuxt-link>
                            </p>
                            <p class="pt-4 text-uppercase" v-if="auth">
                                <button
                                    class="btn btn-info m-1 text-uppercase"
                                    @click.prevent="$emit('edit', p)"
                                >
                                    <i class="fas fa-edit"></i>
                                    edit
                                </button>
                                <button
                                    class="btn btn-danger m-1 text-uppercase"
                                    @click.prevent="$emit('delete', p.slug)"
                                >
                                    <i
                                        :id="`del${p.slug}`"
                                        class="fas fa-trash-alt"
                                    ></i>
                                    delete
                                </button>
                                <nuxt-link
                                    :to="`/admin/${p.slug}`"
                                    class="btn btn-primary m-1 text-uppercase"
                                >
                                    <i class="fas fa-upload"></i>
                                    update
                                </nuxt-link>
                            </p>
                            <template v-slot:footer>
                                <div class="text-center">
                                    <span
                                        class="badge badge-primary m-1 p-1"
                                        v-for="tag in p.tags"
                                        :key="tag.id * p.id + Math.random()"
                                    >
                                        {{ tag.title }}
                                    </span>
                                </div>
                            </template>
                        </card>
                    </div>
                </transition-group>
            </div>
        </template>
        <div v-if="!limit">
            <Pagination
                :data="pageResponse"
                @pagination-change-page="loadPosts"
                :limit="2"
                align="center"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import Card from '~/components/card.vue'
import PostInterface from '~/interfaces/PostInterface'
import CategoryInterface from '~/interfaces/category-interface'
import Paginate from '~/components/paginate.vue'
// @ts-ignore
import Pagination from 'laravel-vue-pagination'
import { getPath, pushPageToHistroy } from '~/common/pagination'

@Component({
    scrollToTop: true,
    head() {
        return {
            title:
                (this as AllPostsList).title +
                    ` (${this.$route.query.page || 1})` || '',
        }
    },
    components: { ContentLoader, Card, Paginate, Pagination },
})
export default class AllPostsList extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, required: true }) readonly path!: string
    @Prop({ type: Number, required: false }) readonly limit!: number
    @Prop({ type: Boolean, default: false }) readonly auth!: boolean

    public loading: boolean = true
    public posts: PostInterface[] = []
    public loadingArr: number[] = Array(15).fill(Math.random())
    public pageResponse = {}
    public pagePath: string = this.path

    public loadPosts(
        page: number = parseInt(this.$route.query.page as string) || 1
    ): void {
        // alert(`page => ${page}`)
        let path = getPath(page, this.pagePath)
        this.loading = true

        this.$axios.get(path).then((res) => {
            if (!res || !res.data || !res.data.posts) {
                this.loading = false
                this.$nf.error()
                return
            }

            let data = res.data.posts.data
            if (this.limit) {
                data = data.splice(data.length - this.limit)
            }

            this.posts = data
            this.loading = false

            if (this.limit) return

            this.pageResponse = res.data.posts

            pushPageToHistroy(this, page, path)
            window.scrollTo(0, 0)
        })
    }

    /**
     * remove an item from list
     */
    public removeItem(id: string): void {
        this.posts = [...this.posts.filter((x) => x.slug !== id)]
    }

    public addItem(item: PostInterface, exists: boolean = false): void {
        if (exists) {
            this.posts = this.posts.map((x) => {
                if (x.id === item.id) {
                    x = item
                }
                return x
            })
        } else {
            this.posts.unshift(item)
        }
    }

    @Watch('$route.query.page')
    onRouteQueryChanged(val: number) {
        this.loadPosts(val)
    }

    @Watch('$route.query.q')
    onRouteSearchChanged(val: string) {
        this.pagePath = this.pagePath.replace(/q=[a-zA-Z0-9]+/gi, `q=${val}`)
        this.loadPosts(1)
    }

    mounted() {
        this.loadPosts()
    }
}
</script>
<style lang="scss" scoped>
.post-card {
    transition: all 1s;
    .card-img-top {
        width: 100%;
        height: 30vh;
    }
}
.posts-enter,
.posts-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.posts-leave-active {
    position: absolute;
}
</style>
<style lang="scss">
@import '~assets/css/media';

.post-card .card-img-top {
    @include media('>sm') {
        height: 25vh !important;
    }
    @include media('>md') {
        height: 20vh !important;
    }
    @include media('>lg') {
        height: 25vh;
    }
}
</style>
