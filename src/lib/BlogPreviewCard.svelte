<script lang="ts">
	import { articleImage } from './pocketbase';
	import type { Post } from './types/post';

	export let post: Post;
	let featured = post.featured;
</script>

<a href="/articles/{post.slug}" class="group block h-full">
	<article
		class="relative h-full overflow-hidden rounded-lg border border-amber-100 bg-white md:bg-none shadow-sm transition-all duration-200 hover:shadow-md"
	>
		<div class="aspect-video {featured ? 'aspect-[16/9]' : 'aspect-[16/9]'} w-full overflow-hidden">
			<img
				src="{articleImage}/{post.id}/{post.image}"
				alt={post.title}
				class="h-full w-full bg-black object-cover transition-transform duration-200 group-hover:scale-105 group-hover:opacity-80"
				loading="lazy"
			/>
			<!-- Gradient overlay -->
			<div class="md:absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		</div>

		<div class="md:absolute bottom-0 left-0 right-0 p-6 md:text-white">
			<div class="mb-3 flex flex-wrap gap-2">
				<span
					class="inline-block rounded-full bg-orange-500/80 px-3 py-1 text-sm font-medium backdrop-blur-sm"
				>
					{post.category}
				</span>
			</div>

			<h2
				class="mb-2 text-xl {featured
					? 'text-2xl md:text-3xl'
					: ''} font-bold group-hover:text-amber-200"
			>
				{post.title}
			</h2>

			{#if featured}
				<p class="mb-4 line-clamp-3 font-light text-gray-700 md:text-gray-200">
					{post.description}
				</p>
			{/if}

			<div class="flex items-center justify-between text-sm font-semibold text-gray-500 md:text-gray-300">
				<span>{post.expand?.author?.name}</span>
				<time datetime={post.date}>
					{new Date(post.date).toLocaleDateString('bn-BD', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			</div>
		</div>
	</article>
</a>
