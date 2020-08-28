<template>
    <div>
        <div class="form-group">
            <label class="custom-file text-light bg-dark">
                <input
                    type="file"
                    name="img"
                    id="img"
                    placeholder="images"
                    class="custom-file-input"
                    aria-describedby="projimg"
                    @change="previewImg"
                    accept="image/jpg, image/jpeg, image/png"
                    :multiple="multi"
                    required
                />
                <span class="custom-file-control">
                    Choose Images
                </span>
            </label>
            <small id="projimg" class="form-text text-muted"
                >jpeg,, jpg, png and under 512KB</small
            >
            <slot />
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
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class ImgPrev extends Vue {
    @Prop({ type: Boolean, required: true }) readonly multi!: boolean

    public prevImages: string[] = []

    public previewImg(ev: Event) {
        const inp = ev.target as HTMLInputElement
        this.prevImages.splice(0)
        if (!inp.files) {
            this.prevImages.splice(0)
            return
        }

        this.$emit('img-arr', inp.files)

        for (const f in inp.files) {
            if (typeof inp.files[f] === 'object') {
                const reader = new FileReader()

                reader.onload = (e) => {
                    this.prevImages.push((e.target as any).result)
                }
                reader.readAsDataURL(inp.files[f])
            }
        }
    }

    public reset() {
        this.prevImages.splice(0)
    }
}
</script>
<style lang="scss"></style>
