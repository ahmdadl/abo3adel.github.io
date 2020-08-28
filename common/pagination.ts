import { Vue } from 'vue-property-decorator'
export function getPath(pageNum: number, path: string) {
    const addon = path.indexOf('?') > -1 ? '&' : '?'

    return path.indexOf('page=') > -1 ? path : `${path}${addon}page=${pageNum}`
}

export function pushPageToHistroy(
    self: Vue,
    page: number,
    path: string,
    addBlog: boolean = true
) {
    // @ts-ignore
    self.$route.query.page = `${page}`

    if (self.$route.path.indexOf('admin') > -1) {
        path = path.replace(/post(?!s)\/*/g, '')
    } else {
        path = path.replace(/post(s)*\/*/g, '')
    }

    if (self.$route.path.indexOf('admin') > -1) {
        path = self.$route.path + path
    } else if (path.indexOf('categ') > -1 || path.indexOf('find') > -1) {
        path = '/blog/' + path
    } else {
        if (addBlog) path = '/blog' + path
    }

    history.pushState({}, '', path)
}
