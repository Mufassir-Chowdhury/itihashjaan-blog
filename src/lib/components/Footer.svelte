<script lang="ts">
	const currentYear = new Date().getFullYear();
	let categories = [
		{ name: 'অনুবাদ', slug: 'translation' },
		{ name: 'প্রবন্ধ', slug: 'article' },
		{ name: 'অনুলিখন', slug: 'copywriting' },
		{ name: 'সম্পাদকীয়', slug: 'editorial' }
	];
</script>

<footer class="bg-gray-900 text-gray-300">
	<div class="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div class="mb-8 md:mb-0">
				<h2 class="text-2xl font-bold text-amber-500">ইতিহাসযান</h2>
				<p class="mt-4 text-sm">ইতিহাস, দর্শন, রাজনীতি, সমাজ, ধর্ম ও সংস্কৃতির পঠন-পাঠন এবং পর্যালচনার একটি বুদ্ধিবৃত্তিক প্রচেষ্টার অংশ</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-lg font-semibold text-white">দ্রুত লিঙ্ক</h3>
				<ul class="mt-4 space-y-2">
					<li>
						<a href="/" class="text-sm hover:text-amber-400">মূল পাতা</a>
					</li>
					<li>
						<a href="/articles" class="text-sm hover:text-amber-400">নিবন্ধ সমূহ</a>
					</li>
          <li>
						<a href="/authors" class="text-sm hover:text-amber-400">লেখকসমূহ</a>
					</li>
					<li>
						<a href="/about" class="text-sm hover:text-amber-400">আমাদের সম্পর্কে</a>
					</li>
					<li>
						<a href="/contact" class="text-sm hover:text-amber-400">যোগাযোগ</a>
					</li>
				</ul>
			</div>

			<!-- Categories -->
			<div>
				<h3 class="text-lg font-semibold text-white">বিভাগ সমূহ</h3>
				<ul class="mt-4 space-y-2">
          {#each categories as category}
            <li>
              <a href="/articles?category={category.slug}" class="text-sm hover:text-amber-400">{category.name}</a>
            </li>
          {/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="text-lg font-semibold text-white">যোগাযোগ</h3>
				<ul class="mt-4 space-y-2">
					<li class="flex items-center space-x-2">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<a href="mailto:contact@itihasjan.com" class="text-sm hover:text-amber-400">
							contact@itihasjaan.com
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 border-t border-gray-800 py-6">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<p class="text-sm">
					&copy; {currentYear} ইতিহাসযান। সর্বস্বত্ব সংরক্ষিত।
				</p>
				<div class="flex space-x-6">
					<a href="#" class="text-gray-400 hover:text-amber-400">
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"
							/>
						</svg>
					</a>
					<a href="#" class="text-gray-400 hover:text-amber-400">
						<span class="sr-only">Twitter</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06A4.93,4.93,0,0,0,4.88,14a5,5,0,0,1-2.23.09,4.93,4.93,0,0,0,4.6,3.42A9.72,9.72,0,0,1,0,19.74,13.74,13.74,0,0,0,7.55,22a13.93,13.93,0,0,0,14-14c0-.21,0-.42-.01-.63A10,10,0,0,0,24,4.59l-.05-.02Z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
