<template>
    <all-posts :title="title" path="post" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AllPosts from '~/components/all-posts.vue'

@Component({
    components: { AllPosts },
})
export default class PostList extends Vue {
    get title(): string {
        return this.$i18n.t('post_list.title') as string
    }

    mounted() {
        console.log(this.$auth.user)
    }
}
</script>
<style lang="scss"></style>
