<template>
    <div>
        <card
            :title="$t('post_show.comments')"
            header-cls="bg-primary text-light"
        >
            <!-- comment form -->
            <form
                ref="form"
                method="post"
                class="form needs-validation"
                :class="{
                    'was-validated':
                        errors.name || errors.email || errors.message,
                }"
                novalidate
                @submit.prevent.stop="sendComment"
            >
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="name">
                        {{ $t('comment.user_name') }}
                    </label>
                    <input
                        ref="name"
                        type="text"
                        class="form-control bg-light text-dark col-sm-10"
                        id="name"
                        :placeholder="$t('comment.user_name')"
                        v-model.trim="model.name"
                        :class="{
                            'is-invalid': errors.name,
                            'is-valid': errors.name === false,
                        }"
                        minlength="5"
                        maxlength="50"
                        name="name"
                        required
                    />
                    <div
                        class="col-sm-10 offset-sm-2 invalid-feedback mt-md-n3"
                    >
                        {{ this.errors.name || $t('err.invalid_name') }}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="email">
                        {{ $t('comment.email') }}
                    </label>
                    <input
                        ref="email"
                        type="email"
                        class="form-control bg-light text-dark col-sm-10"
                        id="email"
                        :placeholder="$t('comment.email')"
                        v-model.trim="model.email"
                        :class="{
                            'is-invalid': !validateEmail(),
                            'is-valid': validateEmail(),
                        }"
                        minlength="5"
                        maxlength="255"
                        required
                    />
                    <div
                        class="col-sm-10 offset-sm-2 invalid-feedback mt-md-n3"
                    >
                        {{ this.errors.email || $t('err.invalid_email') }}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="cmessage">
                        {{ $t('comment.message') }}
                    </label>
                    <textarea
                        class="form-control bg-light text-dark col-sm-10"
                        id="cmessage"
                        rows="7"
                        :placeholder="$t('comment.message')"
                        v-model.trim="model.mess"
                        minlength="10"
                        required
                    ></textarea>
                    <div class="col-sm-10 offset-sm-2 invalid-feedback">
                        {{ this.errors.mess || $t('err.invalid_message') }}
                    </div>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    :disabled="sending"
                >
                    <span
                        v-if="sending"
                        class="spinner-border spinner-border-sm align-middle mx-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    {{ $t('comment.send') }}
                </button>
            </form>
            <div class="mt-5">
                <div class="text-center w-100" v-if="commentLoading">
                    <div
                        class="spinner-border text-info"
                        role="status"
                        style="width: 3rem; height: 3rem;"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <!-- comment list -->
                <div
                    class="media mt-2 border-top pt-2"
                    v-for="c in comments"
                    :key="c.id + '-' + Math.random()"
                >
                    <img :src="c.gravatar" class="mr-3 img-thumbnail" :alt="c.user_name" width="100" height="100" />
                    <div class="media-body">
                        <h5 class="mt-0">
                            {{ c.user_name }}
                        </h5>
                        <span class="badge badge-primary p-1">
                            {{ c.updated }}
                        </span>
                        <p>
                            {{ c.body }}
                        </p>
                    </div>
                </div>
            </div>
        </card>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import Card from './card.vue'
import CommentInterface from '~/interfaces/comments-interface'

@Component({
    components: { Card },
})
export default class Comments extends Vue {
    @Prop({ type: Number, required: true }) readonly postId!: number
    @Prop({ type: String, required: true }) readonly postSlug!: string

    @Ref('form') readonly form!: HTMLFormElement
    @Ref('email') readonly email!: HTMLInputElement

    public sending: boolean = false
    public model = {
        name: '',
        email: '',
        mess: '',
    }
    public errors = {
        name: null,
        email: null,
        mess: null,
    }
    // comment list
    public commentLoading: boolean = true
    public comments: CommentInterface[] = []

    public sendComment() {
        // validate data
        if (
            !this.model.name.length ||
            !this.model.email.length ||
            !this.model.mess.length ||
            !this.validateEmail()
        ) {
            this.form.classList.add('was-validated')
            return
        }

        this.sending = true
        this.$axios
            .$post(`post/${this.postSlug}/comments`, {
                user_mail: this.model.email,
                user_name: this.model.name,
                body: this.model.mess,
            })
            .then((res) => {
                if (!res || !res.user_name) {
                    this.sending = false
                    this.$nf.error()
                    return
                }

                this.sending = false
                this.$nf.success()
                this.comments.unshift(res)
                this.form.reset()
            })
            .catch((err) => {
                this.sending = false
                if (err.response.status === 422) {
                    // validation error
                    const e = err.response.data.errors
                    this.errors.name = e.user_name[0]
                    this.errors.email = e.user_mail[0]
                    this.errors.mess = e.body[0]
                }
            })
    }

    private validateEmail(): boolean {
        if (!this.email || !this.email.value.length) {
            return false
        }

        return this.email.checkValidity()
    }

    public async loadComments() {
        const res = await this.$axios.$get(`post/${this.postSlug}/comments`)

        if (!res) {
            this.commentLoading = false
            this.$nf.error()
            return
        }

        this.comments = res
        this.commentLoading = false
    }

    @Watch('postSlug')
    onPostSlugChanged(val: string) {
        this.loadComments()
    }

    mounted() {
        
    }
}
</script>
<style lang="scss"></style>
