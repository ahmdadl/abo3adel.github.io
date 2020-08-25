<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <div class="list-group list-group-flush">
                    <nuxt-link
                        class="list-group-item list-group-item-action text-light border-bottom border-secondary"
                        :class="
                            $route.path === '/admin'
                                ? 'active bg-primary'
                                : 'bg-dark'
                        "
                        to="/admin"
                    >
                        {{ $t('admin.title.dash') }}
                    </nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action text-light border-bottom border-secondary"
                        :class="
                            $route.path === '/post'
                                ? 'active bg-primary'
                                : 'bg-dark'
                        "
                        to="/post"
                    >
                        {{ $t('admin.title.posts') }}
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
@Component({
    // auth: false,
    scrollToTop: true,
})
export default class Admin extends Vue {
}
</script>
<style lang="scss"></style>
