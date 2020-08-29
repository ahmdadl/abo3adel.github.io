<template>
    <footer
        class="footer text-light p-5 border-top border-secondary"
        :class="$route.path === '/' ? 'bg-transparent' : 'bg-dark'"
    >
        <div class="container">
            <div class="row text-center py-4">
                <div class="mx-auto w-75">
                    <a
                        href="https://github.com/abo3adel"
                        target="_blank"
                        class="btn btn-outline-primary btn-brand transition mr-2 mt-2"
                    >
                        <i class="fab fa-github"></i>
                    </a>
                    <a
                        href="https://codepen.io/abo3adel"
                        target="_blank"
                        class="btn btn-outline-danger btn-brand transition mr-2 mt-2"
                    >
                        <i class="fab fa-codepen"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ahmed-adel-30a932119/"
                        target="_blank"
                        class="btn btn-outline-info btn-brand transition mr-2 mt-2"
                    >
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a
                        href="https://fb.com/a7md200"
                        target="_blank"
                        class="btn btn-outline-primary btn-brand transition mr-2 mt-2"
                    >
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://wa.me/201143647417"
                        target="_blank"
                        class="btn btn-outline-success btn-brand transition mr-2 mt-2"
                    >
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    made with <span class="text-danger">&hearts;</span> by
                    ninjaCoder 2019 - {{ new Date().getFullYear() }}
                </div>
            </div>
        </div>
    </footer>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Footer extends Vue {}
</script>
<style lang="scss">
footer {
    div {
        z-index: 9;
    }
    background: rgba($color: var(--dark), $alpha: 0.1);
}
</style>
