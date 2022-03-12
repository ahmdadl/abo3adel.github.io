<script lang="ts">
    import { t } from 'svelte-i18n';
    import { fade } from 'svelte/transition';
    import LangSelector from './nav/LangSelector.svelte';
    import DarkModeToggler from './nav/DarkModeToggler.svelte';
    import tabStore from '../stores/tab';
    import { scrollto } from 'svelte-scrollto';

    let opend = false;

    let navLinks = [
        { icon: 'blog', txt: 'blog' },
        { icon: 'address-book', txt: 'contact_me' },
        { icon: 'project-diagram', txt: 'my_projects' },
    ];
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
            <DarkModeToggler addonClassList="md:hidden" />

            {#each navLinks as { icon, txt }}
                <a
                    class="px-4 py-2 mt-2 text-sm font-semibold capitalize bg-transparent rounded-lg focus:outline-none focus:shadow-outline md:mt-0 md:ml-4 {$tabStore ===
                    txt
                        ? 'text-white bg-blue-800/50 dark:bg-gray-700/60 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active'
                        : 'dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200'}"
                    href={'#' + txt}
                    use:scrollto={`#${txt}`}
                    on:click|preventDefault={() => {
                        $tabStore = txt;
                    }}
                >
                    <i class="fas fa fa-{icon}" />
                    <span>{$t(`nav.${txt}`)}</span>
                </a>
            {/each}

            <!-- language switcher -->
            <LangSelector />
        </nav>
        <DarkModeToggler addonClassList="hidden md:inline-block" />

        <!-- <h1 class="border rounded hover:bg-red-600" on:click|preventDefault="{() => darkMode.set(!$darkMode)}">gh</h1> -->
    </div>
</div>
