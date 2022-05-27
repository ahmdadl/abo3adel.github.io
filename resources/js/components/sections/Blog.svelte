<script lang="ts">
    import { t } from 'svelte-i18n';
    import axios from 'axios';
    import { API_URL, BLOG_URL } from '../../helpers/Config.ts';
    import type PostInterface from '../../interfaces/PostInterface';
    import { LazyImage } from 'svelte-lazy-image';
    import { onMount } from 'svelte';

    let loading: boolean = false;
    let hasError: boolean = false;
    let posts: PostInterface[] = [];
    let attempts: number = 0;

    async function loadingPosts() {
        if (loading || posts.length) return;
        loading = true;
        hasError = false;
        attempts++;

        const res = await axios.get(API_URL + 'posts').catch((err) => {
            hasError = true;
            loading = false;
        });

        loading = false;

        if (!res || !res.data || !res.data.posts) {
            hasError = true;
            return;
        }

        posts = res.data.posts;
    }

    onMount(() => {
        setTimeout(() => loadingPosts(), 500);
    });
</script>

{#if loading}
    <div class="flex items-center justify-center my-10 pt-14">
        <div
            class="w-24 h-24 border-2 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"
        />
    </div>
{:else if hasError}
    <div
        class="w-4/5 py-2 mx-auto my-6 text-red-900 capitalize bg-red-400 rounded"
    >
        <i class="inline-block mx-1 text-red-800 fas fa-exclamation-circle" />
        <strong>{$t('home.project.error')}</strong>
    </div>

    {#if attempts < 3}
        <button class="btn" on:click|preventDefault={loadingPosts}>
            {$t('home.project.tryAgain')}
        </button>
    {/if}
{:else}
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
                    href={BLOG_URL + 'c/' + post.category.slug}
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
                        <a href={BLOG_URL + post.slug} target="_blank">
                            <LazyImage
                                placeholder="/img/rings.svg"
                                src={post.img}
                                class="object-cover max-w-full rounded-t-xl min-h-[10rem] mx-auto"
                                alt={post.title}
                            />
                        </a>
                        <div
                            class="absolute bottom-0 right-0 px-2 mb-2 mr-2 text-xs font-medium text-gray-100 bg-yellow-500 rounded-lg"
                        >
                            <i class="fas fa-clock" />
                            <span>{post.updated_diff}</span>
                        </div>
                    </div>
                    <div class="px-2 py-1">
                        <!-- Product Title -->
                        <a
                            href={BLOG_URL + post.slug}
                            target="_blank"
                            class="pr-2 text-sm font-bold text-gray-800 capitalize md:text-base dark:text-white"
                            >{post.title}</a
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="w-full mt-6 mb-10 text-align">
        <a
            href={BLOG_URL}
            target="_blank"
            class="w-32 p-2 font-semibold text-white capitalize transition-all duration-300 bg-blue-500 rounded shadow-lg hover:bg-blue-700 focus:outline-none focus:ring hover:shadow-none small-caps"
        >
            <i class="mx-1 fa fa-leaf" />
            {$t('home.blog.readMore')}
        </a>
    </div>
{/if}
