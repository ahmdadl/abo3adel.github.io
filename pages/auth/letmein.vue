<template>
    <div class="row">
        <div class="col-lg-8 m-auto">
            <card title="Login">
                <alert-errors :form="form"></alert-errors>
                <form
                    @submit.prevent="logMeIn"
                    @keydown="form.onKeydown($event)"
                >
                    <!-- Email -->
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label text-md-right"
                            >Email</label
                        >
                        <div class="col-md-7">
                            <input
                                v-model="form.email"
                                :class="{
                                    'is-invalid': form.errors.has('email'),
                                }"
                                class="form-control"
                                type="email"
                                name="email"
                            />
                            <has-error :form="form" field="email" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label text-md-right"
                            >Password</label
                        >
                        <div class="col-md-7">
                            <input
                                v-model="form.password"
                                :class="{
                                    'is-invalid': form.errors.has('password'),
                                }"
                                class="form-control"
                                type="password"
                                name="password"
                            />
                            <has-error :form="form" field="password" />
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="form-group row">
                        <div class="col-md-3" />
                        <div class="col-md-7">
                            <div class="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="remember"
                                />
                                <label
                                    class="custom-control-label"
                                    for="remember"
                                    >Remember Me</label
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-md-7 offset-md-3 d-flex">
                            <!-- Submit Button -->
                            <button
                                class="btn btn-primary"
                                :disabled="form.busy"
                            >
                                <i
                                    class="mx-1 fas"
                                    :class="
                                        form.busy
                                            ? 'fa-spinner fa-pulse'
                                            : 'fa-sign-in-alt'
                                    "
                                ></i>
                                signIn
                            </button>

                            <!-- GitHub Login Button -->
                            <!-- <login-with-github /> -->
                        </div>
                    </div>
                </form>
            </card>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Card from '~/components/card.vue'
// @ts-ignore
import { Form, HasError, AlertErrors } from 'vform'

@Component({
    middleware: 'guest',
    head() {
        return {
            title: (this as LetMeIn).title || '',
        }
    },
    components: { Card, HasError, AlertErrors },
})
export default class LetMeIn extends Vue {
    public form = new Form({
        email: '',
        password: '',
    })
    public remember: boolean = false

    get title(): string {
        return 'Login'
    }

    public async logMeIn() {
        const res = await this.$auth
            .loginWith('laravelJWT', {
                data: {
                    email: this.form.email,
                    password: this.form.password,
                    remember: this.remember,
                },
            })
            .catch((err) => {
                this.form.errors.set(err.response.data.errors)
                return
            })

        if (!res || !res.data) {
            this.$nf.error()
            return
        }

        let user = await this.$auth.setUserToken(res.data.token)
        user = await this.$auth.fetchUser()
    }
}
</script>
<style lang="scss"></style>
