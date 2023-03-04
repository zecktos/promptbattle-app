<script>
	import { io } from 'socket.io-client';
	const socket = io();

	function setWinner(userId) {
		socket.emit('winner', userId);
	}
</script>

<div>
	<h2 class="text-lg">Select winner</h2>
	<button class="text-xl bg-amber-400 hover:bg-amber-500 p-3 " on:click={() => setWinner(1)}
		>Contestant 1</button
	>
	<button class="text-xl  bg-amber-400 hover:bg-amber-500 p-3" on:click={() => setWinner(2)}
		>Contestant 2</button
	>
</div>

<style>
</style>
