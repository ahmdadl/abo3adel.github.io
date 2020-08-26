<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 mb-3">
                <div class="list-group list-group-flush">
                    <nuxt-link
                        v-for="link in nav"
                        :key="link.text"
                        class="list-group-item list-group-item-action text-light border-bottom border-secondary"
                        :class="
                            $route.path === `/${link.url}`
                                ? 'active bg-primary'
                                : 'bg-dark'
                        "
                        :to="`/${link.url}`"
                    >
                        {{ $t('admin.title.' + link.text) }}
                    </nuxt-link>
                </div>
            </div>
            <div class="col-sm-9">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Card from '~/components/card.vue'

@Component({
    // auth: false,
    scrollToTop: true,
    components: { Card },
})
export default class Admin extends Vue {
    public nav = [
        {
            text: 'dash',
            url: 'admin',
        },
        {
            text: 'posts',
            url: 'admin/posts',
        },
        {
            text: 'projects',
            url: 'admin/projects',
        },
        {
            text: 'comments',
            url: 'admin/comments',
        },
        {
            text: 'tags',
            url: 'admin/tags',
        },
        {
            text: 'categories',
            url: 'admin/categories',
        },
    ]
}
</script>
<style lang="scss"></style>
