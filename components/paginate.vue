<template>
    <nav aria-label="Page navigation example" class="my-3">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <button
                    class="page-link"
                    aria-label="Previous"
                    @click.prevent="sendLoad(page.first)"
                    :class="{
                        'text-muted': page.current === page.first,
                    }"
                    :disabled="page.current === page.first"
                >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </button>
            </li>
            <li class="page-item" v-for="pa in pages" :key="pa">
                <button
                    class="page-link"
                    @click.prevent="sendLoad(pa)"
                    :class="{ active: page.current === pa }"
                >
                    {{ pa }}
                </button>
            </li>
            <li class="page-item">
                <button
                    class="page-link"
                    aria-label="Next"
                    :class="{
                        'text-muted': page.current === page.last,
                    }"
                    @click.prevent="sendLoad(page.last)"
                    :disabled="page.current === page.last"
                >
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

export interface PaginateResponse {
    from: number
    last_page: number
    current_page: number
    path: string
}

@Component({
    head() {
        return {
            title:
                (this as Paginate).title +
                    ` (${(this as Paginate).page.current})` || '',
        }
    },
})
export default class Paginate extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, required: true }) readonly path!: string
    @Prop({ type: Object, required: true }) readonly res!: PaginateResponse

    public pages: number[] = []
    public page = {
        first: 1,
        current:
            typeof this.$route.query.page == 'undefined'
                ? 1
                : parseInt(this.$route.query.page as string),
        last: 1,
        path: this.pagePath,
    }

    public sendLoad(page: number = 1, path: string = this.pagePath) {
        path = path.replace(/page=\d/g, `page=${page}`)
        // alert(path)
        this.$emit('load', path)
    }

    public setPageFromResponse(res: PaginateResponse) {
        // alert(`res => ${res}`)
        if (!res) return

        this.page = {
            first: res.from,
            last: res.last_page,
            current: res.current_page || 1,
            path: res.path,
        }
        this.$route.query.page = `${res.current_page}`

        this.pages = Array(this.page.last)
            .fill(1)
            .map((x, inx) => x + inx)

        history.pushState({}, '', this.pagePath)
    }

    get routePage(): number {
        return parseInt(this.$route.query.page as string) || 1
    }

    get pagePath(): string {
        const addon = this.path.indexOf('?') > -1 ? '&' : '?'
        const page = parseInt(this.$route.query.page as string) || 1
        const q = this.$route.query.q ? 'q=' + this.$route.query.q : ''
        let current =
            typeof this.$route.query.page == 'undefined'
                ? 1
                : parseInt(this.$route.query.page as string)
        let path = this.path + '?page=' + current
        if (this.$route.query.q) {
            path += addon + q
        }

        return path
            ? // return this.path.indexOf('page=') > -1
              this.path
            : `${this.path}${addon}page=${page}`
    }

    @Watch('routePage')
    onRoutePageChange(val: number) {
        alert(`${val} => ${this.page.current}`)
        this.sendLoad(val)
    }

    // @Watch('path')
    // onPathChanged(val: string) {
    //     alert(`${val} => ${this.page.path}`)
    //     this.page = {
    //         first: 1,
    //         last: 1,
    //         path: val,
    //         current: 1,
    //     }

    //     // if ()

    //     this.sendLoad(parseInt(this.$route.query.page as string) || 1, val)
    // }

    @Watch('res')
    onResChanged(val: PaginateResponse) {
        this.setPageFromResponse(val)
    }

    mounted() {
        // alert(this.$route.query.page)
        this.pages = Array(this.page.last)
            .fill(1)
            .map((x, inx) => x + inx)
    }
}
</script>
<style lang="scss" scoped>
.page-link.active {
    background: var(--primary);
    color: var(--light);
}
</style>
