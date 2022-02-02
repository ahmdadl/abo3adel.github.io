<script lang="ts">
    import darkMode from "../stores/darkMode";

    // export let page = 'wwew';
    // import darkMode from '../App.svelte';
</script>

<!-- Navigation Start -->
<div
    class="fixed z-50 w-full text-gray-200 transition bg-blue-700 dark:bg-gray-800 ltr:left-0 rtl:right-0"
>
    <div
        class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
    >
        <h1 class="border rounded hover:bg-red-600" on:click|preventDefault="{() => darkMode.set(!$darkMode)}">gh</h1>
    </div>
</div>
