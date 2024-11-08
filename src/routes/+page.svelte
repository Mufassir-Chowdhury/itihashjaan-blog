<script lang="ts">
    import BlogGrid from '$lib/BlogGrid.svelte';
    import { fade } from 'svelte/transition';
    let { data } = $props();
    let posts = data.props.posts;

    let selectedCategory: string | null = $state(null);
  
    const categories = posts.map(post => post.category).filter((category, i, arr) => arr.indexOf(category) === i);
  </script>
  
  <main class="min-h-screen bg-amber-50/30">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="py-16 text-center" in:fade>
        <h1 class="mb-6 text-5xl font-bold text-gray-900">ইতিহাসযান</h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-600">
          সত্ত্বা, বর্তমানতা ও ইতিহাস
        </p>
      </header>
  
      <!-- Filters -->
      <div class="mb-8 flex flex-wrap justify-center gap-4">

  
        <div class="space-x-2">
          {#each categories as category}
            <button
              class="rounded-full px-4 py-2 text-sm font-medium transition-colors
              {selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}"
              onclick={() => selectedCategory = selectedCategory === category ? null : category}
            >
              {category}
            </button>
          {/each}
        </div>
      </div>
      
      <BlogGrid 
        {posts}
        {selectedCategory} 
    />
    </div>
  </main>