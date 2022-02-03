<script lang="ts">
    import { t, isLoading, locale, locales } from 'svelte-i18n';
    import Nav from './components/Nav.svelte';


    let name: string = 'World';
    let count = 0;
    let doubled: number;
    $: {
        doubled = count * 2;
        console.log('doubled is' + doubled);
    }

    

</script>

<main>
    {#if $isLoading}
        <h1 class="text-3xl uppercase">Loading</h1>
    {:else}
        <Nav />

        <h1 class="text-4xl text-red-600">Hello {name.toUpperCase()}!</h1>
        <select bind:value={$locale}>
            {#each $locales as locale}
                <option value={locale}>{locale}</option>
            {/each}
        </select>
        <p>
            Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to
            learn how to build Svelte apps.
        </p>
        <!-- <img src="" /> -->
        <button on:click={() => count++}>toWeee</button>
        <h1 class="text-3xl text-blue-700">
            {count} is doubled to {doubled}
            {$t('app_title').toUpperCase()} 
        </h1>
    {/if}
</main>

<style>
    main {
    }
</style>
