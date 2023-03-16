<script>
	import { page } from '$app/stores';
	import AudienceView from './AudienceView.svelte';
</script>

{#key $page.url.pathname}
	<AudienceView />
{/key}
