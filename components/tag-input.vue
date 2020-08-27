<template>
    <vue-tags-input
        v-model="tag"
        :autocomplete-items="filteredItems"
        @tags-changed="$emit('tags', $event)"
        :add-only-from-autocomplete="true"
    />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// @ts-ignore
import VueTagsInput from '@johmun/vue-tags-input'
import TagInterface from '~/interfaces/tag-interface'

@Component({
    components: { VueTagsInput },
})
export default class TagInput extends Vue {
    @Prop({ type: String, required: true }) readonly path!: string

    public tag: string = ''
    public autocompleteItems: { text: string; slug: string }[] = []

    public async loadTags() {
        this.$nuxt.$loading.start()

        const res = (await this.$axios.$get(this.path)) as TagInterface[]

        this.$nuxt.$loading.finish()

        if (!res) {
            this.$nf.error()
            return
        }

        // console.log(res)
        res.map((x) =>
            this.autocompleteItems.push({ text: x.title, slug: x.slug })
        )
    }

    get filteredItems(): { text: string }[] {
        return this.autocompleteItems.filter((i) => {
            return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
        })
    }

    mounted() {
        this.$nextTick(() => this.loadTags())
    }
}
</script>
<style lang="scss" scopped>
.modal {
    // background: rgba($color: #000000, $alpha: .8);
}
.modal-content {
    background-color: rgba($color: #000000, $alpha: 0.8);
}
.ti-autocomplete {
    color: var(--primary);
}
</style>
