<script lang="ts">
    import darkMode from '../stores/darkMode';
    import { t } from 'svelte-i18n';
    import { fade } from 'svelte/transition';
    import LangSelector from './nav/LangSelector.svelte';

    let opend = false;
    let tap = 'no';
    let navLinks = ['blog', 'contact'];
</script>

<!-- Navigation Start -->
<div
    class="fixed z-50 w-full text-gray-200 transition bg-blue-700 dark:bg-gray-800 ltr:left-0 rtl:right-0"
>
    <div
        class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
    >
        <div class="flex flex-row items-center justify-between p-4">
            <a
                href="/"
                class="text-lg font-semibold tracking-widest text-white whitespace-pre rounded-lg focus:outline-none focus:shadow-outline"
                style="font-variant: small-caps"
            >
                {$t('nav.portfolio')}
            </a>
            <button
                class="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                on:click|preventDefault={() => {
                    opend = !opend;
                }}
            >
                <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                    {#if opend}
                        <path
                            transition:fade
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    {:else}
                        <path
                            transition:fade
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                        />
                    {/if}
                </svg>
            </button>
        </div>
        <nav
            class="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-center md:flex-row {opend
                ? 'flex bg-blue-700 dark:bg-gray-800'
                : 'hidden bg-[transparent]'}"
        >
            <!-- darkMode toggler -->
            <a
                class="md:hidden px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg !text-center dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"
                href={'#'}
                on:click|preventDefault={() => {
                    $darkMode = !$darkMode;
                }}
            >
                {#if $darkMode}
                    <svg
                        transition:fade
                        class="w-5 h-5"
                        aria-label="Apply light theme"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                {:else}
                    <svg
                        style="display: none"
                        class="w-5 h-5"
                        aria-label="Apply dark theme"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        />
                    </svg>
                {/if}
            </a>

            {#each navLinks as navLink}
                <a
                    class="px-4 py-2 mt-2 text-sm font-semibold capitalize bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline {tap ===
                    navLink
                        ? 'text-gray-900 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active'
                        : ''}"
                    href={'#' + navLink}
                >
                    <i class="fas fa fa-address-book" />
                    <span>{$t(`nav.${navLink}`)}</span>
                </a>
            {/each}

            <!-- language switcher -->
            <LangSelector />
        </nav>
        <!-- <h1 class="border rounded hover:bg-red-600" on:click|preventDefault="{() => darkMode.set(!$darkMode)}">gh</h1> -->
    </div>
</div>
