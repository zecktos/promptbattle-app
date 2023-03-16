<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	const DEFAULT_PROMPT = '';

	let prompt = DEFAULT_PROMPT;
	let imageUrl = '';
	let showImage = true;
	let isGenerating = false;
	let isCelebrating = false;

	const socket = io();

	socket.on('promptChange', (payload) => {
		if (String(payload.userId) === $page.params.id) {
			prompt = payload.prompt;
		}
	});

	socket.on('imageReady', (payload) => {
		if (String(payload.userId) === $page.params.id) {
			showImage = true;
			imageUrl = payload.imageUrl;
		}
	});

	socket.on('celebrate', (winnerId) => {
		if (String(winnerId) === $page.params.id) {
			isCelebrating = true;
			setTimeout(() => {
				isCelebrating = false;
			}, 4000);
		}
	});

	socket.on('reset', (winnerId) => {
		if (!winnerId || String(winnerId) === $page.params.id) {
			reset();
		}
	});

	function reset() {
		prompt = DEFAULT_PROMPT;
		imageUrl = '';
		showImage = false;
		isGenerating = false;
		isCelebrating = false;
	}

	function init(el) {
		el.focus();
	}
</script>

<div
	class="absolute left-0 top-0 w-full h-full overflow-hidden text-black bg-violet-500 md:p-20 lg:p-36"
>
	<div class="p-16">
		<span
			class="prompt-span autofocus w-full h-full overflow-scroll bg-violet-500 top-0 left-0 text-4xl md:text-7xl "
			use:init>{prompt}</span
		>
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
		<div>Audience {$page.params.id}</div>
	</div>
</div>

<style>
	.prompt-span {
		border: none;
		overflow: auto;
		outline: none;

		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;

		resize: none; /*remove the resize handle on the bottom right*/
	}
</style>
