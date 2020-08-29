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
        <ProjectList
            ref="plist"
            :auth="$auth.loggedIn"
            @edit="openModal"
            @delete="remove"
        />

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
                        <form class="form needs-validation">
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
                                    @keypress.enter="saveProject"
                                    :placeholder="`enter ${inp}`"
                                    :aria-describedby="inp + 'Help'"
                                    v-model="form[inp]"
                                    :class="{
                                        'is-invalid': form.errors.has(inp),
                                    }"
                                    required
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has(inp)"
                                    v-text="form.errors.first(inp)"
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
                                    required
                                ></textarea>
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('info')"
                                    v-text="form.errors.first('info')"
                                ></div>
                            </div>
                            <div class="form-group">
                                <TagInput
                                    path="root/tags"
                                    @tags="(newTags) => (tags = newTags)"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('tags')"
                                    v-text="form.errors.first('tags')"
                                ></div>
                            </div>
                            <ImgPrev
                                ref="imgPrev"
                                :multi="true"
                                @img-arr="
                                    (files) =>
                                        this.form.populate({
                                            img: files,
                                        })
                                "
                            >
                                <div
                                    class="invalid-feedback"
                                    v-if="form.errors.has('img')"
                                    v-text="form.errors.first('img')"
                                ></div>
                            </ImgPrev>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            @click="
                                form.reset()
                                imgPrev.reset()
                            "
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="saveProject"
                            :disabled="form.processing"
                        >
                            <i
                                class="fas"
                                :class="
                                    form.processing
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
import { Vue, Component, Ref } from 'vue-property-decorator'
import ProjectList, { defaultProject } from '~/components/project-list.vue'
import { showLoader, hideLoader } from '~/common/btn-loader'
import ProjectInterface from '~/interfaces/project-interface'
// @ts-ignore
import Form from '../../node_modules/@imritesh/form/src'
import TagInput from '~/components/tag-input.vue'
import ImgPrev from '~/components/img-prev.vue'
import * as Cookies from 'es-cookie'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Project).title || '',
        }
    },
    components: { ProjectList, TagInput, ImgPrev },
})
export default class Project extends Vue {
    @Ref('plist') readonly plist!: ProjectList
    @Ref() readonly imgPrev!: ImgPrev

    public mp: ProjectInterface = defaultProject
    private inputs: string[] = ['title', 'link', 'client', 'type']
    public form = new Form(['img', 'info', 'tags', ...this.inputs], {
        http: this.$axios,
    })
    public tags: { text: string; slug: string }[] = []

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

        if (project.id > 0) {
            this.form.populate({
                title: project.title,
                link: project.link,
                client: project.client,
                type: project.type,
                info: project.info,
                tags: project.tags,
                // img: project.img,
            })
            delete this.form.img
            delete this.form.tags
        }

        // @ts-ignore
        new Modal(document.querySelector(`#modalCreate`)).show()
    }

    public closeModal() {
        Object.assign(this.mp, defaultProject)
        this.form.reset()
        this.imgPrev.reset()
        // @ts-ignore
        new Modal(document.querySelector(`#modalCreate`)).hide()
    }

    public async saveProject() {
        this.form.populate({
            tags: this.tags.map((x) => x.slug),
        })

        const method = this.mp.id > 0 ? 'patch' : 'post'
        let path = `${this.$axios.defaults.baseURL}root/projects`
        if (this.mp.id > 0) {
            path += `/${this.mp.id}`
        }

        const res = await this.form[method](path).catch(() => null)

        if (!res) {
            this.$nf.error()
            return
        }

        this.plist.addItem(res, !!this.mp.id)
        this.closeModal()
    }

    get title(): string {
        return this.$i18n.t('admin.title.projects') as string
    }
}
</script>
