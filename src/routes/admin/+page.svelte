<script>
	import { io } from 'socket.io-client';
	const socket = io();

	function setWinner(userId) {
		socket.emit('winner', userId);
	}
</script>

<div>
	<h2>Select winner</h2>
	<button on:click={() => setWinner(1)}>Contestant 1</button>
	<button on:click={() => setWinner(2)}>Contestant 2</button>
</div>
