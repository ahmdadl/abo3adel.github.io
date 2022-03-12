<script lang="ts">
    export let sectionId: string; // required
    export let showTilte: boolean = true;

    import { t } from 'svelte-i18n';
</script>

{@html `<!-- ${sectionId} Start -->`}

<section
    id={sectionId}
    class={`w-full min-h-screen py-4 text-center text-gray-700 dark:text-white ${sectionId}-section`}
>
    {#if showTilte}
        <div>
            <h1 class="text-2xl">{$t(`home.title.${sectionId}`)}</h1>
            <div class="text-center mb-5">
                <span
                    class="inline-block w-1 h-1 rounded-full bg-gray-600 dark:bg-gray-400  ml-1"
                />
                <span
                    class="inline-block w-3 h-1 rounded-full bg-gray-600 dark:bg-gray-400  ml-1"
                />
                <span
                    class="inline-block w-40 h-1 rounded-full bg-gray-600 dark:bg-gray-400 "
                />
                <span
                    class="inline-block w-3 h-1 rounded-full bg-gray-600 dark:bg-gray-400  ml-1"
                />
                <span
                    class="inline-block w-1 h-1 rounded-full bg-gray-600 dark:bg-gray-400  ml-1"
                />
            </div>
        </div>
    {/if}

    <slot />
</section>
{@html `<!-- ${sectionId} Ends -->`}
