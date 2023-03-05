<script>
	import { io } from 'socket.io-client';
	const socket = io();

	function triggerCelebration(userId) {
		socket.emit('celebrate', userId);
	}
	function triggerGenerate(userId) {
		socket.emit('generate', userId);
	}
	function triggerReset(userId) {
		socket.emit('reset', userId);
	}
</script>

<div>
	<div>
		<h2 class="text-lg">Generate Images</h2>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerate()}
			>Both players</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerate(1)}
			>Player 1</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerate(2)}
			>Player 2</button
		>
	</div>
	<div class="mt-8">
		<h2 class="text-lg">Celebrate winner</h2>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerCelebration(1)}
			>Player 1</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerCelebration(2)}
			>Player 2</button
		>
	</div>
	<div class="mt-8">
		<h2 class="text-lg">Reset</h2>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerReset(1)}
			>Player 1</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerReset(2)}
			>Player 2</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerReset()}
			>Both players</button
		>
	</div>
</div>

<style>
</style>
