<script>
	import BlogGrid from '$lib/BlogGrid.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let posts = $derived(data.props.posts);
	let category = $derived(data.props.category);
</script>

<main class="min-h-screen bg-amber-50/30">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<header class="py-16 text-center" in:fade>
			{#if category}
				<h1 class="mb-6 text-5xl font-bold text-gray-900">{category}</h1>
			{:else}
				<h1 class="mb-6 text-5xl font-bold text-gray-900">সব নিবন্ধ</h1>
			{/if}
		</header>

		<BlogGrid {posts} />
	</div>
</main>
