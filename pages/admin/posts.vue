<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <button
                    class="btn btn-warning text-uppercase"
                    @click.prevent="openModal"
                >
                    <i class="fas fa-plus"></i>
                    Create new Post
                </button>
            </div>
        </div>
        <AllPosts
            ref="list"
            :title="$t('admin.title.posts')"
            path="post"
            :auth="$auth.loggedIn"
            @delete="remove"
            @edit="openModal"
        />

        <!-- Modal -->
        <div
            class="modal fade"
            id="postModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="postModalLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-lg modal-dialog-scrollable"
                role="document"
            >
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" id="postModalLabel">
                            {{ mp.title || 'Create new Post' }}
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
                        <form class="form needs-validation">
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select
                                    class="custom-select"
                                    name="category"
                                    id="category"
                                    v-model="form.category_id"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'category_id'
                                        ),
                                    }"
                                    :disabled="mp.id"
                                    required
                                >
                                    <option selected>Select one</option>
                                    <option
                                        v-for="c in cats"
                                        :key="c.id + c.slug"
                                        v-text="c.title"
                                        :value="c.id"
                                    ></option>
                                </select>
                                <div
                                    class="invalid-feedback"
                                    :v-if="form.errors.has('category_id')"
                                    v-text="form.errors.first('category_id')"
                                ></div>
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    class="form-control"
                                    placeholder="post title"
                                    aria-describedby="titleHelpId"
                                    v-model="form.title"
                                    :class="{
                                        'is-invalid': form.errors.has('title'),
                                    }"
                                    @keypress.enter="savePost(mp)"
                                    required
                                />
                                <div
                                    class="invalid-feedback"
                                    :v-if="form.errors.has('title')"
                                    v-text="form.errors.first('title')"
                                ></div>
                            </div>
                            <div class="form-group">
                                <textarea
                                    class="form-control"
                                    name="body"
                                    v-model="form.body"
                                    placeholder="enter post body"
                                    id="body"
                                    rows="3"
                                    :class="{
                                        'is-invalid': form.errors.has('body'),
                                    }"
                                    required
                                ></textarea>
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('body')"
                                    v-text="form.errors.first('body')"
                                ></div>
                            </div>
                            <div class="form-group">
                                <TagInput
                                    path="root/tags"
                                    @tags="(newTags) => (tags = newTags)"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('tags')"
                                    v-text="form.errors.first('tags')"
                                ></div>
                            </div>
                            <ImgPrev
                                ref="imgPrev"
                                @img-arr="
                                    (files) =>
                                        this.form.populate({
                                            img: files[0],
                                        })
                                "
                            >
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('img')"
                                    v-text="form.errors.first('img')"
                                ></div>
                            </ImgPrev>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            @click="
                                form.reset()
                                imgPrev.reset()
                            "
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="savePost"
                            :disabled="form.processing"
                        >
                            <i
                                class="fas"
                                :class="
                                    form.processing
                                        ? 'fa-pulse fa-spinner'
                                        : 'fa-save'
                                "
                            ></i>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import AllPosts from '~/components/all-posts.vue'
import { showLoader, hideLoader } from '~/common/btn-loader'
import PostInterface from '~/interfaces/PostInterface'
// @ts-ignore
import Form from '../../node_modules/@imritesh/form/src'
import TagInput from '~/components/tag-input.vue'
import CategoryInterface from '~/interfaces/category-interface'
import ImgPrev from '~/components/img-prev.vue'
import TagInterface from '~/interfaces/tag-interface'

export const DefaultPost: PostInterface = {
    id: 0,
    user_id: 0,
    category_id: 0,
    title: '',
    slug: '',
    body: '',
    img: '',
    created_at: '',
    updated_at: '',
    tags: [],
}

@Component({
    // auth: false,
    components: { AllPosts, TagInput },
})
export default class Post extends Vue {
    @Ref() readonly list!: AllPosts
    @Ref() readonly imgPrev!: ImgPrev

    public tags: { text: string; slug: string }[] = []
    public cats: CategoryInterface[] = []
    public mp: PostInterface = DefaultPost
    public form = new Form(['category_id', 'img', 'body', 'tags', 'title'], {
        http: this.$axios,
    })

    public async remove(slug: string) {
        showLoader(`#del${slug}`, 'fa-trash-alt', this)

        const res = this.$axios.$delete(`root/posts/${slug}`)

        hideLoader(`#del${slug}`, 'fa-trash-alt', this)

        if (!res) {
            this.$nf.error()
            return
        }

        this.$nf.success()
        this.list.removeItem(slug)
    }

    public openModal(post: PostInterface = DefaultPost) {
        this.mp = post
        this.form.reset()

        if (!!post.id) {
            // @ts-ignore
            this.tags = post.tags
            this.form.populate({
                category_id: post.category_id,
                title: post.title,
                body: post.body,
                tags: post.tags,
                // img: post.img,
            })
            // delete this.form.tags
            // delete this.form.img
        }

        // @ts-ignore
        new Modal(document.querySelector(`#postModal`)).show()
    }

    public async loadCategories() {
        this.$nuxt.$loading.start()

        const res = await this.$axios.$get('categories')

        this.$nuxt.$loading.finish()

        if (!res) {
            this.$nf.error()
            return
        }

        this.cats = res
    }

    public closeModal() {
        Object.assign(this.mp, DefaultPost)
        this.form.reset()
        this.imgPrev.reset()
        // @ts-ignore
        new Modal(document.querySelector(`#postModal`)).hide()
    }

    public async savePost() {
        this.form.populate({
            tags: this.tags.map((x) => x.slug),
        })

        // do not upload tags if it was not changed
        if (
            this.mp.id &&
            this.form.tags.length === this.mp.tags.length &&
            this.form.tags
                .sort()
                .every(
                    (value: string, index: number) =>
                        value === this.mp.tags.sort()[index].slug
                )
        ) {
            delete this.form.tags
        }

        // do not update image if it was not changed
        if (!this.imgPrev.prevImages.length) {
            delete this.form.img
        }

        const method = this.mp.id > 0 ? 'patch' : 'post'
        let path = `${this.$axios.defaults.baseURL}root/posts`
        if (this.mp.id > 0) {
            path += `/${this.mp.slug}`
        }

        const res = await this.form[method](path).catch(() => null)

        if (!res) {
            this.$nf.error()
            return
        }

        this.$nf.success()
        this.list.addItem(res, !!this.mp.id)
        this.closeModal()
    }

    mounted() {
        this.$nextTick(() => this.loadCategories())
    }
}
</script>
<style lang="scss" scoped>
.bg-dark {
    background: rgba($color: var(--dark), $alpha: 0.8) !important;
}
</style>
<style lang="scss"></style>
