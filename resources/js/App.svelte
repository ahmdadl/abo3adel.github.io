<script lang="ts">
    import { t, isLoading, locale, locales } from 'svelte-i18n';
    import Nav from './components/Nav.svelte';
    import Header from './components/Header.svelte';
    import Section from './components/Section.svelte';

    // sections
    import About from './components/Sections/About.svelte';
    import Skill from './components/Sections/Skill.svelte';

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

        <div id="container">
            <Header />

            <Section sectionId="about">
                <About />
            </Section>

            <Section sectionId="skill">
                <Skill />
            </Section>
        </div>
    {/if}
</main>

<style>
    /* main {
    } */
</style>
