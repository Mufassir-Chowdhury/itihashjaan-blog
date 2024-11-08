<script>
    import { authorImage } from '$lib/pocketbase';
import { fade } from 'svelte/transition';
    let { data } = $props();
    let author = data.props.author;
  </script>
  
  {#if author}
  <div class="min-h-screen bg-amber-50/30 py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg border border-amber-100 overflow-hidden shadow-lg mb-12" in:fade>
        <div class="md:flex items-center">
          <div class="md:w-1/3">
            <div class="aspect-square relative overflow-hidden">
              <img
                src="{authorImage}/{author.id}/{author.photo}"
                alt={author.name}
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="p-8 md:w-2/3">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{author.name}</h1>
            <p class="text-xl text-gray-600 mb-6">{@html author.bio}</p>
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
                        class="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
                    >
                        Facebook প্রোফাইল
                    </a>
                {/if}
                {#if author.blog}
                    <a 
                        href={author.blog.toString()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center rounded-md bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 transition-colors"
                    >
                        ব্লগ
                    </a>
                {/if}
            </div>
          </div>
        </div>
      </div>
  
      <!-- {#if posts.length > 0}
        <h2 class="text-3xl font-bold text-gray-900 mb-8">লেখকের সকল নিবন্ধ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each posts as post}
            <a href="/posts/{post.slug}" class="group block h-full">
              <article class="relative overflow-hidden rounded-lg border border-amber-100 bg-black shadow-sm transition-all duration-200 hover:shadow-md h-full">
                <div class="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={post.image}
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
      {/if} -->
    </div>
  </div>
    {/if}