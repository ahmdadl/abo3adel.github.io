<template>
    <div>
        <h2>
            {{ slug }}
        </h2>
        <p v-html="post.body"></p>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'
import Card from '~/components/card.vue'
import PostInterface from '~/interfaces/PostInterface'

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
    validate({params}) {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug)
    }
})
export default class Page extends Vue {
    public post: PostInterface = PostDefault
    public slug: string = this.$route.params.slug

    public async loadPost(): Promise<any> {
        const res = await this.$axios.get('post/' + this.slug)

        if (!res || !res.data) {
            this.$nf.error()
            return null
        }

        this.post = res.data
    }

    get title(): string {
        return (this.$i18n.t('post_list.postKey') as string) + this.post.title
    }

    mounted() {
        this.loadPost();

    }
}
</script>
<style lang="scss"></style>
