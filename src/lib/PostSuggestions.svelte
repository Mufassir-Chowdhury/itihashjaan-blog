<script lang="ts">
	import BlogPreviewCard from "./BlogPreviewCard.svelte";

    export let suggestions: any[] = [];
    

  </script>
  
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-auto py-8">
      {#each suggestions as post}
        <div class="{post.featured ? 
          'md:col-span-2 md:row-span-2' : 
          'col-span-1 row-span-1'} 
          transition-transform duration-300 hover:scale-[1.02]"
        >
          <BlogPreviewCard 
            {post} 
          />
        </div>
      {/each}
    </div>
  </section>