<script>
	import { confetti } from '@neoconfetti/svelte';
</script>

<div
	style="position: absolute; left: 50%; top: 30%"
	use:confetti={{
		particleCount: undefined,
		force: 0.7,
		stageWidth: window.innerWidth,
		stageHeight: window.innerHeight,
		colors: ['#ff3e00', '#40b3ff', '#676778']
	}}
/>
