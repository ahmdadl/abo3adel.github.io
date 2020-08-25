<template>
    <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
    // auth: false,
    head() {
        return {
            title: (this as Project).title || '',
        }
    },
})
export default class Project extends Vue {
    get title(): string {
        return this.$i18n.t('admin.title.projects') as string
    }
}
</script>
<style lang="scss"></style>
