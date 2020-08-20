<template>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <nuxt-child />
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class BlogIndex extends Vue {
    public posts = []

    mounted() {
        setTimeout((_) => {
            // console.log(posts)

            
        }, 2500)
    }
}
</script>
<style lang="scss"></style>
