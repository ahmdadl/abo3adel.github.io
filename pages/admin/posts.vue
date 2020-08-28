<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <button class="btn btn-warning text-uppercase">
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
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import AllPosts from '~/components/all-posts.vue'
import { showLoader, hideLoader } from '~/common/btn-loader'

@Component({
    // auth: false,
    components: { AllPosts },
})
export default class Post extends Vue {
    @Ref() readonly list!: AllPosts

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
}
</script>
<style lang="scss"></style>
