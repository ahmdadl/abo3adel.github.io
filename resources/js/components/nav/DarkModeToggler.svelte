<script>
    import darkMode from '../../stores/darkMode';
    import { scale } from 'svelte/transition';

    export let addonClassList = '';
</script>

<a
    class="{addonClassList} px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg !text-center dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"
    href={'#'}
    on:click|preventDefault={() => {
        $darkMode = !$darkMode;
    }}
>
    <svg
        class="w-5 h-5"
        aria-label="Apply light theme"
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        {#if $darkMode}
            <path
                transition:scale
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
            />
        {:else}
            <path
                transition:scale
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
        {/if}
    </svg>
</a>
