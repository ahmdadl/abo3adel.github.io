<script lang="ts">
    import { t, isLoading, locale, locales } from 'svelte-i18n';
    import Nav from './components/Nav.svelte';
    import Header from './components/Header.svelte';

    let scroll = 0;
</script>

<svelte:window
    on:scroll={() => {
        scroll = document.documentElement.scrollTop;
    }}
/>

<main>
    {#if $isLoading}
        <h1 class="text-3xl uppercase">Loading</h1>
    {:else}
        <Nav />

        <div id='container'>
            <Header />

            {#each ['blog', 'contact', 'my_projects'] as i}
                <div
                    id={i}
                    class="w-full h-screen text-center bg-red-600"
                >
                    <h1 class="py-10 my-auto text-6xl">{i} {scroll}</h1>
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
    /* main {
    } */
</style>
