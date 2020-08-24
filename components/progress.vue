<template>
    <div
        class="progress mb-2 mx-2 font-weight-bolder"
        style=""
    >
        <span
            class="px-3 pt-3 align-middle text-light bg-dark text-uppercase"
            >{{ txt }}</span
        >
        <div class="progress w-100">
            <div
                class="progress-bar bg-success text-right"
                role="progressbar"
                :style="'width: ' + width + '%'"
                :aria-valuenow="width"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {{ val }}%
            </div>
        </div>
    </div>
    <!-- <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span
                class="input-group-text text-light bg-dark text-uppercase"
                >{{ txt }}</span
            >
        </div>
        <div class="progress w-75 h-100">
            <div
                class="progress-bar progress-bar-striped bg-success text-right"
                role="progressbar"
                :style="'width: ' + width + '%'"
                :aria-valuenow="width"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {{ val }}%
            </div>
        </div>
    </div> -->
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ProgressSkill extends Vue {
    @Prop({ type: String, required: true }) readonly txt!: string
    @Prop({ type: Number, required: true }) readonly val!: number

    public width = 0

    public isScrolled(ev: Event) {
        let s = document.querySelector('#skills') as HTMLElement
        const DOC = document.documentElement as HTMLElement

        // console.log(s.scrollTop, window.scrollY)

        if (s.offsetTop <= DOC.scrollTop) {
            // this.width = 0
            setTimeout((_) => {
                this.width = this.val
            }, 150)
        }
    }

    mounted() {
        window.addEventListener('scroll', this.isScrolled)
    }

    destroyed() {
        window.removeEventListener('scroll', this.isScrolled)
    }
}
</script>
<style lang="scss" scoped>
.input-group,
.input-group-prepend {
    height: 4vh;
}
.progress {
    border-radius: 0 6px 6px 0;
    height: 4vh;
}
</style>
