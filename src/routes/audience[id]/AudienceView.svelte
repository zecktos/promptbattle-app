<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';
	import { Wave as LoadingSpinnerWave } from 'svelte-loading-spinners';

	const DEFAULT_PROMPT = '';

	let prompt = DEFAULT_PROMPT;
	let fontSize = 122;
	let selectedImage = '';
	/**
	 * @type {string | never[]}
	 */
	let images = [];
	let showImages = false;
	let showSelectedImg = false;
	let isGenerating = false;
	let isCelebrating = false;

	const socket = io();

	function calcFontSize(promptLength) {
		const max = 350;
		const val = 3500 / promptLength + 100;
		return val < max ? val : max;
	}

	$: fontSize = calcFontSize(prompt.length);
	socket.on('promptChange', (payload) => {
		if (String(payload.userId) === $page.params.id) {
			prompt = payload.prompt;
		}
	});

	socket.on('testMsg', (payload) => {
		console.log("msg:", payload.msg);
	});

	socket.on('imagesReady', (payload) => {
		if (String(payload.userId) === $page.params.id) {
			console.log("images Ready");
			showImages = true;
			images = payload.images;
		}
	});

	socket.on('imgSelected', (payload) => {
		if (String(payload.userId) === $page.params.id) {
			console.log("images Ready");
			showImages = false;
			selectedImage = payload.imageUrl;
			showSelectedImg = true;
		}
	});

	socket.on('celebrate', (winnerId) => {
		if (String(winnerId) === $page.params.id) {
			console.log("celebrate");
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
		images = [];
		selectedImage = '';
		showImages = false;
		showSelectedImg =false;
		isGenerating = false;
		isCelebrating = false;
	}

	function init(el) {
		el.focus();
	}
</script>

<div class="h-full">
	<div class="imgSelection">
		{#if showImages}
			{#each images as imgUrl }
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				src={imgUrl}
				class="selectable"
				alt=""
			/>
			{/each}
		{:else if showSelectedImg}
		<img
			src={selectedImage}
			class="object-contain"
			alt=""
		/>
		{:else}
		<div class=" h-full w-full p-8">
			<p class="text-4xl md:text-7xl break-words" style="font-size: {fontSize}px;">
				{prompt}
			</p>
		</div>
		{/if}
	</div>
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
	p {
		line-height: 1;
	}
	.imgSelection {
		margin-top: auto;
    	margin-bottom: auto;
		display: flex;
		height: 100%;
		justify-content: center;
		flex-direction: row;
	}
	.selectable {
		opacity: 1;
		width: 100%;
		object-fit: contain;
		margin-left: 3px;
		margin-right: 3px;
	}
</style>
