<template>
    <div class="col-md-3">
        <!-- search bar -->
        <card
            :title="$t('sidebar.search_title')"
            header-cls="bg-primary text-light text-capitalize"
            class="card"
        >
            <div class="form">
                <div class="form-group">
                    <input
                        type="text"
                        id="search-inp"
                        class="form-control"
                        :placeholder="$t('sidebar.search_placeholder')"
                    />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">
                        {{ $t('sidebar.search_btn') }}
                    </button>
                </div>
            </div>
        </card>

        <!-- change layout -->
        <card
            :title="$t('sidebar.pop_title')"
            header-cls="bg-primary text-light text-capitalize"
        >
            <div class="row">
                <div
                    class="col-12"
                    v-for="lod in loadingArr"
                    :key="lod * Math.random()"
                >
                    <content-loader
                        :width="240"
                        :height="60"
                        primaryColor="#dbdbdb"
                        secondaryColor="#6b6b6b"
                    >
                        <rect
                            x="2"
                            y="10"
                            rx="6"
                            ry="6"
                            width="51"
                            height="42"
                        ></rect>
                        <rect
                            x="65"
                            y="19"
                            rx="0"
                            ry="0"
                            width="102"
                            height="11"
                        ></rect>
                        <rect
                            x="65"
                            y="40"
                            rx="0"
                            ry="0"
                            width="46"
                            height="12"
                        ></rect>
                        <rect
                            x="127"
                            y="40"
                            rx="0"
                            ry="0"
                            width="46"
                            height="12"
                        ></rect>
                    </content-loader>
                </div>
            </div>
            <div class="row">
                <div
                    class="media col-12 my-2"
                    v-for="p in popPosts"
                    :key="p.id"
                >
                    <img
                        src="~/assets/1.jpg"
                        class="mr-3 rounded"
                        :alt="p.id"
                        width="70"
                        height="70"
                    />
                    <div class="media-body">
                        <h5 class="mt-0">
                            <router-link :to="'/blog/' + p.slug">
                                {{ p.title }}
                            </router-link>
                        </h5>
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
                    </div>
                </div>
            </div>
        </card>

        <!-- share this -->
        <card
            :title="$t('sidebar.share')"
            header-cls="bg-primary text-light text-capitalize"
        >
            <a
                :href="'http://www.facebook.com/sharer.php?u=' + url.self"
                target="_blank"
                class="btn btn-outline-primary m-2"
            >
                <i class="fab fa-facebook-f pr-3"></i>
                {{ $t('sidebar.fb') }}
            </a>
            <a
                :href="
                    'https://twitter.com/share?url=' +
                    url.self +
                    '&amp;hashtags=' +
                    url.keys
                "
                class="btn btn-outline-info m-2 noColor"
                target="_blank"
            >
                <i class="fab fa-twitter pr-3"></i>
                {{ $t('sidebar.twitter') }}
            </a>
            <a
                :href="
                    'https://www.linkedin.com/shareArticle?mini=true&url=' +
                    url.self
                "
                class="btn btn-outline-primary m-2"
                target="_blank"
            >
                <i class="fab fa-linkedin-in pr-3"></i>
                {{ $t('sidebar.linked') }}
            </a>
            <a
                :href="'mailto:?Subject=' + url.self + '&amp;'"
                class="btn btn-outline-secondary m-2"
            >
                <i class="fas fa-mail-bulk pr-3"></i>
                {{ $t('sidebar.mail_to') }}
            </a>
        </card>

        <!-- categories section -->
        <card
            :title="$t('sidebar.cat_title')"
            header-cls="bg-primary text-light text-capitalize text-center"
        >
            <div class="text-center" v-if="loadCats">
                <span>
                    <i
                        class="fa fa-spinner fa-pulse fa-3x fa-fw align-content-center"
                    ></i>
                </span>
            </div>
            <router-link
                v-for="c in cats"
                :key="c.slug"
                :to="'/blog/categories/' + c.slug"
                class="btn btn-primary m-1"
            >
                {{ c.title }}
                <span class="badge badge-light">
                    {{ c.posts_count }}
                </span>
            </router-link>
        </card>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import PostInterface from '~/interfaces/PostInterface'
import CategoryInterface from '~/interfaces/category-interface'
import Card from '~/components/card.vue'

@Component({
    components: { ContentLoader, Card },
})
export default class Sidebar extends Vue {
    public popPosts: PostInterface[] = []
    public cats: CategoryInterface[] = []
    public loadingArr: number[] = Array(4).fill(Math.random())
    public url = {
        self: location.href,
        keys: 'programming,php,vueJs,web_development,laravel',
    }
    public loadCats: boolean = true

    public loadPopPosts(): void {
        this.$axios
            .get('post/popular')
            .then((res) => {
                if (!res || !res.data) {
                    this.$nf.error()
                    return
                }

                setTimeout((_) => {
                    this.popPosts = res.data.posts
                    this.loadingArr.splice(0)
                }, 900)
            })
            .finally(() => this.loadCategoriesList())
    }

    public loadCategoriesList() {
        this.$axios.get('categories').then((res) => {
            if (!res || !res.data) {
                this.loadCats = false
                this.$nf.error()
                return
            }

            this.cats = res.data.cats
            this.loadCats = false
        })
    }

    mounted() {
        this.loadPopPosts()
    }
}
</script>
<style lang="scss"></style>
