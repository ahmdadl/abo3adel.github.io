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
                        <router-link :to="'/blog/' + p.slug">
                            {{ p.title }}
                        </router-link>
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
                            <router-link
                                :to="'/blog/' + p.slug + '/#comments'"
                                class="float-right badge badge-info p-1 text-light"
                                data-toggle="tooltip"
                                data-placement="top"
                                :title="$t('post_list.comment_count')"
                            >
                                <i class="fas fa-comment-alt"></i>
                                {{ p.comments_count }}
                            </router-link>
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
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import Card from '~/components/card.vue'
import PostInterface from '~/interfaces/PostInterface'
import CategoryInterface from '~/interfaces/category-interface'

@Component({
    head() {
        return {
            title: (this as PostList).title || '',
        }
    },
    components: { ContentLoader, Card },
})
export default class PostList extends Vue {
    public loading: boolean = true
    public posts: PostInterface[] = []
    public loadingArr: number[] = Array(15).fill(Math.random())

    public loadPosts(): void {
        this.$axios.get('post').then((res) => {
            if (!res || !res.data || !res.data.posts) {
                this.loading = false
                this.$nf.error()
                return
            }

            this.posts = res.data.posts.data
            setTimeout(() => (this.loading = false), 900)
        })
    }

    get title(): string {
        return this.$i18n.t('post_list.title') as string
    }

    mounted() {
        this.loadPosts()
    }
}
</script>
<style lang="scss"></style>
