<template>
    <div>
        <button
            class="btn btn-success mb-2"
            @click.prevent="savePost"
            :disabled="loading"
        >
            <i
                class="fas"
                :class="loading ? 'fa-pulse fa-spinner' : 'fa-save'"
            ></i>
            Update Post Body
        </button>
        <nuxt-link class="btn btn-warning mb-2" :to="`/blog/${post.slug}`">
            <i class="fas fa-link"></i>
            Go To Post
        </nuxt-link>
        <div v-if="content.length" class="editor">
            <editor
                ref="toastuiEditor"
                :initialValue="content"
                :options="editorOptions"
                height="500px"
                initialEditType="markdown"
                previewStyle="vertical"
                :plugins="plugins"
            />
            <viewer :initialValue="content" height="500px" :plugins="plugins" />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import Icon from '~/components/icon.vue'
import PostInterface from '~/interfaces/PostInterface'
import { DefaultPost } from './posts.vue'

import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

import { Viewer } from '@toast-ui/vue-editor'

@Component({
    // auth: false,
    head() {
        return {
            title:
                (this as UpdatePost).title ||
                '' + ' - ' + (this as UpdatePost).post.title,
        }
    },
    validate({ params }) {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug)
    },
    components: {
        Editor,
        Viewer,
    },
})
export default class UpdatePost extends Vue {
    @Ref('toastuiEditor') readonly editor!: Editor

    public loading: boolean = false
    public slug: string = this.$route.params.slug
    public post: PostInterface = DefaultPost
    public content: string = ''
    public editorOptions = {
        // hideModeSwitch: true,
        usageStatistics: false,
    }
    public plugins = []

    public async loadPost(): Promise<any> {
        this.$nuxt.$loading.start()

        const res = await this.$axios.$get('post/' + this.slug)

        this.$nuxt.$loading.finish()

        if (!res) {
            this.$nf.error()
            return null
        }

        this.post = res
        this.content = res.body
    }

    public async savePost() {
        this.loading = true
        this.$nuxt.$loading.start()

        const res = await this.$axios.$patch(`root/posts/${this.post.slug}`, {
            title: this.post.title,
            category_id: this.post.category_id,
            body: this.body,
        })

        this.loading = false
        this.$nuxt.$loading.finish()

        if (!res) {
            this.$nf.error()
            return
        }

        this.$nf.success()
    }

    get title(): string {
        return this.$i18n.t('admin.title.updatePost') as string
    }

    get body(): string {
        return this.editor.invoke('getHtml')
    }

    mounted() {
        this.$nextTick(() => this.loadPost())
    }
}
</script>
