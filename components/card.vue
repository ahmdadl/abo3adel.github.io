<template>
    <div class="card">
        <div v-if="title" :class="['card-header', headerCls]">
            {{ title }}
        </div>
        <slot name="img" />
        <div class="card-body">
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
        headerCls: { type: String, default: null },
    },
}
</script>
