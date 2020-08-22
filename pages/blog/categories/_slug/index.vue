<template>
    <all-posts :title="title" :path="path" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AllPosts from '~/components/all-posts.vue'

@Component({
    components: { AllPosts },
})
export default class CategoryPostList extends Vue {
    get path(): string {
        return `categories/${this.$route.params.slug}/posts`
    }

    get title(): string {
        return (
            (this.$i18n.t('post_list.categories') as string) +
            ` - ${this.$route.params.slug} `
        )
    }
}
</script>
<style lang="scss"></style>
