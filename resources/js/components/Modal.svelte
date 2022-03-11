<script lang="ts">
    // props
    export let modalIsOpend: boolean = false;
    export let title: string;

    // rest
    import { createEventDispatcher } from 'svelte';
    import { scale } from 'svelte/transition';
    import { t } from 'svelte-i18n';

    const dispatch = createEventDispatcher();
</script>

{#if true === modalIsOpend}
    <div
        class="fixed inset-0 z-20 w-full h-full overflow-y-auto duration-300 bg-black bg-opacity-50"
        transition:scale
    >
        <div
            class="relative mx-2 my-10 mt-20 opacity-100 sm:w-3/4 md:w-1/2 sm:mx-auto"
        >
            {#if modalIsOpend}
                <div
                    class="relative z-20 text-gray-900 bg-white rounded-md shadow-lg dark:bg-gray-700 dark:text-white"
                    transition:scale
                >
                    <header
                        class="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-600 dark:text-white"
                    >
                        <h2 class="font-semibold capitalize small-caps">
                            {title}
                        </h2>
                        <button
                            class="p-2 text-red-600 focus:outline-none dark:text-red-500 hover:text-red-700 dark:hover:text-red-600"
                            on:click|preventDefault={() =>
                                dispatch('modal', { opend: false })}
                        >
                            <svg
                                class="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                                />
                            </svg>
                        </button>
                    </header>

                    <main class="p-2 text-center">
                        <slot />
                    </main>

                    <footer class="flex justify-center p-2">
                        <button
                            type="button"
                            class="w-32 p-2 font-semibold text-white transition-all duration-300 bg-red-500 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring hover:shadow-none"
                            on:click|preventDefault={() =>
                                dispatch('modal', { opend: false })}
                        >
                            {$t('home.project.modal.close')}
                        </button>
                    </footer>
                </div>
            {/if}
        </div>
    </div>
{/if}
