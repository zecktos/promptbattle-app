<script>
	import { page } from '$app/stores';
	import ContestantView from './ContestantView.svelte';
</script>

{#key $page.url.pathname}
	<ContestantView />
{/key}
