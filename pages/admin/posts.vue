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
            :auth="true"
            @delete="remove"
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">
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

export const DefaultPost: PostInterface = {
    id: 0,
    user_id: 0,
    title: '',
    slug: '',
    body: '',
    img: '',
    created_at: '',
    updated_at: '',
}

@Component({
    // auth: false,
    components: { AllPosts, TagInput },
})
export default class Post extends Vue {
    @Ref() readonly list!: AllPosts

    public cats: CategoryInterface[] = []
    public mp: PostInterface = DefaultPost
    public form = new Form(['category_id', 'img', 'body', 'tags', 'title'])

    public async remove(id: number) {
        showLoader(`#del${id}`, 'fa-trash-alt', this)

        const res = this.$axios.$delete(`root/posts/${id}`)

        hideLoader(`#del${id}`, 'fa-trash-alt', this)

        if (!res) {
            this.$nf.error()
            return
        }

        this.list.removeItem(id)
    }

    public openModal(post: PostInterface = DefaultPost) {
        Object.assign(this.mp, post)

        if (post.id > 0) {
            this.form.populate({
                title: post.title,
                info: post.body,
                tags: post.tags,
                // img: project.img,
            })
            delete this.form.tags
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

    mounted() {
        this.$nextTick(() => this.loadCategories())
    }
}
</script>
<style lang="scss"></style>
