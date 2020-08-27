<template>
    <div>
        <div class="row mb-3">
            <div class="col-12">
                <button
                    class="btn btn-warning text-uppercase"
                    @click.prevent="openModal"
                >
                    <i class="fas fa-plus"></i>
                    Create new Project
                </button>
            </div>
        </div>
        <ProjectList ref="plist" :auth="true" @delete="remove" />
        <!-- Modal -->
        <div
            class="modal fade"
            id="modalCreate"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalCreateLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCreateTitle">
                            {{ mp.title || 'Create new Proejct' }}
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
                            class="form needs-validation"
                            :class="{ 'was-validated': form.errors.any() }"
                        >
                            <div
                                class="form-group"
                                v-for="inp in inputs"
                                :key="inp"
                            >
                                <input
                                    type="text"
                                    :name="inp"
                                    :id="inp"
                                    class="form-control"
                                    :placeholder="`enter ${inp}`"
                                    :aria-describedby="inp + 'Help'"
                                    v-model="form[inp]"
                                    :class="{
                                        'is-invalid': form.errors.has(inp),
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has(inp)"
                                    v-text="form.errros.first(inp)"
                                ></div>
                            </div>
                            <div class="form-group">
                                <textarea
                                    class="form-control"
                                    name="info"
                                    v-model="form.info"
                                    placeholder="enter info"
                                    id="info"
                                    rows="3"
                                    :class="{
                                        'is-invalid': form.errors.has('info'),
                                    }"
                                ></textarea>
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('info')"
                                    v-text="form.errros.first('info')"
                                ></div>
                            </div>
                            <div class="form-group">
                                <TagInput
                                    path="root/tags"
                                    @tags="(newTags) => (tags = newTags)"
                                />
                            </div>
                            <div class="form-group">
                                <label class="custom-file">
                                    <input
                                        type="file"
                                        name="img"
                                        id="img"
                                        placeholder="images"
                                        class="custom-file-input"
                                        aria-describedby="projimg"
                                        @change="previewImg"
                                        accept="image/jpg, image/jpeg, image/png"
                                        multiple
                                        required
                                    />
                                    <span class="custom-file-control"></span>
                                </label>
                                <small id="projimg" class="form-text text-muted"
                                    >jpeg,, jpg, png and under 512KB</small
                                >
                            </div>
                            <div
                                class="mx-auto row"
                                v-for="p in prevImages"
                                :key="p + Math.random()"
                                style="display: inline-block;"
                            >
                                <div
                                    class="rounded-circle img"
                                    :style="`background-image: url(${p})`"
                                ></div>
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
                        <button type="button" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import ProjectList, { defaultProject } from '~/components/project-list.vue'
import { showLoader, hideLoader } from '~/common/btn-loader'
import ProjectInterface from '~/interfaces/project-interface'
// @ts-ignore
import Form from '../../node_modules/@imritesh/form/src'
import TagInput from '~/components/tag-input.vue'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Project).title || '',
        }
    },
    components: { ProjectList, TagInput },
})
export default class Project extends Vue {
    @Ref('plist') readonly plist!: ProjectList

    public mp: ProjectInterface = defaultProject
    private inputs: string[] = ['title', 'link', 'client', 'type']
    public form = new Form(['img', 'info', ...this.inputs])
    public tags: { text: string; slug: string }[] = []
    public prevImages: string[] = []

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

    public openModal(project: ProjectInterface = defaultProject): void {
        Object.assign(this.mp, project)

        // @ts-ignore
        new Modal(document.querySelector(`#modalCreate`)).show()
    }

    public previewImg(ev: Event) {
        const inp = ev.target as HTMLInputElement
        this.prevImages = []
        if (!inp.files) {
            this.prevImages = []
            return
        }
        this.form.img = inp

        for (const f in inp.files) {
            if (typeof inp.files[f] === 'object') {
                // console.log(typeof f, typeof inp.files[f]);
                const reader = new FileReader()

                reader.onload = (e) => {
                    this.prevImages.push((e.target as any).result)
                }
                reader.readAsDataURL(inp.files[f])
            }
        }
    }

    get title(): string {
        return this.$i18n.t('admin.title.projects') as string
    }
}
</script>
<style lang="scss" scopped>
.img {
    background-size: cover;
    background-position: center;
    width: 5.5rem;
    height: 5.5rem;
}
</style>
