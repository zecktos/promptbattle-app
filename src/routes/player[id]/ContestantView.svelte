<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	let prompt = '';
	let imageUrl = 'https://picsum.photos/300';
	let showImage = false;
	let isGenerating = false;
	let isCelebrating = false;

	$: {
		socket.emit('promptChange', { userId: $page.params.id, prompt: prompt });
	}

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

<div class="h-full p-6">
	<div class="h-full flex flex-col md:flex-row">
		{#if showImage}
			<img
				src={imageUrl}
				class="object-contain w-full h-full flex-basis-40 basis-2/5 mr-4"
				alt=""
			/>
		{/if}
		<div class="flex-grow p-8 border-2 border-turquoise">
			<textarea
				class="autofocus w-full bg-inherit text-turquoise text-4xl md:text-7xl"
				placeholder="Please type your prompt!"
				bind:value={prompt}
				use:init
			/>
		</div>
	</div>

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
		<!--
		<div class="ml-auto">
			<button class="bg-white text-black p-1 md:p-4 z-10 " on:click={triggerReset} type="submit"
				>Reset</button
			>
			<button class="bg-white text-black p-1 md:p-4 z-10 " on:click={submit} type="submit"
				>Generate</button
			>
		</div>
		 -->
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

		height: 50vh;
	}
</style>
