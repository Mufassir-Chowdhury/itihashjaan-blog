<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<!-- During development, you might want to show more details -->
{#if import.meta.env.DEV}
	<pre>{JSON.stringify($page.error, null, 2)}</pre>
{/if}
