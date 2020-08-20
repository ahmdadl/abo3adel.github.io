<template>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <nuxt-child />
            </div>
            <sidebar />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PostInterface from '~/interfaces/PostInterface'
import CategoryInterface from '~/interfaces/category-interface'
import Sidebar from '~/components/sidebar.vue'

@Component({
    components: { Sidebar },
})
export default class BlogIndex extends Vue {
    public posts: PostInterface[] = []
    public cats: CategoryInterface[] = []
    public loading = {
        posts: true,
        cats: true,
    }

    mounted() {}
}
</script>
<style lang="scss"></style>
