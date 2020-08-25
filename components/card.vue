<template>
    <div class="card bg-dark" :class="[cls, {'transparent': trans}]">
        <div v-if="title" :class="['card-header', headerCls]">
            {{ title }}
        </div>
        <slot name="img" />
        <div :class="overlay ? 'card-img-overlay' : 'card-body'">
            <slot />
        </div>
        <div class="card-footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',

    props: {
        title: { type: String, default: null },
        headerCls: { type: String, default: 'bg-primary text-light text-center text-capitalize' },
        overlay: {type: Boolean, default: false},
        cls: {type: String, default: null},
        trans: {type: Boolean, default: false}
    },
}
</script>
<style lang="scss" scoped>
.bg-dark.transparent {
    background-color: rgba($color: #000000, $alpha: 0.4) !important;
}
</style>
