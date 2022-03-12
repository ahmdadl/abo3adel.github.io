export default interface PostInterface {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    img: string;
    body: string;
    category: {
        slug: string;
        title: string;
    };
    updated_at: string;
}
