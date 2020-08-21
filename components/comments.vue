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
        </card>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import Card from './card.vue'

@Component({
    components: { Card },
})
export default class Comments extends Vue {
    @Prop({ type: Number, required: true }) readonly postId!: number
    @Prop({ type: String, required: true }) readonly postSlug!: string

    @Ref('form') readonly form!: HTMLFormElement
    @Ref('name') readonly name!: HTMLInputElement
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

    public validateEmail(): boolean {
        if (!this.email || !this.email.value.length) {
            return false
        }

        return this.email.checkValidity()
    }

    mounted() {}
}
</script>
<style lang="scss"></style>
