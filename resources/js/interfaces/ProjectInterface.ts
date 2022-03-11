export default interface ProjectInterface {
    slug: string;
    title: string;
    link: string;
    category: string[];
    img: string[];
    type: string;
    download_url?: string;
    tags?: string[];
}