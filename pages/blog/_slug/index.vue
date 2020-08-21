<template>
    <div dir="ltr">
        <template v-if="loading">
            <content-loader
                :width="825"
                :height="880"
                primaryColor="#dbdbdb"
                secondaryColor="#6b6b6b"
            >
                <rect x="0" y="-6" rx="0" ry="0" width="752" height="558" />
                <rect x="22" y="587" rx="0" ry="0" width="196" height="36" />
                <rect x="22" y="658" rx="0" ry="0" width="705" height="40" />
                <rect x="10" y="748" rx="0" ry="0" width="744" height="12" />
                <rect x="10" y="763" rx="0" ry="0" width="744" height="12" />
                <rect x="10" y="779" rx="0" ry="0" width="744" height="12" />
                <rect x="10" y="797" rx="0" ry="0" width="744" height="12" />
                <rect x="10" y="815" rx="0" ry="0" width="744" height="12" />
            </content-loader>
        </template>
        <div class="pb-1" v-if="!loading">
            <div class="breadcrump-head position-absolute" style="top: 0;">
                <ol class="breadcrumb rounded-0 bg-dark text-light">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/blog">
                            {{ $t('post_list.home') }}
                        </nuxt-link>
                    </li>
                    <li class="breadcrumb-item active text-light text-break">
                        {{ post.title }}
                    </li>
                </ol>
            </div>
            <img
                src="~assets/1.jpg"
                class="img img-responsive w-100"
            />
        </div>

        <!-- post meta -->
        <ul v-if="!loading" class="list-group list-group-horizontal flex-row py-3">
            <li class="list-group-item border-0 bg-dark text-light">
                <div class="py-2">
                    <div
                        class=""
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="$t('post_list.last_update')"
                    >
                        <i class="fas fa-clock"></i>
                        {{ post.updated }}
                    </div>
                </div>
            </li>
        </ul>

        <h2 class="mt-4 text-primary pb-5">
            {{ post.title }}
        </h2>

        <!-- TODO handle post delete/edit -->

        <!-- post body -->
        <p v-html="post.body"></p>

        <!-- post comments -->
        <comments :post-slug="post.slug" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import Card from '~/components/card.vue'
import PostInterface from '~/interfaces/PostInterface'
import Comments from '~/components/comments.vue'

const PostDefault: PostInterface = {
    id: 0,
    user_id: 0,
    title: '',
    body: '',
    created_at: '',
    updated_at: '',
    slug: '',
    img: '',
}

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Page).title || '',
        }
    },
    validate({ params }) {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug)
    },
    components: {
        ContentLoader,
        Comments,
    },
})
export default class Page extends Vue {
    public post: PostInterface = PostDefault
    public slug: string = this.$route.params.slug
    public loading: boolean = true

    public async loadPost(): Promise<any> {
        const res = await this.$axios.get('post/' + this.slug)

        if (!res || !res.data) {
            this.$nf.error()
            this.loading = false
            return null
        }

        this.post = res.data
        this.loading = false
    }

    get title(): string {
        return (
            (this.$i18n.t('post_list.postKey') as string) +
            ' - ' +
            this.post.title
        )
    }

    mounted() {
        setTimeout(() => this.loadPost(), 4500)
    }
}
</script>
<style lang="scss"></style>
