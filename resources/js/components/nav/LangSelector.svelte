<script lang="ts">
    import { slide } from 'svelte/transition';
    import { t, locale, isLoading, locales } from 'svelte-i18n';
    import { clickOutside } from '../../plugins/clickOutside';

    let open = false;

    // document element scripts
    locale.subscribe((locale) => {
        if ($isLoading) return;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    });
</script>

<div class="relative">
    <button
        on:click|preventDefault={() => {
            open = !open;
        }}
        class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left capitalize bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    >
        <i class="fas fa fa-language" />
        <span>{$t('nav.language')}</span>
        <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 {open
                ? 'rotate-180'
                : 'rotate-0'}"
        >
            <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
            />
        </svg>
    </button>

    {#if open}
        <div
            transition:slide
            use:clickOutside
            on:click_outside={() => {
                open = false;
            }}
            class="absolute right-0 w-full mt-2 origin-top-right bg-gray-700 rounded-md shadow-lg md:w-48"
        >
            <div
                class="px-2 py-2 bg-blue-700 rounded-md shadow dark:shadow-black dark:bg-gray-800"
            >
                {#each $locales as loc}
                    <a
                        class="block px-4 py-2 my-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline {$locale ===
                        loc
                            ? 'bg-green-700 hover:bg-teal-500 focus:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:bg-teal-700'
                            : ''}"
                        href={'#'}
                        on:click|preventDefault={() => {
                            if ($locale === loc) return;
                            $locale = loc;
                            location.reload();
                        }}
                        >{loc
                            .replace('en', 'English')
                            .replace('ar', 'العربية')}</a
                    >
                {/each}
            </div>
        </div>
    {/if}
</div>
