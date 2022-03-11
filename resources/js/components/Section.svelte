<script lang="ts">
    import { t } from 'svelte-i18n';
    export let sectionId = '';
</script>

{@html `<!-- ${sectionId} Start -->`}

<section
    id={sectionId}
    class={`w-full py-4 text-center text-gray-700 dark:text-white ${sectionId}-section`}
>
    <div>
        <h1 class="text-2xl">{$t(`home.title.${sectionId}`)}</h1>
        <hr class="w-1/4 px-5 mx-auto mt-1 border border-gray-500 rounded" />
    </div>

    <slot />
</section>
{@html `<!-- ${sectionId} Ends -->`}