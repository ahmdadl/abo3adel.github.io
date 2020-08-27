<template>
    <div>
        <ProjectList :auth="true" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectList from '~/components/project-list.vue'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Project).title || '',
        }
    },
    components: { ProjectList },
})
export default class Project extends Vue {
    get title(): string {
        return this.$i18n.t('admin.title.projects') as string
    }
}
</script>
<style lang="scss"></style>
