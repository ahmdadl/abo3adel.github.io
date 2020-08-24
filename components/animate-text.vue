<template>
    <span>{{ str }}</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AnimateText extends Vue {
    @Prop({ type: Array, required: true }) readonly arr!: string[]
    public i = 0
    public j = 0
    public str = this.arr[3]
    public speed = 90
    public interval = {}

    public typeWriter() {
        if (this.arr[this.i] && this.j >= this.arr[this.i].length) return
        this.str += this.arr[this.i].charAt(this.j)
        this.j++
        setTimeout(this.typeWriter, this.speed)
    }

    mounted() {
        this.interval = setInterval((_) => {
            if (this.i > 2) this.i = 0
            let speed = 90
            if (this.j >= this.arr[this.i].length) this.j = 0
            this.str = ''

            this.typeWriter()
            this.i++
        }, 4000)
    }

    destroyed() {
        // @ts-ignore
        clearInterval(this.interval)
    }
}
</script>
