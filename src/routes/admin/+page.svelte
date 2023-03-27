<script>
	import { io } from 'socket.io-client';
	const socket = io();

	function triggerCelebration(userId) {
		socket.emit('celebrate', { userId });
	}
	function triggerGenerate(userId) {
		socket.emit('generate', { userId });
	}
	function triggerReset(userId) {
		socket.emit('reset', { userId });
	}
</script>

<div class="p-5 text-center">
	<div>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerate()}
			>🎬 Generate Images</button
		>
		<div>
			<button class="text-sm p-3  hover:bg-gray-800" on:click={() => triggerGenerate(1)}
				>Player 1</button
			>
			<button class="text-sm p-3  hover:bg-gray-800" on:click={() => triggerGenerate(2)}
				>Player 2</button
			>
		</div>
	</div>
	<div class="mt-8">
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerCelebration(1)}
			>🎉 Winner 1</button
		>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerCelebration(2)}
			>🎉 Winner 2</button
		>
	</div>
	<div class="mt-8">
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerReset()}
			>🧽 Clean</button
		>
		<div>
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerReset(1)}
				>Player 1</button
			>
			<button class="text-sm p-3  hover:bg-gray-800" on:click={() => triggerReset(2)}
				>Player 2</button
			>
		</div>
	</div>
</div>

<style>
</style>
