<template>
    <div class="card bg-dark" :class="cls">
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
        headerCls: { type: String, default: 'bg-primary text-light text-center' },
        overlay: {type: Boolean, default: false},
        cls: {type: String, default: null}
    },
}
</script>
