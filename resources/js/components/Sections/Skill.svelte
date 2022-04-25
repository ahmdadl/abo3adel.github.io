<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from 'svelte-i18n';
    import ScrollObserver from '../../helpers/ScrollObserver.ts';

    const skills = [
        { title: 'php', value: 95 },
        { title: 'oop', value: 85 },
        { title: 'mysql', value: 80 },
        { title: 'laravel', value: 95 },
        { title: 'livewire', value: 80 },
        { title: 'ionic', value: 85 },
        { title: 'unit Testing', value: 85 },
        { title: 'html', value: 90 },
        { title: 'css', value: 85 },
        { title: 'javascipt', value: 85 },
        { title: 'typescript', value: 85 },
        { title: 'vue', value: 90 },
        { title: 'alpine Js', value: 85 },
        { title: 'tailwindcss', value: 90 },
        { title: 'spa', value: 85 },
        // { title: 'flutter', value: 50 },
    ];

    onMount(() => {
        const observer = new ScrollObserver(
            (entries: IntersectionObserverEntry[]) => {
                const initalValue = 20;
                // loop through all progress bars
                const bars = document.querySelectorAll('.bar');
                bars.forEach((el: HTMLElement) => {
                    const value = parseInt(el.getAttribute('data-value'));
                    if (
                        true === entries[0].isIntersecting &&
                        el.style.width === `${initalValue}%`
                    ) {
                        setTimeout(() => {
                            for (let i = 0; i < value - initalValue; i++) {
                                el.style.width = `${
                                    parseInt(el.style.width.replace('%', '')) +
                                    1
                                }%`;
                            }
                        }, 150);
                        return;
                    }

                    el.style.width = `${initalValue}%`;
                });
            }
        ).observer;

        observer.observe(document.getElementById('skill'));
    });
</script>

<div class="grid w-full grid-cols-1 p-2 md:grid-cols-2 gap-y-7 md:gap-4">
    <div class="text-center">
        <img
            src="/img/myAvatar.png"
            class="w-3/4 p-1 mx-auto border rounded lazy img border-secondary"
            alt="my avatar"
        />
        <p class="mt-2 text-gray-500 capitalize">
            {$t('home.skill.skill_info')}
        </p>
    </div>
    <div>
        {#each skills as { title, value }}
            <div class="flex flex-row w-full my-2">
                <div
                    class="w-3/12 text-white capitalize bg-gray-900 rounded-l rtl:rounded-r small-caps dark:bg-gray-400 dark:text-white"
                >
                    {title}
                </div>
                <div
                    class="w-9/12 bg-gray-300 rounded-r rtl:rounded-l"
                >
                    <div
                        class="text-center bg-teal-900 rounded-r rtl:rounded-l transation duration-[750ms] bar"
                        style="width: 20%"
                        data-value={value}
                    >
                        <div
                            class="inline-block px-2 text-xs text-white bg-teal-700 rounded-full"
                        >
                            {(value || 0) + '%'}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
