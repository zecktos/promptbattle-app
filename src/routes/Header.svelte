<script>
	const engine =
		import.meta.env.VITE_IMAGE_ENGINE === 'sd'
			? 'Stable Diffusion'
			: import.meta.env.VITE_IMAGE_ENGINE === 'dalle'
			? 'DALL-E'
			: '';
</script>

<header class="fixed flex h-12 z-20 text-sm md:text-xl uppercase">
	<a class="w-screen no-underline hover:no-underline" href="/"
		><h1 class="text-center flex-grow">Prompt Battle ({engine})</h1></a
	>
</header>

<style>
</style>
