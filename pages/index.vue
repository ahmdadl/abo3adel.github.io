<template>
    <div class="container-fluid p-0 m-0">
        <header
            id="canvasHeader"
            class="masthead bg-dark text-light bg-transparent"
        >
            <animated-dots :full-height="true"></animated-dots>
            <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                    <h1 class="mx-auto my-0 text-capitalize">
                        {{ $t('home.hello') }}
                        <span class="text-danger">
                            {{ $t('home.name') }}
                        </span>
                    </h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">
                        {{ $t('home.and') }}
                    </h2>
                    <h1 id="">
                        <span id="job-title">
                            <!-- <animated-job-title></animated-job-title> -->
                        </span>
                        <span id="blink" class="blink">|</span>
                    </h1>
                    <!-- <a
                        href="#about"
                        v-scroll-to="'#about'"
                        class="btn btn-primary js-scroll-trigger"
                    >
                        {{ $t('home.getStart') }}
                    </a> -->
                </div>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AnimatedDots from '~/components/animatedDots.vue'

@Component({
    components: { AnimatedDots },
})
export default class Home extends Vue {
    mounted() {
        console.log(this.$route.path)
    }
}
</script>

<style lang="scss"></style>
