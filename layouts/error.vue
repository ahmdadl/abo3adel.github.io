<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link :to="localePath('/')">Home page</nuxt-link>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    // auth: false,
    head() {
        return {
            title: (this as ErrorPage).title || '',
        }
    },
})
export default class ErrorPage extends Vue {
    @Prop({type: Object, required: true}) readonly error!: object

    get title(): string {
        // @ts-ignore
        return this.$i18n.t('error.' + this.error.statusCode) as string
    }
}
</script>
<style lang="scss"></style>
