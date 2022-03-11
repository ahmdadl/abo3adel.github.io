<script lang="ts">
    import { t } from 'svelte-i18n';

    const features = [
        {
            title: $t('home.about.responsive'),
            icon: 'tablet-alt',
            txt: $t('home.about.responsive_txt'),
        },
        {
            title: $t('home.about.dynamic'),
            icon: 'rocket',
            txt: $t('home.about.dynamic_txt'),
        },
        {
            title: $t('home.about.tested'),
            icon: 'cog',
            txt: $t('home.about.tested_txt'),
        },
        {
            title: $t('home.about.organized'),
            icon: 'code',
            txt: $t('home.about.organized_txt'),
        },
        {
            title: $t('home.about.up_to_date'),
            icon: 'laptop-code',
            txt: $t('home.about.up_to_date_txt'),
        },
        {
            title: $t('home.about.multi_language'),
            icon: 'language',
            txt: $t('home.about.multi_language_txt'),
        },
    ];
</script>

<div
    class="grid h-full grid-cols-1 p-2 text-center sm:grid-cols-2 sm:gap-3 md:grid-cols-3 sm:text-left sm:rtl:text-right"
>
    {#each features as { title, icon, txt }}
        <div
            class="p-2 mb-3 transition duration-300 border border-gray-500 rounded shadow cursor-pointer dark:shadow-black pros hover:shadow-lg hover:bg-blue-600 hover:text-white dark:hover:bg-gray-700 group"
        >
            <div class="py-1 mx-auto text-lg cursor-pointer wyg">
                <i class={'fas fa-2x fa-' + icon} />
            </div>
            <h3 class="mt-3 text-xl capitalize d-block small-caps">
                {title}
            </h3>
            <span
                class="text-gray-600 dark:text-gray-400 group-hover:text-white"
                >{txt}
            </span>
        </div>
    {/each}
</div>
