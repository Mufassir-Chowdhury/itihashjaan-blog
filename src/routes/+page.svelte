<script lang="ts">
	import BlogGrid from '$lib/BlogGrid.svelte';
	import { fade } from 'svelte/transition';
	let { data } = $props();

	let selectedCategory: string | null = $state(null);
</script>

<main class="min-h-screen bg-amber-50/30">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<header class="py-16 text-center" in:fade>
			<h1 class="mb-6 text-5xl font-bold text-gray-900">ইতিহাসযান</h1>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">সত্ত্বা, বর্তমানতা ও ইতিহাস</p>
		</header>
		{#await data.props.posts}
			<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<!-- Skeleton Categories -->
				<div class="mb-8 flex flex-wrap justify-center gap-4">
					<div class="space-x-2">
						{#each Array(4) as _}
							<div class="inline-block h-10 w-24 animate-pulse rounded-full bg-orange-100"></div>
						{/each}
					</div>
				</div>

				<!-- Skeleton Grid -->
				<div class="grid auto-rows-auto grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
					<!-- Featured Post Skeleton -->
					<div class="md:col-span-2 md:row-span-2">
						<div class="h-full overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm">
							<div class="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
							<div class="p-6">
								<div class="mb-3">
									<div class="h-6 w-24 rounded-full bg-gray-200"></div>
								</div>
								<div class="mb-2 h-8 w-3/4 rounded bg-gray-200"></div>
								<div class="mb-4 space-y-2">
									<div class="h-4 w-full rounded bg-gray-200"></div>
									<div class="h-4 w-5/6 rounded bg-gray-200"></div>
								</div>
								<div class="flex items-center justify-between">
									<div class="h-4 w-24 rounded bg-gray-200"></div>
									<div class="h-4 w-32 rounded bg-gray-200"></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Regular Posts Skeletons -->
					{#each Array(5) as _}
						<div class="col-span-1 row-span-1">
							<div class="h-full overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm">
								<div class="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
								<div class="p-6">
									<div class="mb-3">
										<div class="h-6 w-20 rounded-full bg-gray-200"></div>
									</div>
									<div class="mb-2 h-6 w-2/3 rounded bg-gray-200"></div>
									<div class="flex items-center justify-between">
										<div class="h-4 w-20 rounded bg-gray-200"></div>
										<div class="h-4 w-28 rounded bg-gray-200"></div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{:then posts}
			{@const categories = posts
				?.map((post) => post.category)
				.filter((category, i, arr) => arr.indexOf(category) === i)}
			<!-- Filters -->
			{#if categories}
				<div class="mb-8 flex flex-wrap justify-center gap-4">
					<div class="space-x-2">
						{#each categories as category}
							<button
								class="rounded-full px-4 py-2 text-sm font-medium transition-colors
					{selectedCategory === category
									? 'bg-orange-600 text-white'
									: 'bg-orange-100 text-orange-800 hover:bg-orange-200'}"
								onclick={() => (selectedCategory = selectedCategory === category ? null : category)}
							>
								{category}
							</button>
						{/each}
					</div>
				</div>
			{/if}
			{#if posts}
				<BlogGrid {posts} {selectedCategory} />
			{/if}
		{:catch error}
			<p class="text-2xl font-semibold text-gray-600">কোনো নিবন্ধ পাওয়া যায়নি</p>
			<p class="text-2xl font-semibold text-gray-600">{error.message}</p>
		{/await}
	</div>
</main>
