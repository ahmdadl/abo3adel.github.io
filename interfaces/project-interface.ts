export default interface ProjectInterface {
    id: number
    title: string
    link: string
    client: string
    img: string[]
    info: string
    type: 'laravel' | 'spa' | 'mobile' | string
    updated_at: string
    tags: { title: string }[]
}
