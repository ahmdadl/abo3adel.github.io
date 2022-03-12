<script lang="ts">
    import { t } from 'svelte-i18n';
    import type TestmonialInterface from '../../interfaces/TestmonialInterface';

    let arr: TestmonialInterface[] = [
        {
            id: 1,
            name: 'Ali Hassan',
            job: 'CEO of Something',
            img: 'https://images.test/naruto.jpg',
            body: 'Packed with awesome content and exactly what I was looking for. I would highly recommend this to anyone.',
        },
        {
            id: 2,
            name: 'Jane Cooper',
            job: 'CEO of Something',
            img: 'https://images.test/himawari.png',
            body: 'This is a no-brainer if you want to take your business to the next level. If you are looking for the ultimate toolset, this is it!',
        },
        {
            id: 3,
            name: 'John Doe',
            job: 'CEO of Something',
            img: 'https://images.test/sasuke.png',
            body: 'Awesome product! And the customer service is exceptionally well.',
        },
    ];
</script>

<section
    class="flex items-center justify-center py-10 shadow bg-gray-50 dark:bg-gray-700 dark:text-white min-w-screen"
>
    <div class="px-16 bg-gray-50 dark:bg-gray-700 dark:text-white">
        <div
            class="container flex flex-col items-start mx-auto lg:items-center"
        >
            <p
                class="relative flex items-start justify-start w-full text-lg font-bold tracking-wider text-indigo-500 uppercase dark:text-indigo-300 lg:justify-center lg:items-center"
            >
                {$t('home.test.donot')}
            </p>

            <h2
                class="relative flex items-start justify-start w-full max-w-3xl text-5xl font-bold lg:justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="absolute right-0 hidden w-12 h-12 -mt-2 -mr-16 text-indigo-600 dark:text-indigo-400 lg:inline-block"
                    viewBox="0 0 975.036 975.036"
                >
                    <path
                        d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
                    />
                </svg>

                <div class="text-center mb-5">
                    <span
                        class="inline-block w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400  ml-1"
                    />
                    <span
                        class="inline-block w-3 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400  ml-1"
                    />
                    <span
                        class="inline-block w-40 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400 "
                    />
                    <span
                        class="inline-block w-3 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400  ml-1"
                    />
                    <span
                        class="inline-block w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400  ml-1"
                    />
                </div>
            </h2>
            <!-- <div
                class="block w-full h-0.5 max-w-lg mt-6 bg-indigo-100 dark:bg-gray-600 rounded-full"
            /> -->

            <div
                class="items-center justify-center w-full mt-12 mb-4 space-x-4 lg:flex"
            >
                {#each arr as tm}
                    <div
                        class="flex flex-col items-start justify-start w-full h-auto mb-12 lg:w-1/3 lg:mb-0"
                    >
                        <div class="flex items-center justify-center">
                            <div
                                class="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full"
                            >
                                <img
                                    src={tm.img}
                                    class="object-cover w-full h-full"
                                    alt={tm.name}
                                />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center"
                            >
                                <h4
                                    class="font-bold text-gray-800 dark:text-gray-100"
                                >
                                    {tm.name}
                                </h4>
                                <p class="text-gray-600 dark:text-gray-300">
                                    {tm.job}
                                </p>
                            </div>
                        </div>
                        <blockquote
                            class="mt-8 text-lg text-gray-500 dark:text-gray-300"
                        >
                            {tm.body}
                        </blockquote>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
