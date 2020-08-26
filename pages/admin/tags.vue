<template>
    <div>
        <div v-if="loading" class="text-center">
            <i class="fas fa-pulse fa-spinner fa-3x mt-5"></i>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-warning">
                        Create New Tag
                    </button>
                    <hr class="bg-secondary pt-1 w-75 rounded " />
                </div>
            </div>
            <div v-for="tag in tags" :key="tag.id" class="row mb-3">
                <div class="clo-5">
                    <span class="btn btn-primary">
                        {{ tag.title }}
                        <span class="badge badge-light">
                            {{ tag.posts_count }}
                        </span>
                        <span class="badge badge-dark">
                            {{ tag.projects_count }}
                        </span>
                    </span>
                </div>
                <div class="col-7 text-right">
                    <button class="btn btn-info">
                        <i class="fas fa-edit mx-1"></i>
                    </button>
                    <button class="btn btn-danger">
                        <i class="fas fa-trash-alt mx-1"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TagInterface from '~/interfaces/tag-interface'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Tag).title || '',
        }
    },
})
export default class Tag extends Vue {
    public loading: boolean = true
    public tags: TagInterface[] = []

    public async loadTags() {
        const res = await this.$axios.$get('root/tags')

        this.loading = false

        if (!res) {
            this.$nf.error()
            return
        }

        this.tags = res
    }

    get title(): string {
        return this.$i18n.t('admin.title.tags') as string
    }

    mounted() {
        this.loadTags()
    }
}
</script>
<style lang="scss"></style>
