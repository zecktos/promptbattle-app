<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	const DEFAULT_PROMPT = 'TEst this tis alkjwlkje f lkasdf';

	let prompt = DEFAULT_PROMPT;
	let fontSize = 122;
	let imageUrl = '';
	let showImage = false;
	let isGenerating = false;
	let isCelebrating = false;

	const socket = io();

	function calcFontSize(promptLength) {
		const max = 500;
		const val = 3500 / promptLength + 40;
		return val < max ? val : max;
	}

	$: fontSize = calcFontSize(prompt.length);
	$: console.log(fontSize);

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

<div class="h-full">
	{#if showImage}
		<div class="h-full">
			<img src={imageUrl} class="object-contain w-full h-full" alt="" />
		</div>
	{/if}
	{#if !showImage}
		<div class=" h-full w-full p-8">
			<p class="text-4xl md:text-7xl" style="font-size: {fontSize}px;">
				{prompt}
			</p>
		</div>
	{/if}
</div>

{#if isCelebrating}
	<Confetti />
{/if}
{#if isGenerating}
	<div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-10">
		<LoadingSpinnerWave size="400" color="#6EEBEA" unit="px" duration="1s" />
	</div>
{/if}
<div
	class="w-full border-none focus:border-none left-0 bottom-0 absolute flex border-t-white border-2"
>
	<div>Audience {$page.params.id}</div>
</div>

<style>
</style>
