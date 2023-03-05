<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	let prompt = '';
	let imageUrl = '';
	let showImage = false;
	let isGenerating = false;
	let isCelebrating = false;

	const socket = io();
	socket.on('celebrate', (winnerId) => {
		if (String(winnerId) === $page.params.id) {
			isCelebrating = true;
			setTimeout(() => {
				isCelebrating = false;
			}, 4000);
		}
	});

	socket.on('generate', (winnerId) => {
		if (!winnerId || String(winnerId) === $page.params.id) {
			submit();
		}
	});

	socket.on('reset', (winnerId) => {
		if (!winnerId || String(winnerId) === $page.params.id) {
			reset();
		}
	});

	function reset() {
		prompt = '';
		imageUrl = '';
		showImage = false;
		isGenerating = false;
		isCelebrating = false;
	}

	async function submit() {
		try {
			showImage = false;
			imageUrl = '';
			isGenerating = true;
			const response = await fetch('/api/txt2img', {
				method: 'POST',
				body: JSON.stringify({ prompt }),
				headers: { 'content-type': 'application/json' }
			});

			isGenerating = false;
			showImage = true;
			const jsonData = await response.json();
			imageUrl = jsonData.data[0].url;
		} catch (err) {
			console.error(err);
		}
	}

	function init(el) {
		el.focus();
	}
</script>

{#if isCelebrating}
	<Confetti />
{/if}
{#if isGenerating}
	<div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-10">
		<LoadingSpinnerWave size="200" color="#FFF" unit="px" duration="1s" />
	</div>
{/if}

<div class="absolute left-0 top-0 w-full h-full overflow-hidden">
	<textarea
		class="autofocus w-100 absolute top-0 left-0 h-screen w-screen text-7xl lg:p-36 bg-violet-500"
		placeholder="Type your prompt"
		bind:value={prompt}
		use:init
	/>
	{#if showImage}
		<div class="flex w-100 h-screen">
			<img alt="" class="z-20 h-full mx-auto pointer-events-none" src={imageUrl} />
		</div>
	{/if}
	<div class="absolute right-0 bottom-0">
		<button class="bg-white text-black p-4 z-10 " on:click={reset} type="submit">Reset</button>
		<button class="bg-white text-black p-4 z-10 " on:click={submit} type="submit">Generate</button>
	</div>
</div>
