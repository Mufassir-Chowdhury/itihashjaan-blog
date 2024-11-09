<script lang="ts">
	import BlogPreviewCard from './BlogPreviewCard.svelte';
	import type { Post } from './types/post';

	export let suggestions: Post[] = [];
</script>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="grid auto-rows-auto grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
	>
		{#each suggestions as post}
			<div
				class="{post.featured ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'} 
          transition-transform duration-300 hover:scale-[1.02]"
			>
				<BlogPreviewCard {post} />
			</div>
		{/each}
	</div>
</section>
