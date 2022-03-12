export default interface ProjectInterface {
    slug: string;
    title: string;
    link: string;
    img: string;
    type: string;
    shots?: string[]; 
    download_url?: string;
    tags?: string[];
}