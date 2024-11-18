<script lang="ts">
	import { articleImage } from '$lib/pocketbase';
	import PostSuggestions from '$lib/PostSuggestions.svelte';
	import { fade } from 'svelte/transition';
	import DOMPurify from 'dompurify';

	let { data } = $props();
	let post = data.props.post;
	let categories = data.categories;
	// const url = $derived(window?.location.href);

	import { onMount } from 'svelte';
    let progress = $state(0);

    onMount(() => {
        const updateProgress = () => {
            const article = document.querySelector('article');
            if (!article) return;

            const windowHeight = window.innerHeight;
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const scrollY = window.scrollY;

            // Calculate progress percentage
            const totalDistance = articleHeight + articleTop - windowHeight;
            progress = Math.min(100, Math.max(0, (scrollY / totalDistance) * 100));
        };

        // Add scroll event listener
        window.addEventListener('scroll', updateProgress);
        // Initial calculation
        updateProgress();

        return () => {
            window.removeEventListener('scroll', updateProgress);
        };
    });
</script>

<svelte:head>
	<!-- <meta property="og:url"           content={url}/> -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="ইতিহাসযান" />
	<meta property="og:description" content={post?.title} />
	<meta property="og:image" content="{articleImage}/{post?.id}/{post?.image}" />
</svelte:head>
{#if post}
	<main class="min-h-screen bg-amber-50/30">
		<div class="fixed top-0 left-0 z-50 w-full">
			<div 
				class="h-1 bg-amber-500 transition-all duration-150" 
				style="width: {progress}%"
			></div>
		</div>
		<!-- Hero Section -->
		<div class="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
			<img
				src="{articleImage}/{post.id}/{post.image}"
				alt={post.title}
				class="h-full w-full object-cover"
				loading="lazy"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
			></div>

			<div class="absolute bottom-0 left-0 right-0 px-4 pb-16 text-white sm:px-6 lg:px-8">
				<div class="mx-auto max-w-3xl">
					<div class="mb-6 flex flex-wrap gap-3">
						<a
							href="/articles?category={categories.find(
								(category: { name: string; slug: string }) => category.name == post.category
							)?.slug}"
						>
							<span
								class="inline-block rounded-full bg-orange-500/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
							>
								{post.category}
							</span>
						</a>
					</div>

					<h1 class="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" in:fade>
						{post.title}
					</h1>

					<div class="flex flex-wrap items-center gap-4 text-gray-200">
						<a href="/authors/{post.expand?.author?.id}">
							<div class="flex items-center gap-2">
								<span class="font-medium">{post.expand?.author?.name}</span>
							</div>
						</a>
						<span>•</span>
						<time datetime={post.date}>
							{new Date(post.date).toLocaleDateString('bn-BD', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						<span>•</span>
						<div class="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
								<path
									fill-rule="evenodd"
									d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>{0} প্রদর্শন</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Article Content -->
		<article
			class="mx-auto bg-white bg-opacity-45 max-w-3xl divide-y-2 px-4 py-12 sm:px-6 lg:px-8"
			in:fade={{ delay: 200 }}
		>
			<!-- Description -->
			<div class="mb-12">
				<p class="text-xl leading-relaxed text-gray-700">
					{post.description}
				</p>
			</div>

			<!-- Main Content -->
			<div class="prose prose-lg prose-amber mx-auto">
				{@html DOMPurify.sanitize(post.content)}
			</div>
		</article>

		<!-- Share Section -->
		<div class="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
			<div class="border-t border-gray-200 pt-8">
				<h2 class="mb-4 text-xl font-semibold text-gray-900">এই নিবন্ধটি শেয়ার করুন</h2>
				<div class="flex gap-4">
					<button
						class="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
						onclick={() => {
							const url = window.location.href;
							window.open(
								`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
								'_blank'
							);
						}}
					>
						ফেসবুক
					</button>
					<button
						class="rounded-full bg-sky-500 px-6 py-2 text-white transition-colors hover:bg-sky-600"
						onclick={() => {
							const url = window.location.href;
							const text = `${post.title}\n`;
							window.open(
								`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
								'_blank'
							);
						}}
					>
						টুইটার
					</button>
				</div>
			</div>
		</div>
		{#await data.props.suggestions then suggestions}
			<PostSuggestions {suggestions} />
		{:catch error}
			<p class="text-2xl font-semibold text-gray-600">কোনো নিবন্ধ পাওয়া যায়নি</p>
		{/await}
	</main>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<p class="text-2xl font-semibold text-gray-600">কোনো নিবন্ধ পাওয়া যায়নি</p>
	</div>
{/if}

<style>
	:global(.prose) {
		max-width: 100%;
	}

	:global(.prose img) {
		@apply mx-auto rounded-lg shadow-md;
	}

	:global(.prose h2) {
		@apply mb-6 mt-12 text-3xl font-bold;
	}

	:global(.prose h3) {
		@apply mb-4 mt-8 text-2xl font-semibold;
	}

	:global(.prose p) {
		@apply mb-6 leading-relaxed;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-amber-500 bg-amber-50 p-4 italic;
	}
</style>
