
<script>
    import { authorImage } from '$lib/pocketbase';
import { fade } from 'svelte/transition';
    let { data } = $props();
    let authors = data.props.authors;
  </script>
  

  
  <div class="min-h-screen bg-amber-50/30 py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-16" in:fade>
        <h1 class="text-4xl font-bold text-gray-900 mb-6">লেখকবৃন্দ</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          ইতিহাসযানের নিবেদিত লেখক ও গবেষকদের সাথে পরিচিত হোন
        </p>
      </header>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each authors as author}
        <a href="/authors/{author.id}">
            <div class="bg-white rounded-lg border border-amber-100 overflow-hidden shadow-sm">
              <div class="aspect-square relative overflow-hidden">
                <img
                  src="{authorImage}/{author.id}/{author.photo}"
                  alt={author.name}
                  class="w-full h-full object-cover aspect-[16/9]"
                />
              </div>
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  {author.name}
                </h2>
                <p class="text-gray-600 mb-4 line-clamp-3">{author.bio}</p>
                <div class="flex gap-4">
                </div>
              </div>
            </div>
        </a>
        {/each}
      </div>
    </div>
  </div>