<script lang="ts">
    export let name: string;
	export let count = 0;
	export let doubled;
	$: {
		doubled = count * 2;
		console.log('doubled is' + doubled);
	}
</script>

<main>
	<h1 class="text-4xl text-red-600">Hello {name.toUpperCase()}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<!-- <img src="" /> -->
	<button on:click="{() => count++}">toWeee</button>
	<h1 class="text-3xl text-blue-700">{count} is doubled to {doubled}</h1>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>