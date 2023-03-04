<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	import { page } from '$app/stores';

	let prompt = '';
	let imageUrl = '';
	export let celebrate = false;
	const socket = io();
	socket.on('winner', (winnerId) => {
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
</script>

{#if celebrate}
	<Confetti />
{/if}
<input bind:value={prompt} />
<img src={imageUrl} />
<button on:click={submit} type="submit">Submit</button>
