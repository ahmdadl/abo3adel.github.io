<template>
    <model-ctrl path="categories" routeKey="slug" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ModelCtrl from '~/components/model-ctrl.vue'

@Component({
    // auth: false,
    components: { ModelCtrl },
})
export default class Category extends Vue {}
</script>
<style lang="scss"></style>
