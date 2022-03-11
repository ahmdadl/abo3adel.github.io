<script lang="ts">
    // props
    export let images: string[] = [];

    // rest
    import { fade } from 'svelte/transition';

    let currentIndex: number = 1;

    function back() {
        if (currentIndex > 1) {
            currentIndex = currentIndex - 1;
        }
    }

    function next() {
        if (currentIndex < images.length) {
            currentIndex = currentIndex + 1;
        } else if (currentIndex <= images.length) {
            currentIndex = images.length - currentIndex + 1;
        }
    }
</script>

<article class="relative flex flex-shrink-0 w-full overflow-hidden shadow-2xl">
    <div
        class="absolute z-20 px-2 text-sm text-center text-white bg-gray-600 rounded-full top-5 right-5"
    >
        <span>{currentIndex}</span>/
        <span>{images ? images.length : 0}</span>
    </div>
    {#each images as image, inx}
        {#if currentIndex === inx + 1}
            <figure class="h-96" transition:fade>
                <img
                    src={image}
                    alt="project screenshot"
                    class="absolute inset-0 z-10 object-cover w-full h-full rounded opacity-[.95]"
                />
            </figure>
        {/if}
    {/each}
    <button
        on:click|preventDefault={back}
        class="absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md left-14 top-1/2 w-11 h-11 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
        <svg
            class="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M15 19l-7-7 7-7"
            />
        </svg>
    </button>
    <button
        on:click|preventDefault={next}
        class="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md right-14 rtl:!left-14 top-1/2 w-11 h-11 hover:bg-gray-200"
    >
        <svg
            class="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M9 5l7 7-7 7"
            />
        </svg>
    </button>
</article>
