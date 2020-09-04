<template>
    <div>
        <div class="row">
            <div class="col-6 col-sm-4">
                <card :trans='true' cls="m-2 text-center" title="Posts Count">
                    <h5>
                        {{ count.posts }}
                    </h5>
                </card>
            </div>
            <div class="col-6 col-sm-4">
                <card :trans='true' cls="m-2 text-center" title="categories Count">
                    <h5>
                        {{ count.categories }}
                    </h5>
                </card>
            </div>
            <div class="col-6 col-sm-4">
                <card :trans='true' cls="m-2 text-center" title="tags Count">
                    <h5>
                        {{ count.tags }}
                    </h5>
                </card>
            </div>
        </div>
        <div class="row">
            <div class="col-6 col-sm-4">
                <card :trans='true' cls="m-2 text-center" title="projects Count">
                    <h5>
                        {{ count.projects }}
                    </h5>
                </card>
            </div>
            <div class="col-6 col-sm-4">
                <card :trans='true' cls="m-2 text-center" title="comments Count">
                    <h5>
                        {{ count.comments }}
                    </h5>
                </card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    // auth: false,
    head() {
        return {
            title: (this as Dashboard).title || '',
        }
    },
})
export default class Dashboard extends Vue {
    public count = {
        posts: 0,
        comments: 0,
        tags: 0,
        projects: 0,
        categories: 0,
    }

    public async loadData() {
        const res = await this.$axios.$get('root/dashboard')

        if (!res) {
            this.$nf.error()
            return
        }

        this.count = {
            posts: res.posts,
            comments: res.comments,
            tags: res.tags,
            projects: res.projects,
            categories: res.categories,
        }
    }

    get title(): string {
        return 'Dashboard'
    }

    beforeMount() {
        this.loadData()
    }
}
</script>
<style lang="scss" scoped>
</style>
