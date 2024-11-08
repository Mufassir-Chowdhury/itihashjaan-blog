<script lang="ts">
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import SearchModal from './SearchModal.svelte';

	let isMenuOpen = false;
	let prevScrollPos = 0;
	let isNavbarVisible = true;
	let isSearchOpen = false;
	let lastHoverTime = 0;
	let isDropdownOpen = false;

	// Enhanced scroll behavior with smoother transitions
	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		const scrollDelta = Math.abs(currentScrollPos - prevScrollPos);

		if (scrollDelta > 10) {
			// Only trigger for significant scroll
			isNavbarVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
			prevScrollPos = currentScrollPos;
		}
	};

	// Keyboard shortcuts
	const handleKeydown = (e: KeyboardEvent) => {
		// Command/Ctrl + K to open search
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			isSearchOpen = true;
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			document.addEventListener('keydown', handleKeydown);

			return () => {
				window.removeEventListener('scroll', handleScroll);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});

	// Hover intent for dropdown
	const handleMouseEnter = () => {
		lastHoverTime = Date.now();
		isDropdownOpen = true;
	};

	const handleMouseLeave = () => {
		setTimeout(() => {
			if (Date.now() - lastHoverTime >= 200) {
				isDropdownOpen = false;
			}
		}, 300);
	};

  let categories = [
    { name: 'অনুবাদ', slug: 'translation' },
    { name: 'প্রবন্ধ', slug: 'article' },
    { name: 'অনুলিখন', slug: 'copywriting' },
    { name: 'সম্পাদকীয়', slug: 'editorial' },
  ]

</script>

<nav
	class="fixed left-0 right-0 top-0 z-40 transition-all duration-300"
	class:translate-y-0={isNavbarVisible}
	class:-translate-y-full={!isNavbarVisible}
	transition:fade
>
	<div class="bg-white/80 shadow-sm backdrop-blur-md">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center space-x-2 transition-transform hover:scale-105">
					<span class="text-2xl font-bold text-amber-600">ইতিহাসযান</span>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden md:block">
					<div class="flex items-center space-x-6">
						<a
							href="/"
							class="group relative text-gray-700 transition-colors"
							class:text-amber-600={$page.url.pathname === '/'}
						>
							মূল পাতা
							<span
								class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-600 transition-all duration-300 group-hover:w-full"
							></span>
						</a>

						<!-- Dropdown -->
						<div class="relative" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
							<button
								class="group flex items-center space-x-1 text-gray-700 transition-colors hover:text-amber-600"
								class:text-amber-600={isDropdownOpen}
							>
								<span>বিভাগ সমূহ</span>
								<svg
									class="h-4 w-4 transition-transform duration-200"
									class:rotate-180={isDropdownOpen}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{#if isDropdownOpen}
								<div
									class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
									transition:slide={{ duration: 200 }}
								>
                  {#each categories as category}
                    <a
                      href={`/articles?category=${category.slug}`}
                      class="block px-4 py-2 text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
                    >
                      {category.name}
                    </a>
                  {/each}
								</div>
							{/if}
						</div>
						<a
							href="/authors"
							class="group relative text-gray-700 transition-colors"
							class:text-amber-600={$page.url.pathname === '/author'}
						>
							লেখকসমূহ
							<span
								class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-600 transition-all duration-300 group-hover:w-full"
							></span>
						</a>
						<!-- Search Button -->
						<button
							class="group flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-amber-100"
							on:click={() => (isSearchOpen = true)}
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<span class="text-sm">অনুসন্ধান</span>
							<span class="text-xs text-gray-400">(Ctrl + K)</span>
						</button>
					</div>
				</div>

				<!-- Mobile menu button -->
				<div class="flex md:hidden">
					<button
						class="rounded-md p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600"
						on:click={() => (isSearchOpen = true)}
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button
						class="rounded-md p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600"
						on:click={() => (isMenuOpen = !isMenuOpen)}
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if isMenuOpen}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							{/if}
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<div class="md:hidden" transition:slide={{ duration: 200 }}>
				<div class="space-y-1 px-4 pb-3 pt-2">
					<a
						href="/"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
						class:bg-amber-50={$page.url.pathname === '/'}
						on:click={() => (isMenuOpen = false)}
					>
						মূল পাতা
					</a>

					<!-- Mobile Categories -->
					<div class="space-y-1">
						<div class="px-3 py-2 text-sm font-medium text-gray-500">বিভাগ সমূহ</div>
            {#each categories as category}
              <a
                href={`/articles?category=${category.slug}`}
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
                on:click={() => (isMenuOpen = false)}
              >
                {category.name}
              </a>
            {/each}
						
					</div>
          <a
						href="/authors"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
						class:bg-amber-50={$page.url.pathname === '/authors'}
						on:click={() => (isMenuOpen = false)}
					>
						লেখকসমূহ
					</a>
				</div>
			</div>
			<!-- </div> -->
		{/if}
	</div>
</nav>

<!-- Search Modal -->
<SearchModal
	isOpen={isSearchOpen}
	onClose={() => {
		isSearchOpen = false;
		isMenuOpen = false;
	}}
/>

<style>
	/* Optional: Add any custom styles here */
	:global(body) {
		overflow-y: auto !important;
		padding-right: 0 !important;
	}

	:global(body.modal-open) {
		overflow: hidden !important;
	}
</style>
