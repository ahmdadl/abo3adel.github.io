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
            <div class="row">
                <div
                    class="col-sm-6 col-md-4 mb-3"
                    v-for="p in posts"
                    :key="p.id"
                >
                    <card class="p-0">
                        <template v-slot:img>
                            <img
                                class="card-img-top"
                                src="~assets/1.jpg"
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
                                    localePath('/blog/' + p.slug + '/#comments')
                                "
                                class="float-right badge badge-info p-1 text-light"
                                data-toggle="tooltip"
                                data-placement="top"
                                :title="$t('post_list.comment_count')"
                            >
                                <i class="fas fa-comment-alt"></i>
                                {{ p.comments_count }}
                            </nuxt-link>
                        </p>
                        <template v-slot:footer>
                            <div class="text-center">
                                <span
                                    class="badge badge-primary mx-1 p-1"
                                    v-for="tag in p.tags"
                                    :key="tag.id * p.id + Math.random()"
                                >
                                    {{ tag.title }}
                                </span>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </template>
        <div v-if="!limit">
            <Paginate
                :title="title"
                :path="pagePath"
                :res="pageResponse"
                @load="loadPosts($event)"
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

@Component({
    scrollToTop: true,
    // head() {
    //     return {
    //         title:
    //             (this as AllPostsList).title +
    //                 ` (${(this as AllPostsList).page.current})` || '',
    //     }
    // },
    components: { ContentLoader, Card, Paginate },
})
export default class AllPostsList extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, required: true }) readonly path!: string
    @Prop({ type: Number, required: false }) readonly limit!: number

    public loading: boolean = true
    public posts: PostInterface[] = []
    public loadingArr: number[] = Array(15).fill(Math.random())
    // public pagePath: string = this.pathParams()
    public pageResponse = {}
    // public page = {
    //     first: 1,
    //     current: parseInt(this.$route.query.page as string) || 1,
    //     last: 1,
    //     path: this.path,
    // }
    // public pages: number[] = []

    public loadPosts(
        path: string = this.pagePath
    ): void {
        // alert(`page => ${page}`)
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

            // set pagination object
            const d = res.data.posts
            // const q = this.$route.query.q ? 'q=' + this.$route.query.q : ''
            console.log(d)
            this.pageResponse = d
            // this.page = {
            //     first: d.from,
            //     current: d.current_page,
            //     last: d.last_page,
            //     path: d.path + '?' + q,
            // }
            // this.pages = Array(this.page.last)
            //     .fill(1)
            //     .map((x, inx) => x + inx)
            // this.pagePath = d.path + '?' + q

            window.scrollTo(0, 0)
        })
    }

    get pagePath(): string {
        const addon = this.path.indexOf('?') > -1 ? '&' : '?'
        const page = parseInt(this.$route.query.page as string) || 1

        return this.path.indexOf('page=') > -1
            ? this.path
            : `${this.path}${addon}page=${page}`
    }

    mounted() {
        this.loadPosts()
    }
}
</script>
<style lang="scss"></style>
