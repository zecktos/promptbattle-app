<script>
	import { io } from 'socket.io-client';
	import Confetti from '../Confetti.svelte';
	export let celebrate = false;
	const socket = io();
	socket.on('winner', (winnerId) => {
		if (winnerId === 1) {
			celebrate = true;
			setTimeout(() => {
				celebrate = false;
			}, 4000);
		}
	});
</script>

{#if celebrate}
	<Confetti />
{/if}
