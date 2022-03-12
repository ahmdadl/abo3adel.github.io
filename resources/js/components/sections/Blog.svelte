<script lang="ts">
    import { t } from 'svelte-i18n';
    import type PostInterface from '../../interfaces/PostInterface';

    const blogLink = '';
    const postsData: PostInterface[] = [
        {
            id: 1,
            user_id: 1,
            category_id: 1,
            title: 'Laravel Tutorial Building Your First Laravel Application Part 1',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-1',
            img: 'https://images.test/posts/3.jpg',
            category: {
                slug: 'tutor',
                title: 'tutor',
            },
            updated_at: '15 May 2021',
        },
        {
            id: 2,
            user_id: 1,
            category_id: 2,
            title: 'kjkasdj jh bsanmdb hjgsad ',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-2',
            img: 'https://images.test/posts/5.jpg',
            category: {
                slug: 'news',
                title: 'news',
            },
            updated_at: '20 May 2021',
        },
        {
            id: 3,
            user_id: 1,
            category_id: 1,
            title: 'Laravel Tutorial Building Your First Laravel Application Part 3',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-3',
            img: 'https://images.test/posts/5.jpg',
            category: {
                slug: 'tutor',
                title: 'tutor',
            },
            updated_at: '15 Jan 2021',
        },
        {
            id: 5,
            user_id: 1,
            category_id: 1,
            title: 'Laravel Tut Part 9',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-7',
            img: 'https://images.test/posts/7.jpg',
            category: {
                slug: 'tutor',
                title: 'tutor',
            },
            updated_at: '15 Feb 2004',
        },
        {
            id: 1,
            user_id: 1,
            category_id: 2,
            title: 'orial Building Your First Laravel Application 15',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-12',
            img: 'https://images.test/posts/13.jpg',
            category: {
                slug: 'news',
                title: 'news',
            },
            updated_at: '30 Oct 1996',
        },
        {
            id: 12,
            user_id: 1,
            category_id: 2,
            title: 'Laravelt Laravel Application Part 1',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-144',
            img: 'https://images.test/posts/4.jpg',
            category: {
                slug: 'news',
                title: 'news',
            },
            updated_at: '15 May 2021',
        },
        {
            id: 19,
            user_id: 1,
            category_id: 1,
            title: 'Laravel Your First Laravel Application 155',
            slug: 'laravel-tutorial-building-your-first-laravel-application-part-135',
            img: 'https://images.test/posts/2.jpg',
            category: {
                slug: 'tutor',
                title: 'tutor',
            },
            updated_at: '2 Dec 1957',
        },
    ];

    async function loadPosts(): Promise<PostInterface[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res(postsData);
            }, 3000);
        });
    }
</script>

{#await loadPosts()}
    <div class="flex items-center justify-center pt-14 my-10">
        <div
            class="w-24 h-24 rounded-full animate-spin
    border-2 border-solid border-blue-500 border-t-transparent"
        />
    </div>
{:then posts}
    <div
        class="grid grid-cols-1 gap-5 p-2 gap-y-8 sm:p-4 md:grid-cols-2 lg:grid-cols-3"
    >
        {#each posts as post}
            <div
                class="relative pl-1 transition duration-500 transform cursor-pointer rounded-xl hover:scale-105"
            >
                <!-- Tag Discount -->
                <a
                    target="_blank"
                    href={blogLink + 'category/' + post.category.slug}
                    class="absolute top-0 left-0 z-30 px-2 mt-3 text-sm font-medium text-gray-100 capitalize transition duration-300 transform bg-green-500 rounded-lg md:block small-caps hover:bg-red-600 hover:scale-125"
                    >{post.category.title}</a
                >
                <div
                    class="absolute top-0 left-0 h-2 px-2 mt-6 bg-green-500 md:mt-5 md:h-3"
                />
                <div
                    class="absolute top-0 left-0 z-0 h-2 pl-5 bg-green-600 md:mt-6 mt-7 md:h-3 rounded-3xl"
                />
                <div
                    class="pb-2 bg-gray-100 shadow-xl dark:bg-gray-700 dark:shadow-white rounded-xl"
                >
                    <div class="relative">
                        <a href={blogLink + post.slug} target="_blank">
                            <img
                                src={post.img}
                                class="object-cover max-w-full rounded-t-xl"
                                alt={post.title}
                            />
                        </a>
                        <div
                            class="absolute bottom-0 right-0 px-2 mb-2 mr-2 text-xs font-medium text-gray-100 bg-yellow-500 rounded-lg"
                        >
                            <i class="fas fa-clock" />
                            <span>{post.updated_at}</span>
                        </div>
                    </div>
                    <div class="px-2 py-1">
                        <!-- Product Title -->
                        <a
                            href={blogLink + post.slug}
                            target="_blank"
                            class="pr-2 text-sm font-bold text-gray-800 capitalize md:text-base dark:text-white"
                            >{post.title}</a
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="w-full text-align mt-6 mb-10">
        <a
            href={blogLink}
            target="_blank"
            class="w-32 p-2 font-semibold text-white transition-all duration-300 bg-blue-500 shadow-lg hover:bg-blue-700 focus:outline-none rounded focus:ring hover:shadow-none capitalize small-caps"
        >
            <i class="fa fa-leaf mx-1" />
            {$t('home.blog.readMore')}
        </a>
    </div>
{/await}
