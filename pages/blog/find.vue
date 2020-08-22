<template>
    <all-posts :title="title" :path="path" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AllPosts from '~/components/all-posts.vue'

@Component({
    components: { AllPosts },
})
export default class SearchPost extends Vue {
    get path(): string {
        return `post/find?q=${this.$route.query.q}`
    }

    get title(): string {
        return (
            (this.$i18n.t('post_list.search') as string) +
            ` - ${this.$route.query.q} `
        )
    }
}
</script>
<style lang="scss"></style>
