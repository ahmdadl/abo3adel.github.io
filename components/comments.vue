<template>
    <div>
        {{postSlug}}
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Comments extends Vue {
    // @ts-ignore
    @Prop({ type: String, required: true }) readonly postSlug: string;
}
</script>
<style lang="scss"></style>
