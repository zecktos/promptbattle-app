<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="h-full flex flex-col">
	<div class="h-8"><Header /></div>
	<div class="flex-grow overflow-hidden"><slot /></div>
</div>

<style>
</style>
