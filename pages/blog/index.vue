<template>
    <h2>asdasd</h2>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
    head() {
        return {
            title: (this as PostList).title || '',
        }
    },
})
export default class PostList extends Vue {
    get title(): string {
        return this.$i18n.t('post_list.title') as string
    }
    
    mounted() {
        this.$nf.error('asdasd')
        this.$nf.info()
    }
}
</script>
<style lang="scss"></style>
