<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';

	let prompt = '';
	let imageUrl =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

	export let celebrate = false;
	const socket = io();
	socket.on('celebrate', (winnerId) => {
		if (String(winnerId) === $page.params.id) {
			celebrate = true;
			setTimeout(() => {
				celebrate = false;
			}, 4000);
		}
	});

	async function submit() {
		const response = await fetch('/api/txt2img', {
			method: 'POST',
			body: JSON.stringify({ prompt }),
			headers: { 'content-type': 'application/json' }
		});
		const jsonData = await response.json();
		imageUrl = jsonData.data[0].url;
	}

	function init(el) {
		el.focus();
	}
</script>

{#if celebrate}
	<Confetti />
{/if}
<textarea
	class="autofocus w-100 absolute top-0 left-0 h-screen w-screen text-7xl lg:p-36 bg-violet-500"
	placeholder="Type your prompt"
	bind:value={prompt}
	use:init
/>
<img alt="" class="absolute z-20 w-1/2 h-auto pointer-events-none" src={imageUrl} />
<button class="bg-white p-4 z-10 absolute right-0 bottom-0" on:click={submit} type="submit"
	>Generate</button
>
