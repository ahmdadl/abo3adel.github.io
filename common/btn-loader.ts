export function showLoader(
    id: string,
    toRemove: string,
    self: any
): HTMLSpanElement {
    const loader = document.querySelector(id) as HTMLSpanElement
    let cls = loader.classList
    cls.remove(toRemove)
    cls.add('fa-pulse')
    cls.add('fa-spinner')

    self.$nuxt.$loading.start()

    return loader
}

export function hideLoader(
    id: string,
    toAdd: string,
    self: any
): HTMLSpanElement {
    const loader = document.querySelector(id) as HTMLSpanElement
    let cls = loader.classList
    cls.add(toAdd)
    cls.remove('fa-pulse')
    cls.remove('fa-spinner')

    self.$nuxt.$loading.finish()

    return loader
}
