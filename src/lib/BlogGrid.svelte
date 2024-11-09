<script lang="ts">
	import BlogPreviewCard from './BlogPreviewCard.svelte';
	import type { Post } from '$lib/types/post';

	export let posts: Post[] = [];
	export let selectedCategory: string | null = null;

	$: filteredPosts = posts.filter((post) => {
		if (selectedCategory && post.category !== selectedCategory) return false;
		return true;
	});
</script>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="grid auto-rows-auto grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
	>
		{#each filteredPosts as post}
			<div
				class="{post.featured ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'} 
          transition-transform duration-300 hover:scale-[1.02]"
			>
				<BlogPreviewCard {post} />
			</div>
		{/each}
	</div>
</section>

<style>
	.grid > div {
		animation: fadeIn 0.5s ease-out forwards;
		opacity: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Stagger the animation of grid items */
	.grid > div:nth-child(1) {
		animation-delay: 0.1s;
	}
	.grid > div:nth-child(2) {
		animation-delay: 0.2s;
	}
	.grid > div:nth-child(3) {
		animation-delay: 0.3s;
	}
	.grid > div:nth-child(4) {
		animation-delay: 0.4s;
	}
	.grid > div:nth-child(5) {
		animation-delay: 0.5s;
	}
</style>
