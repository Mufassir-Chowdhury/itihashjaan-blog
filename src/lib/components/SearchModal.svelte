<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
	import { getArticles } from '$lib/pocketbase';
	import type { Post } from '$lib/types/post';
    
    export let isOpen: boolean;
    export let onClose: () => void;
    
    interface SearchResult {
      title: string;
      expand: { author: { name: string } };
      slug: string;
      category: string;
    }
    
    let searchQuery = '';
    let searchResults: SearchResult[] = [];
    let isLoading = false;
    let selectedIndex = -1;
    const debounce = (fn: Function, ms = 300) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
    };
    // Mock search function - replace with actual API call
    const performSearch = debounce(async (query: string) => {
      if (query.length < 2) {
        searchResults = [];
        return;
      }
      
      isLoading = true;
      try {
        // Replace with actual API endpoint
        let posts: Post[] = await getArticles({ filter: `title~"${query}"` });
        console.log(posts);
        searchResults = posts;
      } catch (error) {
        console.error('Search error:', error);
        searchResults = [];
      } finally {
        isLoading = false;
      }
    }, 300);
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          selectedIndex = Math.max(selectedIndex - 1, -1);
          break;
        case 'Enter':
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            window.location.href = `/articles/${searchResults[selectedIndex].slug}`;
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    
    onMount(() => {
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    });
    
    $: if (searchQuery) {
      performSearch(searchQuery);
    } else {
      searchResults = [];
    }
    </script>
    
    {#if isOpen}
      <div
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        on:click={onClose}
        transition:fade={{ duration: 200 }}
      >
        <div
          class="absolute left-1/2 top-4 w-full max-w-2xl -translate-x-1/2 transform px-4"
          on:click|stopPropagation
        >
          <div
            class="overflow-hidden rounded-xl bg-white shadow-2xl"
            transition:fly={{ y: -20, duration: 200 }}
          >
            <!-- Search Input -->
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="অনুসন্ধান করুন..."
                class="w-full bg-gray-50 px-4 py-4 pl-12 outline-none"
                autofocus
              />
              <svg
                class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
    
            <!-- Search Results -->
            {#if searchQuery.length >= 2}
              <div class="max-h-[60vh] overflow-y-auto border-t">
                {#if isLoading}
                  <div class="p-4 text-center text-gray-500">
                    <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
                    <p class="mt-2">অনুসন্ধান করা হচ্ছে...</p>
                  </div>
                {:else if searchResults.length === 0}
                  <div class="p-4 text-center text-gray-500">
                    কোন ফলাফল পাওয়া যায়নি
                  </div>
                {:else}
                  <div class="divide-y">
                    {#each searchResults as result, index}
                      <a
                        href={`/articles/${result.slug}`}
                        class="block p-4 transition hover:bg-amber-50"
                        class:bg-amber-50={index === selectedIndex}
                      >
                        <span class="inline-flex items-center space-x-2">
                          <span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                            {result.category}
                          </span>
                        </span>
                        <h3 class="mt-2 font-medium text-gray-900">{result.title}</h3>
                        <p class="mt-1 text-sm text-gray-500">{result.expand?.author?.name}</p>
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
    
            <!-- Search Tips -->
            {#if searchQuery.length < 2}
              <div class="border-t p-4">
                <h3 class="text-sm font-medium text-gray-900">অনুসন্ধান টিপস</h3>
                <ul class="mt-2 space-y-1 text-sm text-gray-500">
                  <li>• নির্দিষ্ট বিষয়ের জন্য বিভাগের নাম ব্যবহার করুন</li>
                  <li>• সঠিক ফলাফলের জন্য কমপক্ষে দুটি অক্ষর লিখুন</li>
                  <li>• আরো নির্দিষ্ট ফলাফলের জন্য সম্পূর্ণ শব্দ ব্যবহার করুন</li>
                </ul>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}