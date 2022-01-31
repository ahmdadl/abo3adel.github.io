<script lang="ts">
    import { t, isLoading } from 'svelte-i18n';

    export let name: string;
    export let count = 0;
    export let doubled: number;
    $: {
        doubled = count * 2;
        console.log('doubled is' + doubled);
    }
</script>

<main>
    {#if $isLoading}
        <h1 class="text-3xl uppercase">Loading</h1>
    {:else}
        <h1 class="text-4xl text-red-600">Hello {name.toUpperCase()}!</h1>
        <p>
            Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to
            learn how to build Svelte apps.
        </p>
        <!-- <img src="" /> -->
        <button on:click={() => count++}>toWeee</button>
        <h1 class="text-3xl text-blue-700">
            {count} is doubled to {doubled}
            {$t('app_title')}
        </h1>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>
