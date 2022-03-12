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
            <hr
                class="w-1/4 px-5 mx-auto mt-1 border border-gray-500 rounded"
            />
        </div>
    {/if}

    <slot />
</section>
{@html `<!-- ${sectionId} Ends -->`}
