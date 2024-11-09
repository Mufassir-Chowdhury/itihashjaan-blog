<script>
	import { articleImage, authorImage } from '$lib/pocketbase';
	import { fade } from 'svelte/transition';
	import DOMPurify from 'dompurify';

	let { data } = $props();
	let author = data.props.author;
	let posts = data.props.posts;
</script>

{#if author}
	<div class="min-h-screen bg-amber-50/30 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="mb-12 overflow-hidden rounded-lg border border-amber-100 bg-white shadow-lg"
				in:fade
			>
				<div class="items-center md:flex">
					<div class="md:w-1/3">
						<div class="aspect-square relative overflow-hidden">
							<img
								src="{authorImage}/{author.id}/{author.photo}"
								alt={author.name}
								class="h-full w-full object-cover"
							/>
						</div>
					</div>
					<div class="p-8 md:w-2/3">
						<h1 class="mb-4 text-4xl font-bold text-gray-900">{author.name}</h1>
						<p class="mb-6 text-xl text-gray-600">{@html DOMPurify.sanitize(author.bio)}</p>
						<!-- <p class="text-gray-600 mb-4">
                  <strong>শিক্ষা:</strong> {author.education}
                </p> -->
						<!-- <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">বিশেষ দক্ষতা</h3>
                  <div class="flex flex-wrap gap-2">
                    {#each author.expertise as topic}
                      <span
                        class="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                      >
                        {topic}
                      </span>
                    {/each}
                  </div>
              </div> -->
						<div class="flex gap-4">
							{#if author.facebook}
								<a
									href={author.facebook.toString()}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
								>
									Facebook প্রোফাইল
								</a>
							{/if}
							{#if author.blog}
								<a
									href={author.blog.toString()}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center rounded-md bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 transition-colors hover:bg-orange-200"
								>
									ব্লগ
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>

			{#if posts.length > 0}
				<h2 class="mb-8 text-3xl font-bold text-gray-900">লেখকের সকল নিবন্ধ</h2>
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each posts as post}
						<a href="/articles/{post.slug}" class="group block h-full">
							<article
								class="relative h-full overflow-hidden rounded-lg border border-amber-100 bg-black shadow-sm transition-all duration-200 hover:shadow-md"
							>
								<div class="aspect-[16/9] w-full overflow-hidden">
									<img
										src="{articleImage}/{post.id}/{post.image}"
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 group-hover:opacity-80"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
								</div>

								<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
									<div class="mb-3">
										<span
											class="inline-block rounded-full bg-orange-500/80 px-3 py-1 text-sm font-medium backdrop-blur-sm"
										>
											{post.category}
										</span>
									</div>

									<h3 class="mb-2 text-xl font-bold group-hover:text-amber-200">
										{post.title}
									</h3>
								</div>
							</article>
						</a>
					{/each}
				</div>
			{:else}
				<div class="flex min-h-screen items-center justify-center">
					<p class="text-2xl font-semibold text-gray-600">কোনো নিবন্ধ পাওয়া যায়নি</p>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<p class="text-2xl font-semibold text-gray-600">কোনো লেখক পাওয়া যায়নি</p>
	</div>
{/if}
