<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	let prompt = '';
	let imageUrl = '';
	let showImage = true;
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

	function triggerReset() {
		socket.emit('reset', $page.params.id);
	}

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
			if (!response.ok) {
				const jsonData = await response.json();
				throw Error(jsonData.message);
			}
			isGenerating = false;
			showImage = true;
			const jsonData = await response.json();
			imageUrl = jsonData.url;
			socket.emit('imageReady', { userId: $page.params.id, imageUrl: imageUrl });
		} catch (err) {
			alert(err);
			isGenerating = false;
		}
	}

	function init(el) {
		el.focus();
	}
</script>

<div
	class="absolute left-0 top-0 w-full h-full overflow-hidden text-black bg-violet-500 md:p-20 lg:p-36"
>
	<div class="p-16">
		<textarea
			class="autofocus w-full h-full overflow-scroll bg-violet-500 top-0 left-0 text-4xl md:text-7xl "
			placeholder="Type your prompt"
			bind:value={prompt}
			use:init
		/>
	</div>

	{#if showImage}
		<div class="absolute top-0 left-0 flex w-100 h-screen">
			<img alt="" class="h-full" src={imageUrl} />
		</div>
	{/if}
	{#if isCelebrating}
		<Confetti />
	{/if}
	{#if isGenerating}
		<div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-10">
			<LoadingSpinnerWave size="200" color="#FFF" unit="px" duration="1s" />
		</div>
	{/if}
	<div
		class="w-full border-none focus:border-none left-0 bottom-0 absolute flex border-t-white border-2"
	>
		<div>Player {$page.params.id}</div>
		<div class="ml-auto">
			<button class="bg-white text-black p-1 md:p-4 z-10 " on:click={triggerReset} type="submit"
				>Reset</button
			>
			<button class="bg-white text-black p-1 md:p-4 z-10 " on:click={submit} type="submit"
				>Generate</button
			>
		</div>
	</div>
</div>

<style>
	textarea {
		border: none;
		overflow: auto;
		outline: none;

		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;

		resize: none; /*remove the resize handle on the bottom right*/
	}
</style>
