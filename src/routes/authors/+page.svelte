<script>
	import { authorImage } from '$lib/pocketbase';
	import { fade } from 'svelte/transition';
	import DOMPurify from 'dompurify';
	let { data } = $props();
	// let authors = data.props.authors;
</script>

<div class="min-h-screen bg-amber-50/30 py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<header class="mb-16 text-center" in:fade>
			<h1 class="mb-6 text-4xl font-bold text-gray-900">লেখকবৃন্দ</h1>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">
				ইতিহাসযানের নিবেদিত লেখক ও গবেষকদের সাথে পরিচিত হোন
			</p>
		</header>

		{#await data.props.authors}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _, i}
					<div class="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm h-full animate-pulse">
						<div class="aspect-square relative overflow-hidden bg-gray-200"></div>
						<div class="p-6">
							<div class="mb-2 h-8 w-3/4 rounded bg-gray-200"></div>
							<div class="space-y-2">
								<div class="h-4 w-full rounded bg-gray-200"></div>
								<div class="h-4 w-5/6 rounded bg-gray-200"></div>
								<div class="h-4 w-4/6 rounded bg-gray-200"></div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:then authors}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each authors as author}
					<a href="/authors/{author.id}">
						<div class="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm h-full">
							<div class="aspect-square relative overflow-hidden">
								<img
									src="{authorImage}/{author.id}/{author.photo}"
									alt={author.name}
									class="aspect-[16/9] h-full w-full object-cover"
									loading="lazy"
								/>
							</div>
							<div class="p-6">
								<h2 class="mb-2 text-2xl font-bold text-gray-900">
									{author.name}
								</h2>
								<p class="mb-4 line-clamp-3 text-gray-600">{@html DOMPurify.sanitize(author.bio)}</p>
								<div class="flex gap-4"></div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-2xl font-semibold text-gray-600">কোনো লেখক পাওয়া যায়নি</p>
			<p class="text-2xl font-semibold text-gray-600">{error.message}</p>
		{/await}
	</div>
</div>

<style>
    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .5;
        }
    }
</style>