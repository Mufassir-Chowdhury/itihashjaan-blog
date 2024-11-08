<script lang="ts">
	import { articleImage } from '$lib/pocketbase';
    import { fade } from 'svelte/transition';
    let { data } = $props();
    let post = data.props.post;
  </script>
    
  {#if post}
    <main class="min-h-screen bg-amber-50/30">
      <!-- Hero Section -->
      <div class="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img
          src="{articleImage}/{post.id}/{post.image}"
          alt={post.title}
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-16 text-white sm:px-6 lg:px-8">
          <div class="mx-auto max-w-3xl">
            <div class="mb-6 flex flex-wrap gap-3">
              <span class="inline-block rounded-full bg-orange-500/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                {post.category}
              </span>
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
            </div>
          </div>
        </div>
      </div>
    
      <!-- Article Content -->
      <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 divide-y-2" in:fade={{ delay: 200 }}>
        <!-- Description -->
        <div class="mb-12">
          <p class="text-xl leading-relaxed text-gray-700">
            {post.description}
          </p>
        </div>
    
        <!-- Main Content -->
        <div class="prose prose-lg prose-amber mx-auto">
          {@html post.content}
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
                window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
            >
              ফেসবুক
            </button>
            <button 
              class="rounded-full bg-sky-500 px-6 py-2 text-white transition-colors hover:bg-sky-600"
              onclick={() => {
                const url = window.location.href;
                const text = `${post.title}\n`;
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
              }}
            >
              টুইটার
            </button>
          </div>
        </div>
      </div>
    </main>
  {:else}
    <div class="min-h-screen flex items-center justify-center">
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
        @apply mt-12 mb-6 text-3xl font-bold;
      }
    
      :global(.prose h3) {
        @apply mt-8 mb-4 text-2xl font-semibold;
      }
    
      :global(.prose p) {
        @apply mb-6 leading-relaxed;
      }
    
      :global(.prose blockquote) {
        @apply border-l-4 border-amber-500 bg-amber-50 p-4 italic;
      }
    </style>