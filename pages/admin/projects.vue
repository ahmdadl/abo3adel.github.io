<template>
    <div>
        <ProjectList ref="plist" :auth="true" @delete="remove" />
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import ProjectList from '~/components/project-list.vue'
import { showLoader, hideLoader } from '~/common/btn-loader'

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
    @Ref('plist') readonly plist!: ProjectList

    public async remove(id: number) {
        showLoader(`#del${id}`, 'fa-trash-alt', this)

        const res = await this.$axios.delete(`root/projects/${id}`)

        hideLoader(`#del${id}`, 'fa-trash-alt', this)

        if (!res || res.status !== 204) {
            this.$nf.error()
            return
        }

        this.plist.removeItem(id)
    }

    get title(): string {
        return this.$i18n.t('admin.title.projects') as string
    }
}
</script>
<style lang="scss"></style>
