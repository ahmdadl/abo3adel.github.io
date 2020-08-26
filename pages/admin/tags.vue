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
                    <hr class="bg-secondary pt-1 w-75 rounded" />
                </div>
            </div>
            <div class="row" v-if="!tags.length">
                <div class="alert alert-danger col-10 mx-auto">
                    <strong>No Tags, please add new tags</strong>
                </div>
            </div>
            <div v-for="(tag, tinx) in tags" :key="tag.id" class="row mb-3">
                <div class="col-5">
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
                    <button
                        class="btn btn-danger"
                        @click.prevent="remove(tag.id, tinx)"
                    >
                        <i
                            :id="`del${tag.id}`"
                            class="fas fa-trash-alt mx-1"
                        ></i>
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

    public async remove(id: number, inx: number) {
        this.showLoader(`#del${id}`)
        const res = await this.$axios.$delete(`root/tags/${id}`)

        this.hideLoader(`#del${id}`)

        this.tags.splice(inx, 1)
    }

    public showLoader(id: string): HTMLSpanElement {
        const loader = document.querySelector(id) as HTMLSpanElement
        let cls = loader.classList
        cls.remove('fa-trash-alt')
        cls.add('fa-pulse')
        cls.add('fa-spinner')

        return loader
    }

    public hideLoader(id: string): HTMLSpanElement {
        const loader = document.querySelector(id) as HTMLSpanElement
        let cls = loader.classList
        cls.add('fa-trash-alt')
        cls.remove('fa-pulse')
        cls.remove('fa-spinner')

        return loader
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
