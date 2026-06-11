<script>
	import { io } from 'socket.io-client';
	const socket = io();

	function triggerCelebration(userId) {
		socket.emit('celebrate', { userId });
	}
	function triggerGenerateDalle(userId) {
		socket.emit('generate', { userId: userId, engine: 'dalle' });
	}
	function triggerGenerateSD(userId) {
		socket.emit('generate', { userId: userId, engine: 'sd' });
	}

	function triggerReset(userId) {
		socket.emit('reset', { userId });
	}
</script>

<div class="p-5 text-center">
	<div>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerateDalle(null)}
			>🎬 Generate Images OpenAI</button
		>
		<div>
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerGenerateDalle(1)}
				>Player 1</button
			>
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerGenerateDalle(2)}
				>Player 2</button
			>
		</div>
	</div>
	<div>
		<button class="text-xl p-3 border hover:bg-gray-800" on:click={() => triggerGenerateSD(null)}
			>🎬 Generate Images ComfyUI</button
		>
		<div>
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerGenerateSD(1)}
				>Player 1</button
			>
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerGenerateSD(2)}
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
			<button class="text-sm p-3 hover:bg-gray-800" on:click={() => triggerReset(2)}
				>Player 2</button
			>
		</div>
	</div>
</div>

<style>
</style>
