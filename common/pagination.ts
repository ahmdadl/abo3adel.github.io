import { Vue } from 'vue-property-decorator'
export function getPath(pageNum: number, path: string) {
    const addon = path.indexOf('?') > -1 ? '&' : '?'

    return path.indexOf('page=') > -1 ? path : `${path}${addon}page=${pageNum}`
}

export function pushPageToHistroy(self: Vue, page: number, path: string) {
    // @ts-ignore
    self.$route.query.page = `${page}`
    path = path.replace(/post?/g, '')
    // alert(path)
    path = '/blog' + path
    // alert(path)
    history.pushState({}, '', path)
}
