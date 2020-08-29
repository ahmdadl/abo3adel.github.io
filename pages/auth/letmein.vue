<template>
    <div class="row">
        <div class="col-lg-8 m-auto">
            <card :title="$t('login.login')">
                <form @submit.prevent="logMeIn" @keydown="form.onKeydown($event)">
                    <!-- Email -->
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label text-md-right">{{
                            $t('login.email')
                        }}</label>
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
                        <label class="col-md-3 col-form-label text-md-right">{{
                            $t('login.password')
                        }}</label>
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
                        <div class="col-md-7 d-flex">
                            <!-- <checkbox v-model="remember" name="remember">
                                {{ $t('login.remember_me') }}
                            </checkbox> -->

                            <!-- <router-link
                                :to="{ name: 'password.request' }"
                                class="small ml-auto my-auto"
                            >
                                {{ $t('login.forgot_password') }}
                            </router-link> -->
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-md-7 offset-md-3 d-flex">
                            <!-- Submit Button -->
                            <button class="btn btn-primary" :loading="form.busy">
                                {{ $t('login.login') }}
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
import { Form, HasError, AlertError } from 'vform'

@Component({
    middleware: 'guest',
    head() {
        return {
            title: (this as LetMeIn).title || '',
        }
    },
    components: { Card, HasError, AlertError },
})
export default class LetMeIn extends Vue {
    public form = new Form({
        email: '',
        password: '',
    })
    public remember: boolean = false

    get title(): string {
        return this.$i18n.t('login.title') as string
    }

    public async logMeIn() {
        try {
            const res = await this.$auth.loginWith('laravelJWT', {
                data: {
                    email: this.form.email,
                    password: this.form.password,
                },
            })
            // console.log(res)
            let user = await this.$auth.setUserToken(res.data.token)
            user = await this.$auth.fetchUser()
            // console.log(this.$auth.user)
            // this.$router.push({path: '/blog'})
        } catch (err) {
            console.log('err')
            console.log(err)
        }
    }

    mounted() {
        // this.logMeIn()
        // console.log(this.$store.state.auth.user)
    }
}
</script>
<style lang="scss"></style>
