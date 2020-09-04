<template>
    <div class="container-fluid">
        <div class="row mb-3">
            <div class="col-sm-3 mb-3">
                <div class="list-group list-group-flush">
                    <nuxt-link
                        v-for="link in nav"
                        :key="link.text"
                        class="list-group-item list-group-item-action text-light text-uppercase border-bottom border-secondary"
                        :class="
                            $route.path === `/${link.url}`
                                ? 'active bg-primary'
                                : 'bg-dark'
                        "
                        :to="`/${link.url}`"
                    >
                        {{ link.text }}
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
    middleware: 'auth',
    scrollToTop: true,
    components: { Card },
})
export default class Admin extends Vue {
    public nav = [
        {
            text: 'Dashboard',
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
