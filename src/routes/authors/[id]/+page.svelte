<script>
    import { articleImage, authorImage } from '$lib/pocketbase';
    import { fade } from 'svelte/transition';
    import DOMPurify from 'dompurify';

    let { data } = $props();
</script>

{#await data.props.author}
    <!-- Author Profile Skeleton -->
    <div class="min-h-screen bg-amber-50/30 py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mb-12 overflow-hidden rounded-lg border border-amber-100 bg-white shadow-lg">
                <div class="items-center md:flex">
                    <div class="md:w-1/3">
                        <div class="aspect-square relative overflow-hidden">
                            <div class="h-full w-full animate-pulse bg-gray-200"></div>
                        </div>
                    </div>
                    <div class="p-8 md:w-2/3">
                        <div class="mb-4 h-10 w-2/3 animate-pulse rounded-lg bg-gray-200"></div>
                        <div class="mb-6 space-y-3">
                            <div class="h-5 w-full animate-pulse rounded bg-gray-200"></div>
                            <div class="h-5 w-full animate-pulse rounded bg-gray-200"></div>
                            <div class="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div class="flex gap-4">
                            <div class="h-10 w-32 animate-pulse rounded-md bg-gray-200"></div>
                            <div class="h-10 w-32 animate-pulse rounded-md bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Posts Section Skeleton -->
            <div class="h-10 w-64 animate-pulse rounded-lg bg-gray-200 mb-8"></div>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {#each Array(6) as _}
                    <div class="relative h-full overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm">
                        <div class="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
                        <div class="p-6">
                            <div class="mb-3">
                                <div class="h-6 w-24 animate-pulse rounded-full bg-gray-200"></div>
                            </div>
                            <div class="space-y-2">
                                <div class="h-6 w-full animate-pulse rounded bg-gray-200"></div>
                                <div class="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{:then author}
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

                {#await data.props.posts}
                    <!-- Posts Loading Skeleton -->
                    <div class="h-10 w-64 animate-pulse rounded-lg bg-gray-200 mb-8"></div>
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {#each Array(6) as _}
                            <div class="relative h-full overflow-hidden rounded-lg border border-amber-100 bg-black shadow-sm">
                                <div class="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
                                <div class="absolute bottom-0 left-0 right-0 p-6">
                                    <div class="mb-3">
                                        <div class="h-6 w-24 animate-pulse rounded-full bg-gray-200"></div>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="h-6 w-full animate-pulse rounded bg-gray-200"></div>
                                        <div class="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:then posts}
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
                                                <span class="inline-block rounded-full bg-orange-500/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
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
                {:catch error}
                    <div class="text-center py-12">
                        <p class="text-2xl font-semibold text-gray-600">কোনো নিবন্ধ লোড করা যায়নি</p>
                    </div>
                {/await}
            </div>
        </div>
    {:else}
        <div class="flex min-h-screen items-center justify-center">
            <p class="text-2xl font-semibold text-gray-600">কোনো লেখক পাওয়া যায়নি</p>
        </div>
    {/if}
{:catch error}
    <div class="flex min-h-screen items-center justify-center">
        <p class="text-2xl font-semibold text-gray-600">লেখকের তথ্য লোড করা যায়নি</p>
    </div>
{/await}

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