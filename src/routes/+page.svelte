<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Prompt Battle" />
</svelte:head>

<section class="text-2xl">
	<h1 class="text-center mb-4 text-2xl md:text-3xl">Screens</h1>
	<div class="grid gap-3">
		<a href="/admin" class="border-2 text-center p-3 bg-blue-900">Admin</a>
		<a href="/player1" class="border-2 text-center p-3 bg-blue-900">Player 1</a>
		<a href="/player2" class="border-2 text-center p-3 bg-blue-900">Player 2</a>
	</div>
</section>

<style>
	section {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
