<template>
    <div>
        <div v-if="loading" class="text-center">
            <i class="fas fa-pulse fa-spinner fa-3x mt-5"></i>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-12">
                    <button
                        class="btn btn-warning"
                        @click.prevent="openModal()"
                    >
                        Create New Entry
                    </button>
                    <hr class="bg-secondary pt-1 w-75 rounded" />
                </div>
            </div>
            <div class="row" v-if="!data.length">
                <div class="alert alert-danger col-10 mx-auto">
                    <strong>No data, please add new Entry</strong>
                </div>
            </div>
            <div v-for="(tag, tinx) in data" :key="tag.id" class="row mb-3">
                <div class="col-5">
                    <span class="btn btn-primary">
                        {{ tag.title }}
                        <span class="badge badge-light">
                            {{ tag.posts_count || 0 }}
                        </span>
                        <span class="badge badge-dark">
                            {{ tag.projects_count || 0 }}
                        </span>
                    </span>
                </div>
                <div class="col-7 text-right">
                    <button
                        class="btn btn-info"
                        @click.prevent="openModal(tag.title, tag.id)"
                    >
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
        <!-- Modal -->
        <div
            class="modal fade"
            :id="`${path}Modal`"
            tabindex="-1"
            role="dialog"
            :aria-labelledby="`${path}ModalLabel`"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="`${path}ModalLabel`">
                            {{ model.self || 'Create new Tag' }}
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form
                            ref="form"
                            class="form"
                            method="post"
                            @submit.stop.prevent="saveModel"
                        >
                            <div class="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': model.errors.length,
                                    }"
                                    v-model="model.self"
                                    placeholder="tag title"
                                    aria-describedby="helpId"
                                    minlength="5"
                                    maxlength="255"
                                />
                                <small id="helpId" class="text-muted">
                                    enter tag title
                                </small>
                                <div class="invalid-feedback">
                                    {{ model.errors }}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="saveModel"
                            :disabled="model.saving"
                        >
                            <i
                                class="mx-1 fas"
                                :class="
                                    model.saving
                                        ? 'fa-pulse fa-spinner'
                                        : 'fa-save'
                                "
                            ></i>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import TagInterface from '~/interfaces/tag-interface'
import CategoryInterface from '~/interfaces/category-interface'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as ModelCtrl).title || '',
        }
    },
})
export default class ModelCtrl extends Vue {
    @Prop({ type: String, required: true }) readonly path!: string

    @Ref('form') readonly form!: HTMLFormElement

    public model = {
        self: '',
        errors: '',
        saving: false,
        id: 0,
    }
    public loading: boolean = true
    public data: TagInterface[] | CategoryInterface[] = []

    public async loadData() {
        this.$nuxt.$loading.start()
        const res = await this.$axios.$get(`root/${this.path}`)

        this.loading = false
        this.$nuxt.$loading.finish()

        if (!res) {
            this.$nf.error()
            return
        }

        this.data = res
    }

    public async remove(id: number, inx: number) {
        this.showLoader(`#del${id}`)
        const res = await this.$axios.$delete(`root/${this.path}/${id}`)

        this.hideLoader(`#del${id}`)

        this.data.splice(inx, 1)
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

    public openModal(title: string = '', id: number = 0): void {
        this.model.self = title
        this.model.id = id
        this.model.errors = ''

        // show modal
        // @ts-ignore
        new Modal(
            document.querySelector(`#${this.path}Modal`) as HTMLDivElement
        ).show()
    }

    public closeModal(): void {
        // @ts-ignore
        new Modal(
            document.querySelector(`#${this.path}Modal`) as HTMLDivElement
        ).hide()
    }

    public async saveModel() {
        if (!this.model.self.length) {
            this.model.errors = 'a'
            return
        }
        this.model.saving = true
        const patch = this.model.id > 0

        const path = patch
            ? `root/${this.path}/${this.model.id}`
            : `root/${this.path}`
        const method = patch ? '$patch' : '$post'

        const res = await this.$axios[method](path, {
            title: this.model.self,
        })

        this.model.saving = false

        if (!res || !res.id) {
            this.$nf.error()
            return
        }

        this.model.errors = ''
        if (patch) {
            const index = this.data.findIndex((x) => x.id === this.model.id)
            this.data[index].title = res.title
        } else {
            this.data.push(res)
        }
        this.closeModal()
    }

    get title(): string {
        return this.$i18n.t('admin.title.' + this.path) as string
    }

    mounted() {
        this.$nextTick(() => {
            this.loadData()
        })
    }
}
</script>
<style lang="scss"></style>
